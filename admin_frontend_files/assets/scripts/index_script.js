var signInComp;
document.addEventListener('DOMContentLoaded', function () {
    signInComp = document.getElementById('signInForm');
    signInComp.addEventListener("submit", signIn);
    /* if (checkLogin()) {
        window.open('home.html');
    } */
});
function signIn(event) {
    event.preventDefault();
    var target = event.currentTarget;
    var formData = new FormData(target);
    axios.post("/api/v1/admin/auth/login", {
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value
    }).then(function () {
        target.reset();
        window.location.href = '/api/v1/admin/home';
    }).catch(function () {
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
//# sourceMappingURL=index_script.js.map