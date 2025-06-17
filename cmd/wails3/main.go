package wails3

import (
	"example-wails/assets"
	"example-wails/internal/model"
	"example-wails/internal/pkg/example"
	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"log"
	"net/http"
	"runtime"
	"strings"
)

func MacWindow() application.MacWindow {
	return application.MacWindow{
		InvisibleTitleBarHeight: 50,
		Backdrop:                application.MacBackdropTranslucent,
		TitleBar:                application.MacTitleBarHiddenInset,
		Appearance:              application.NSAppearanceNameVibrantLight,
	}
}

func WindowsWindow() application.WindowsWindow {
	return application.WindowsWindow{}
}

func LinuxWindow() application.LinuxWindow {
	return application.LinuxWindow{}
}

func MainWindowOptions() application.WebviewWindowOptions {
	return application.WebviewWindowOptions{
		Name:      "main",
		Title:     "Window 1",
		Width:     1024,
		Height:    768,
		MinWidth:  1024,
		MinHeight: 768,
		// Menu:   AppMenu, // reference the menu above
		// MaxWidth:          1280,
		// MaxHeight:         800,
		// DisableResize:  false,
		Frameless:        runtime.GOOS != "darwin", // 保留 Mac 的三个操作按钮
		BackgroundType:   application.BackgroundTypeTransparent,
		BackgroundColour: application.NewRGBA(1.0, 1.0, 1.0, 0.0),
		URL:              "/",

		Mac: MacWindow(),

		Windows: WindowsWindow(),

		Linux: LinuxWindow(),
	}
}

const SettingWindowName = "setting"

func SettingWindowOptions(url string) application.WebviewWindowOptions {
	return application.WebviewWindowOptions{
		Name:  SettingWindowName,
		Title: "Setting",
		URL:   "/setting",

		Frameless: false,

		Mac: MacWindow(),

		Windows: WindowsWindow(),

		Linux: LinuxWindow(),
	}
}

const DiskFilePrefix = "/disk_file"

func DiskFileMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		if strings.HasPrefix(req.URL.Path, DiskFilePrefix) {
			log.Printf("Requesting URL path=%s", req.URL.Path)
			requestedFile := strings.TrimPrefix(req.URL.Path, pkg.Ternary[string](runtime.GOOS == "windows", DiskFilePrefix+"/", DiskFilePrefix))
			log.Printf("Requesting requestedFile=%s", requestedFile)
			http.ServeFile(res, req, requestedFile)
		} else {
			next.ServeHTTP(res, req)
		}
	})
}

func OnStartBefore(appInfo model.AppInfoModel) {
	log.Printf("OnStartBefore")

	exampleWails, version, err := assets.AssetsBinaryExampleWails()
	if err == nil && exampleWails != nil {
		pkg.CopyBinAddPath("example-wails", version, exampleWails, appInfo)
	} else {
		log.Printf("Failed to load example-wails binary: %s", err)
	}
}

func OnStart(appInfo model.AppInfoModel) {
	log.Printf("OnStart %s", appInfo.Name)
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
	log.Printf("ErrorHandler  %s \n%+v", err.Error(), err)
}

func RawMessageHandler(window application.Window, message string) {
	log.Printf("Window [%s] Raw message: \n %s", window.Name(), message)
}

func OnApplicationEvent(event *application.ApplicationEvent) {
	eventType := events.DefaultWindowEventMapping()[events.WindowEventType(event.Id)]
	log.Printf("OnApplicationEvent event.Id=%d JSEvent=%s eventType=%d", event.Id, events.JSEvent(event.Id), eventType)
}
