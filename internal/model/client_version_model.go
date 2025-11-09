package model

type ClientVersionLastestModel struct {
	Version     string `json:"version" form:"version"`
	VersionCode int    `json:"versionCode" form:"versionCode"`
	ForceUpdate bool   `json:"forceUpdate" form:"forceUpdate"`
	Changelog   string `json:"changelog" form:"changelog"`
	DownloadUrl string `json:"downloadUrl" form:"downloadUrl"`
}
