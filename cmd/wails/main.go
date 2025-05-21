package wails

import (
	"example-wails/internal/model"
	"example-wails/internal/pkg"
	"io/fs"
	"log"
	"path/filepath"
	"runtime"

	"github.com/wailsapp/wails/v3/pkg/application"
)

func Init(appInfo model.AppInfoModel, assets fs.FS) {

	 // 打印 assets 中的所有文件（用于调试）
    log.Println("Listing all files in assets:")
    err := fs.WalkDir(assets, ".", func(path string, d fs.DirEntry, err error) error {
        if err != nil {
            return err
        }
        log.Printf("- %s (isDir: %v)", path, d.IsDir())
        return nil
    })
    if err != nil {
        log.Printf("Error walking assets: %v", err)
    }

	appConfigHome := pkg.AppConfigHome(appInfo)
	appConfigHomeBinPath := filepath.Join(appConfigHome, "bin")
	log.Println("appConfigHomeBinPath", appConfigHomeBinPath)

	binName := "example-wails"
	if runtime.GOOS == "windows" {
		binName += ".exe"
	}

	newBinPath := filepath.Join(appConfigHomeBinPath, binName)
	

	binPath := filepath.Join("assets", "binary", "example-wails", runtime.GOOS+"_"+runtime.GOARCH, binName)
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
