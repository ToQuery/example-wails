# 从环境变量获取版本号
VERSION ?= v0.0.1

.PHONY: clean
clean:
	rm -rf .task bin frontend/bindings frontend/dist frontend/node_modules

.PHONY: gen-bind
gen-bind:
	wails3 generate bindings -ts

.PHONY: update-build-assets
update-build-assets:
	wails3 task common:update:build-assets

.PHONY: dev
dev:
	wails3 dev

.PHONY: build
build:
	wails3 build

.PHONY: package
package:
	wails3 package

VOLUME_NAME ?= example-wails
APP_NAME ?=
SOURCE_FOLDER_PATH ?= bin/example-wails.app
DMG_FILE_NAME ?= ${APP_NAME}.dmg

.PHONY: package-dmg
package-dmg:

	mv $DMG_FILE_NAME bin/

.PHONY: package-windows
package-windows:
	wails3 task windows:package

APP_NAME := example-wails
APP_PATH := ./dist/$(APP_NAME).app
DMG_NAME := $(APP_NAME)-Installer.dmg
VOLUME_NAME := $(APP_NAME) Installer
BACKGROUND_IMG := ./build/darwin/installer_background.png
OUTPUT_DIR := ./dist

# 检查 create-dmg 是否安装
CHECK_CREATE_DMG := $(shell command -v create-dmg 2> /dev/null)

.PHONY: dmg
dmg:
ifndef CHECK_CREATE_DMG
	@echo "❌ create-dmg 未安装，请运行: brew install create-dmg"
	@exit 1
endif
	@echo "📦 正在创建 DMG..."
	@rm -f $(OUTPUT_DIR)/$(DMG_NAME)
	@create-dmg \
		--volname "$(VOLUME_NAME)" \
		--window-pos 200 120 \
		--window-size 600 400 \
		--icon-size 100 \
		--app-drop-link 400 200 \
		$(if $(wildcard $(BACKGROUND_IMG)),--background "$(BACKGROUND_IMG)") \
		$(OUTPUT_DIR)/$(DMG_NAME) \
		$(APP_PATH)
	@echo "✅ DMG 已生成: $(OUTPUT_DIR)/$(DMG_NAME)"
