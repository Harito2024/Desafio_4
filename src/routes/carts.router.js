const express = require('express')
const router = express.Router()
const CartManager= require('../cartManager.js')
const managerCart = new CartManager()


router.post('/carts', async (req, res)=>{
    try {
        const result = await managerCart.newCart()
        res.json(result)
    } catch (error) {
        console.log(error)
        return res.send('Error al crear un nuevo Carrito')
    }
})

router.get('/carts', async (req, res)=>{
    try {
        const result = await managerCart.getCarts()
        res.json(result)
    } catch (error) {
        console.log(error)
        return res.send('Error al leer los productos del Carrito')
    }
})

router.get('/carts/:cid', async (req, res)=>{
    const {cid} = req.params
    try {
        const result = await managerCart.getCartProducts(cid)
        res.json(result)
    } catch (error) {
        console.log(error)
        return res.send('Error al leer los productos del Carrito')
    }
})

router.post('/carts/:cid/products/:pdi', async (req, res)=>{
    const cid = req.params.cid
    const pid = req.params.pdi
    try {
        await managerCart.addProductToCart(cid, pid)
        res.send('Producto agregado')
    } catch (error) {
        console.log(error)
        return res.send('Error al agregar el productos al Carrito')
    }
})

module.exports = router




