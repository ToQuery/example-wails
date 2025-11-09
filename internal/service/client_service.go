package service

import (
	"example-wails/cmd/wails3"
	"example-wails/internal/model"
	"example-wails/internal/pkg/pkg_example"
	"log"
	"math/rand"
	"runtime"
	"time"

	"github.com/wailsapp/wails/v3/pkg/application"
)

type ClientService struct {
	ClientBuild model.ClientBuildModel
}

func NewClientService(clientBuild model.ClientBuildModel) *ClientService {
	return &ClientService{ClientBuild: clientBuild}
}

func (s *ClientService) ClientLaunch() model.BaseExchange[model.ClientLaunchModel] {
	log.Printf("AppLaunch")
	// 50% 概率执行模拟网络错误
	if rand.New(rand.NewSource(time.Now().UnixNano())).Intn(2) == 0 {
		return model.BaseExchangeFail[model.ClientLaunchModel]("模拟网络错误")
	}

	return model.BaseExchangeSuccess[model.ClientLaunchModel](pkg_example.BuildClientLaunch())
}

func (s *ClientService) GetClientPlatform() model.BaseExchange[model.ClientPlatformModel] {
	return model.BaseExchangeSuccess[model.ClientPlatformModel](model.ClientPlatformModel{
		OSName: runtime.GOOS,
		OSArch: runtime.GOARCH,
	})
}

func (s *ClientService) GetClientBuild() model.BaseExchange[model.ClientBuildModel] {
	log.Printf("GetClientBuild = %v", s.ClientBuild)
	log.Printf("GetClientBuild Env = %v", application.Get().Env.Info())
	return model.BaseExchangeSuccess[model.ClientBuildModel](s.ClientBuild)
}

func (s *ClientService) ClientUpdateFromEvent(force bool) {
	log.Printf("ClientUpdateFromEvent")
	updateInfo := pkg_example.BuildClientVersionLastest(force)
	application.Get().Event.Emit(wails3.ClientUpdate, updateInfo)
}

func (s *ClientService) ClientUpdateCheck(forceUpdate bool) model.BaseExchange[*model.ClientVersionLastestModel] {
	log.Printf("ClientUpdateCheck")
	updateInfo := pkg_example.BuildClientVersionLastest(forceUpdate)
	if updateInfo.VersionCode > s.ClientBuild.VersionCode {
		return model.BaseExchangeSuccess(&updateInfo)
	}
	return model.BaseExchangeSuccess[*model.ClientVersionLastestModel](nil)
}
