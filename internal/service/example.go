package service

import (
	"example-wails/cmd/wails"
	"example-wails/internal/model"
	"example-wails/internal/pkg"
	"io"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"runtime"

	"github.com/adrg/xdg"

	"github.com/wailsapp/wails/v3/pkg/application"
)

type ExampleService struct {
	AppInfo model.AppInfoModel
	Assets  fs.FS
}

func NewExampleService(appInfo model.AppInfoModel, assets fs.FS) *ExampleService {
	return &ExampleService{AppInfo: appInfo, Assets: assets}
}

/*------File Start----------------------------------------------------------------------------------------------------*/

func (s *ExampleService) GetDirInfo() model.DirInfoModel {
	userCacheDir, err := os.UserCacheDir()
	if err != nil {
		log.Printf("获取用户缓存目录失败: %v", err)
	}
	userConfigDir, err := os.UserConfigDir()
	if err != nil {
		log.Printf("获取用户配置目录失败: %v", err)
	}
	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		log.Printf("获取用户主目录失败: %v", err)
	}

	return model.DirInfoModel{
		OSTempDir:       os.TempDir(),
		OSUserCacheDir:  userCacheDir,
		OSUserConfigDir: userConfigDir,
		OSUserHomeDir:   userHomeDir,
		// XDG 目录规范相关字段
		XDGHome:       xdg.Home,
		XDGDataHome:   xdg.DataHome,
		XDGDataDirs:   xdg.DataDirs,
		XDGConfigHome: xdg.ConfigHome,
		XDGConfigDirs: xdg.ConfigDirs,
		XDGStateHome:  xdg.StateHome,
		XDGCacheHome:  xdg.CacheHome,
		XDGRuntimeDir: xdg.RuntimeDir,
		XDGBinHome:    xdg.BinHome,
		XDGUserDirs: map[string]string{
			"desktop":     xdg.UserDirs.Desktop,
			"download":    xdg.UserDirs.Download,
			"documents":   xdg.UserDirs.Documents,
			"music":       xdg.UserDirs.Music,
			"pictures":    xdg.UserDirs.Pictures,
			"videos":      xdg.UserDirs.Videos,
			"templates":   xdg.UserDirs.Templates,
			"publicShare": xdg.UserDirs.PublicShare,
		},
		XDGFontDirs:        xdg.FontDirs,
		XDGApplicationDirs: xdg.ApplicationDirs,
		XDGUserDirectories: map[string]string{
			"desktop":     xdg.UserDirs.Desktop,
			"download":    xdg.UserDirs.Download,
			"documents":   xdg.UserDirs.Documents,
			"music":       xdg.UserDirs.Music,
			"pictures":    xdg.UserDirs.Pictures,
			"videos":      xdg.UserDirs.Videos,
			"templates":   xdg.UserDirs.Templates,
			"publicShare": xdg.UserDirs.PublicShare,
		},
	}
}

/*------File End------------------------------------------------------------------------------------------------------*/

func (s *ExampleService) GetAppDirInfo() model.DirInfoModel {
	userCacheDir, err := os.UserCacheDir()
	if err != nil {
		log.Printf("获取用户缓存目录失败: %v", err)
	}
	userConfigDir, err := os.UserConfigDir()
	if err != nil {
		log.Printf("获取用户配置目录失败: %v", err)
	}
	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		log.Printf("获取用户主目录失败: %v", err)
	}

	return model.DirInfoModel{
		OSTempDir:       os.TempDir(),
		OSUserCacheDir:  userCacheDir,
		OSUserConfigDir: userConfigDir,
		OSUserHomeDir:   userHomeDir,
		// XDG 目录规范相关字段
		XDGHome:       xdg.Home,
		XDGDataHome:   xdg.DataHome,
		XDGDataDirs:   xdg.DataDirs,
		XDGConfigHome: xdg.ConfigHome,
		XDGConfigDirs: xdg.ConfigDirs,
		XDGStateHome:  xdg.StateHome,
		XDGCacheHome:  xdg.CacheHome,
		XDGRuntimeDir: xdg.RuntimeDir,
		XDGBinHome:    xdg.BinHome,
		XDGUserDirs: map[string]string{
			"desktop":     xdg.UserDirs.Desktop,
			"download":    xdg.UserDirs.Download,
			"documents":   xdg.UserDirs.Documents,
			"music":       xdg.UserDirs.Music,
			"pictures":    xdg.UserDirs.Pictures,
			"videos":      xdg.UserDirs.Videos,
			"templates":   xdg.UserDirs.Templates,
			"publicShare": xdg.UserDirs.PublicShare,
		},
		XDGFontDirs:        xdg.FontDirs,
		XDGApplicationDirs: xdg.ApplicationDirs,
		XDGUserDirectories: map[string]string{
			"desktop":     xdg.UserDirs.Desktop,
			"download":    xdg.UserDirs.Download,
			"documents":   xdg.UserDirs.Documents,
			"music":       xdg.UserDirs.Music,
			"pictures":    xdg.UserDirs.Pictures,
			"videos":      xdg.UserDirs.Videos,
			"templates":   xdg.UserDirs.Templates,
			"publicShare": xdg.UserDirs.PublicShare,
		},
	}
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
			DownloadUrl: "https://github.com/toquery/example-wails",
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
		DownloadUrl: "https://github.com/toquery/example-wails",
	}
	if updateInfo.VersionCode > s.AppInfo.VersionCode {
		return updateInfo
	}
	return nil
}

func (s ExampleService) AppEmbedExecBinary() {
	// 执行二进制文件
	cmd := exec.Command(pkg.GetBinName("example-wails"))
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("执行二进制文件失败: %v, 输出: %s", err, output)
		return
	}

	log.Printf("二进制文件执行成功，输出: %s", output)

	dialog := application.InfoDialog()
	dialog.SetTitle("Exec Binary From Embed Assets")
	dialog.SetMessage(string(output))
	dialog.Show()
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
	dialog.CanChooseFiles(true)
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

func (s ExampleService) FileDialogImage() string {
	dialog := application.OpenFileDialogWithOptions(&application.OpenFileDialogOptions{
		Title:          "Select Image",
		CanChooseFiles: true,
		Filters: []application.FileFilter{
			{
				DisplayName: "Images (*.png;*.jpg)",
				Pattern:     "*.png;*.jpg",
			},
		},
	})

	path, err := dialog.PromptForSingleSelection()
	// Single file selection
	if err != nil {
		log.Panic(err)
	}
	// Use selected file path
	log.Println(path)

	return path
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
		log.Printf("写入文件失败: %s", path, err)
		return
	}

	log.Printf("写入成功，文件路径为: %s", path)
}

func (s ExampleService) ShowAboutDialog() {
	application.Get().ShowAboutDialog()
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

func (s ExampleService) WebviewWindowSetSize(windowName string, width, height int) {
	if window := application.Get().GetWindowByName(windowName); window != nil {
		window.SetSize(width, height)
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
			window.EnableSizeConstraints()
		}
	}
}

/*------Multi Windows End---------------------------------------------------------------------------------------------*/

/*------Other Start---------------------------------------------------------------------------------------------------*/

/*------Other End-----------------------------------------------------------------------------------------------------*/
