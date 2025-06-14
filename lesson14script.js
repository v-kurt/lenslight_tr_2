const form = document.querySelector('form');
const emailError = document.querySelector('#email');
const passwordError = document.querySelector('#password');
const usernameError = document.querySelector('#username');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    usernameError.textContent = "";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    usernameError.style.display = "none";

    const email = form.email.value;
    const password = form.password.value;
    const username = form.username.value;

    try {

        const res = await fetch('/users/register', {
            method: "POST",
            body: JSON.stringify({ email, password, username }),
            headers: { "Content-Type": "application/json" }
        })

        const data = await res.json();

        if (data && Object.getOwnPropertyNames(data).length !== 0) {
            if (data.email) {
                emailError.textContent = data.email;
                emailError.style.display = "block"

            }

            if (data.password) {

                passwordError.textContent = data.email;
                passwordError.style.display = "block"

            }

            if (data.username) {

                usernameError.textContent = data.email;
                usernameError.style.display = "block"

            }
        } else {
            location.assign("/login")
        }


    } catch (err) {
        console.log("Err:: ", err)

    }



})


    < div div class = "col-md-12" >
        <div style="display : none" class="alert alert-danger" id="username"> </div>
</ >