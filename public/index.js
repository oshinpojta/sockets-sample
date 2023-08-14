// https://stackoverflow.com/questions/71129540/how-to-keep-socket-io-client-in-frontend-code

const serverUrl = "http://localhost:4000"
const socket = io.connect(serverUrl); // io.connect(serverUrl);

socket.on("connect", function () {
    console.log("Connected to Server");
})

socket.emit( "message", {
    from : "Oshin",
    text : "Hello Server"
})

socket.on("message", function(message){
    console.log("server", message)
})

socket.on("disconnect", function () {
    console.log("User Disconnected");
})