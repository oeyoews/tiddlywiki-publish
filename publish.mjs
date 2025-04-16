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

const args = minimist(_args, {
  string: ['tiddlers-directory', 'default-home-tiddlers', 'site-title'],
  unknown: false,
  alias: {
    tiddlerDir: 'tiddlers-directory',
    defaultHomeTiddler: 'default-home-tiddlers',
    siteTitle: 'site-title',
  },
});

console.log(args)

// const command = ['--build'];
const __dirname = import.meta.dirname;
if (args.tiddlerDir) {
  const tiddlerPath = fs.existsSync(
    path.join(__dirname, args.tiddlerDir, 'tiddlers')
  );
  if (tiddlerPath) {
    buildArgs.unshift(args.tiddlerDir);
  } else {
    console.error('❌', tiddlerPath, 'is not existing');
  }
} else {
  buildArgs.unshift('.');
}

const defaultTiddlers = {
  title: '$:/DefaultTiddlers',
  text: '',
};

const siteTitleTiddler = {
  title: '$:/SiteTitle',
  text: '',
};

const preloadTiddlers = [];
if (args.defaultHomeTiddler) {
  defaultTiddlers.text = args.defaultHomeTiddler;
  preloadTiddlers.push(defaultTiddlers);
}

if (args.siteTitle) {
  siteTitleTiddler.text = args.siteTitle;
  preloadTiddlers.push(siteTitleTiddler);
}

console.log(preloadTiddlers, 'preloadTiddlers');

await tiddlywiki(buildArgs, preloadTiddlers);
console.log('✅ TiddlyWiki Publish successfully! 🎉');
