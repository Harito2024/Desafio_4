const fs = require('fs').promises

class ProductManager{

    constructor(){
        this.path = 'products.json'
        this.products = []
    }

    async addProduct(newObjet){
        let { title, description, price, thumbnail, code, stock, status, category }= newObjet

        if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category ) {
            console.log('Faltan campos')
            return
        }

        const codeFound = await this.products.find((id) => id.code === code)
        if (codeFound) {
            console.log('Codigo de Producto repetido')
            return
        }

        let existingProducts = await this.getProducts()
        let newId = existingProducts.length
        
        let newProduct = { 
            id: ++ newId,
            title, 
            description,
            price,
            thumbnail,
            code,
            stock,
            status, 
            category
        }

        this.products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct
    }

    async getProducts(){
        const result = await fs.readFile(this.path, 'utf-8')
        const resultJSON = JSON.parse(result)
        this.products = resultJSON
        return resultJSON
    }

    async getProductById(id){
        const result = await this.getProducts()
        const product = result.find((item)=>item.id==id)

        if(product){
            return product
        }
        else{
            console.log('Producto no Encontrado')
        }
    }

    async updateProduct(id, {...data} ){
        const products = await this.getProducts()
        const index = products.findIndex((item) => item.id==id)

        if(index !== -1){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            console.log('Producto Agregado')
            return products[index]
        }else{
            console.log('Producto no Encontrado')
        }
    }

    async deleteProduct(id){
        const products = await this.getProducts()
        const index = products.findIndex((item) => item.id==id)

        if(index !== -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
            console.log('El Producto Fue Borrado')
            
        }else{
            console.log('Producto No se pudo borrar')
        }
    }
}

module.exports = ProductManager
