package pkg_file

import (
	"errors"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"path/filepath"
)

func CopyEmbeddedFile(embeddedFile io.Reader, binPath string) {

	// 1. 判断二进制文件是否存在
	_, err := os.Stat(binPath)
	if err == nil {
		log.Printf("Binary already exists: %s", binPath)
		return
	}

	// 2. 如果不存在，则从 embed 复制到指定目录
	if os.IsExist(err) {
		log.Printf("Binary already exists: %s", binPath)
	} else {
		// 创建目标目录（如果不存在）
		binDir := filepath.Dir(binPath)
		err = os.MkdirAll(binDir, 0755)
		if err != nil {
			log.Printf("Failed to create directory: %s", binDir)
			return
		}

		// 创建目标文件
		outFile, err := os.Create(binPath)
		if err != nil {
			log.Printf("Failed to create bin file: %s", binPath, err)
			return
		}
		defer outFile.Close()

		// 拷贝内容
		_, err = io.Copy(outFile, embeddedFile)
		if err != nil {
			log.Printf("binPath=%s outFile=%s ", binPath, outFile)
			return
		}

		// 设置可执行权限（Unix 系统下）
		err = os.Chmod(binPath, 0755)
		if err != nil {
			log.Printf("Failed to set file permissions: %s", binPath, err)
			return
		}
		log.Printf("Binary initialized at: %s", binPath)
	}

}

// 复制文件
func CopyFile(srcFile, destFile string) error {
	srcInfo, err := os.Stat(srcFile)
	if err != nil {
		return err
	}

	source, err := os.Open(srcFile)
	if err != nil {
		return err
	}
	defer func(source *os.File) {
		err := source.Close()
		if err != nil {
			log.Printf("failed to close source file: %+v", err)
		}
	}(source)

	dest, err := os.Create(destFile)
	if err != nil {
		return err
	}
	defer func(dest *os.File) {
		err := dest.Close()
		if err != nil {
			log.Printf("failed to close dest file: %+v", err)
		}
	}(dest)

	_, err = io.Copy(dest, source)

	// 设置文件权限
	err = os.Chmod(destFile, srcInfo.Mode())
	if err != nil {
		return err
	}
	return err
}

// 复制整个目录（包括子目录和文件）
func CopyDir(srcDir, destDir string) error {
	return filepath.Walk(srcDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// 计算目标路径
		relPath, err := filepath.Rel(srcDir, path)
		if err != nil {
			return err
		}
		destPath := filepath.Join(destDir, relPath)

		if info.IsDir() {
			// 创建目标目录
			return os.MkdirAll(destPath, info.Mode())
		} else {
			// 复制文件
			return CopyFile(path, destPath)
		}
	})
}

// CopyTree copies files from an embedded FS to a destination directory on disk.
// Parameters:
// - src: source filesystem (embedded FS)
// - root: root directory in the source filesystem
// - dst: destination directory on disk
// - dirsExistOk: whether it's okay if directories already exist
// Returns any error encountered during the copy process
func CopyTree(src fs.FS, root string, dst string, dirsExistOk bool) error {
	if src == nil {
		return errors.New("source filesystem cannot be nil")
	}
	if root == "" {
		return errors.New("root directory cannot be empty")
	}
	if dst == "" {
		return errors.New("destination directory cannot be empty")
	}

	return fs.WalkDir(src, root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return fmt.Errorf("error walking directory %s: %w", path, err)
		}

		relPath, err := filepath.Rel(root, path)
		if err != nil {
			return fmt.Errorf("failed to get relative path for %s: %w", path, err)
		}

		dstPath := filepath.Join(dst, relPath)

		if d.IsDir() {
			err := os.MkdirAll(dstPath, 0755)
			if err != nil && (!os.IsExist(err) || !dirsExistOk) {
				return fmt.Errorf("failed to create directory %s: %w", dstPath, err)
			}
			return nil
		}

		// It's a file, copy it
		file, err := src.Open(path)
		if err != nil {
			return fmt.Errorf("failed to open source file %s: %w", path, err)
		}
		defer file.Close()

		outFile, err := os.Create(dstPath)
		if err != nil {
			return fmt.Errorf("failed to create destination file %s: %w", dstPath, err)
		}
		defer outFile.Close()

		_, err = io.Copy(outFile, file)
		if err != nil {
			return fmt.Errorf("failed to copy file content from %s to %s: %w", path, dstPath, err)
		}
		return nil
	})
}

func DeleteFile(path string) {
	err := os.Remove(path)
	if err != nil {
		fmt.Printf("删除文件失败: %v\n", err)
		return
	}
	fmt.Println("文件已成功删除:", path)
}

func DeletePath(path string) {
	err := os.RemoveAll(path)
	if err != nil {
		fmt.Printf("删除文件/目录失败: %v\n", err)
		return
	}
	fmt.Println("已成功删除:", path)
}

func DirExists(path string) bool {
	info, err := os.Stat(path)
	if os.IsNotExist(err) {
		return false
	}
	// 确保是目录而不是文件
	return info.IsDir()
}
