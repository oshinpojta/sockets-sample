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

function joinRoom (username, room){
    socket.emit("join", { user: username, room : room }, function (err){
        if(err){
            alert("Err");
            console.error(err);
        }else{
            console.log("Joined Room!");
        }
    })
}

socket.on("message", function(message){
    console.log("server", message)
    console.log("Received At : ", moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
})

socket.on("disconnect", function (data) {
    console.log("User Disconnected", data);
})


// ---- cannot use "disconnect" (Error: "disconnect" is a reserved event name),
// create manual "disconnect-user" to delete user from room
// setTimeout(()=>{
//     socket.emit("disconnect-user", { "userId" : "123" }, function(err, data){
//         if(err){
//             alert("Err");
//             console.log(err);
//         }else{
//             console.log(data);
//         }
//     })
// },12000)

// scroll to bottom 
function scrollToBottom(parentDivContainer){
    let element = parentDivContainer.lastElementChild;
    element.scrollIntoView();
}