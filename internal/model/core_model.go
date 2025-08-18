package model

type BaseExchange[T any] struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Data    T      `json:"data"`
}

func BaseExchangeFail[T any](message string) BaseExchange[T] {
	return BaseExchange[T]{
		Message: message,
		Success: false,
	}
}

func BaseExchangeFailData[T any](message string, data T) BaseExchange[T] {
	return BaseExchange[T]{
		Message: message,
		Success: false,
		Data:    data,
	}
}

func BaseExchangeSuccess[T any](data T) BaseExchange[T] {
	return BaseExchange[T]{
		Message: "success",
		Success: true,
		Data:    data,
	}
}

type WailsUpdateModel struct {
	Version     string
	VersionCode int
	ForceUpdate bool
	Changelog   string
	DownloadUrl string
}

type WailsAppInfoModel struct {
	Name        string `json:"name" form:"name"`
	CnName      string `json:"cnName" form:"cnName"`
	Description string `json:"description" form:"description"`
	Version     string `json:"version" form:"version"`
	VersionCode int    `json:"versionCode" form:"versionCode"`
	BuildId     string `json:"buildId" form:"buildId"`
	BuildTime   string `json:"buildTime" form:"buildTime"`
}

type LaunchReqModel struct {
	Version             string `json:"version" form:"version"`         // 客户端版本号
	VersionCode         int    `json:"versionCode" form:"versionCode"` // 客户端版本号数值
	HostName            string `json:"hostName" form:"hostName"`
	OS                  string `json:"os" form:"os"`                                   // 操作系统（如 ios, android）
	OSVersion           string `json:"osVersion" form:"osVersion"`                     // 操作系统版本（如 14.4, 11）
	ARCH                string `json:"arch" form:"arch"`                               // 系统架构（如 amd64, arm64）
	DeviceCode          string `json:"deviceCode" form:"deviceCode"`                   // 设备唯一标识
	DeviceProtectedCode string `json:"deviceProtectedCode" form:"deviceProtectedCode"` // 设备唯一标识
}

type LaunchResModel struct {
	NetWorkErr bool
	Config     *map[string]interface{} `json:"config" form:"config"` // 配置信息
	Update     *WailsUpdateModel       `json:"update" form:"update"` // 更新信息
}
