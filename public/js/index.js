let USERInfo = null;
(async () => {
  USERInfo = await getUserInfo();
})();

const elAllusers = document.querySelector(".sideBar");
const elAllusersTemplate = document.querySelector(".sideBar-template").content;
const elOwnImage = document.querySelector(".js-own-image");
const elexit = document.querySelector(".btn-exit");
const elConversation = document.querySelector(".conversation");

document.querySelector(".sideBar").addEventListener("click", async (evt) => {
  evt.preventDefault();
  // elConversation.hidden = false;
  const target = evt.target.dataset.id;
  console.log(target);

  await userChat(USERInfo, target);
});

elexit.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userInfo");
  window.location.href = "/login";
});