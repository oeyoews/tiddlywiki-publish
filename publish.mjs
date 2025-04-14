import { tiddlywiki } from './tiddlywiki.mjs';
import fs from 'fs';
import path from 'path';

// 获取命令行参数
const args = process.argv.slice(2);
const tiddlerDirIndex = args.findIndex((arg) => arg === '--tiddlers-directory');
const tiddlerDir =
  tiddlerDirIndex !== -1 ? args[tiddlerDirIndex + 1] : undefined;

const command = ['--build'];
const __dirname = import.meta.dirname;
if (tiddlerDir && fs.existsSync(path.join(__dirname, tiddlerDir))) {
  command.unshift(tiddlerDir);
  // 如果tiddlerDir !== tiddler, 并且tiddlerDir 不存在tiddlywiki.info, 就把tiddlywiki.info 复制到tiddlerDir
  if (tiddlerDir !== 'tiddler') {
    const tiddlywikiInfoPath = `${tiddlerDir}/tiddlywiki.info`;
    if (!fs.existsSync(tiddlywikiInfoPath)) {
      fs.copyFileSync('tiddlywiki.info', tiddlywikiInfoPath);
    }
  }
} else {
  command.unshift('.');
}

await tiddlywiki(command);
console.log('publish success');