var content = document.querySelector('#content');
var overlay = document.querySelector('.overlay');
var spinner = document.querySelector('.spinner');

var modal = document.querySelector('#modal');
var aboutModal = document.querySelector('#aboutModal');
var iftModal = document.querySelector('#itfModal');

var profileLink = document.querySelector('#profile');
var aboutLink = document.querySelector('#about');
var locateLink = document.querySelector('#locations');
var closeButton = document.querySelector('.close');
var aboutModalCloseButton = document.querySelector('#aboutModalClose');
var itfModalCloseButton = document.querySelector('#itfModalClose');

var editButton = document.querySelector('#editButton');
var saveButton = document.querySelector('#saveButton');
var cancelButton = document.querySelector('#cancelButton');

var inputs = document.querySelectorAll('input');
var password = document.querySelector('#password').value;

setTimeout(function () {
    content.classList.add('visible');
    overlay.classList.add('invisible');
    spinner.classList.add('invisible');
}, 3000);

function disableInputs () {
    inputs.forEach(function (input) {
        input.disabled = true;
    });
}
function enableInputs () {
    inputs.forEach(function (input) {
        input.disabled = false;
    });
}

function showSpinner () {
    $('.overlay').css('opacity', 1);
    $('.overlay').css('z-index', 2);
    $('.spinner').css('opacity', 1);
    $('.spinner').css('z-index', 3);
}

function hideSpinner () {
    $('.overlay').css('opacity', 0);
    $('.overlay').css('z-index', -1);
    $('.spinner').css('opacity', 0);
    $('.spinner').css('z-index', -1);
} 

aboutLink.addEventListener('click', function (e) {
    aboutModal.style.display = 'block'
}, false);

aboutModalCloseButton.addEventListener('click', function () {
    aboutModal.style.display = 'none';
});

locateLink.addEventListener('click', function () {
    iftModal.style.display = 'block';
}, false);

itfModalCloseButton.addEventListener('click', function () {
    iftModal.style.display = 'none';
}, false);

profileLink.addEventListener('click', function (e) {
    modal.style.display = 'block';
}, false);

closeButton.addEventListener('click', function (e) {
    disableInputs();
    modal.style.display = 'none';
}, false);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        disableInputs();
        modal.style.display = "none";
    }
}

editButton.addEventListener('click', function () {
    enableInputs();
}, false);
saveButton.addEventListener('click', function () {}, false);

cancelButton.addEventListener('click', function () {
    disableInputs();
    modal.style.display = "none";
}, false);

$(document).ready(function () {
    $('#saveButton').on('click', function (e) {
        showSpinner();
       var newPassword = document.querySelector('#password').value;
        if (newPassword === password) {
            password = 'empty';
        } else {
            password = newPassword;
        }
        $target = $('#saveButton');
        const id = $target.attr('data-id');
        const url = `/students/dashboard/${id}`;
        let data = {
            name: $('#studentName').val(),
            regNo: $('#regNo').val(),
            school: $('#school').val(),
            department: $('#department').val(),
            password: password
        }
       setTimeout(function () {
        $('#content').addClass('visible');
        $.ajax(url, {
                type: 'PUT',
                data: data
            }).done (function () {
                alert('Update Successful');
                window.location.href = `/students/dashboard/${id}`;
            }).fail(function (jqXHR, status) {
                alert('Update Unsucessful. Please Try Again. ' + status);
                hideSpinner();
            });
        }, 2000);
    });
});