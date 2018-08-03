var form = document.loginForm;
var loginButton = form.loginButton;
var registrationNumber = form.regNo;
var password = form.password;
var regNoErrorMessage = document.querySelector('#regNoErrorMessage');
var passwordError = document.querySelector('#passwordErrorMessage');

function isEmpty (element) {
    if (element.value === '' || element.value.trim() === '') {
        return true;
    } else {
        return false;
    }
}

form.addEventListener('submit', function (event) {
    if (isEmpty(registrationNumber) || password.value === '') {
        event.preventDefault();
        alert('Please provide your registration number and password.');
        if (isEmpty(registrationNumber) === false) {
            password.focus();
            password.style.borderColor = 'orange';
            passwordError.className = 'errorMessage';
        } else {
            registrationNumber.focus();
            registrationNumber.style.borderColor = 'orange';
            regNoErrorMessage.className = 'errorMessage';
        }
    } else {
        registrationNumber.style.borderColor = 'whitesmoke';
        password.style.borderColor = 'whitesmoke';
        passwordError.className = 'noErrorMessage';
        regNoErrorMessage.className = 'noErrorMessage';
    }
}, false);

$('#touch').click(function () {
    $(this).hide();
    $('.tooltip').hide()
    $('form').animate({
        top: "+=1000"
    }, 1000, "linear", function () {
        $('#regNo').focus();
    });
});

$('.tooltiptext').click(function () {
    $('.tooltip').hide();
    $('#touch').hide();
    $('form').animate({
        top: "+=1000"
    }, 1000, function () {
        $('#regNo').focus();
    });
});
