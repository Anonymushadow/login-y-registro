const registerButton = document.querySelector(".register__send__button");

registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const user = document.querySelector(".user__input").value;
    const password = document.querySelector(".password__input").value;
    const rol = document.getElementById('opciones').value; 
    const data = {
        userData:{
            user,
            password,
            rol
        },
        userClearData:{
            user,
            rol
        }
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.text()
                .then(message => {
                    throw new Error(message)
                });
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        window.location.href = "/";
    })
    .catch(error => {
        alert(error);
    });
})