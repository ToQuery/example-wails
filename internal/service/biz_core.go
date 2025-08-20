package service

import (
	"example-wails/internal/model"
	"log"
)

type BizCoreService struct {
	AppInfo model.WailsAppInfoModel
}

func NewBizCoreService(appInfo model.WailsAppInfoModel) *BizCoreService {
	return &BizCoreService{AppInfo: appInfo}
}

func (s *BizCoreService) AppLaunch() model.BaseExchange[model.LaunchResModel] {
	log.Printf("开始发送启动信息 !")

	return model.BaseExchangeSuccess[model.LaunchResModel](model.LaunchResModel{
		Config: nil,
		Update: nil,
	})
}

func (s *BizCoreService) AppCheckUpdate() model.BaseExchange[*model.WailsUpdateModel] {
	return model.BaseExchangeSuccess[*model.WailsUpdateModel](nil)
}
