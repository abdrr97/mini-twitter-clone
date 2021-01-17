const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000


app.use(cors()) // cors works as middleware to prevent 'CORS ORIGIN ERROR'
app.use(express.json()) // this allow upcoming requests to read json data

app.listen(PORT, () => {
    console.log('Listening on port 5000');
})

app.get('/', (req, res) => {
    res.json({
        message: 'twitter is COOL 😁'
    })
})

app.post('/tweet', (req, res) => {
    if (validated(req.body)) {
        // insert to mongo-db
        let tweet = {
            name: req.body.name.toString(),
            message: req.body.message.toString(),
        }
        console.log(tweet);
    } else {
        res.status(422)
        res.json({
            'message': 'Hey! name and message are required '
        })
    }
})

function validated(tweet) {
    return tweet.name && tweet.name.toString().trim() !== '' &&
        tweet.message && tweet.message.toString().trim() !== ''
}