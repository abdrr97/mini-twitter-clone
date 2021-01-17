
let form = document.querySelector('form');
// let post_button = document.querySelector('#post');

form.addEventListener('submit',(event)=>{
event.preventDefault();
let formdata = new FormData(form);
    console.log(formdata);
});