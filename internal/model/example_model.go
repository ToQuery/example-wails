package model

type UpdateInfoModel struct {
	// Add your properties here
	Version     string
	VersionCode int
	ForceUpdate bool
	Changelog   string
	DownloadUrl string
}

type AppInfoModel struct {
	Name        string
	CnName      string
	Description string
	Version     string
	VersionCode int
	BuildId     string
	BuildTime   string
}

type DirInfoModel struct {
	OSTempDir       string
	OSUserCacheDir  string
	OSUserConfigDir string
	OSUserHomeDir   string
	// XDG 目录规范相关字段
	XDGHome            string
	XDGDataHome        string
	XDGDataDirs        []string
	XDGConfigHome      string
	XDGConfigDirs      []string
	XDGStateHome       string
	XDGCacheHome       string
	XDGRuntimeDir      string
	XDGBinHome         string
	XDGUserDirs        map[string]string
	XDGFontDirs        []string
	XDGApplicationDirs []string
	XDGUserDirectories map[string]string
}
