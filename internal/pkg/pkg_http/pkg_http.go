package pkg_http

import (
	"bytes"
	"encoding/json"
	"example-wails/internal/model"
	"io"
	"net/http"
	"runtime"
	"strconv"
	"time"
)

// HttpClient 是封装的 HTTP 客户端
type HttpClient struct {
	httpClient *http.Client
}

// NewHttpClient 创建一个新的 HttpClient 实例
func NewHttpClient(timeout time.Duration) *HttpClient {
	return &HttpClient{
		httpClient: &http.Client{
			Timeout: timeout,
		},
	}
}

// DefaultUserAgent 返回一个标准格式的 User-Agent
func (c *HttpClient) DefaultUserAgent(clientBuild model.ClientBuildModel) string {
	return clientBuild.Name + "/" + clientBuild.Version
}

func (c *HttpClient) SetHttpHeader(req *http.Request, clientBuild model.ClientBuildModel) {
	req.Header.Set("X-Version", clientBuild.Version)
	req.Header.Set("X-Version-Code", strconv.Itoa(clientBuild.VersionCode))
	req.Header.Set("X-Arch", runtime.GOARCH)
	req.Header.Set("X-OS", runtime.GOOS)
	req.Header.Set("User-Agent", c.DefaultUserAgent(clientBuild))
}

// Get 发送 GET 请求
func (c *HttpClient) Get(rawURL string, clientBuild model.ClientBuildModel) ([]byte, error) {
	req, err := http.NewRequest(http.MethodGet, rawURL, nil)
	if err != nil {
		return nil, err
	}
	c.SetHttpHeader(req, clientBuild)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	resBodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return resBodyBytes, nil
}

// PostJSON 发送 POST 请求，数据为 JSON
func (c *HttpClient) PostJSON(rawURL string, clientBuild model.ClientBuildModel, data interface{}) ([]byte, error) {

	var body io.Reader
	if data == nil {
		body = nil
	} else {
		bodyBytes, err := json.Marshal(data)
		if err != nil {
			return nil, err
		}
		body = bytes.NewBuffer(bodyBytes)
	}

	req, err := http.NewRequest(http.MethodPost, rawURL, body)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	c.SetHttpHeader(req, clientBuild)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	resBodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return resBodyBytes, nil
}
