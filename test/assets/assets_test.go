package assets

import (
	"example-wails/assets"
	"io/fs"
	"log"
	"testing"
)

func PrintAssetFiles(assets fs.FS) {
	err := fs.WalkDir(assets, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		log.Println(path)
		return nil
	})
	if err != nil {
		panic(err)
	}
}

func TestAssets(t *testing.T) {
	assetsFiles := assets.Assets()
	PrintAssetFiles(assetsFiles)
}

func TestAssetsBinary(t *testing.T) {
	assetsBinary := assets.AssetsBinary()
	PrintAssetFiles(assetsBinary)
}
