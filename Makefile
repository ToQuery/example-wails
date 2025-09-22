# 从环境变量获取版本号
APP_NAME ?= example-wails
APP_PACKAGE_NAME ?= Wails示例

VERSION ?= v0.0.1
VERSION_CODE ?= 1

COMMIT_ID   := $(shell git rev-parse --short HEAD)
BUILD_TIME  := $(shell date '+%Y-%m-%d %H:%M:%S')


# 清空所有的编译依赖文件
.PHONY: clean
clean:
	rm -rf .task bin frontend/bindings frontend/dist frontend/node_modules

# 重新生成 wails3 service 对应的 ts 文件
.PHONY: gen-bind
gen-bind:
	wails3 generate bindings -ts

# 重新生成 wails3 打包应用信息
.PHONY: update-build-assets
update-build-assets:
	wails3 task common:update:build-assets

# 命令行生成构建版本信息
.PHONY: update-build-version
update-build-version:
	@echo ">>> Updating YAML version to $(VERSION)"
	sed -i '' "s/^\([[:space:]]*version:[[:space:]]*\)\".*\"/\1\"$(VERSION)\" # The application version/" build/config.yml

	@echo ">>> Updating wails3 App Info"
	wails3 task common:update:build-assets

	@echo ">>> Updating Go Code version info"
	sed -i '' "s/^\(.*Version[[:space:]]*=[[:space:]]*\)\".*\"/\1\"$(VERSION)\"/" main.go
	sed -i '' "s/^\(.*VersionCode[[:space:]]*=[[:space:]]*\)\".*\"/\1\"$(VERSION_CODE)\"/" main.go
	sed -i '' "s/^\(.*BuildId[[:space:]]*=[[:space:]]*\)\".*\"/\1\"$(COMMIT_ID)\"/" main.go
	sed -i '' "s/^\(.*BuildTime[[:space:]]*=[[:space:]]*\)\".*\"/\1\"$(BUILD_TIME)\"/" main.go

	@echo ">>> Done! Version=$(VERSION), Code=$(VERSION_CODE), Commit=$(COMMIT_ID), Time=$(BUILD_TIME)"


# 以 dev 模式运行项目
.PHONY: dev
dev:
	wails3 dev

# 将项目打包编译为二进制文件
.PHONY: build
build:
	wails3 build

# 将项目打包编译为二进制文件
.PHONY: build-windows-arm64
build-windows-arm64:
	ARCH=arm64 wails3 task windows:build

# 将项目打包编译为二进制文件
.PHONY: build-windows-amd64
build-windows-amd64:
	ARCH=amd64 wails3 task windows:build


.PHONY: build-windows-multiple
build-windows-multiple:
	@echo ">>> [1/2] 构建 Windows arm64 版本 (v$(VERSION))"
	rm -rf bin/$(APP_NAME).exe
	ARCH=arm64 wails3 task windows:build
	mv bin/$(APP_NAME).exe bin/$(APP_PACKAGE_NAME)-$(VERSION)_windows_arm64.exe

	@echo ">>> [2/2] 构建 Windows amd64 版本 (v$(VERSION))"
	rm -rf bin/$(APP_NAME).exe
	ARCH=amd64 wails3 task windows:build
	mv bin/$(APP_NAME).exe bin/$(APP_PACKAGE_NAME)-$(VERSION)_windows_x64.exe

	@echo "✅ 所有 Windows exe 已生成 [$(APP_PACKAGE_NAME)]: intel / arm64 (版本 $(VERSION))"

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
	  --volname "$(APP_PACKAGE_NAME) $(VERSION)" \
	  --background "build/darwin/installer_background.svg" \
	  --window-pos 400 200 \
	  --window-size 660 400 \
	  --icon-size 100 \
	  --icon $(APP_PACKAGE_NAME).app 160 185 \
	  --hide-extension $(APP_PACKAGE_NAME).app \
	  --app-drop-link 500 185 \
	  "bin/$(APP_PACKAGE_NAME)-$(VERSION)_mac_$(PACKAGE_ARCH).dmg" \
	  "bin/$(APP_PACKAGE_NAME).app"

.PHONY: package-darwin-multiple
package-darwin-multiple:
	@echo ">>> [1/3] 构建 darwin arm64 版本 (v$(VERSION))"
	rm -rf bin/$(APP_PACKAGE_NAME).app bin/$(APP_NAME).app
	ARCH=arm64 wails3 package
	mv bin/$(APP_NAME).app bin/$(APP_PACKAGE_NAME).app
	@echo ">>> 生成 DMG (arm64)"
	$(MAKE) package-dmg PACKAGE_ARCH=arm64

	@echo ">>> [2/3] 构建 darwin amd64 版本 (v$(VERSION))"
	rm -rf bin/$(APP_PACKAGE_NAME).app bin/$(APP_NAME).app
	ARCH=amd64 wails3 package
	mv bin/$(APP_NAME).app bin/$(APP_PACKAGE_NAME).app
	@echo ">>> 生成 DMG (intel)"
	$(MAKE) package-dmg PACKAGE_ARCH=intel

	@echo ">>> [3/3] 构建 darwin universal 版本 (v$(VERSION))"
	rm -rf bin/$(APP_PACKAGE_NAME).app bin/$(APP_NAME).app
	wails3 task darwin:package:universal
	mv bin/$(APP_NAME).app bin/$(APP_PACKAGE_NAME).app
	@echo ">>> 生成 DMG (universal)"
	$(MAKE) package-dmg PACKAGE_ARCH=universal

	@echo "✅ 所有 macOS 包已生成 [$(APP_PACKAGE_NAME)]: arm64 / intel / universal (版本 $(VERSION))"


