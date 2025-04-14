#!/usr/bin/env node

import { tiddlywiki } from './tiddlywiki.mjs';
import fs from 'fs';
import path from 'path';

const buildArgs = [
  '--verbose',
  '--output',
  '.tiddlywiki',
  '--render',
  '$:/plugins/tiddlywiki/tiddlyweb/save/offline',
  'index.html',
  'text/plain',
  '',
  'publishFilter',
  '-[tag[private]] -[is[draft]]',
];

// 获取命令行参数
const args = process.argv.slice(2);
const tiddlerDirIndex = args.findIndex((arg) => arg === '--tiddlers-directory');
const tiddlerDir =
  tiddlerDirIndex !== -1 ? args[tiddlerDirIndex + 1] : undefined;

// const command = ['--build'];
const __dirname = import.meta.dirname;
if (tiddlerDir && fs.existsSync(path.join(__dirname, tiddlerDir))) {
  buildArgs.unshift(tiddlerDir);
  // 如果tiddlerDir !== tiddler, 并且tiddlerDir 不存在tiddlywiki.info, 就把tiddlywiki.info 复制到tiddlerDir
  // if (tiddlerDir !== '.') {
  //   const tiddlywikiInfoPath = `${tiddlerDir}/tiddlywiki.info`;
  //   if (!fs.existsSync(tiddlywikiInfoPath)) {
  //     fs.copyFileSync(
  //       path.join(__dirname, './actions/tiddlywiki.info'),
  //       tiddlywikiInfoPath
  //     );
  //   }
  // }
} else {
  buildArgs.unshift('.');
}

await tiddlywiki(buildArgs);
console.log('publish success', buildArgs);
