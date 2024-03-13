const fs = require("fs")
const packageUtil = require("../utils/package-util")
const execUtil = require("../utils/exec-util")
function release() {
    const version = packageUtil.getVersion()
    const repositoryPath = process.cwd();
    const branch = "main";
    execUtil.execSync(`cd ${repositoryPath}`);
    execUtil.execSync(`git checkout ${branch}`);
    execUtil.execSync(`git pull`);
    execUtil.execSync(`git tag -a ${version} -m 'publish'`);
    execUtil.execSync(`git push origin ${version}`);
    execUtil.execSync(`cd built`);
    // execUtil.execSync(`npm publish --access public --tag beta`);
    execUtil.execSync(`npm publish --access public --tag beta`);
}
module.exports = {
    release
}
