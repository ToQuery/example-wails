package pkg_http_api

import (
	"encoding/json"

	"example-wails/internal/model"
	"example-wails/internal/pkg/pkg_http"

	"log"
	"time"
)

var httpClient = pkg_http.NewHttpClient(10 * time.Second)

func HttpBinUUID(appInfo model.AppInfoModel) (*model.HttpBinUUID, error) {
	// 请求地址
	urlPath := "https://httpbin.org/uuid"

	body, err := httpClient.Get(urlPath, appInfo)
	if err != nil {
		return nil, err
	}

	// 解析 JSON
	var httpBinUUID model.HttpBinUUID
	err = json.Unmarshal(body, &httpBinUUID)
	if err != nil {
		log.Printf("解析 JSON 失败 [%s]: \n %+v", urlPath, err)
		return nil, err
	}

	return &httpBinUUID, nil
}
