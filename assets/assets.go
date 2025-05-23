package assets

import (
	"embed"
	"io/fs"
	"log"
	"path"
	"runtime"
)

//go:embed all:README.md
//go:embed all:public
var goAssets embed.FS

func Assets() embed.FS {
	return goAssets
}

func AssetsBinaryExampleWails() (fs.File, error) {
	return AssetsBinaryFile("example-wails", "example-wails")
}

func AssetsBinaryFile(binDir, binName string) (fs.File, error) {
	// 嵌入式文件系统 fs.FS 需要使用正斜杠 / 作为路径分隔符，无论操作系统是什么。
	binPath := path.Join("binary", binDir, runtime.GOOS+"_"+runtime.GOARCH, binName)
	log.Printf("binPath %s", binPath)

	binFile, err := goAssetsBinary.Open(binPath)

	if err != nil {
		log.Printf("Failed to open embedded bin file:%s", err.Error())
		return nil, err
	}
	return binFile, nil
}
