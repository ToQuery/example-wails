package main

import (
	"embed"
	_ "embed"
	"example-wails/cmd/wails3"
	"example-wails/internal/model"
	"example-wails/internal/pkg/pkg_example"
	"example-wails/internal/service"
	"log"
	"log/slog"
	"path/filepath"
	"strconv"
	"time"

	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"github.com/wailsapp/wails/v3/pkg/services/kvstore"
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
var frontAssets embed.FS

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

	wails3.OnStartBefore(appInfo)

	config := &kvstore.Config{
		Filename: filepath.Join(pkg_example.AppConfigHome(appInfo), appInfo.Name+".config"),
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
			//application.NewService(notifications.New()),
			application.NewService(kvstore.NewWithConfig(config)),
			application.NewService(service.NewExampleService(appInfo)),
		},
		Assets: application.AssetOptions{
			Handler:        application.BundledAssetFileServer(frontAssets),
			Middleware:     wails3.DiskFileMiddleware,
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

		OnShutdown: wails3.OnShutdown,

		ShouldQuit: wails3.ShouldQuit,

		PanicHandler: wails3.PanicHandler,

		WarningHandler: wails3.WarningHandler,

		ErrorHandler: wails3.ErrorHandler,

		RawMessageHandler: wails3.RawMessageHandler,
	})

	// Create a new window with the necessary options.
	// 'Title' is the title of the window.
	// 'Mac' options tailor the window when running on macOS.
	// 'BackgroundColour' is the background colour of the window.
	// 'URL' is the URL that will be loaded into the webview.
	app.Window.NewWithOptions(wails3.MainWindowOptions())
	//app.NewWebviewWindowWithOptions(wails3.SettingWindowOptions())

	for windowEventType, event := range events.DefaultWindowEventMapping() {
		log.Printf("app.OnApplicationEvent windowEventType=%d event=%d windowEvent=%s JSEvent=%s", windowEventType, event, events.JSEvent(uint(windowEventType)), events.JSEvent(uint(event)))
		app.Event.OnApplicationEvent(events.ApplicationEventType(windowEventType), wails3.OnApplicationEvent)
	}

	// Create a goroutine that emits an event containing the current time every second.
	// The frontend can listen to this event and update the UI accordingly.
	go func() {
		for {
			now := time.Now().Format(time.RFC1123)
			app.Event.Emit(wails3.AppDatetime, now)
			time.Sleep(time.Second)
		}
	}()

	wails3.OnStart(appInfo)

	// Run the application. This blocks until the application has been exited.
	err = app.Run()

	// If an error occurred while running the application, log it and exit.
	if err != nil {
		log.Fatal(err)
	}
}
