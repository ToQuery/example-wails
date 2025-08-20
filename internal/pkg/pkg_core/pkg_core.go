package pkg_core

import (
	"bufio"
	"example-wails/internal/model"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/hashicorp/go-version"

	"github.com/adrg/xdg"
)

func Ternary[T any](cond bool, a, b T) T {
	if cond {
		return a
	}
	return b
}

func GetBinFileName(binName string) string {
	if runtime.GOOS == "windows" {
		binName += ".exe"
	}
	return binName
}

func AddEnv(binDir string) {
	// 获取当前 PATH
	pathVal := os.Getenv("PATH")
	log.Printf("Env PATH: %s", pathVal)
	if pathVal == "" {
		pathVal = binDir
	} else {
		// 使用系统特定的路径分隔符
		separator := string(os.PathListSeparator)
		pathVal += separator + binDir
	}

	// 设置新的 PATH
	err := os.Setenv("PATH", pathVal)
	if err != nil {
		log.Printf("Failed to set PATH: %s", err)
		return
	}

	log.Printf("Updated PATH: %s", pathVal)
}

func CopyBin(embeddedFile io.Reader, binPath string) {

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

// CopyBinAddPath 复制二进制文件到指定目录，并更新版本信息
func CopyBinAddPath(binName, binVersion string, binFile fs.File, appInfo model.AppInfoModel) {

	appConfigHome := AppConfigHome(appInfo)
	appConfigHomeBinPath := filepath.Join(appConfigHome, "bin")
	appConfigHomeBinVersionPath := filepath.Join(appConfigHomeBinPath, "version")
	log.Printf("appConfigHomeBinPath=%s", appConfigHomeBinPath)

	versionMap, err := ParseVersionToMap(appConfigHomeBinVersionPath)
	if err != nil {
		log.Printf("Failed to parse version file: %s", err)
	}

	val, ok := versionMap[binName]
	if !ok {
		log.Printf("Failed map to get version: %s", binName)
		val = "0.0.0"
	}
	oldBinVersion, err := version.NewVersion(val)
	if err != nil {
		log.Printf("Failed to parse old version: %s", err)
	}

	newBinVersion, err := version.NewVersion(binVersion)
	if err != nil {
		log.Printf("Failed to parse new version: %s", err)
	}

	if oldBinVersion.LessThan(newBinVersion) {
		log.Printf("oldBinVersion=%s newBinVersion=%s", oldBinVersion, newBinVersion)
		versionMap[binName] = binVersion

		binFileName := GetBinFileName(binName)
		err := os.Remove(filepath.Join(appConfigHomeBinPath, binFileName))
		if err != nil {
			log.Printf("Failed to remove old bin file: %s", binFileName)
		}

		newBinPath := filepath.Join(appConfigHomeBinPath, binFileName)

		CopyBin(binFile, newBinPath)

		err = WriteMapToFile(appConfigHomeBinVersionPath, versionMap)
		if err != nil {
			log.Printf("Failed to write version file: %s", appConfigHomeBinVersionPath)
		}
	}

	AddEnv(appConfigHomeBinPath)
}

func AppConfigHome(appInfo model.AppInfoModel) string {
	return filepath.Join(xdg.ConfigHome, appInfo.Name)
}

func AppCacheHome(appInfo model.AppInfoModel) string {
	userCacheDir, err := os.UserCacheDir()
	if err != nil || userCacheDir == "" {
		userCacheDir = filepath.Join(xdg.CacheHome, appInfo.Name, appInfo.Version)
	} else {
		userCacheDir = filepath.Join(userCacheDir, appInfo.Name, appInfo.Version)
	}
	return userCacheDir
}

func ParseVersionToMap(filePath string) (map[string]string, error) {
	result := make(map[string]string)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return result, nil
	}

	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		// 忽略空行或注释（可选）
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		// 按等号分割
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			val := strings.TrimSpace(parts[1])
			result[key] = val
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

// WriteMapToFile 将 map 写入文件，每行格式为 key=value
func WriteMapToFile(filePath string, data map[string]string) error {
	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("无法创建文件: %w", err)
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	for k, v := range data {
		line := fmt.Sprintf("%s=%s\n", k, v)
		_, err := writer.WriteString(line)
		if err != nil {
			return fmt.Errorf("写入失败: %w", err)
		}
	}
	return writer.Flush()
}
