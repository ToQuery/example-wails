package pkg_device

import (
	"fmt"
	"log"
	"os"

	"github.com/denisbrodbeck/machineid"
	"github.com/shirou/gopsutil/v3/host"
)

const appId = "io.github.toquery.example-wails"

func DeviceVersion() string {
	info, err := host.Info()
	if err != nil {
		log.Println(err)
		return ""
	}
	return info.PlatformVersion
}

func DeviceCode() string {
	deviceId, err := machineid.ID()
	if err != nil {
		deviceId, err = host.HostID()
		if err != nil {
			return "0"
		}
	}
	fmt.Println("pkg_device Machine ID:", deviceId)
	return deviceId
}

func DeviceProtectedCode() string {
	// 获取哈希后的 ID（防止泄露真实 ID）
	protectedId, err := machineid.ProtectedID(appId)
	if err != nil {
		return "0"
	}
	fmt.Println("pkg_device Protected ID:", protectedId)
	return protectedId
}

func DeviceHostName() string {
	hostname, err := os.Hostname()
	if err != nil || hostname == "" {
		fmt.Println("Error os.Hostname()", err)
		info, err := host.Info()
		if err != nil {
			fmt.Println("Error host.Info()", err)
		} else {
			hostname = info.Hostname
		}
	}
	fmt.Println("Machine HostName:", hostname)
	return hostname
}
