import {docsProvider} from "./lib/docs.js";

(async () => {
    // let tree=await docsProvider.getTree();
    // console.log(tree);
    console.log(await docsProvider.getLangs());
})();