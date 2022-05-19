const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');




(async () => {
    const templatePath = path.join(__dirname, 'template.html')
    const projectDirPath = path.join(__dirname, 'project-dist')
    const componentsPath = path.join(__dirname, 'components')
    const stylesDirPath = path.join(__dirname, 'styles')

    // Создаем папку

    try {
        await fsPromises.access(projectDirPath)
    }
    catch {
        await fsPromises.mkdir(projectDirPath)
    }

    await fsPromises.rm(projectDirPath, { recursive: true })
    await fsPromises.mkdir(projectDirPath)


    // Читаем html

    const templateFile = await fsPromises.readFile(templatePath, 'utf-8')
    let result = templateFile

    // Читаем папку комнонетов и собираем html

    const components = await fsPromises.readdir(componentsPath)
    components.forEach(async (component) => {

        const componentPath = path.join(componentsPath, component)

        if (path.extname(componentPath) === '.html') {
            const InnerComponent = await fsPromises.readFile(componentPath, 'utf-8')
            result = result.split(`{{${component.split('.')[0]}}}`).join(InnerComponent)
            await fsPromises.writeFile(path.join(projectDirPath, 'index.html'), result)
        }
    })

    // Собираем стили

    // const output = fs.createWriteStream(path.join(projectDirPath, 'style.css'), 'utf-8')
    const styleFiles = await fsPromises.readdir(stylesDirPath)

    styleFiles.forEach(async file => {
        const filePath = path.join(stylesDirPath, file)

        if (path.extname(filePath) === '.css') {
            // const input = fs.createReadStream(filePath, 'utf-8')
            // input.pipe(output)
            const innerFile = await fsPromises.readFile(filePath)
            try {
                await fsPromises.appendFile(path.join(projectDirPath, 'style.css'), `${innerFile}\n`)
            }
            catch (err) {
                console.error(err)
            }
        }
    })

    // Копируем assets

    const assetsPath = path.join(__dirname, 'assets')
    const newDirPath = path.join(projectDirPath, 'assets')

    const copyDir = async (sourcePath, newPath) => {

        await fsPromises.mkdir(newPath)
        const assetsFiles = await fsPromises.readdir(sourcePath, { withFileTypes: true })
        assetsFiles.forEach(async file => {

            if(file.isFile()){
                await fsPromises.copyFile(path.join(sourcePath, file.name), path.join(newPath, file.name))
            }
            else{
                
                copyDir(path.join(sourcePath, file.name), path.join(newPath, file.name))
            }
        })
    }

    
    copyDir(assetsPath, newDirPath)
    
})()