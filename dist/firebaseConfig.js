"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
var firebaseConfig = {
    apiKey: "AIzaSyCcpQHFdlPThExxAS2jPgzww2h4RP2yamY",
    authDomain: "esp32-f0f56.firebaseapp.com",
    databaseURL: "https://esp32-f0f56-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp32-f0f56",
    storageBucket: "esp32-f0f56.firebasestorage.app",
    messagingSenderId: "105447309811",
    appId: "1:105447309811:web:99ebe5ea2f5c7b3905d286",
    measurementId: "G-FC87TMHNGJ",
};
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.database = (0, database_1.getDatabase)(app);
