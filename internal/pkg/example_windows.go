//go:build windows
// +build windows

package pkg

import (
	"os/exec"
	"syscall"
)

// SetCmdSysProcAttr 设置命令的系统进程属性
// 在 Windows 平台下，设置 HideWindow 为 true 以隐藏控制台窗口
func SetCmdSysProcAttr(cmd *exec.Cmd) {
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr = &syscall.SysProcAttr{
		HideWindow: true,
	}
}
