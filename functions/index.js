const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello world!");
});

exports.getUsers = functions.https.onRequest((request, response) => {
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
});

exports.createUser= functions.https.onRequest((request, response) => {
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