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
	// Add your properties here
	Version     string
	VersionCode int
	ForceUpdate bool
	Changelog   string
	DownloadUrl string
}

type WailsAppInfoModel struct {
	Name        string
	CnName      string
	Description string
	Version     string
	VersionCode int
	BuildId     string
	BuildTime   string
}
