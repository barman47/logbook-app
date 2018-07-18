// var form = document.loginForm;
// var loginButton = form.loginButton;
// var registrationNumber = form.regNo;
// var password = form.password;
// var regNoErrorMessage = document.querySelector('#regNoErrorMessage');
// var passwordError = document.querySelector('#passwordErrorMessage');

// function isEmpty (element) {
//     if (element.value === '' || element.value.trim() === '') {
//         return true;
//     } else {
//         return false;
//     }
// }

// form.addEventListener('submit', function (event) {
//     if (isEmpty(registrationNumber) || password.value === '') {
//         event.preventDefault();
//         alert('Please provide your registration number and password.');
//         if (isEmpty(registrationNumber) === false) {
//             password.focus();
//             password.style.borderColor = 'orange';
//             passwordError.className = 'errorMessage';
//         } else {
//             registrationNumber.focus();
//             registrationNumber.style.borderColor = 'orange';
//             regNoErrorMessage.className = 'errorMessage';
//         }
//     } else {
//         registrationNumber.style.borderColor = 'whitesmoke';
//         password.style.borderColor = 'whitesmoke';
//         passwordError.className = 'noErrorMessage';
//         regNoErrorMessage.className = 'noErrorMessage';
//     }
// }, false);

// registrationNumber.addEventListener('focusout', function () {
//     if (!isEmpty(registrationNumber)) {
//         registrationNumber.style.borderColor = 'whitesmoke';
//         regNoErrorMessage.className = 'noErrorMessage';
//     } else {
//         registrationNumber.style.borderColor = 'orange';
//         regNoErrorMessage.className = 'errorMessage';
//     }
// });

// password.addEventListener('focusout', function () {
//     if (!isEmpty(password)) {
//         password.style.borderColor = 'whitesmoke';
//         passwordError.className = 'noErrorMessage';
//     } else {
//         password.style.borderColor = 'orange';
//         passwordError.className = 'errorMessage';
//     }
// });
