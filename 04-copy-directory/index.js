const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');


(async ()=>{
    const dirCopyPath = path.join(__dirname, 'files-copy')
    const dirPath = path.join(__dirname, 'files')
    try{
        try{
            await fsPromises.access(dirCopyPath)
        }
        catch(err){
            await fsPromises.mkdir(dirCopyPath)
            console.log('Папка создана')
        }
        await fsPromises.rm(dirCopyPath, {maxRetries: 10, recursive: true})
        await fsPromises.mkdir(dirCopyPath)
        const files = await fsPromises.readdir(dirPath)
        files.forEach(async (file) => {
            await fsPromises.copyFile(path.join(dirPath, file), path.join(dirCopyPath, file))
        })

    }
    catch(err){
        console.error(err)
    }
})()
