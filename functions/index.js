const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')
const app = express()
const firebase = require('firebase')

const config = {
    apiKey: "AIzaSyCwY4ACregr0vS4hqMTxxUJupggiarGlJY",
    authDomain: "recipeguidereact.firebaseapp.com",
    databaseURL: "https://recipeguidereact.firebaseio.com",
    projectId: "recipeguidereact",
    storageBucket: "recipeguidereact.appspot.com",
    messagingSenderId: "869075519410",
    appId: "1:869075519410:web:7587023a10e78ac77146ab",
    measurementId: "G-NDSQGY350M"
};

admin.initializeApp()

firebase.initializeApp(config)
const db = admin.firestore();




app.get('/users', (req, res) => {
    db
        .collection('user')
        .get()
        .then(data => {
            let users = [];
            data.forEach(document => {
                users.push({
                    userId: doc.id,
                    username: doc.data().username
                });
            });
            return response.json(users);
        })
        .catch(err => console.log(err));
});


// ----------------------------------------------------------------
const isEmpty = (string) => {
    if (string.trim() === '') {
        return true
    } else {
        return false
    }
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true
    else return false
};

const FBAuth = (req, res, next) =>{
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('no token found');
        return res.status(403).json({ error: 'Unauthorized' })
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            return db.collection('users').where('userId', '==', req.user.uid)
                .limit(1)
                .get()
        })
        .then(data => {
            req.user.username = data.docs[0].data().username;
            return next()
        })
        .catch(err => {
            console.error('Error while verifying token', err);
            return res.status(403).json(err);
        })
};


// --------------------------------------------------

app.post('/signup', (req, res) => {
    const newUser = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        confirmPassword: request.body.confirmPassword
    };


    let errors = {}

    if (isEmpty(newUser.email)) {
        errors.email = 'Must not be empty'
    } else if (!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(newUser.password)) { errors.password = 'Must not be empty' };
    if (newUser.password !== newUser.confirmPassword) { errors.confirmPassword = 'Passwords must match' };
    if (isEmpty(newUser.username)) { errors.username = 'Must not be empty' };
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    let token;
    let userId;
    db.document(`/users/${newUser.username}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ username: 'username taken' })
            }
            else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                username: newUser.username,
                email: newUser.email,
                userId
            };
            return db.document(`/users/${newUser.username}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })

        .catch(err => {
            console.error(err)
            if (err.code === 'auth/email-already-in-use') {
                return response.status(400).json({ email: 'Email is already in use' });
            } else {
                return response.status(500).json({ error: err.code });
            }

        });
})


// --------------------------------------------------------------------------------------

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    let errors = {}
    if (isEmpty(newUser.email)) { errors.password = 'Must not be empty' };
    if (isEmpty(newUser.password)) { errors.password = 'Must not be empty' };

    if (Object.keys().length > 0) return res.status(400).json(errors)

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token })
        })
        .catch(err => {
            console.error(err);
            if (error.code === 'auth/wrong-password') {
                return res.status(403).json({ general: 'Wrong Email/Password' })
            } else
                return res.status(500).json({ error: err.code });
        })

});


// -----------------------------------------------------------------------------






exports.api = functions.https.onRequest(app);