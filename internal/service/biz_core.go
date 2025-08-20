package service

import (
	"example-wails/internal/model"
	"log"
)

type BizCoreService struct {
	AppInfo model.AppInfoModel
}

func NewBizCoreService(appInfo model.AppInfoModel) *BizCoreService {
	return &BizCoreService{AppInfo: appInfo}
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
