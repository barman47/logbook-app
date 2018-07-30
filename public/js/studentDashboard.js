var content = document.querySelector('#content');
var overlay = document.querySelector('.overlay');
var spinner = document.querySelector('.spinner');

var modal = document.querySelector('#modal');
var profileLink = document.querySelector('#profile');
var closeButton = document.querySelector('.close');


setTimeout(function () {
    content.classList.add('visible');
    overlay.classList.add('invisible');
    spinner.classList.add('invisible');
}, 3000);

profileLink.addEventListener('click', function (e) {
    modal.style.display = 'block';
}, false);

closeButton.addEventListener('click', function (e) {
    modal.style.display = 'none';
}, false);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}