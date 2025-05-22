//go:build darwin
// +build darwin


package pkg


func SetCmdSysProcAttr(cmd *exec.Cmd) {
	log.Printf("SetCmdSysProcAttr: %s", cmd.Path)
}
