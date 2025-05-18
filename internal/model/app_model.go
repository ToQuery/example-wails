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
	// Add your properties here
	Version     string
	VersionCode int
	BuildId     string
	BuildTime   string
}
