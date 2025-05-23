//go:build darwin && arm64
// +build darwin,arm64

package assets

import "embed"

//go:embed all:binary/example-wails/darwin_arm64
var goAssetsBinary embed.FS

func AssetsBinary() embed.FS {
	return goAssetsBinary
}
