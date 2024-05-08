const express = require('express')
const app = express()
const PORT = 8080
/* const handlebars = require('express-handlebars')  */
const productsRouter = require('./routes/product.router.js')
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.routes.js')
//importar "Server"
const {Server} = require('socket.io')
const httpServer = app.listen(PORT, ()=>console.log(`Servidor el puerto: ${PORT}`));
const ProductManager = require('./productManager.js')
const manager = new ProductManager('./products.json')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
const socketServer = new Server(httpServer)

/* app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public')) */


//Rutas
app.use('/api', productsRouter)
app.use('/api', cartsRouter)
app.use('/', viewsRouter)



socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')

    manager.getProducts()
    .then((products)=>{
        socket.emit('products', products)
    })

    socket.on('newProduct', product=>{
        manager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.status, product.category)
        .then(()=>{
            manager.getProducts()
            .then((products)=>{
                socket.emit('products', products)
                socket.emit('resAdd', 'PRoducto agregado correctamente')
            })
        })
        .catch((error)=>{
            socket.emit('resAdd', 'Error al agregar producto ' + error)
        })
    })

    socket.on('deletedProduct', pid => {
        manager.deleteProduct(pid)
        .then(() => {
            manager.getProducts()
            .then((products) => {
                socket.emit('products', products);
                socket.emit('resDelete', "Producto eliminado correctamente");
            })            
        })
        .catch((error) => socket.emit('resDelete', "Error al eliminar el producto", error))
    })

})

/*     socket.on('mensaje', (data)=>{
        console.log(`Mensaje recibido desde el front ${data}`)
        socketServer.emit('mensaje', data)

    })

     */
    



/* app.listen(PORT, ()=>{
    console.log(`Server is runnin on ${PORT}`)
}) */
