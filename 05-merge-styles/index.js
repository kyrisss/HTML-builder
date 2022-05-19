
const fs = require('fs');
const path = require('path');


(async () => {

    const dirPath = path.join(__dirname, 'styles')
    
    try {
        const files = await fs.promises.readdir(dirPath)
        const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8')
        
        files.forEach(  file =>{
           const filePath = path.join(dirPath, file)
           if (path.extname(filePath) === '.css'){
               const input = fs.createReadStream(filePath, 'utf-8')
               input.pipe(output)
           }
       })

    }
    catch (err) {
        console.error(err)
    }
})()