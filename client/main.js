let form = document.querySelector('form')
let loading = document.querySelector('.loading')
const API_URL = 'http://127.0.0.1:5000/tweets'
const tweet_list = document.querySelector('.tweets-list')

getTweets()

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
        .then(res => res.json())
        .then((createdTweet) => {
            form.reset()
            form.style.display = ''
            getTweets()
        })
});

function getTweets() {
    tweet_list.innerHTML = ''
    form.style.display = 'none'
    loading.style.display = ''
    fetch(API_URL)
        .then(res => res.json())
        .then(tweets => {
            tweets.reverse()
            console.log(tweets);
            tweets.forEach((tweet) => {
                const div = document.createElement('div')
                const header = document.createElement('h3')
                header.textContent = tweet.name
                const message = document.createElement('p')
                message.textContent = tweet.message
                const date = document.createElement('small')
                let created_at = moment(tweet.created_at.toString(), "YYYY-MM-DD");
                date.textContent = created_at.fromNow()
                div.appendChild(header)
                div.appendChild(message)
                div.appendChild(date)
                tweet_list.appendChild(div)
            })
        }).finally(() => {
            form.style.display = ''
            loading.style.display = 'none'
        })
}
