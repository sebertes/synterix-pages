import {docsProvider} from "lib/docs.js";

export const prerender = true;

export async function entries() {
    let r = [];
    let langs = await docsProvider.getLangs();
    for (let _lang of langs) {
        let list = await docsProvider.getList(_lang.value, false);
        list.forEach(({lang, url}) => {
            if (url.substring(1) !== 'support') {
                r.push({
                    slug: lang,
                    rest: `${url.substring(1)}`
                });
            }
        })
    }
    return r;
}