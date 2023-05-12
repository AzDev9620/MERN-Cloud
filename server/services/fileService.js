const fs = require('fs')
const File = require('../models/File')

class FileService {

    createDir(file) {
        const filePath = `${process.env.FilePath}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'Файл создан'})
                } else {
                    return reject({message: "Файл уже существует"})
                }
            } catch (e) {
                return reject({message: 'Ошибка файла'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return process.env.FilePath + '\\' + file.user + '\\' + file.path
    }
}


module.exports = new FileService()
