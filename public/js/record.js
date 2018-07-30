var form = document.form;
var submitButton = form.submitButton;
var formElements = [
    [form.mondayTextArea, form.mondayEditButton],
    [form.tuesdayTextArea, form.tuesdayEditButton],
    [form.wednesdayTextArea, form.wednesdayEditButton],
    [form.thursdayTextArea, form.thursdayEditButton],
    [form.fridayTextArea, form.fridayEditButton]
];

var weekMenu = form.week;

function editTextarea (textarea) {
    textarea.disabled = false;
    textarea.focus();
}

function selectWeek () {
    if (weekMenu.value === 'Select Week') {
        alert('Please select a week first');
        weekMenu.focus();
    }
}

// form buttons Event -Start
formElements[0][1].addEventListener('click', function (event) {
    event.preventDefault();
    selectWeek();
    editTextarea(formElements[0][0]);
}, false);

formElements[1][1].addEventListener('click', function (event) {
    event.preventDefault();
    selectWeek();
    editTextarea(formElements[1][0]);
}, false);

formElements[2][1].addEventListener('click', function (event) {
    event.preventDefault();
    selectWeek();
    editTextarea(formElements[2][0]);
}, false);

formElements[3][1].addEventListener('click', function (event) {
    event.preventDefault();
    selectWeek();
    editTextarea(formElements[3][0]);
}, false);

formElements[4][1].addEventListener('click', function (event) {
    event.preventDefault();
    selectWeek();
    editTextarea(formElements[4][0]);
}, false);

// form buttons Event -End

// Main form textareas event start
formElements[0][0].addEventListener('focusout', function () {
    formElements[0][0].disabled = true;
}, false);

formElements[1][0].addEventListener('focusout', function () {
    formElements[1][0].disabled = true;
}, false);

formElements[2][0].addEventListener('focusout', function () {
    formElements[2][0].disabled = true;
}, false);

formElements[3][0].addEventListener('focusout', function () {
    formElements[3][0].disabled = true;
}, false);

formElements[4][0].addEventListener('focusout', function () {
    formElements[4][0].disabled = true;
}, false);

// $(document).ready(function () {
//     $('#submitButton').on('click', function (e) {

//         $(this).html('Submitting Record...');
//         e.preventDefault();
//         $target = $('#submitButton');
//         const id = $target.attr('data-id');
//         const url = `/students/studentRecord/${id}`;
//         let data = {
//             mondayTextArea: $('#mondayTextArea').val(),
//             tuesdayTextArea: $('#tuesdayTextArea').val(),
//             wednesdayTextArea: $('#wednesdayTextArea').val(),
//             thursdayTextArea: $('#thursdayTextArea').val(),
//             fridayTextArea: $('#fridayTextArea').val(),
//             week: $('#week').val(),
//             weekJob: $('#weekJob').val(),
//         };
//         setTimeout(function () {
//             $.ajax(url, {
//                 type: 'PUT',
//                 data: data
//             }).done (function () {
//                 alert('Update Successful');
//                 let redirect = confirm('You will now be logged out');
//                 if (redirect === true) {
//                     window.location.href = '/';
//                 }
//                 $('#submitButton').html('Submit Record');
//             }).fail(function (jqXHR, status) {
//                 alert('Update Unsucessful. Please Try Again. ' + status);
//                 $('#submitButton').html('Submit Record');
//             });
//         }, 1000);
//     });
// });  

// Main form textareas event end

$(document).ready(function () {
    $('#submitButton').on('click', function (e) {
        e.preventDefault();
        $(this).html('Submitting Record...');
        $('.spinner').css('display', 'block');
        $('.overlay').css('display', 'block');
        //$('body').css('backgroundColor', 'rgba(255, 255, 255, 0);');
        $target = $('#submitButton');
        const id = $target.attr('data-id');
        const url = `/students/studentRecord/${id}`;
        let data = {
            mondayTextArea: $('#mondayTextArea').val(),
            tuesdayTextArea: $('#tuesdayTextArea').val(),
            wednesdayTextArea: $('#wednesdayTextArea').val(),
            thursdayTextArea: $('#thursdayTextArea').val(),
            fridayTextArea: $('#fridayTextArea').val(),
            week: $('#week').val(),
            weekJob: $('#weekJob').val(),
        };
        setTimeout(function () {
            $.ajax(url, {
                type: 'PUT',
                data: data
            }).done (function () {
                alert('Update Successful');
                let redirect = confirm('You will now be logged out');
                if (redirect === true) {
                    window.location.href = '/';
                }
                $('.spinner').css('display', 'none');
                $('.overlay').css('display', 'none');
                $('#submitButton').html('Submit Record');
            }).fail(function (jqXHR, status) {
                alert('Update Unsucessful. Please Try Again. ' + status);
                $('.spinner').css('opacity', 'none');
                $('.overlay').css('display', 'none');
                $('#submitButton').html('Submit Record');
            });
        }, 1000);
    });
});   

