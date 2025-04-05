import Path from 'node:path';
import fs from 'node:fs/promises';
import {Marked} from "marked";
import fm from 'front-matter';
import hljs from "highlight.js";
import {markedHighlight} from "marked-highlight";

async function isDirectory(path) {
    let t = await fs.stat(path);
    return t.isDirectory();
}

async function getAllFiles(path) {
    if (await isDirectory(path)) {
        let r = [];
        await Promise.all((await fs.readdir(path)).map(async file => {
            let target = Path.resolve(path, `./${file}`);
            if (isDirectory(target)) {
                r.push(...await getAllFiles(target));
            } else {
                r.push(target);
            }
        }));
        return r;
    }
    return [path];
}

export async function readDir(path) {
    await fs.access(path);
    return await fs.readdir(path);
}

export async function readFile(path, option) {
    await fs.access(path);
    let content = await fs.readFile(path, option);
    return content.toString();
}

const Language = {
    'en-us': "English",
    'zh-cn': "中文"
};

class DocsProvider {
    constructor(basePath) {
        this.basePath = basePath;
    }

    async getLangs() {
        let list = await readDir(this.basePath);
        return list.map(a => {
            return {
                name: Language[a],
                value: a
            }
        });
    }

    async getLangKeys(lang) {
        let content = await readFile(Path.resolve(this.basePath, `./${lang}/lang.json`));
        return JSON.parse(content);
    }

    async getList(lang = 'en-us', lite = false) {
        let files = await getAllFiles(Path.resolve(this.basePath, `./${lang}`));
        let r = [];
        for (let file of files) {
            if (!Path.basename(file).endsWith('.md')) {
                continue;
            }
            let content = await readFile(file);
            let {attributes, body} = fm(content);
            let info = {
                ...attributes,
                lang,
                level: 0,
                children: []
            };
            if (!lite) {
                const md = new Marked(
                    markedHighlight({
                        emptyLangClass: 'hljs',
                        langPrefix: 'hljs language-',
                        highlight(code, lang, info) {
                            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                            return hljs.highlight(code, {language}).value;
                        }
                    })
                );
                info.html = md.parse(body);
            }
            info.url = info.url.trim();
            if (info.url === '/') {
                info.level = 0;
            } else {
                if (info.url.endsWith('/')) {
                    info.url = info.url.substring(0, info.url.length - 1);
                }
                let t = info.url.substring(1).split("/");
                info.level = t.length;
            }
            r.push(info);
        }
        return r;
    }

    async getTree(lang) {
        let map = new Map();
        let list = await this.getList(lang, true);
        list.forEach(a => map.set(a.url, a));
        map.forEach(a => {
            if (a.level > 1) {
                map.get('/' + a.url.split('/')[1]).children.push(a);
            }
        });
        let r = list.filter(a => a.level === 1);
        this._sort(r);
        return r;
    }

    async getPage(lang, url) {
        let list = await this.getList(lang);
        let index = list.findIndex(a => {
            return a.url === url && a.lang === lang;
        });
        let page = list[index];
        if (index !== -1) {
            if (index >= 1) {
                page.prev = list[index - 1];
            }
            if (index < list.length - 1) {
                page.next = list[index + 1];
            }
        }
        return page;
    }

    _sort(list) {
        list.sort((a, b) => a.index - b.index);
        list.forEach(a => this._sort(a.children || []));
    }

}


export const docsProvider = new DocsProvider("/Users/wangjinliang/sebertes/synterix-ui/packages/synterix-pages/content");