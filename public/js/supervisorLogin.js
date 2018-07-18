var form = document.loginForm;
var loginButton = form.loginButton;
var username = form.username;
var password = form.password;
var usernameErrorMessage = document.querySelector('#usernameErrorMessage');
var passwordErrorMessageMessage = document.querySelector('#passwordErrorMessageMessage');

function isEmpty (element) {
    if (element.value === '' || element.value.trim() === '') {
        return true;
    } else {
        return false;
    }
}

form.addEventListener('submit', function (event) {
    if (isEmpty(username) || password.value === '') {
        event.preventDefault();
        alert('Please provide your username and password.');
        if (isEmpty(password) === false) {
            password.focus();
            password.style.borderColor = 'orange';
            passwordErrorMessage.className = 'errorMessage';
        } else {
            password.focus();
            password.style.borderColor = 'orange';
            usernameErrorMessage.className = 'errorMessage';
        }
    } else {
        password.style.borderColor = 'whitesmoke';
        password.style.borderColor = 'whitesmoke';
        passwordErrorMessage.className = 'noErrorMessage';
        usernameErrorMessage.className = 'noErrorMessage';
    }
}, false);

username.addEventListener('focusout', function () {
    if (!isEmpty(username)) {
        username.style.borderColor = 'whitesmoke';
        usernameErrorMessage.className = 'noErrorMessage';
    } else {
        username.style.borderColor = 'orange';
        usernameErrorMessage.className = 'errorMessage';
    }
});

password.addEventListener('focusout', function () {
    if (!isEmpty(password)) {
        password.style.borderColor = 'whitesmoke';
        passwordErrorMessage.className = 'noErrorMessage';
    } else {
        password.style.borderColor = 'orange';
        passwordErrorMessage.className = 'errorMessage';
    }
});
