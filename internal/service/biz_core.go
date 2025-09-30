package service

import (
	"example-wails/internal/model"
	"log"
)

type BizCoreService struct {
	ClientBuild model.ClientBuildModel
}

func NewBizCoreService(clientBuild model.ClientBuildModel) *BizCoreService {
	return &BizCoreService{ClientBuild: clientBuild}
}

func (s *BizCoreService) GetClientBuild() model.BaseExchange[model.ClientBuildModel] {
	log.Printf("BizCoreService GetClientBuild = %v", s.ClientBuild)
	return model.BaseExchangeSuccess[model.ClientBuildModel](s.ClientBuild)
}

func (s *BizCoreService) AppLaunch() model.BaseExchange[model.ClientLaunchModel] {
	log.Printf("BizCoreService AppLaunch")
	return model.BaseExchangeSuccess[model.ClientLaunchModel](model.ClientLaunchModel{
		Config:         nil,
		VersionLastest: nil,
	})
}

func (s *BizCoreService) AppCheckUpdate() model.BaseExchange[*model.ClientVersionLastestModel] {
	log.Printf("BizCoreService AppCheckUpdate")
	return model.BaseExchangeSuccess[*model.ClientVersionLastestModel](nil)
}
