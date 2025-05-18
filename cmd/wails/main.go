package wails

import (
	"fmt"
	"github.com/wailsapp/wails/v3/pkg/application"
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
	fmt.Println("Shutting down")
}

func ShouldQuit() bool {
	fmt.Println("Should quit")
	return true
}

func PanicHandler(err interface{}) {
	fmt.Println("Panic")
}

func WarningHandler(text string) {
	fmt.Println("Warning")
}

func ErrorHandler(err error) {
	fmt.Println("Error")
}

func RawMessageHandler(window application.Window, message string) {
	fmt.Println("Raw message", message)
}
