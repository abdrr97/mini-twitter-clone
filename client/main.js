let form = document.querySelector('form')
let loading = document.querySelector('.loading')
const API_URL = 'http://127.0.0.1:5000/tweet'

loading.style.display = 'none'

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let formdata = new FormData(form)
    let name = formdata.get('name')
    let message = formdata.get('message')

    let tweet = {
        name,
        message
    }
    form.style.display = 'none'
    loading.style.display = ''

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    })
    // .then((res) => {
    //     console.log(`Error ${res.error}`);
    // }).finally((res) => {
    //     form.style.display = ''
    //     loading.style.display = 'none'
    // })
});