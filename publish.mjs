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

const defaultHomeTiddlers = '--default-home-tiddlers';
const defaultTiddlersIndex = args.findIndex((arg) =>
  arg.startsWith(defaultHomeTiddlers)
);

const defaultTiddlersValue = args[defaultTiddlersIndex].slice(
  defaultHomeTiddlers.length+1
);

// const command = ['--build'];
const __dirname = import.meta.dirname;
if (tiddlerDir) {
  const tiddlerPath = fs.existsSync(
    path.join(__dirname, tiddlerDir, 'tiddlers')
  );
  if (tiddlerPath) {
    buildArgs.unshift(tiddlerDir);
  } else {
    console.error('❌', tiddlerPath, 'is not existing');
  }
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

const defaultTiddlers = {
  title: '$:/DefaultTiddlers',
  text: '',
};

if (defaultTiddlersValue) {
  defaultTiddlers.text = defaultTiddlersValue
    .split(',')
    .map((item) => item.trim());
}

console.log(defaultTiddlers, 'DefaultTiddlers', defaultTiddlersValue);

await tiddlywiki(buildArgs, defaultTiddlersValue ? [defaultTiddlers] : []);
console.log('✅ TiddlyWiki Publish successfully! 🎉');
