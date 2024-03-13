const path = require("path");
const { mkdir, createOrUpdateFile} = require("../../src/utils/file-util");
const { preCommit, huskySh, commitMsg} = require("../../src/files/husky");
const {rmdir} = require("../utils/file-util");
const cp = require("child_process");
const p = require("path");
const fs = require("fs");
const git = (args) => cp.spawnSync('git', args, { stdio: 'inherit' });

const projectDir = process.cwd();
function sync() {
    syncHusky()
}
function syncPackageJson() {

}
function syncHusky() {
    if (git(['rev-parse']).status !== 0) {
        console.warn(`git command not found, skipping install`);
        return;
    }
    if (!fs.existsSync('.git')) {
        throw new Error(`.git can't be found`);
    }
    const dir = '.husky'
    const huskyDirPath = path.join(projectDir, dir);
    const huskyShDirPath = path.join(projectDir, dir, "_");
    rmdir(huskyDirPath);
    mkdir(huskyDirPath);
    mkdir(huskyShDirPath);
    createOrUpdateFile(path.join(huskyShDirPath, "husky.sh"), huskySh, 0o755)
    createOrUpdateFile(path.join(huskyDirPath, "commit-msg"), commitMsg, 0o755)
    createOrUpdateFile(path.join(huskyDirPath, "pre-commit"), preCommit, 0o755)
    const { error } = git(['config', 'core.hooksPath', dir]);
    if (error) {
        throw error;
    }
}
module.exports = {
    sync
}
