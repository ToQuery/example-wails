package model

type ClientLaunchModel struct {
	Config         *map[string]interface{}    `json:"config" form:"config"`                 // 配置信息
	VersionLastest *ClientVersionLastestModel `json:"versionLastest" form:"versionLastest"` // 更新信息
}
