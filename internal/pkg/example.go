package pkg

import (
	"example-wails/internal/model"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"

	"github.com/adrg/xdg"
)

const AppName = "example-wails"

func InitEnv(binPath string) {
	// 获取当前 PATH
	pathVal := os.Getenv("PATH")
	log.Printf("Env PATH: %s", pathVal)
	if pathVal == "" {
		pathVal = binPath
	} else {
		// 使用系统特定的路径分隔符
		separator := string(os.PathListSeparator)
		pathVal += separator + binPath
	}

	// 设置新的 PATH
	err := os.Setenv("PATH", pathVal)
	if err != nil {
		log.Printf("Failed to set PATH: %s", err)
		return
	}

	log.Printf("Updated PATH: %s", pathVal)
}

func InitBinary(embeddedFile io.Reader, binaryPath string) {

	// 1. 判断二进制文件是否存在
	_, err := os.Stat(binaryPath)
	if err == nil {
		fmt.Println("Binary already exists:", binaryPath)
		return
	}

	// 2. 如果不存在，则从 embed 复制到指定目录
	if os.IsNotExist(err) {

		// 创建目标目录（如果不存在）
		err = os.MkdirAll(filepath.Dir(binaryPath), 0755)
		if err != nil {
			fmt.Println("Failed to create directory:", err)
			return
		}

		// 创建目标文件
		outFile, err := os.Create(binaryPath)
		if err != nil {
			fmt.Println("Failed to create binary file:", err)
			return
		}
		defer outFile.Close()

		// 拷贝内容
		log.Println("binaryPath=%s", binaryPath, "embeddedFile=", embeddedFile)
		_, err = io.Copy(outFile, embeddedFile)
		if err != nil {
			fmt.Println("Failed to copy binary content:", err)
			return
		}

		// 设置可执行权限（Unix 系统下）
		err = os.Chmod(binaryPath, 0755)
		if err != nil {
			fmt.Println("Failed to set file permissions:", err)
			return
		}
		fmt.Println("Binary initialized at:", binaryPath)
	}

}

func AppConfigHome(appInfo model.AppInfoModel) string {
	return filepath.Join(xdg.ConfigHome, AppName, appInfo.Version)
}

func AppCacheHome(appInfo model.AppInfoModel) string {
	userCacheDir, err := os.UserCacheDir()
	if err != nil || userCacheDir == "" {
		userCacheDir = filepath.Join(xdg.CacheHome, AppName, appInfo.Version)
	}
	return userCacheDir
}
