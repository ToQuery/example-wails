//go:build linux
// +build linux

package pkg_example

import (
	"log"
	"os/exec"
)

// SetCmdSysProcAttr 设置命令的系统进程属性
// 在  linux 平台，设置 Setpgid 为 true 以设置进程组ID
func SetCmdSysProcAttr(cmd *exec.Cmd) {
	log.Printf("linux SetCmdSysProcAttr: %s", cmd.Path)
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr.Setpgid = true
	cmd.SysProcAttr.Pgid = 0
}
