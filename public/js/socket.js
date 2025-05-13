const connectSocket = () => {
    const token = localStorage.getItem("token");
    if(!token) {
        window.location.href = "/login";
        return null;
    };
    const socket = io("https://three-m-lesson2.onrender.com", {
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