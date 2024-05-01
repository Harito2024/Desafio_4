/* Le da funcionalidad al Front  index.handlebars*/

const socket = io()
function enviarMensaje(){
    const mensaje = document.getElementById('mensaje').value
    socket.emit('mensaje', mensaje)
}

const boton = document.getElementById('btn-send')
boton.addEventListener('click', ()=>{
    console.log('Click en le boton')
})

socket.on('mensaje', (data)=>{
    console.log(`Mensaje recibido desde el servidor ${data}`)
})

