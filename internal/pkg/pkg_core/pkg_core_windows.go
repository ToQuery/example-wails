//go:build windows
// +build windows

package pkg_core

import (
	"log"
	"os/exec"
	"syscall"
)

// SetCmdSysProcAttr 设置命令的系统进程属性
// 在 Windows 平台下，设置 HideWindow 为 true 以隐藏控制台窗口
func SetCmdSysProcAttr(cmd *exec.Cmd) {
	log.Printf("windows SetCmdSysProcAttr: %s", cmd.Path)
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr.HideWindow = true
}
