var form = document.studentRegisterForm;
var submitButton = form.submitButton;
var inputs = [
    [form.studentName, /^[\w ]{2,}$/i, document.querySelector('#studentNameErrorMessage')],
    [form.department, /^[\w .-]{2,}$/i, document.querySelector('#departmentErrorMessage')],
    [form.registrationNumber, /^MOUAU\/[0-9]{1,2}\/[0-9]{1,5}$/i, document.querySelector('#registrationNumberErrorMessage')],
    [form.password, /^[\w@-]{8,20}$/, document.querySelector('#passwordErrorMessage')],
    [form.confirmPassword, /^[\w@-]{8,20}$/, document.querySelector('#confirmPasswordErrorMessage')],
];

function validate () {
    //Keyup events start//
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

    inputs[3][0].addEventListener('keyup', function (event) {
        if (inputs[3][1].test(inputs[3][0].value)) {
            inputs[3][2].className = 'noErrorMessage';
            inputs[3][0].classList.add('valid');
            inputs[3][0].classList.remove('invalid');
        } else {
            inputs[3][2].className = 'errorMessage';
            inputs[3][0].classList.add('invalid');
            inputs[3][0].classList.remove('valid');
        }
    }, false);

    inputs[4][0].addEventListener('keyup', function (event) {
        if (inputs[4][0].value === inputs[3][0].value) {
            inputs[4][2].className = 'noErrorMessage';
            inputs[4][0].classList.add('valid');
            inputs[4][0].classList.remove('invalid');
        } else {
            inputs[4][2].className = 'errorMessage';
            inputs[4][0].classList.add('invalid');
            inputs[4][0].classList.remove('valid');
        }
    }, false);
    // keyup events end

    //focusout event start //
    inputs[0][0].addEventListener('focusout', function (event) {
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
    
    inputs[1][0].addEventListener('focusout', function (event) {
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
    
    inputs[2][0].addEventListener('focusout', function (event) {
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

    inputs[3][0].addEventListener('focusout', function (event) {
        if (inputs[3][1].test(inputs[3][0].value)) {
            inputs[3][2].className = 'noErrorMessage';
            inputs[3][0].classList.add('valid');
            inputs[3][0].classList.remove('invalid');
        } else {
            inputs[3][2].className = 'errorMessage';
            inputs[3][0].classList.add('invalid');
            inputs[3][0].classList.remove('valid');
        }
    }, false);

    inputs[4][0].addEventListener('focusout', function (event) {
        if (inputs[4][0].value === inputs[3][0].value) {
            inputs[4][2].className = 'noErrorMessage';
            inputs[4][0].classList.add('valid');
            inputs[4][0].classList.remove('invalid');
        } else {
            inputs[4][2].className = 'errorMessage';
            inputs[4][0].classList.add('invalid');
            inputs[4][0].classList.remove('valid');
        }
    }, false);
}
    //focusout events ends//

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
