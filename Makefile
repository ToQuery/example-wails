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


.PHONY: package-windows
package-windows:
	wails3 task windows:package
