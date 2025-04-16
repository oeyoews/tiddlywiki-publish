import fs from 'fs';
import path from 'path';

let TiddlyWikiModule;
const localBootPath = path.resolve('./lib/tiddlywiki/boot/boot.js');
if (fs.existsSync(localBootPath)) {
  TiddlyWikiModule = await import(localBootPath);
} else {
  TiddlyWikiModule = await import('tiddlywiki');
}
const { TiddlyWiki } = TiddlyWikiModule;

export const tiddlywiki = (args = [], preloadTiddlers = [], callback) => {
  return new Promise((resolve, reject) => {
    const $tw = TiddlyWiki();
    $tw.boot.argv = [...args];
    if (preloadTiddlers.length > 0) {
      $tw.preloadTiddlerArray(preloadTiddlers);
    }
    if (typeof callback === 'function') {
      callback($tw);
    }
    $tw.boot.boot(() => {
      resolve($tw);
    });
  });
};
