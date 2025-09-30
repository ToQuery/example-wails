package main

import (
	"embed"
	_ "embed"
	"example-wails/cmd/wails3"
	"example-wails/internal/model"
	"example-wails/internal/pkg/pkg_core"
	"example-wails/internal/service"
	"log"
	"log/slog"
	"path/filepath"
	"strconv"

	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/wailsapp/wails/v3/pkg/events"
	"github.com/wailsapp/wails/v3/pkg/services/kvstore"
)

var (
	Version     = "0.0.1"
	VersionCode = "1"
	BuildId     = "9f54fc3"
	BuildTime   = "2025-09-30 20:45:36"
)

// Wails uses Go's `embed` package to embed the frontend files into the binary.
// Any files in the frontend/dist folder will be embedded into the binary and
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

	clientBuild := model.ClientBuildModel{
		Name:        "example-wails",
		Version:     Version,
		VersionCode: versionCodeNum,
		BuildId:     BuildId,
		BuildTime:   BuildTime,
	}

	wails3.OnStartBefore(clientBuild)

	config := &kvstore.Config{
		Filename: filepath.Join(pkg_core.ClientConfigHome(clientBuild), clientBuild.Name+".config"),
		AutoSave: true,
	}

	// Create a new Wails application by providing the necessary options.
	// Variables 'Name' and 'Description' are for application metadata.
	// 'Assets' configures the asset server with the 'FS' variable pointing to the frontend files.
	// 'Bind' is a list of Go struct instances. The frontend has access to the methods of these instances.
	// 'Mac' options tailor the application when running an macOS.
	app := application.New(application.Options{
		Name:        clientBuild.Name,
		Description: clientBuild.Description,

		LogLevel: slog.LevelDebug,

		Services: []application.Service{
			//application.NewService(notifications.New()),
			application.NewService(kvstore.NewWithConfig(config)),
			application.NewService(service.NewClientService(clientBuild)),
			application.NewService(service.NewExampleService(clientBuild)),
		},
		Assets: application.AssetOptions{
			Handler:        application.BundledAssetFileServer(frontAssets),
			Middleware:     wails3.DiskFileMiddleware,
			DisableLogging: false,
		},

		// Mac platform specific options
		Mac: application.MacOptions{
			// ActivationPolicy: 应用程序的激活策略
			// ActivationPolicyRegular: 表示常规的应用程序，会在 Dock 中显示图标、可以有主窗口，典型的 GUI 应用就是这种。
			// ActivationPolicyAccessory: 表示“附件”应用，不会在 Dock 中显示图标，也不会成为前台 app，一般用在菜单栏小图标、后台守护进程等。
			// ActivationPolicyProhibited: 禁止激活，既不在 Dock 里显示，也不响应前台切换，常见于完全后台运行的进程。
			ActivationPolicy: application.ActivationPolicyRegular,

			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},

		// Windows platform specific options
		Windows: application.WindowsOptions{},

		// Linux platform specific options
		Linux: application.LinuxOptions{
			DisableQuitOnLastWindowClosed: false,
		},

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
	//go func() {
	//	for {
	//		now := time.Now().Format(time.RFC1123)
	//		app.Event.Emit(wails3.ClientDatetime, now)
	//		time.Sleep(time.Second)
	//	}
	//}()

	wails3.OnStart(clientBuild)

	// Run the application. This blocks until the application has been exited.
	err = app.Run()

	// If an error occurred while running the application, log it and exit.
	if err != nil {
		log.Fatal(err)
	}
}
