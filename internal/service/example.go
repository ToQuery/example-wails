package service

import (
	"fmt"
	"github.com/wailsapp/wails/v3/pkg/application"
	"log"
	"os"
)

type ExampleService struct{}

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
		Filters: []application.FileFilter{
			{
				DisplayName: "Text Files (*.txt)",
				Pattern:     "*.txt",
			},
		},
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

func (s ExampleService) ShowAboutDialog(url string) {
	application.Get().ShowAboutDialog()
}

func (s ExampleService) WebviewWindowShow(url string) {
	webWindows := application.Get().NewWebviewWindowWithOptions(application.WebviewWindowOptions{
		URL: url,
	})
	webWindows.Show()
}
