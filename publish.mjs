#!/usr/bin/env node

import minimist from './minimist.js';
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
const _args = process.argv.slice(2);

/**
 * 解析命令行参数
 * @typedef {Object} Args
 * @property {string} [tiddlerDir] - tiddlers 目录
 * @property {string} [favicon] - favicon
 * @property {string} [defaultHomeTiddler] - 默认首页 tiddler
 * @property {string} [siteTitle] - 站点标题
 */

/** @type {Args} */
const args = minimist(_args, {
  string: [
    'tiddlers-directory',
    'default-home-tiddlers',
    'site-title',
    'favicon',
  ],
  unknown: false,
  alias: {
    tiddlerDir: 'tiddlers-directory',
    defaultHomeTiddler: 'default-home-tiddlers',
    siteTitle: 'site-title',
  },
});

// console.log(args)

// const command = ['--build'];
const ___dirname = import.meta.dirname;
const __dirname = path.resolve(___dirname, '..');

if (args.tiddlerDir) {
  const tiddlerDir = path.resolve(__dirname, args.tiddlerDir, 'tiddlers');
  const tiddlerPath = fs.existsSync(tiddlerDir);
  if (tiddlerPath) {
    buildArgs.unshift(args.tiddlerDir);
  } else {
    console.error('❌', tiddlerDir, 'is not existing');
    console.log(__dirname, 'tiddlerDir', tiddlerDir);
  }
} else {
  buildArgs.unshift('.');
}

const preloadTiddlers = [];

const tiddlerConfigs = [
  { arg: 'defaultHomeTiddler', title: '$:/DefaultTiddlers' },
  { arg: 'siteTitle', title: '$:/SiteTitle' },
  { arg: 'favicon', title: '$:/favicon.ico' },
];

for (const { arg, title } of tiddlerConfigs) {
  if (arg === 'favicon' && args[arg]) {
    const faviconPath = path.join(__dirname, args[arg]);
    if (fs.existsSync(faviconPath)) {
      const text = fs.readFileSync(faviconPath, 'utf-8');
      preloadTiddlers.push({ title, text, type: "image/svg+xml" });
    }
    break;
  }
  if (args[arg]) {
    preloadTiddlers.push({ title, text: args[arg] });
  }
}

// console.log(preloadTiddlers, 'preloadTiddlers');

await tiddlywiki(buildArgs, preloadTiddlers);
console.log('✅ TiddlyWiki Publish successfully! 🎉');
