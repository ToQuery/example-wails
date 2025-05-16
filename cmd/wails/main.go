package wails

import (
	"github.com/wailsapp/wails/v3/pkg/application"
	"log"
)

func MacWindow() application.MacWindow {
	return application.MacWindow{
		InvisibleTitleBarHeight: 50,
		Backdrop:                application.MacBackdropTranslucent,
		TitleBar:                application.MacTitleBarHiddenInset,
		Appearance:              application.NSAppearanceNameVibrantLight,
	}
}

func OnShutdown() {
}

func ShouldQuit() bool {
	return true
}

func PanicHandler(err interface{}) {
	log.Fatal(err)
}

func WarningHandler(text string) {

}

func ErrorHandler(err error) {

}
