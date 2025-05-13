const connectSocket = () => {
    const token = localStorage.getItem("token");
    if(!token) {
        window.location.href = "/login";
        return null;
    };
    const socket = io("http://localhost:4000", {
        auth: {
            token: `Bearer ` + token
        }
    });
    return socket;
};

const socket = connectSocket();


socket.on("userConnection", (data) => {
    console.log(data);
    });
   
socket.on('onlineUsers', (users) => {
    console.log(users);
});