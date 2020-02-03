// Initialize Firebase Project
var config = {
    apiKey: "AIzaSyAgy1vjyOVnSL6HMdQrZ4NWTeg0ppk_1-k",
    authDomain: "litfans-18165.firebaseapp.com",
    databaseURL: "https://litfans-18165.firebaseio.com",
    projectId: "litfans-18165",
    storageBucket: "litfans-18165.appspot.com",
    messagingSenderId: "38884730872",
    appId: "1:38884730872:web:748fbbac7d66c042c5980d",
    measurementId: "G-2FV515K21L"
};
firebase.initializeApp(config);

// Request permission and generate webtoken
const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function() {
        console.log("Notification permission granted.");
        // get the token in the form of promise
        return messaging.getToken()
    })
    .then(function(token) {
        console.log("token is =>" + token);
        save_token(token);
    })
    .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
    });

// Message notification
messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    show_Notification(payload);
    //kenng - foreground notifications
    const {
        title,
        ...options
    } = payload.notification;
    navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, options);
    });
});

// Save webtoken in local database
function save_token(token) {
    $.ajax({
        url: SITE_URL + 'admin/Login/store_token',
        method: 'post',
        data: { token }
    }).done(function(result) {
        console.log('save token =>', result);
    })
}

// Display notification like toaster  
function show_Notification(payload) {
    console.log('toster successful');
    $.toast({
        heading: payload.notification.title,
        text: payload.notification.body,
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
}