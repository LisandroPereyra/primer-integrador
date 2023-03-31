import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import dbConnection from "./config/connectionDB.js";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
const PORT = 8080;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando en el puerto ${PORT}`);
});

dbConnection()

app.get("/", (req,res) => {

  let products = ProductManager.listarAll();

  const scripts = { socket: '/socket.io/socket.io.js', index: 'index.js', productos : products }

  res.render("index", scripts)

})

const io = new Server(httpServer)

io.on('connection', (clienteSocket) => {
  console.log('Nuevo cliente conectado', clienteSocket.id);

  clienteSocket.emit('inicio', 'hola desde el servidor');

 

})

io.get( "/productsList", (req,res) => {

  let products = ProductManager.listarAll();

  const scripts = { socket: '/socket.io/socket.io.js', index: 'index.js', productos : products }

  res.render("productsList", scripts)
})



clienteSocket.on("products_list", (data) => {

  console.log(data);

  ProductManager.guardar(JSON.parse(data));

})




app.use(useRouter)