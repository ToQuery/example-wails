package service

import (
	"example-wails/internal/model"
	"log"

	"github.com/wailsapp/wails/v3/pkg/application"
)

type BizCoreService struct {
	AppInfo model.AppInfoModel
}

func NewBizCoreService(appInfo model.AppInfoModel) *BizCoreService {
	return &BizCoreService{AppInfo: appInfo}
}

func (s *BizCoreService) GetAppInfo() model.BaseExchange[model.AppInfoModel] {
	log.Printf("获取应用信息: %v", application.Get().Env.Info())
	return model.BaseExchangeSuccess[model.AppInfoModel](s.AppInfo)
}

func (s *BizCoreService) AppLaunch() model.BaseExchange[model.AppLaunchModel] {
	log.Printf("开始发送启动信息 !")

	return model.BaseExchangeSuccess[model.AppLaunchModel](model.AppLaunchModel{
		Config: nil,
		Update: nil,
	})
}

func (s *BizCoreService) AppCheckUpdate() model.BaseExchange[*model.AppUpdateModel] {
	return model.BaseExchangeSuccess[*model.AppUpdateModel](nil)
}
