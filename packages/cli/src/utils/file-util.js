const fs = require('fs');
const path = require('path');

function mkdir(dirPath) {
    try {
        fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        if (err.code === 'ENOENT') {
            fs.mkdirSync(dirPath);
        } else {
            throw err;
        }
    }
}

function rmdir(dirPath) {
    try {
        fs.rmSync(dirPath, {recursive: true});
    } catch (err) {

    }
}

function createOrUpdateFile(filePath, content, permissions) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    fs.writeFileSync(filePath, content, {mode: permissions});

}
function getState(file) {
    try {
        return fs.statSync(file)
    }catch (e) {
        return undefined;
    }
}
function copy(source, targetDir, modifyFileCallback) {
    let filePaths = [];
    const sourceState = getState(source);
    const targetDirState = getState(targetDir);
    if (!sourceState) {
        return;
    }
    if (sourceState.isFile()) {
        filePaths = [source];
    } else if (sourceState.isDirectory()) {
        filePaths = fs.readdirSync(source).map(x => path.join(source, x));
    }

    if (!targetDirState) {
        mkdir(targetDir);
    } else {
        if (!targetDirState.isDirectory()) {
            return;
        }
    }
    for (const filePath of filePaths) {
        const targetFile = path.join(targetDir, path.basename(filePath));
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            copy(filePath, targetFile)
        } else {
            if (modifyFileCallback) {
                const content = fs.readFileSync(filePath, "utf8");
                const modifyContent = modifyFileCallback(filePath, content);
                fs.writeFileSync(targetFile, modifyContent, 'utf8');
            } else {
                fs.copyFileSync(filePath, targetFile);
            }
        }
    }
}

module.exports = {
    mkdir,
    rmdir,
    createOrUpdateFile,
    copy
};
