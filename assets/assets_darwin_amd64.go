//go:build darwin && amd64
// +build darwin,amd64

package assets

import (
	"embed"
)

//go:embed all:binary/example-wails/version
//go:embed all:binary/example-wails/darwin_amd64
var goAssetsBinary embed.FS

func AssetsBinary() embed.FS {
	return goAssetsBinary
}
