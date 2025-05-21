package wails

import (
	"example-wails/internal/model"
	"example-wails/internal/pkg"
	"github.com/wailsapp/wails/v3/pkg/application"
	"io/fs"
	"log"
	"path/filepath"
	"runtime"
)

func Init(appInfo model.AppInfoModel, assets fs.FS) {
	appConfigHome := pkg.AppConfigHome(appInfo)
	appConfigHomeBinPath := filepath.Join(appConfigHome, "bin")
	log.Println("appConfigHomeBinPath", appConfigHomeBinPath)

	binName := "example-wails"
	if runtime.GOOS == "windows" {
		binName += ".exe"
	}

	binFile := filepath.Join(appConfigHomeBinPath, binName)

	newBinFile, err := assets.Open(filepath.Join("assets", "binary", "example-wails", runtime.GOOS+"_"+runtime.GOARCH, binName))
	if err != nil {

	}
	pkg.InitBinary(binFile, newBinFile)

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
