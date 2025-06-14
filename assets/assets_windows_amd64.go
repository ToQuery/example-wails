//go:build windows && amd64
// +build windows,amd64

package assets

import (
	"embed"
)

//go:embed all:binary/example-wails/version
//go:embed all:binary/example-wails/windows_amd64
var goAssetsBinary embed.FS

func AssetsBinary() embed.FS {
	return goAssetsBinary
}
