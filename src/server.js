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

const checkToken = (socket) => {
  const token = socket.handshake.auth.token.split("")[1];

}
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})