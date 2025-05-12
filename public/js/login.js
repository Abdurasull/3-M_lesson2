const elForm = document.querySelector(".form");


async function getData(data){
    const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        body: data
    });
    return await res.json();
}

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const data = new FormData(elForm);
    const obj = Object.fromEntries(data.entries());
    console.log(obj);
    const result = await getData(data);
    if(result.status == 200) {
        window.localStorage.setItem("token", result.data.token);
        window.localStorage.setItem("userInfo", JSON.stringify(result.data.userInfo));
        alert(result.message);
        window.location.href = "/";
    } else {
        errorMessage.textContent = result;
    }
    
    
})