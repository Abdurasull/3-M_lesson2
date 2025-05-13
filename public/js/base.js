function AllUsers(data){
  elOwnImage.src = JSON.parse(window.localStorage.getItem("userInfo")).avatar;
    if(data.users.length == 0){
         elAllusers.innerHTML = `<h2 class="text-center">No users found</h2>`;

    } else {
      elAllusers.innerHTML = "";
      const elAllusersFragment = document.createDocumentFragment();
      document.querySelector(".heading-avatar-name").textContent = data.user.name;
      data.users.forEach(user => {
        if(user.id !=data.user.id){
          const Clone = elAllusersTemplate.cloneNode(true);
          Clone.querySelector(".js-own-image").src = user.avatar;
          Clone.querySelector(".js-own-image").dataset.id = user.id;
          Clone.querySelector(".name-meta").textContent = user.name;
          Clone.querySelector(".name-meta").dataset.id = user.id;
          Clone.querySelector(".time-meta").textContent = user.createdAt;
          Clone.querySelector(".time-meta").dataset.id = user.id;
          elAllusersFragment.append(Clone);
        }
      });
      elAllusers.append(elAllusersFragment); 
    }
};
    
const getUserInfo = async () =>{
    const res = await fetch("http://localhost:4000/api/get/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
    });
    const data = await res.json();
    if(data.status != 200 ){
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userInfo");
      window.location.href = "/login";
    } else {
      AllUsers(data.data);
    }
    return data;
  };

const userChat = async (USERInfo, id) => {
  
  const user = USERInfo.data.users.find(user => user.id == id);
  console.log(user);
  
  
  document.querySelector(".js-chat-image").src = user.avatar;
  document.querySelector(".heading-name-meta").textContent = user.name;
  elConversation.hidden = false;
}