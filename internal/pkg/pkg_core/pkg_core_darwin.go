//go:build darwin
// +build darwin

package pkg_core

import (
	"log"
	"os/exec"
)

// SetCmdSysProcAttr 设置命令的系统进程属性
func SetCmdSysProcAttr(cmd *exec.Cmd) {
	log.Printf("darwin SetCmdSysProcAttr: %s", cmd.Path)
}
