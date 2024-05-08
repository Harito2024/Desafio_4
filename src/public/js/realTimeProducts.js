const socket = io();
const divListProducts = document.getElementById('listProducts');
const mensaje = document.createElement('p');
const btnEnviar = document.getElementById('btnEnviar');

//btnEliminar.addEventListener('click')

btnEnviar.addEventListener('click', () => {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value 
    const thumbnail = document.getElementById('thumbnail').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value
    const status = document.getElementById('status').value;
    const category = document.getElementById('category').value;
    
    socket.emit('newProduct', {title, description, price, thumbnail, code, stock, status, category})

    /* const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    socket.emit('nuevoProducto', {title, description, price, code, stock}); */
})

socket.on('products', products => {
    divListProducts.innerHTML = ``;
    products.forEach(product => {
        const p = document.createElement('p');
        const btnBorrar = document.createElement('button');

        btnBorrar.innerHTML = 'Eliminar';
        btnBorrar.addEventListener('click', () => {
            socket.emit('eliminarProducto', product.id)
        });
        p.innerHTML = `<strong>Title: </strong>${producto.title}, <strong>Description: </strong>${producto.description},
        <strong>Price: </strong>${product.price}, <strong>Code: </strong>${product.code},
        <strong>Stock: </strong>${product.stock}`;
        divListProducts.appendChild(p);
        divListProducts.appendChild(btnBorrar);
    });
})

socket.on('resAdd', mensajeRespuesta => {
    mensaje.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListProducts.appendChild(mensaje);
})

socket.on('resDelete', mensajeRespuesta => {
    mensaje.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListProducts.appendChild(mensaje);
})