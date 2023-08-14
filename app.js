const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { generateMessage, generateLoactionMessage } = require("./utils/message")

const app = express();
const server = http.createServer(app);
const io = socket(server);

const static_path = path.resolve(__dirname, "public");
// console.log(static_path);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(static_path));

app.get("/index", (req, res, next) => {
    console.log("Calling index.js");
    res.sendFile(path.resolve(static_path, "index.html"));
})

io.on("connection", (socket) => {
    // socket.emit("connect", {message : "A new User Connected!"});
    console.log("User Connected");

    // socket.on("chat", message => {
    //     console.log("From Client : ", message);
    //     io.emit("chat", message);
    // })

    // send to current connection
    socket.emit("message", {
        from : "Server Admin",
        text : "Hello User, You have joined the Chat app!"
    } )

    // now send to everyone else
    socket.broadcast.emit("message", {
        from : "Server Admin",
        text : "Hello All, One User has joined the Chat app!"
    })
    
    socket.on("message", (message, callback) => {
        console.log("message rec : ",message);
        // io.emit("message", {
        //     from : message.from,
        //     text : message.text,
        //     createdAt : new Date().getTime()
        // })
        socket.broadcast.emit("message", {
            from : message.from,
            text : message.text + " text added to on message ",
            createdAt : new Date().getTime()
        })
        const acknowledgeText = "Server Sent Messages to Everyone else";
        callback({ text : acknowledgeText });
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    })
})

server.listen(4000, () => {
    console.log("Listening on PORT : 4000");
});


// https://stackoverflow.com/questions/71129540/how-to-keep-socket-io-client-in-frontend-code