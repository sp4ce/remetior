
function couchapp_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

couchapp_load([
  '/_utils/script/sha1.js',
  '/_utils/script/json2.js',
  '/_utils/script/jquery.js',
  '/_utils/script/jquery.couch.js',
  '/_utils/script/jquery.form.js',
  '/_utils/script/jquery.dialog.js',
  'vendor/couchapp/jquery.couch.app.js',
  'vendor/couchapp/jquery.couch.app.util.js',
  'vendor/couchapp/jquery.mustache.js',
  'vendor/couchapp/jquery.evently.js',
  'vendor/couchapp/jquery.couchLogin.js',
  'vendor/couchapp/jquery.couchProfile.js',
  'vendor/couchapp/jquery.class.js',
  'vendor/couchapp/md5.js',
]);
