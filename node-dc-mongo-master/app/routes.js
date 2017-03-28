var Subjects = require('./models/SubjectViews');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes	
	// sample api route
 app.get('/api/data', function(req, res) {
  // use mongoose to get all nerds in the database
  //alert('check1');
  Subjects.find({"business_id":"4P-vTvE6cncJyUyLh73pxw"},function(err, subjectDetails) {
   // if there is an error retrieving, send the error. 
       // nothing after res.send(err) will execute
   if (err) 
   res.send(err);
    res.json(subjectDetails); // return all nerds in JSON format
  });
  //res.send('check');
 });

 



 // frontend routes =========================================================
 app.get('*', function(req, res) {
  res.sendfile('./public/login.html');
 });
}