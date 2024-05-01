const socket = io();
const divListaProductos = document.getElementById('listaProductos');
const mensaje = document.createElement('p');
const btnEnviar = document.getElementById('btnEnviar');

//btnEliminar.addEventListener('click')

btnEnviar.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    socket.emit('nuevoProducto', {title, description, price, code, stock});
})

socket.on('productos', productos => {
    divListaProductos.innerHTML = ``;
    productos.forEach(producto => {
        const p = document.createElement('p');
        const btnEliminar = document.createElement('button');

        btnEliminar.innerHTML = 'Eliminar';
        btnEliminar.addEventListener('click', () => {socket.emit('eliminarProducto', producto.id)});
        p.innerHTML = `<strong>Title: </strong>${producto.title}, <strong>Description: </strong>${producto.description},
        <strong>Price: </strong>${producto.price}, <strong>Code: </strong>${producto.code},
        <strong>Stock: </strong>${producto.stock}`;
        divListaProductos.appendChild(p);
        divListaProductos.appendChild(btnEliminar);
    });
})

socket.on('respuestaAdd', mensajeRespuesta => {
    mensaje.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListaProductos.appendChild(mensaje);
})

socket.on('respuestaDelete', mensajeRespuesta => {
    mensaje.innerHTML = `<strong>${mensajeRespuesta}</strong>`;
    divListaProductos.appendChild(mensaje);
})