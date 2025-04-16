[[English|Hello, Publish]] | 中文文档

## <img src="https://tiddlywiki.com/favicon.ico" alt="TiddlyWiki Logo" width="22" height="22" style="vertical-align:middle;"> TiddlyWiki Publish SPA 🚀

TiddlyWiki 发布 SPA 是一个用于将 TiddlyWiki 站点一键部署到 GitHub Pages 的自动化工具。
你只需配置好工作流文件，即可轻松将你的 TiddlyWiki 内容发布到线上，享受便捷的知识管理和分享体验。
支持自定义 tiddlers 目录和 TiddlyWiki 版本，适合个人博客、知识库等多种场景。✨

## Action 用法 🛠️

1.  将以下代码片段保存为 `.github/workflows/build.yml` 文件。

{{build.yml}}

**注意事项：**

1.  本 Action 用于将 TiddlyWiki 站点发布到 GitHub Pages。🌐
2.  `tiddlers-directory` 指定包含 TiddlyWiki tiddlers 的目录。
3.  部署成功后，前往 GitHub 仓库的 Settings -> Pages -> Deploy from branch，选择 `gh-pages` 分支作为部署源。✅

---

## 示例项目 ✨

* [neotw-tiddlers](https://github.com/oeyoews/neotw-tiddlers)