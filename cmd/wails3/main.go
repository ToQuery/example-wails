package wails3

import (
	"example-wails/assets"
	"example-wails/internal/model"
	"example-wails/internal/pkg/pkg_core"
	"log"
	"net/http"
	"runtime"
	"strings"

	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
)

func MacWindow() application.MacWindow {
	return application.MacWindow{
		// Backdrop: macOS 窗口的背景类型
		// MacBackdropNormal: 默认值。窗口背景是 普通不透明，和常规窗口一样
		// MacBackdropTransparent: 窗口背景 完全透明，可以看到窗口下面的内容
		// MacBackdropTranslucent: 窗口背景 半透明，可以看到下面内容，但会有 模糊/毛玻璃效果
		Backdrop: application.MacBackdropTransparent,

		InvisibleTitleBarHeight: 50,

		TitleBar:   application.MacTitleBarHiddenInset,
		Appearance: application.NSAppearanceNameVibrantLight,

		WindowLevel: application.MacWindowLevelMainMenu,

		LiquidGlass: application.MacLiquidGlass{
			Style: application.LiquidGlassStyleAutomatic,
		},
	}
}

func WindowsWindow() application.WindowsWindow {
	return application.WindowsWindow{
		BackdropType: application.Auto,
	}
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
		Frameless: runtime.GOOS != "darwin", // 保留 Mac 的三个操作按钮

		// BackgroundType: 窗口所使用的背景类型
		// BackgroundTypeSolid: 实心背景（不透明，默认情况）
		// BackgroundTypeTransparent:透明背景（完全透明，可以看到后面的内容）
		// BackgroundTypeTranslucent: 半透明背景（磨砂玻璃效果或部分透明）
		BackgroundType: application.BackgroundTypeTransparent,
		//
		BackgroundColour: application.NewRGBA(1.0, 1.0, 1.0, 0.0),
		URL:              "/",

		// 如果为true，则将可用窗口的DevTool（默认为builds中，而无需“生产”构建标签）
		DevToolsEnabled: false,

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
			requestedFile := strings.TrimPrefix(req.URL.Path, pkg_core.Ternary[string](runtime.GOOS == "windows", DiskFilePrefix+"/", DiskFilePrefix))
			log.Printf("Requesting requestedFile=%s", requestedFile)
			http.ServeFile(res, req, requestedFile)
		} else {
			next.ServeHTTP(res, req)
		}
	})
}

func OnStartBefore(clientBuild model.ClientBuildModel) {
	log.Printf("OnStartBefore")

	exampleWails, version, err := assets.AssetsBinaryExampleWails()
	if err == nil && exampleWails != nil {
		pkg_core.CopyBinAddPath("example-wails", version, exampleWails, clientBuild)
	} else {
		log.Printf("Failed to load example-wails binary: %s", err)
	}
}

func OnStart(clientBuild model.ClientBuildModel) {
	log.Printf("OnStart %s", clientBuild.Name)
}

func OnShutdown() {
	log.Printf("OnShutdown")
}

func ShouldQuit() bool {
	log.Printf("ShouldQuit")
	return true
}

func PanicHandler(clientBuild model.ClientBuildModel, err *application.PanicDetails) {
	log.Printf("PanicHandler", err)
}

func WarningHandler(clientBuild model.ClientBuildModel, text string) {
	log.Printf("WarningHandler %s", text)
}

func ErrorHandler(clientBuild model.ClientBuildModel, err error) {
	log.Printf("ErrorHandler  %s \n%+v", err.Error(), err)
}

func RawMessageHandler(clientBuild model.ClientBuildModel, window application.Window, message string) {
	log.Printf("Window [%s] Raw message: \n %s", window.Name(), message)
}

func OnApplicationEvent(event *application.ApplicationEvent) {
	eventType := events.DefaultWindowEventMapping()[events.WindowEventType(event.Id)]
	log.Printf("OnApplicationEvent event.Id=%d JSEvent=%s eventType=%d", event.Id, events.JSEvent(event.Id), eventType)
}
