[[中文文档|Hello, Publish_zh-CN]] | English

## <img src="https://tiddlywiki.com/favicon.ico" alt="TiddlyWiki Logo" width="22" height="22" style="vertical-align:middle;"> TiddlyWiki Publish SPA 🚀

TiddlyWiki Publish SPA is an automation tool for one-click deployment of TiddlyWiki sites to GitHub Pages.
Simply configure the workflow file and you can easily publish your TiddlyWiki content online, enjoying convenient knowledge management and sharing.
It supports custom tiddlers directory and TiddlyWiki version, suitable for personal blogs, knowledge bases, and more. ✨

## Action Usage 🛠️

1.  Save the following snippet as a `.github/workflows/build.yml` file.

{{build.yml}}

**Notes:**

1.  This Action is used to publish TiddlyWiki sites to GitHub Pages. 🌐
2.  `tiddlers-directory` specifies the directory containing TiddlyWiki tiddlers.
3.  After successful deployment, go to your GitHub repository's Settings -> Pages -> Deploy from branch, and select the `gh-pages` branch as the deployment source. ✅

---

## Example Project ✨

* [neotw-tiddlers](https://github.com/oeyoews/neotw-tiddlers)