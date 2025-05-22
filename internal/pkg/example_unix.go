//go:build !windows
// +build !windows

package pkg

import (
	"os/exec"
)

// SetCmdSysProcAttr 设置命令的系统进程属性
// 在非 Windows 平台下，不做任何特殊处理
func SetCmdSysProcAttr(cmd *exec.Cmd) {
	// 非 Windows 平台不需要特殊处理
}
