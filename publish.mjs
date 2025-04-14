import { tiddlywiki } from './tiddlywiki.mjs'

// 获取命令行参数
const args = process.argv.slice(2);
const tiddlerDirIndex = args.findIndex(arg => arg === '--tiddler-directory');
const tiddlerDir = tiddlerDirIndex !== -1 ? args[tiddlerDirIndex + 1] : undefined;

const command = ['.tiddlywiki', '--build'];
if (tiddlerDir) {
    command.unshift( tiddlerDir);
} else {
	command.unshift( './tiddlers');
}

await tiddlywiki(command)
console.log('publish success')