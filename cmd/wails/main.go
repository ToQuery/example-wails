package wails

import (
	"example-wails/internal/model"
	"example-wails/internal/pkg"
	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"io/fs"
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

func OnStart(appInfo model.AppInfoModel, assets fs.FS) {
	log.Printf("OnStart")
	pkg.CopyBinAddPath("example-wails", "example-wails", appInfo, assets)
}

func OnShutdown() {
	log.Printf("OnShutdown")
}

func ShouldQuit() bool {
	log.Printf("ShouldQuit")
	return true
}

func PanicHandler(err interface{}) {
	log.Printf("PanicHandler")
}

func WarningHandler(text string) {
	log.Printf("WarningHandler %s", text)
}

func ErrorHandler(err error) {
	log.Printf("ErrorHandler %s", err)
}

func RawMessageHandler(window application.Window, message string) {
	log.Printf("Raw message:\n%s", message)
}

func OnApplicationEvent(event *application.ApplicationEvent) {
	eventType := events.DefaultWindowEventMapping()[events.WindowEventType(event.Id)]
	log.Printf("OnApplicationEvent event.Id=%d JSEvent=%s eventType=%d", event.Id, events.JSEvent(event.Id), eventType)
}
