//go:build linux && amd64
// +build linux,amd64

package assets

import (
	"embed"
)

//go:embed all:binary/example-wails/version
//go:embed binary/example-wails/linux_amd64
var goAssetsBinary embed.FS

func AssetsBinary() embed.FS {
	return goAssetsBinary
}
