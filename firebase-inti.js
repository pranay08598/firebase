// Initialize Firebase Project
var config = {
    
    // your firebase project config variable value
    
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
        url: 'url',
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
