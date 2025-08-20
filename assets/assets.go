package assets

import (
	"embed"
	"example-wails/internal/pkg/pkg_core"
	"io"
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

func AssetsBinaryExampleWails() (fs.File, string, error) {
	binFile, err := AssetsBinaryFile("example-wails", "example-wails")
	if err != nil {
		return nil, "", err
	}
	// binary/example-wails/version
	binVersion, err := AssetsBinaryVersion("example-wails")
	if err != nil {
		return nil, "", err
	}
	return binFile, binVersion, nil
}

func AssetsBinaryVersion(binDir string) (string, error) {
	// 嵌入式文件系统 fs.FS 需要使用正斜杠 / 作为路径分隔符，无论操作系统是什么。
	versionPath := path.Join("binary", binDir, "version")
	log.Printf("versionPath %s", versionPath)

	versionFile, err := goAssetsBinary.Open(versionPath)
	if err != nil {
		log.Printf("Failed to open embedded bin file:%s", err.Error())
		return "", err
	}

	versionContent, err := io.ReadAll(versionFile)
	if err != nil {
		log.Printf("读取文件内容失败: %v\n", err)
		return "", err
	}
	return string(versionContent), nil
}

func AssetsBinaryFile(binDir, binName string) (fs.File, error) {
	binFileName := pkg_core.GetBinFileName(binName)
	// 嵌入式文件系统 fs.FS 需要使用正斜杠 / 作为路径分隔符，无论操作系统是什么。
	binPath := path.Join("binary", binDir, runtime.GOOS+"_"+runtime.GOARCH, binFileName)
	log.Printf("binPath %s", binPath)

	binFile, err := goAssetsBinary.Open(binPath)

	if err != nil {
		log.Printf("Failed to open embedded bin file:%s", err.Error())
		return nil, err
	}
	return binFile, nil
}
