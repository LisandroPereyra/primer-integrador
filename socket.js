import { Server } from "socket.io";

let io

export const init= (httpServer) => {
    io = new Server(httpServer)
    
    io.on("connection", (clientSocket)=>{

        console.log("client connected", clientSocket.id)
    
        clienteSocket.emit('inicio', 'hola desde el servidor');

        clienteSocket.on('mensaje-cliente', (data) => {

            console.log('data: ' + data);
    })
})
}
