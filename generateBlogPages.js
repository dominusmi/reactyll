#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const { blogger } = require(`${process.cwd()}/package.json`);

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}


deleteFolderRecursive(`${process.cwd()}/src/_blog`);
fs.mkdirSync(`${process.cwd()}/src/_blog`);

const mapper = {};
let imports = [];
let blogRoutes = [];
let i = 0;
for(const file of fs.readdirSync("blog")){
    // const file = "test.md";
    const fileRoot = file.replace(".md", "");

    let component = fs.readFileSync(blogger.template, 'utf-8');
    const content = fs.readFileSync(`${process.cwd()}/blog/${file}`, 'utf-8');

    // 1. parse blog markdown 
    const blogsInFile = content.split(" - - -");
    let duplicateBlogs = []
    for (const blog of blogsInFile) {
        const tmp = blog.split(' - -');
        const properties = yaml.load(tmp[0]);
        if (properties.language == null) {
            if (blogger.language == null) {
                throw Error("Language property of default language must be set for ", file);
            }
            console.info("Using default language for ", file);
            properties.language = blogger.language;
        }

        const md = tmp[1];
        duplicateBlogs.push([md, properties]);
    }

    let languages = duplicateBlogs.map(([_, x]) => [x.language, x.url]);

    mapper[fileRoot] = {}
    for (const [md, properties] of duplicateBlogs) {
        const x = { markdown: md, properties, languages };
        const filename = properties.url.split("/").at(-1);
        // the base64 is needed to avoid issues with special characters such as \n
        const newComponent = component.replace('%REPLACE%', btoa(JSON.stringify(x)));
        fs.writeFileSync(`${process.cwd()}/src/_blog/${filename}.tsx`, newComponent);
        mapper[fileRoot][properties.language] = properties;
        imports.push(`const Blog${i} = React.lazy(() => import("./${filename}"))`)
        blogRoutes.push([properties.url, `Blog${i}`])
        i += 1;
    }
}

// We need to replace "BlogN" with BlogN in order for it not to be a string, but the
// actual imported component
fs.writeFileSync(`${process.cwd()}/src/_blog/routes.tsx`, `
import React from "react"

${imports.join("\n")}
export const blogRoutes = ${JSON.stringify(blogRoutes).replace(/"Blog(\d+)"/g, 'Blog$1')};
export const blogs = ${JSON.stringify(mapper)}`);

// let imports = "";
// let routes = "";

// for (const idx in mapper) {
//     const map = mapper[idx];
//     const name = `Blog${idx}`;
//     imports = imports + `const ${name} = React.lazy(() => import("./_blog/${map.url}"));\n`;
// }

// let blogs = {
//     "best-blog": {
//         "en": {
//             "component": "",
//             "url": ""
//         },
//     }
// }

// 2. for each, create markdown component file
// 3. create the main.tsx which exports "blogs"


// component = component.replace('%REPLACE%', content)
// let main = fs.readFileSync(`main.template`, 'utf-8');
// main = main.replace("%REPLACE%", JSON.stringify(mapper))
// fs.writeFileSync('src/_blog/main.tsx', main)
// const filePath = './path/to/your/markdown-file.md'; // Adjust the path accordingly

// const markdownContent = fs.readFileSync(filePath, 'utf-8');

// const renderedMarkdown = ReactDOMServer.renderToString(
//   React.createElement(MarkdownRenderer, { markdown: markdownContent })
// );


