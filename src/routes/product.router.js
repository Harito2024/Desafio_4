const express = require('express')
const router = express.Router()
const ProductManager = require('../productManager.js')
const manager = new ProductManager()

router.get('/products', async (req, res) => {
    try {
        let {limit} = req.query
        const products = await manager.getProducts()
        if (limit) {
            const arraylimit = products.slice(0, limit)
            return res.json(arraylimit)
        } else {
            return res.json(products)
        }
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el pedido')
    }
})

router.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params
    try {
        const product = await manager.getProductById(pid)
        res.json(product)
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el producto por ID')
    }
})

router.post('/products', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, status, category} = req.body
        const result = await manager.addProduct({title, description, price, thumbnail, code, stock, status, category})
        res.json(result)
    } catch (error) {
        console.log(error)
        return res.send('Error al agregar un producto nuevo')
    }
})

router.put('/products/:pid', async (req, res)=>{
    const {pid} = req.params
    try {
        const {title, description, price, stock, status, category} = req.body
        const result = await manager.updateProduct(pid,{title, description, price, stock, status, category })
        res.json(result)
    } catch (error) {
        console.log(error)
        return res.send('Error al actulizar el producto por ID')
    }
})
 

router.delete('/products/:pid', async (req, res)=>{
    const {pid} = req.params
    try {
        await manager.deleteProduct(pid)
        res.send('Producto eliminado correctamente')
    } catch (error) {
        console.log(error)
        res.send('No se pudo eliminar el producto')
    }
})



module.exports = router