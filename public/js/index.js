const elOwnImage = document.querySelector(".js-own-image");
alert(JSON.parse(window.localStorage.getItem("userInfo")).avatar);

if(window.localStorage.getItem("userInfo")) {
  elOwnImage.src = JSON.parse(window.localStorage.getItem("userInfo")).avatar;
} else {
  window.location.href = "/login";
}
