const { stdin: input, stdout, exit } = require('process');
const fs = require('fs');
const path = require('path');



(async ()=>{
    const pathToDir = path.join(__dirname, 'secret-folder')

    const files = await fs.promises.readdir(pathToDir, {withFileTypes: true})
    
    files.forEach( async (file) =>  {
        if(file.isFile()){
            const ext = path.extname(path.join(pathToDir, file.name))
            const stat = await fs.promises.stat(path.join(pathToDir, file.name))
            console.log(`${file.name.split('.')[0]} - ${ext.slice(1)} - ${stat.size}b`)
        }
    })
})()