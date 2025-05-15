package service

import "github.com/wailsapp/wails/v3/pkg/application"

type CoreService struct{}

func (s *CoreService) SetAlwaysOnTop(alwaysOnTop bool) {
	if window := application.Get().GetWindowByName("main"); window != nil {
		window.SetAlwaysOnTop(alwaysOnTop)
	}
}

func (s *CoreService) Minimize() {
	if window := application.Get().GetWindowByName("main"); window != nil {
		window.Minimise()
	}
}

func (s *CoreService) Close() {
	if window := application.Get().GetWindowByName("main"); window != nil {
		window.Close()
	}
}

func (s *CoreService) Maximize() {
	if window := application.Get().GetWindowByName("main"); window != nil {
		if window.IsMaximised() {
			window.UnMaximise()
		} else {
			window.Maximise()
		}
	}
}
