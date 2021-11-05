let signInComp: HTMLFormElement;

document.addEventListener('DOMContentLoaded', () => {
    signInComp = document.getElementById('signInForm') as HTMLFormElement;

    signInComp.addEventListener("submit", signIn);

    /* if (checkLogin()) {
        window.open('home.html');
    } */
});

function signIn(event: Event) {
    event.preventDefault();

    const target: HTMLFormElement = event.currentTarget as HTMLFormElement;
    const formData: FormData = new FormData(target);

    axios.post("/api/v1/admin/auth/login", {
        username: (document.getElementById("loginUsername") as HTMLInputElement).value,
        password: (document.getElementById("loginPassword")as HTMLInputElement).value
    }).then(() => {
        target.reset();
        window.location.href = '/api/v1/admin/home';
    }).catch(() => {
        console.log(formData);
    });



    //TODO: http-request to the server to check if login is authorized


}

// todo sessions
// function checkLogin(): boolean {
//     axios.get("/isLoggedIn").then(() => {
//         return true;
//     }).catch(() => {
//         return false;
//     });
//
//     return false;
// }