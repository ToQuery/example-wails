//go:build linux && arm64
// +build linux,arm64

package assets

import (
	"embed"
)

//go:embed all:binary/example-wails/version
//go:embed all:binary/example-wails/linux_arm64
var goAssetsBinary embed.FS

func AssetsBinary() embed.FS {
	return goAssetsBinary
}
