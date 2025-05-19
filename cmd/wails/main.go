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
