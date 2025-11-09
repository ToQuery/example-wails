package model

type ClientBuildModel struct {
	Name        string `json:"name" form:"name"`
	CnName      string `json:"cnName" form:"cnName"`
	Description string `json:"description" form:"description"`
	Version     string `json:"version" form:"version"`
	VersionCode int    `json:"versionCode" form:"versionCode"`
	BuildId     string `json:"buildId" form:"buildId"`
	BuildAt     string `json:"buildAt" form:"buildAt"`
}
