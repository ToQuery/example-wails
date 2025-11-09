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
