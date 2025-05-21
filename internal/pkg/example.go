package pkg

import (
	"example-wails/internal/model"
	"fmt"
	"github.com/adrg/xdg"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

const AppName = "QNWallpaper"

func InitEnv(binPath string) {
	envs := os.Environ()
	for _, env := range envs {
		envKV := strings.Split(env, "=")
		envKey := envKV[0]
		envVal := envKV[1]
		if envKey == "PATH" {
			err := os.Setenv("PATH", envVal+":"+binPath)
			if err != nil {
				log.Printf("Failed to set PATH: %s", binPath)
				return
			}
		}
	}

}

func InitBinary(binaryPath string, embeddedFile io.Reader) {

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
