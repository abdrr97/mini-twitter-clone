const express = require('express')
const cors = require('cors')
const monk = require('monk')
const Filter = require('bad-words')
const rateLimit = require('express-rate-limit')
// mongo will automatically create db or collection if not exist 
const db = monk(process.env.MONGO_URI || 'localhost/mini_twitter') // initialising our local mongo db named 'mini_twitter'
const tweets = db.get('tweets') // collection inside of our local mongo db
const app = express()
const PORT = 5000
const filter = new Filter()

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

app.get('/tweets', (req, res) => {

    tweets
        .find()
        .then(_tweets => {
            res.json(_tweets)
        })

})
// limit users from spamming
app.use(rateLimit({
    windowMs: 30 * 1000,
    max: 1
}))
app.post('/tweets', (req, res) => {
    if (validated(req.body)) {
        // insert to mongo-db
        let tweet = {
            name: filter.clean(req.body.name.toString()),
            message: filter.clean(req.body.message.toString()),
            created_at: new Date()
        }

        tweets
            .insert(tweet)
            .then(createdTweet => {
                res.json(createdTweet)
            })
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