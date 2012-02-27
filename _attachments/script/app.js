$(function() {   
    // Friendly helper http://tinyurl.com/6aow6yn to serialize form to json with jQuery.
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    // Create the database object to read and connect to CouchDB
    var path = unescape(document.location.pathname).split('/'),
        design = path[3],
        db = $.couch.db(path[1]);
    
  //  function drawItems() {
  //      db.view(design + "/recent-items", {
  //          descending : "true",
  //          limit : 50,
  //          update_seq : true,
  //          success : function(data) {
  //              setupChanges(data.update_seq);
  //              var them = $.mustache($("#recent-messages").html(), {
  //                  items : data.rows.map(function(r) {return r.value;})
  //              });
  //              $("#content").html(them);
  //          }
  //      });
  //  };
  //  drawItems();
  //  var changesRunning = false;
  //  function setupChanges(since) {
  //      if (!changesRunning) {
  //          var changeHandler = db.changes(since);
  //          changesRunning = true;
  //          changeHandler.onChange(drawItems);
  //      }
  //  }
    
    // Evently binding
    $.couch.app(function(app) {
        // Set up the evently widget and insert it after we logged the user.
        var uploader = $('<div></div>');
        uploader.evently("uploader", app, { coucou: "coucou"});
        couch_login(uploader.html());
    });
 });

function couch_login(profile_ready_template) {
    $.couchProfile.templates.profileReady = profile_ready_template;
    $("#account").couchLogin({
        loggedIn : function(r) {
            $("#profile").couchProfile(r);
        },
        loggedOut : function() {
            $("#profile").html('<p>Please log in to see your profile.</p>');
        }
    });
}


