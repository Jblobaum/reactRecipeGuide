const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')
const app = express()

admin.initializeApp()




app.get('/users', (req, res)=>{
    admin.firestore()
    .collection('user')
    .get()
    .then(data => {
        let users = [];
        data.forEach(document => {
            users.push(document.data())
        })
        return response.json(users);
    })
    .catch(err => console.log(err));
})

app.post('/user', (request, response) => {
    const newUser = {
        username: request.body.username,
        password: request.body.password
    };
    admin.firestore()
    .collection('user')
    .add(newUser)
    .then((doc)=>{
        response.json({ message: `User ${doc.id} created successfully.`})
    })
    .catch(err => {
        response.status(500).json({ error: 'Something went wrong.'});
        console.log(err);
    });
});






exports.api = functions.https.onRequest(app);