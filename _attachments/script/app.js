/**
 * Entry poin of the application.
 */
$(function() {
    // Binding of the login events.
    $.couch.app(couch_login);
    // General evently bindings.
    $.couch.app(function(app) {
        $('#loading').evently('loading', app);
        $.evently.connect('#menu', '#main', ['show']);
        $.evently.connect('#main', '#menu', ['select']);
    })
 });

/**
 * Set up the couch login in the account div.
 * @param app: the application object.
 */
function couch_login(app) {
    // Set the couch login on the account div.
    $('#account').couchLogin({
        // Called when the user has logged in.
        loggedIn : function(r) {
            $('#top').evently('top', app);
            $('#menu').show().evently('menu', app);
            $('#main').show().evently('main', app);
        },

        // Called when the user has logged out.
        loggedOut : function() {
            $('#top').html('<p>Please log in to see your profile.</p>');
            $('#main').empty().hide();
            $('#menu').empty().hide();
        }
    });
}

/**
 * Helper to execute several call and then a shared callback.
 * @param aync_calls: the array of method to execute.
 * @param shared_callback: the callback to execute at the end of all the function
 */
function fork (async_calls, shared_callback) {
    var counter = async_calls.length;
    var callback = function () {
        counter --;
        if (counter == 0) {
            shared_callback()
        }
    }

    for (var i=0;i<async_calls.length;i++) {
       async_calls[i](callback);
    }
}
