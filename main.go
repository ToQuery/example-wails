package main

import (
	"embed"
	_ "embed"
	"example-wails/cmd/wails"
	"example-wails/internal/model"
	"example-wails/internal/service"
	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"github.com/wailsapp/wails/v3/pkg/services/kvstore"
	"log"
	"log/slog"
	"runtime"
	"strconv"
	"time"
)

var (
	Version     = "dev"
	VersionCode = "0"
	BuildId     = "0x0001"
	BuildTime   = "unknown"
)

// Wails uses Go's `embed` package to embed the frontend files into the bin.
// Any files in the frontend/dist folder will be embedded into the bin and
// made available to the frontend.
// See https://pkg.go.dev/embed for more information.

//go:embed all:frontend/dist
var assets embed.FS

// main function serves as the application's entry point. It initializes the application, creates a window,
// and starts a goroutine that emits a time-based event every second. It subsequently runs the application and
// logs any error that might occur.
func main() {

	versionCodeNum, err := strconv.Atoi(VersionCode)
	if err != nil {
		versionCodeNum = 0
	}

	appInfo := model.AppInfoModel{
		Name:        "example-wails",
		Version:     Version,
		VersionCode: versionCodeNum,
		BuildId:     BuildId,
		BuildTime:   BuildTime,
	}

	wails.OnStartBefore(appInfo)

	config := &kvstore.Config{
		Filename: appInfo.Name + ".db",
		AutoSave: true,
	}

	// Create a new Wails application by providing the necessary options.
	// Variables 'Name' and 'Description' are for application metadata.
	// 'Assets' configures the asset server with the 'FS' variable pointing to the frontend files.
	// 'Bind' is a list of Go struct instances. The frontend has access to the methods of these instances.
	// 'Mac' options tailor the application when running an macOS.
	app := application.New(application.Options{
		Name:        appInfo.Name,
		Description: appInfo.Description,

		LogLevel: slog.LevelDebug,

		Services: []application.Service{
			application.NewService(kvstore.New(config)),
			application.NewService(service.NewExampleService(appInfo)),
		},
		Assets: application.AssetOptions{
			Handler:        application.BundledAssetFileServer(assets),
			Middleware:     wails.DiskFileMiddleware,
			DisableLogging: false,
		},

		// Mac platform specific options
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},

		// Windows platform specific options
		Windows: application.WindowsOptions{},

		// Linux platform specific options
		Linux: application.LinuxOptions{},

		OnShutdown: wails.OnShutdown,

		ShouldQuit: wails.ShouldQuit,

		PanicHandler: wails.PanicHandler,

		WarningHandler: wails.WarningHandler,

		ErrorHandler: wails.ErrorHandler,

		RawMessageHandler: wails.RawMessageHandler,
	})

	// Create a new window with the necessary options.
	// 'Title' is the title of the window.
	// 'Mac' options tailor the window when running on macOS.
	// 'BackgroundColour' is the background colour of the window.
	// 'URL' is the URL that will be loaded into the webview.
	app.NewWebviewWindowWithOptions(application.WebviewWindowOptions{
		Name:      "main",
		Title:     "Window 1",
		Width:     1024,
		Height:    768,
		MinWidth:  1024,
		MinHeight: 768,
		//Menu:   AppMenu, // reference the menu above
		// MaxWidth:          1280,
		// MaxHeight:         800,
		DisableResize:    false,
		Frameless:        runtime.GOOS != "darwin", // 保留 Mac 的三个操作按钮
		BackgroundColour: application.NewRGB(27, 38, 54),
		URL:              "/",

		Mac: wails.MacWindow(),

		Windows: application.WindowsWindow{},

		Linux: application.LinuxWindow{},
	})

	for windowEventType, event := range events.DefaultWindowEventMapping() {
		log.Printf("app.OnApplicationEvent windowEventType=%d event=%d windowEvent=%s JSEvent=%s", windowEventType, event, events.JSEvent(uint(windowEventType)), events.JSEvent(uint(event)))
		app.OnApplicationEvent(events.ApplicationEventType(windowEventType), wails.OnApplicationEvent)
	}

	// Create a goroutine that emits an event containing the current time every second.
	// The frontend can listen to this event and update the UI accordingly.
	go func() {
		for {
			now := time.Now().Format(time.RFC1123)
			app.EmitEvent(wails.AppDatetime, now)
			time.Sleep(time.Second)
		}
	}()

	wails.OnStart(appInfo)

	// Run the application. This blocks until the application has been exited.
	err = app.Run()

	// If an error occurred while running the application, log it and exit.
	if err != nil {
		log.Fatal(err)
	}
}
