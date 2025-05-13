const elForm = document.querySelector(".js-form");


async function getData(data) {
    const response = await fetch("http://localhost:4000/api/auth/register",
        {
            method: "POST",
       
            body: data
        }
    );
    const result = await response.json();
    return result;
}

elForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const data = new FormData(elForm);
    const result = await getData(data);
    console.log(result);
    
    if(result.status == 201) {
        window.location.href = "/login";
    } else {
        errorMessage.textContent = result;
    }
    
});