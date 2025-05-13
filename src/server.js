const express = require('express');
const fileUpload = require('express-fileupload');
const config = require("config");
const {createServer} = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const viewsRouter = require('./routes/views.routes');
const serverConfig = require('./config');
const mainRouter = require('./routes/main.router');
const model = require('./model/module');
const { ClientError } = require('./utils/error');
const { verifyToken } = require('./lib/jwt');



const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), "src", 'views'));
app.use(cors());
app.use(model);

app.use("/api", mainRouter);

app.use(viewsRouter);

const PORT = serverConfig.PORT;

const onlineUsers = new Map();

const checkToken = async (socket) => {
  const token = socket.handshake.auth.token.split(" ")[1];
  if(!token) throw new ClientError("Token not found", 401);
  const userToken = verifyToken(token);
  return userToken;
}
io.on("connection", async (socket) => {
  const user = await checkToken(socket);
  onlineUsers.set(user.id, socket.id);
  
  io.emit('userConnection', user.email);
  io.emit('onlineUsers', Array.from(onlineUsers.keys()));
  socket.on("disconnect", () => {
    onlineUsers.delete(user.id);
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})