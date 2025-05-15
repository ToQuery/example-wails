# 从环境变量获取版本号
VERSION ?= v0.0.1

.PHONY: clean
clean:
	rm -rf .task bin frontend/bindings frontend/dist frontend/node_modules

.PHONY: gen-bind
gen-bind:
	wails3 generate bindings

.PHONY: dev
dev:
	wails3 dev

.PHONY: build
build:
	wails3 build

.PHONY: package
package:
	wails3 package

