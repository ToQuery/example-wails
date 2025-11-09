package pkg_http_api

type ClientLaunchReq struct {
	Version             string `json:"version" form:"version"`                         // 客户端版本号
	VersionCode         int    `json:"versionCode" form:"versionCode"`                 // 客户端版本号数值
	HostName            string `json:"hostName" form:"hostName"`                       // 客户端名称
	OS                  string `json:"os" form:"os"`                                   // 操作系统（如 ios, android）
	OSVersion           string `json:"osVersion" form:"osVersion"`                     // 操作系统版本（如 14.4, 11）
	ARCH                string `json:"arch" form:"arch"`                               // 系统架构（如 amd64, arm64）
	DeviceCode          string `json:"deviceCode" form:"deviceCode"`                   // 设备唯一标识
	DeviceProtectedCode string `json:"deviceProtectedCode" form:"deviceProtectedCode"` // 设备唯一标识
}
