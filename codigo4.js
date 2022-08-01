
const fs = require("fs");



class Contenedor {
    constructor(fileName) {
        this.puntoId = 1;
        this.fileName = fileName;
        this.productos = [];
    }

    async getAll() {
        let archivos
        try{
            archivos= JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            return archivos;
        }
        catch(err){
            throw new Error('error read file')
        }
    }

    async deleteAll() {
        let archivos2 = [];
        try{
            await fs.promises.writeFile(this.fileName, JSON.stringify(archivos2));
        }
        catch (err){
            throw new err('error writing file');
        }
    }

    async save(object){
        let newObject = {...object, id: this.puntoId}
        this.productos.push(newObject)
        async function write(file, arr){
            try{
                await fs.promises.writeFile(file, JSON.stringify(arr, null, 2));
            }
            catch (err){
                throw new Error('error writing file');
            }
        }
        await write(this.fileName, this.productos);
        this.puntoId++;
        return newObject.id;
    }

    async deleteById(id) {
        let newProdFile = []
        try {
            let prodFile = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            prodFile.forEach((prod) => {
                if (prod.id !== id) {
                    newProdFile.push(prod)
                }
            })
            await fs.promises.writeFile(this.fileName, JSON.stringify(newProdFile))
        } catch (err) {
            throw new Error('error delete product')
        }
    }

    async getById(id) {
        let e
        try {
            let prodFile = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            prodFile.forEach((prod) => {
                if (prod.id === id) {
                    e = prod;
                }
            })
            if (e) {
                return e;
            } else {
                return null
            }
        } catch (err) {
            throw new Error('error read file')
        }
    }

}
