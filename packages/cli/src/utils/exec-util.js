const child_process = require("child_process")
module.exports ={
    execSync: (command, options = { stdio: 'inherit' }) => {
        return child_process.execSync(command, options)
    }
}
