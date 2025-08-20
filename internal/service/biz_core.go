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

func (s *BizCoreService) GetAppInfo() model.BaseExchange[model.AppInfoModel] {
	log.Printf("BizCoreService GetAppInfo = %v", s.AppInfo)
	return model.BaseExchangeSuccess[model.AppInfoModel](s.AppInfo)
}

func (s *BizCoreService) AppLaunch() model.BaseExchange[model.AppLaunchModel] {
	log.Printf("BizCoreService AppLaunch")
	return model.BaseExchangeSuccess[model.AppLaunchModel](model.AppLaunchModel{
		Config:         nil,
		VersionLastest: nil,
	})
}

func (s *BizCoreService) AppCheckUpdate() model.BaseExchange[*model.AppVersionLastestModel] {
	log.Printf("BizCoreService AppCheckUpdate")
	return model.BaseExchangeSuccess[*model.AppVersionLastestModel](nil)
}
