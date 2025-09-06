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
SOURCE_FOLDER_PATH ?= bin/
DMG_FILE_NAME ?= ${APP_NAME}.dmg

.PHONY: package-dmg
package-dmg:
	wails3 package
	create-dmg \
	  --volname "${VOLUME_NAME}" \
	  --background "build/darwin/installer_background.png" \
	  --window-pos 200 120 \
	  --window-size 800 400 \
	  --icon-size 100 \
	  --icon "${APP_NAME}.app" 200 190 \
	  --hide-extension "${APP_NAME}.app" \
	  --app-drop-link 600 185 \
	  "${DMG_FILE_NAME}" \
	  "${SOURCE_FOLDER_PATH}"
	mv $DMG_FILE_NAME bin/

.PHONY: package-windows
package-windows:
	wails3 task windows:package
