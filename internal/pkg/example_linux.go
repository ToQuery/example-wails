//go:build linux
// +build linux

package pkg

import (
	"os/exec"
)

// SetCmdSysProcAttr 设置命令的系统进程属性
// 在非 Windows 平台下，不做任何特殊处理
func SetCmdSysProcAttr(cmd *exec.Cmd) {
	//
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr.Setpgid = true
	cmd.SysProcAttr.Pgid = 0
}
