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

func BaseExchangeSuccessMessage[T any](data T, message string) BaseExchange[T] {
	return BaseExchange[T]{
		Message: message,
		Success: true,
		Data:    data,
	}
}

type AppVersionLastestModel struct {
	Version     string `json:"version" form:"version"`
	VersionCode int    `json:"versionCode" form:"versionCode"`
	ForceUpdate bool   `json:"forceUpdate" form:"forceUpdate"`
	Changelog   string `json:"changelog" form:"changelog"`
	DownloadUrl string `json:"downloadUrl" form:"downloadUrl"`
}

type AppInfoModel struct {
	Name        string `json:"name" form:"name"`
	CnName      string `json:"cnName" form:"cnName"`
	Description string `json:"description" form:"description"`
	Version     string `json:"version" form:"version"`
	VersionCode int    `json:"versionCode" form:"versionCode"`
	BuildId     string `json:"buildId" form:"buildId"`
	BuildTime   string `json:"buildTime" form:"buildTime"`
}

type AppLaunchModel struct {
	Config         *map[string]interface{} `json:"config" form:"config"`                 // 配置信息
	VersionLastest *AppVersionLastestModel `json:"versionLastest" form:"versionLastest"` // 更新信息
}
