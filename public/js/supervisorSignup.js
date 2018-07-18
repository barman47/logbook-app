var form = document.supervisorRegisterForm;
var submitButton = form.submitButton;
var inputs = [
    [form.supervisorName, /^[\w ]{2,}$/i, document.querySelector('#supervisorNameErrorMessage')],
    [form.username, /^[a-z\d]{5,12}$/i, document.querySelector('#supervisorUsernameErrorMessage')],
    [form.password, /^[\w@-]{8,20}$/, document.querySelector('#passwordErrorMessage')]
];

function validate () {
    inputs[0][0].addEventListener('keyup', function (event) {
        if (inputs[0][1].test(inputs[0][0].value)) {
            inputs[0][2].className = 'noErrorMessage';
            inputs[0][0].classList.add('valid');
            inputs[0][0].classList.remove('invalid');
        } else {
            inputs[0][2].className = 'errorMessage';
            inputs[0][0].classList.add('invalid');
            inputs[0][0].classList.remove('valid');
        }
    }, false);
    
    inputs[1][0].addEventListener('keyup', function (event) {
        if (inputs[1][1].test(inputs[1][0].value)) {
            inputs[1][2].className = 'noErrorMessage';
            inputs[1][0].classList.add('valid');
            inputs[1][0].classList.remove('invalid');
        } else {
            inputs[1][2].className = 'errorMessage';
            inputs[1][0].classList.add('invalid');
            inputs[1][0].classList.remove('valid');
        }
    }, false);
    
    inputs[2][0].addEventListener('keyup', function (event) {
        if (inputs[2][1].test(inputs[2][0].value)) {
            inputs[2][2].className = 'noErrorMessage';
            inputs[2][0].classList.add('valid');
            inputs[2][0].classList.remove('invalid');
        } else {
            inputs[2][2].className = 'errorMessage';
            inputs[2][0].classList.add('invalid');
            inputs[2][0].classList.remove('valid');
        }
    }, false);
}

form.addEventListener('submit', function (event) {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i][0].value === '' || inputs[i][0].value.trim() === '') {
            event.preventDefault();
            inputs[i][0].classList.add('invalid');
            inputs[i][2].className = 'errorMessage';
            inputs[i][0].focus();
            break;
        }

        if (inputs[i][0].classList.value.includes('invalid')) {
            event.preventDefault();
            inputs[i][0].focus();
            break;
        }
    }
}, false);

validate();
