## TiddlyWiki Publish SPA 🚀

[中文文档](README_zh-CN.md) | English

## Action Usage 🛠️

1.  Save the below code snippet as `.github/workflows/build.yml` file.

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
```

**Note:**

1.  This Action is used to publish TiddlyWiki sites to GitHub Pages. 🌐
2.  `tiddlers-directory` specifies the directory containing TiddlyWiki tiddlers. 📂
3.  After successful deployment, go to GitHub repository's Settings -> Pages -> Deploy from branch, and select the `gh-pages` branch as the deployment source. ✅

---

## Examples ✨

* [neotw-tiddlers](https://github.com/oeyoews/neotw-tiddlers)
