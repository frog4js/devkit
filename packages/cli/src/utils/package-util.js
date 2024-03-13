const path = require("path");
const fs = require("fs");
module.exports = {
    getVersion: () => {
        const file = path.resolve(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(file, "utf8"));
        return packageJson.version;
    }
}
