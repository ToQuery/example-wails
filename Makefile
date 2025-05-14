# 从环境变量获取版本号
VERSION ?= v0.0.1

.PHONY: dev
dev:
	wails dev

.PHONY: build
build:
	wails build
