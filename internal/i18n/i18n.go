package i18n

import (
	"embed"
	"encoding/json"
	"fmt"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

//go:embed locales/*.json
var localeFS embed.FS

var (
	bundle      *i18n.Bundle
	localizers  map[string]*i18n.Localizer
	defaultLang string
)

// 初始化i18n包
func Init(defaultLanguage string) error {

	// 设置默认语言
	defaultLang = defaultLanguage

	// 创建bundle
	bundle = i18n.NewBundle(language.Make(defaultLanguage))
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)

	// 加载所有语言文件
	entries, err := localeFS.ReadDir("locales")
	if err != nil {
		return fmt.Errorf("读取语言文件目录失败: %w", err)
	}

	// 初始化localizers映射
	localizers = make(map[string]*i18n.Localizer)

	// 加载每个语言文件
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}

		fileName := entry.Name()
		langTag := fileName[:len(fileName)-5] // 移除.json后缀

		// 加载语言文件
		_, err := bundle.LoadMessageFileFS(localeFS, "locales/"+fileName)
		if err != nil {
			return fmt.Errorf("加载语言文件 %s 失败: %w", fileName, err)
		}

		// 创建localizer
		localizers[langTag] = i18n.NewLocalizer(bundle, langTag)
	}

	return nil
}

// T 翻译文本
func T(lang, messageID string, templateData map[string]interface{}) string {
	// 获取对应语言的localizer，如果不存在则使用默认语言
	localizer, ok := localizers[lang]
	if !ok {
		localizer = localizers[defaultLang]
	}

	// 翻译
	message, err := localizer.Localize(&i18n.LocalizeConfig{
		MessageID:    messageID,
		TemplateData: templateData,
	})

	if err != nil {
		return messageID // 如果翻译失败，返回原始ID
	}

	return message
}
