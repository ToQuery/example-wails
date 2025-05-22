package pkg

import (
	"example-wails/internal/model"
	"io"
	"io/fs"
	"log"
	"os"
	"path"
	"path/filepath"
	"runtime"

	"github.com/adrg/xdg"
)

func Ternary[T any](cond bool, a, b T) T {
	if cond {
		return a
	}
	return b
}

func GetBinName(binName string) string {
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
	if os.IsNotExist(err) {

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

func CopyBinAddPath(binDir, binName string, appInfo model.AppInfoModel, assets fs.FS) {
	binName = GetBinName(binName)

	appConfigHome := AppConfigHome(appInfo)
	appConfigHomeBinPath := filepath.Join(appConfigHome, "bin")
	log.Printf("appConfigHomeBinPath=%s", appConfigHomeBinPath)

	newBinPath := filepath.Join(appConfigHomeBinPath, binName)

	// 嵌入式文件系统 fs.FS 需要使用正斜杠 / 作为路径分隔符，无论操作系统是什么。
	binPath := path.Join("assets", "binary", binDir, runtime.GOOS+"_"+runtime.GOARCH, binName)
	log.Printf("binPath %s", binPath)

	binFile, err := assets.Open(binPath)

	if err != nil {
		log.Printf("Failed to open embedded bin file:%s", err.Error())
		return
	}
	CopyBin(binFile, newBinPath)

	AddEnv(appConfigHomeBinPath)
}

func AppConfigHome(appInfo model.AppInfoModel) string {
	return filepath.Join(xdg.ConfigHome, appInfo.Name, appInfo.Version)
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
