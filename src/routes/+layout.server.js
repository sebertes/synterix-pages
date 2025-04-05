import {docsProvider} from "lib/docs.js";
import {error} from "@sveltejs/kit";

export async function load({url}) {
    let langs = await docsProvider.getLangs();
    let lang = 'zh-cn', langInfo, pageName = '/';
    if (url.pathname !== '/') {
        let t = url.pathname.split("/");
        langInfo = langs.find(a => a.value === t[1]);
        pageName = '/' + t.slice(2).join('/');
        if (langInfo) {
            lang = t[1];
        }
    } else {
        langInfo = langs.find(a => a.value === lang);
    }
    let page = await docsProvider.getPage(lang, pageName);
    if (!page) {
        error(404);
    }
    return {
        lang,
        langInfo,
        langs: langs.map(a => {
            return {...a, url: `/${a.value}${pageName}`}
        }),
        tree: await docsProvider.getTree(lang),
        page
    }
}