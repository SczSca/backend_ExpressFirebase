const { initializeApp, getApps, getApp } = require('firebase-admin/app');
const { credential } = require('firebase-admin');
const { SA_KEY_PATH, DATABASE_URL } = require('./config');
const { getAuth } = require('firebase-admin/auth');



const adminCredentials = {
    credential: credential.cert(SA_KEY_PATH),
    databaseURL: DATABASE_URL
}
const adminApp = getApps().length === 0 ? initializeApp(adminCredentials) : getApp();
const authAdmin = getAuth(adminApp);
module.exports = { authAdmin };