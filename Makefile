
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

