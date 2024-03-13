const {copy} = require("../utils/file-util");
const path = require("path");
const DEFAULT_OPTIONS = {
    copyPackageJson: true,
    srcDir: 'src',
    dist: 'built',
    types: 'types',
};
function build() {
    if (DEFAULT_OPTIONS.copyPackageJson) {
        copy(path.resolve(process.cwd(), 'package.json'), path.resolve(process.cwd(), DEFAULT_OPTIONS.dist), (filePath, content) => {
            const json = JSON.parse(content);
            Object.keys(json.exports).forEach(key => {
                if (typeof json.exports[key] === "string") {
                    json.exports[key] = json.exports[key].replace("./src/", "./")
                } else if (typeof json.exports[key] === "object") {
                    Object.keys(json.exports[key]).forEach( type => {
                        json.exports[key][type] = json.exports[key][type].replace("./src/", "./")
                    })
                }
            });

            return JSON.stringify(json, null, 2);
        });
    }
    if (DEFAULT_OPTIONS.srcDir) {
        copy(path.resolve(process.cwd(), 'src'), path.resolve(process.cwd(), DEFAULT_OPTIONS.dist));
    }
    if (DEFAULT_OPTIONS.types) {
        copy(path.resolve(process.cwd(), DEFAULT_OPTIONS.types), path.resolve(process.cwd(), DEFAULT_OPTIONS.dist, DEFAULT_OPTIONS.types));
    }
    copy(path.resolve(process.cwd(), 'README.md'), path.resolve(process.cwd(), DEFAULT_OPTIONS.dist));
    copy(path.resolve(process.cwd(), 'README-zh_CN.md'), path.resolve(process.cwd(), DEFAULT_OPTIONS.dist));
}
module.exports = {
    build
}
