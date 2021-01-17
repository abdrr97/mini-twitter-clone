let form = document.querySelector('form')
let loading = document.querySelector('.loading')

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
});