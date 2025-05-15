package wails

import "log"

func OnShutdown() {
}

func ShouldQuit() bool {
	return true
}

func PanicHandler(err interface{}) {
	log.Fatal(err)
}

func WarningHandler(text string) {

}

func ErrorHandler(err error) {

}
