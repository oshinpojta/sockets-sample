// https://stackoverflow.com/questions/71129540/how-to-keep-socket-io-client-in-frontend-code

const serverUrl = "http://localhost:4000"
const socket = io.connect(serverUrl); // io.connect(serverUrl);

socket.on("connect", function () {
    console.log("Connected to Server");
})


// goes to the server, the server takes this function as callback and calls it with an object
socket.emit( "message", {
    from : "Oshin",
    text : "Hello Server"
}, function (object){
    console.log("Acknowledged ", object.text);
})

socket.on("message", function(message){
    console.log("server", message)
    console.log("Received At : ", moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
})

socket.on("disconnect", function () {
    console.log("User Disconnected");
})