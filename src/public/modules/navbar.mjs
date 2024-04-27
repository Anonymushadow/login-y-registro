const contentContainer = document.querySelector(".content__container");
const inicioButton = document.querySelector(".navbar__inicio__button");
const profesorButton = document.querySelector(".navbar__profesor__button");
const adminButton = document.querySelector(".navbar__admin__button");
const profileButton = document.querySelector(".navbar__perfil__button");
const loginButton = document.querySelector(".navbar__login__button");
const registerButton = document.querySelector(".navbar__register__button");
const logoutButton = document.querySelector(".navbar__logout__button");

if (inicioButton) {
    inicioButton.addEventListener("click", () => window.location.href = "/");
}

if (adminButton) {
    adminButton.addEventListener("click", () => window.location.href = "/admin");
}

if (profesorButton) {
    profesorButton.addEventListener("click", () => window.location.href = "/profesor");
}

if (profileButton) {
    profileButton.addEventListener("click", () => window.location.href = "/my-profile");
}

if (loginButton) {
    loginButton.addEventListener("click", () => window.location.href = "/login");
}

if (registerButton) {
    registerButton.addEventListener("click", () => window.location.href = "/register");
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        fetch("/logout")
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
                console.log(data)
                alert(data);
                window.location.href = "/";
            })
            .catch(error => {
                console.log(error)
                alert(error);
            });
    });
}