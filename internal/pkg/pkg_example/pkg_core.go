package pkg_example

import (
	"example-wails/internal/model"
	"math/rand"
	"time"
)

func BuildAppVersionLastest(forceUpdate bool) model.AppVersionLastestModel {
	return model.AppVersionLastestModel{
		Version:     "1.1.0",
		VersionCode: 2,
		ForceUpdate: forceUpdate,
		Changelog:   "1. 修复了一些已知问题\n2. 优化了应用性能\n3. 新增了一些功能",
		DownloadUrl: "https://github.com/toquery/example-wails",
	}
}

func BuildAppLaunch() model.AppLaunchModel {

	// 50% 概率执行模拟更新
	var versionLastest *model.AppVersionLastestModel
	if rand.New(rand.NewSource(time.Now().UnixNano())).Intn(2) == 0 {
		update := BuildAppVersionLastest(false)
		versionLastest = &update
	}

	return model.AppLaunchModel{
		Config: &map[string]interface{}{
			"now": time.Now().Format("2006-01-02 15:04:05"),
		},
		VersionLastest: versionLastest,
	}
}
