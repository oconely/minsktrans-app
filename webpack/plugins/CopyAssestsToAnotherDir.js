const fs = require('fs');
const path = require('path');

class CopyAssetsToAnotherDir {

    constructor({source, destination, files, job} = {}) {
        this.source = source;
        this.destination = destination;
        this.files = files;
        this.job = job;
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync('CopyAssetsToAnotherDir', (compilation, callback) => {
            // console.log(this.files)
            if (this.job) this.job(this.source, this.destination, this.files);
            // console.log(fs.readdirSync(this.destination));
            this.files.forEach(file => {
                fs.copyFile(path.resolve(this.source + file), this.destination + file, err => {
                    if (err) throw err;
                });
            });
            console.log(this.files.length + ' files was copied to ' + this.destination);

            callback();
        });
    }
}
  
module.exports = CopyAssetsToAnotherDir;