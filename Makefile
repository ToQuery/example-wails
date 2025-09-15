# 从环境变量获取版本号
VERSION ?= v0.0.1

# 清空所有的编译依赖文件
.PHONY: clean
clean:
	rm -rf .task bin frontend/bindings frontend/dist frontend/node_modules

# 重新生成 wails3 service 对应的 ts 文件
.PHONY: gen-bind
gen-bind:
	wails3 generate bindings -ts

# 以 dev 模式运行项目
.PHONY: dev
dev:
	wails3 dev

# 将项目打包编译为二进制文件
.PHONY: build
build:
	wails3 build

# 重新生成 wails3 打包应用信息
.PHONY: update-build-assets
update-build-assets:
	wails3 task common:update:build-assets


# 打包
.PHONY: package
package:
	wails3 package

.PHONY: package-darwin-arm64
package-darwin-arm64:
	ARCH=arm64 wails3 package

.PHONY: package-darwin-amd64
package-darwin-amd64:
	ARCH=amd64 wails3 package

.PHONY: package-darwin-universal
package-darwin-universal:
	wails3 task darwin:package:universal

.PHONY: package-windows-amd64
package-windows-amd64:
	ARCH=amd64 wails3 task windows:package

.PHONY: package-windows-arm64
package-windows-arm64:
	ARCH=arm64 wails3 task windows:package

# 打包 dmg
.PHONY: package-dmg
package-dmg:
	create-dmg \
	  --volname "Example Wails" \
	  --background "build/darwin/installer_background.svg" \
	  --window-pos 400 200 \
	  --window-size 660 400 \
	  --icon-size 100 \
	  --icon "example-wails.app" 160 185 \
	  --hide-extension "example-wails.app" \
	  --app-drop-link 500 185 \
	  "bin/Example Wails Installer.dmg" \
	  "bin/example-wails.app"
