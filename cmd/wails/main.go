package wails

import (
	"example-wails/internal/model"
	"example-wails/internal/pkg"
	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"io/fs"
	"log"
	"net/http"
	"strings"
)

const DiskFilePrefix = "/disk_file"

func MacWindow() application.MacWindow {
	return application.MacWindow{
		InvisibleTitleBarHeight: 50,
		Backdrop:                application.MacBackdropTranslucent,
		TitleBar:                application.MacTitleBarHiddenInset,
		Appearance:              application.NSAppearanceNameVibrantLight,
	}
}

func DiskFileMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if strings.HasPrefix(req.URL.Path, DiskFilePrefix) {
			log.Printf("Requesting URL path:%s", req.URL.Path)
			requestedFilename := strings.TrimPrefix(req.URL.Path, DiskFilePrefix)
			log.Printf("Requesting requestedFilename:%s", requestedFilename)
			http.ServeFile(res, req, requestedFilename)
		} else {
			next.ServeHTTP(res, req)
		}
	})
}

func OnStartBefore(appInfo model.AppInfoModel, assets fs.FS) {
	log.Printf("OnStartBefore")
	pkg.CopyBinAddPath("example-wails", "example-wails", appInfo, assets)
}

func OnStart(appInfo model.AppInfoModel) {
	log.Printf("OnStart")
}

func OnShutdown() {
	log.Printf("OnShutdown")
}

func ShouldQuit() bool {
	log.Printf("ShouldQuit")
	return true
}

func PanicHandler(err interface{}) {
	log.Printf("PanicHandler", err)
}

func WarningHandler(text string) {
	log.Printf("WarningHandler %s", text)
}

func ErrorHandler(err error) {
	log.Printf("ErrorHandler  %s \n", err.Error())
}

func RawMessageHandler(window application.Window, message string) {
	log.Printf("Window [%s] Raw message: \n %s", window.Name(), message)
}

func OnApplicationEvent(event *application.ApplicationEvent) {
	eventType := events.DefaultWindowEventMapping()[events.WindowEventType(event.Id)]
	log.Printf("OnApplicationEvent event.Id=%d JSEvent=%s eventType=%d", event.Id, events.JSEvent(event.Id), eventType)
}
