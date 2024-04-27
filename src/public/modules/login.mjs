const loginButton = document.querySelector(".login__send__button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const user = document.querySelector(".user__input").value;
    const password = document.querySelector(".password__input").value;

    const data = {
        user,
        password
    }

    fetch('/login', {
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