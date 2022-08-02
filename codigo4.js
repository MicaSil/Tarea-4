
const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    this.obj = this.readData(this.fileName) || [];
  }

  async getId() {
    try {
      this.obj = (await this.getAll()) || [];
      let puntoId = this.obj.length;
      this.obj.forEach((el) => {
        el.id > puntoId ? (puntoId = el.id) : puntoId;
      });
      return puntoId + 1;
    } catch (err) {
      console.log(err);
    }
  }

  async save(objetos) {
    try {
      const readFile = await this.getAll();
      if (!readFile) {
        objetos.id = await this.getId();
        this.objects.push(objetos);
        this.writeData(this.obj);
        return objetos.id;
      }
      this.obj = readFile;
      objetos.id = await this.getId();
      this.objects.push(objetos);
      this.writeData(this.objects);
      return objetos.id;
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      this.obj = await this.getAll();
      const obje = this.objects.find((el) => el.id === Number(id));
      return obje ? obje : null;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const data = await this.readData(this.fileName);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      this.obj = await this.getAll();
      this.obj = [];
      this.writeData(this.obj);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
    } catch (err) {
      console.log(err);
    }
  }
  readData(path) {
    const data = JSON.parse(fs.readFileSync(path, "utf-8"));
    return data;
  }
  writeData(obj) {
    fs.writeFileSync(this.fileName, JSON.stringify(obj, null, 2));
  }
}
