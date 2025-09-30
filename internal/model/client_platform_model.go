package model

type ClientPlatformModel struct {
	OSName string `json:"osName" form:"osName"`
	OSArch string `json:"osArch" form:"osArch"`
}
