## TiddlyWiki 发布 SPA 🚀

中文文档 | [English](./README.md)

## Action 用法 🛠️

1.  将下面代码片段保存为 `.github/workflows/build.yml` 文件。

```bash
name: Deploy TiddlyWiki to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  pages: write
  id-token: write
  contents: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  release-and-page:
    runs-on: ubuntu-latest
    name: Publish
    steps:
      - uses: oeyoews/tiddlywiki-publish@main
        with:
          tiddlers-directory: .
          version: v5.3.6
          default-home-tiddlers: "[[Hello, Publish]] [[Hello, Publish_zh-CN]]"
```

**注意：**

1.  上述 Action 用于将 TiddlyWiki 站点发布到 GitHub Pages。🌐
2.  `tiddlers-directory` 指定了包含 TiddlyWiki tiddlers 的目录。📂
3.  部署成功后，请前往 GitHub 仓库的 Settings -> Pages -> Deploy from branch，并选择 `gh-pages` 分支作为部署源。✅

---

## 示例 ✨

* [neotw-tiddlers](https://github.com/oeyoews/neotw-tiddlers)
