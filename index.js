let lista = []

function registerUser() {
    const redColor   = "#e74c3c";
    const greenColor = "#27ae60";

    const inputCep = document.getElementById("input-cep");
    const inputState = document.getElementById("input-state");
    const inputCity  = document.getElementById("input-city");
    const inputNeighborhood = document.getElementById("input-neighborhood");
    const inputStreet = document.getElementById("input-street");
    const message  = document.getElementById("message");

    const cep = inputCep.value;

    if (lista.includes(cep)) {
        message.innerText = "Zip code already registered.";
        message.style.color = redColor;
        return;
    }

    lista.push(cep);
    message.innerText = "Zip code saved sucessfully.";
    message.style.color = greenColor;
}

function fillInField(data) {
    const inputState = document.getElementById("input-state");
    const inputCity  = document.getElementById("input-city");
    const inputNeighborhood = document.getElementById("input-neighborhood");
    const inputStreet = document.getElementById("input-street");

    if (data.state) {
        inputState.value = data.state;
        inputState.disabled = true; 
    }

    if (data.city) {
        inputCity.value = data.city;
        inputCity.disabled = true;
    } 

    if (data.neighborhood) {
        inputNeighborhood.value = data.neighborhood;
        inputNeighborhood.disabled = true;
    }

    if (data.street) {
        inputStreet.value = data.street;
        inputStreet.disabled = true;
    }

}

function getCepInfo() {
    const redColor = "#e74c3c";

    const inputCep = document.getElementById("input-cep");
    const message  = document.getElementById("message");
    const inputState = document.getElementById("input-state");
    const inputCity  = document.getElementById("input-city");
    const inputNeighborhood = document.getElementById("input-neighborhood");
    const inputStreet = document.getElementById("input-street");


    inputState.value = '';
    inputState.disabled = false; 
    inputCity.value = '';
    inputCity.disabled = false;
    inputNeighborhood.value = '';
    inputNeighborhood.disabled = false;
    inputStreet.value = '';
    inputStreet.disabled = false;


    const cep = inputCep.value;

    if (!cep) {
       message.innerText = "CEP field is required.";
       message.style.color = redColor;
       return;
    }

    fetch("https://brasilapi.com.br/api/cep/v2/" + cep)
        .then((response) => response.json())
        .then((data) => fillInField(data));

    message.innerText = '';
    
}

function main() {
    const inputCep = document.getElementById("input-cep");
    inputCep.addEventListener("focusout", getCepInfo);
    const registerButton = document.getElementById("register-button");
    registerButton.addEventListener('click', registerUser)
}

window.addEventListener("load", main);