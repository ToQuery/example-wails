package wails

import (
	"example-wails/internal/model"
	"example-wails/internal/pkg"
	"io/fs"
	"log"
	"path"
	"path/filepath"
	"runtime"

	"github.com/wailsapp/wails/v3/pkg/application"
)

func Init(appInfo model.AppInfoModel, assets fs.FS) {

	appConfigHome := pkg.AppConfigHome(appInfo)
	appConfigHomeBinPath := filepath.Join(appConfigHome, "bin")
	log.Println("appConfigHomeBinPath", appConfigHomeBinPath)

	binName := "example-wails"
	if runtime.GOOS == "windows" {
		binName += ".exe"
	}

	newBinPath := filepath.Join(appConfigHomeBinPath, binName)

	// 嵌入式文件系统 fs.FS 需要使用正斜杠 / 作为路径分隔符，无论操作系统是什么。
	binPath := path.Join("assets", "binary", "example-wails", runtime.GOOS+"_"+runtime.GOARCH, binName)
	log.Printf("binPath %s", binPath)

	binFile, err := assets.Open(binPath)

	if err != nil {
		log.Println("Failed to open embedded binary file:", err)
		return
	}
	pkg.InitBinary(binFile, newBinPath)

	pkg.InitEnv(appConfigHomeBinPath)
}

func MacWindow() application.MacWindow {
	return application.MacWindow{
		InvisibleTitleBarHeight: 50,
		Backdrop:                application.MacBackdropTranslucent,
		TitleBar:                application.MacTitleBarHiddenInset,
		Appearance:              application.NSAppearanceNameVibrantLight,
	}
}

func OnShutdown() {
	log.Println("OnShutdown")
}

func ShouldQuit() bool {
	log.Println("ShouldQuit")
	return true
}

func PanicHandler(err interface{}) {
	log.Println("PanicHandler")
}

func WarningHandler(text string) {
	log.Println("WarningHandler", text)
}

func ErrorHandler(err error) {
	log.Println("ErrorHandler", err)
}

func RawMessageHandler(window application.Window, message string) {
	log.Println("Raw message", message)
}
