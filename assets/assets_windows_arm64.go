//go:build windows && arm64
// +build windows,arm64

package assets

import (
	"embed"
)

//go:embed all:binary/example-wails/windows_arm64
var goAssetsBinary embed.FS

func AssetsBinary() embed.FS {
	return goAssetsBinary
}
