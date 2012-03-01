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
            $('#main').show().evently('main', app);
            $('#menu').show().evently('menu', app);
        },

        // Called when the user has logged out.
        loggedOut : function() {
            $('#top').html('<p>Please log in to see your profile.</p>');
            $('#main').empty().hide();
            $('#menu').empty().hide();
        }
    });
}

