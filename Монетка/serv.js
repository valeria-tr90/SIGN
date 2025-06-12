const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const crypto = require('crypto')

function encodePassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex')
}

function generateToken (email) {
    const timestamp = Date.now().toString()
    return crypto.createHash('sha256').update(email + timestamp).digest('hex')
}

module.exports = { encodePassword, generateToken }


fetch('http://localhost:3000/sign-up', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password
    })
}).then(response => {
    return response.json()
}).then(data => {
    console.log(data)
})

server.listen(3000, () => {
    console.log('Сервер запущено на http://localhost:3000')
})