package service

import (
	"example-wails/cmd/wails"
	"example-wails/internal/model"
	"fmt"
	"github.com/wailsapp/wails/v3/pkg/application"
	"io"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"runtime"
)

type ExampleService struct {
	AppInfo model.AppInfoModel
	Assets  fs.FS
}

func NewExampleService(appInfo model.AppInfoModel, assets fs.FS) *ExampleService {
	return &ExampleService{AppInfo: appInfo, Assets: assets}
}

/*------App Start-----------------------------------------------------------------------------------------------------*/

func (s *ExampleService) GetAppInfo() model.AppInfoModel {
	return s.AppInfo
}

func (s *ExampleService) AppUpdate(newVersion, force bool) *model.UpdateInfoModel {
	if newVersion {
		return &model.UpdateInfoModel{
			Version:     "1.1.0",
			VersionCode: 2,
			ForceUpdate: force,
			Changelog:   "1. 修复了一些已知问题\n2. 优化了应用性能\n3. 新增了一些功能",
			DownloadUrl: "https://github.com/wailsapp/wails/releases/download/v1.16.0/wails-v1.16.0-darwin-x64.tar.gz",
		}
	}
	return nil
}

func (s *ExampleService) AppUpdateFromEvent(newVersion, force bool) {
	updateInfo := s.AppUpdate(newVersion, force)
	application.Get().EmitEvent(wails.AppUpdate, updateInfo)
}

func (s *ExampleService) AppCheckUpdate() *model.UpdateInfoModel {
	updateInfo := &model.UpdateInfoModel{
		Version:     "1.1.0",
		VersionCode: 2,
		ForceUpdate: false,
		Changelog:   "1. 修复了一些已知问题\n2. 优化了应用性能\n3. 新增了一些功能",
		DownloadUrl: "https://github.com/wailsapp/wails/releases/download/v1.16.0/wails-v1.16.0-darwin-x64.tar.gz",
	}
	if updateInfo.VersionCode > s.AppInfo.VersionCode {
		return updateInfo
	}
	return nil
}

func (s ExampleService) AppEmbedExecBinary() {
}

func (s ExampleService) AppEmbedFile() {
	file, err := s.Assets.Open("assets/README.md")
	if err != nil {
		log.Printf("打开文件失败: %v\n", err)
		return
	}

	content, err := io.ReadAll(file)
	if err != nil {
		log.Printf("读取文件内容失败: %v\n", err)
		return
	}
	log.Printf("文件内容: %s\n", string(content))

	dialog := application.InfoDialog()
	dialog.SetTitle("Get File From Embed Assets")
	dialog.SetMessage(string(content))
	dialog.Show()

}

func (s ExampleService) AppOpenApplication(application string) {
	// 根据不同操作系统打开应用程序
	var cmd *exec.Cmd

	switch runtime.GOOS {
	case "darwin": // macOS
		cmd = exec.Command("open", "-a", application)
	case "windows": // Windows
		cmd = exec.Command("cmd", "/c", "start", "", application)
	case "linux": // Linux
		cmd = exec.Command("xdg-open", application)
	default:
		log.Printf("不支持的操作系统: %s\n", runtime.GOOS)
		return
	}

	// 执行命令
	err := cmd.Start()
	if err != nil {
		log.Printf("打开应用程序 %s 失败: %v\n", application, err)
	}
}

func (s ExampleService) AppOpenBrowser(url string) {
	// 使用Wails提供的runtime.BrowseURL函数打开浏览器
	application.Get()
}

/*------App End-------------------------------------------------------------------------------------------------------*/

func (s *ExampleService) ClipboardGet() string {
	text, flag := application.Get().Clipboard().Text()
	if !flag {
		dialog := application.ErrorDialog()
		dialog.SetTitle("Error")
		dialog.SetMessage("Failed to get Clipboard")
		dialog.Show()
	}
	return text
}

func (s *ExampleService) ClipboardSet(text string) {
	application.Get().Clipboard().SetText(text)
}

/*------Dialog Start--------------------------------------------------------------------------------------------------*/

func (s *ExampleService) InfoDialog() {
	dialog := application.InfoDialog()
	dialog.SetTitle("Hello")
	dialog.SetMessage("Hello Wails！")
	dialog.Show()
}

func (s *ExampleService) QuestionDialog() {
	dialog := application.QuestionDialog()
	dialog.SetTitle("Save Changes")
	dialog.SetMessage("Do you want to save your changes?")
	dialog.AddButton("Save").OnClick(func() {
		// Handle save
	})
	saveButton := dialog.AddButton("Don't Save").OnClick(func() {
		// Handle save
	})
	dialog.SetDefaultButton(saveButton)
	dialog.Show()
}
func (s *ExampleService) ErrorDialog() {
	dialog := application.ErrorDialog()
	dialog.SetTitle("Error")
	dialog.SetMessage("Failed to save file")
	dialog.Show()
}

func (s ExampleService) FileDialog() {
	//application.OpenFileDialogWithOptions()
	dialog := application.OpenFileDialog()
	dialog.SetOptions(&application.OpenFileDialogOptions{
		Filters: []application.FileFilter{
			{
				DisplayName: "Images (*.png;*.jpg)",
				Pattern:     "*.png;*.jpg",
			},
		},
	})
	dialog.SetTitle("Select Image")

	path, err := dialog.PromptForSingleSelection()
	// Single file selection
	if err != nil {
		log.Panic(err)
	}
	// Use selected file path
	log.Println(path)

	// Multiple file selection
	paths, err := dialog.PromptForMultipleSelection()
	if err == nil {
		log.Panic(err)
	}
	// Use selected file paths
	log.Println(paths)
}

func (s *ExampleService) SaveFileDialog() {
	//application.SaveFileDialogWithOptions()
	dialog := application.SaveFileDialog()
	dialog.SetOptions(&application.SaveFileDialogOptions{
		Title: "Save File",
	})

	dialog.SetMessage("Save Document")
	dialog.SetFilename("document.txt")

	path, err := dialog.PromptForSingleSelection()
	if err != nil {
		log.Panic(err)
	}

	// Save file to selected path
	log.Println(path)

	// 将内容写入文件
	err = os.WriteFile(path, []byte("123456789"), 0644)
	if err != nil {
		fmt.Println("写入文件失败:", err)
		return
	}

	fmt.Println("写入成功，文件路径为:", path)
}

func (s ExampleService) ShowAboutDialog() {
	application.Get().ShowAboutDialog()
}

func (s ExampleService) ShowHelpDialog() {
	application.Get()
}

/*------Dialog End----------------------------------------------------------------------------------------------------*/

/*------Multi Windows Start-------------------------------------------------------------------------------------------*/

func (s ExampleService) WebviewWindowShow(windowName string, url string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows == nil {
		webWindows = application.Get().NewWebviewWindowWithOptions(application.WebviewWindowOptions{
			Name:      "window1",
			Frameless: false,
			URL:       url,
			Mac:       wails.MacWindow(),
		})
	}
	webWindows.Show()

}

func (s ExampleService) WebviewWindowHide(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.Hide()
	}
}

func (s ExampleService) WebviewWindowCenter(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.Center()
	}
}

func (s ExampleService) WebviewWindowToggleFullscreen(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.ToggleFullscreen()
	}
}

func (s ExampleService) WebviewWindowFocus(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.Focus()
	}
}

func (s ExampleService) WebviewWindowReload(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.Reload()
	}
}

func (s ExampleService) WebviewWindowForceReload(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.ForceReload()
	}
}

// close 之后必须 new
func (s ExampleService) WebviewWindowClose(windowName string) {
	webWindows := application.Get().GetWindowByName(windowName)
	if webWindows != nil {
		webWindows.Close()
	}
}

func (s ExampleService) WebviewWindowSetAlwaysOnTop(windowName string, alwaysOnTop bool) {
	if window := application.Get().GetWindowByName(windowName); window != nil {
		window.SetAlwaysOnTop(alwaysOnTop)
	}
}

func (s ExampleService) WebviewWindowMinimize(windowName string) {
	if window := application.Get().GetWindowByName(windowName); window != nil {
		window.Minimise()
	}
}

func (s ExampleService) WebviewWindowMaximize(windowName string) {
	if window := application.Get().GetWindowByName(windowName); window != nil {
		if window.IsMaximised() {
			window.UnMaximise()
		} else {
			window.Maximise()
		}
	}
}

/*------Multi Windows End---------------------------------------------------------------------------------------------*/

/*------Other Start---------------------------------------------------------------------------------------------------*/

/*------Other End-----------------------------------------------------------------------------------------------------*/
