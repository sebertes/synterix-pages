import {docsProvider} from "lib/docs.js";

export const prerender = true;

export async function entries() {
    let langs = await docsProvider.getLangs();
    return langs.map(a => {
        return {slug: `${a.value}`};
    });
}

export async function load({url}) {
    if (url.pathname === '/') {
        return {
            keys: await docsProvider.getLangKeys('zh-cn')
        }
    } else {
        let t = url.pathname.split("/");
        return {
            keys: await docsProvider.getLangKeys(t[1])
        }
    }
}