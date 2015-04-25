//TODO : Get a dictionary that maps the images to Team Names for the left column of teams
// TODO : Get the score board and tables ready.
// Download Vulcan on Chrome to use to see the Firebase Database
// Firebase Hosting on : https://cs-465-sportshub-1.firebaseio.com/
// WORK on a way to get the data loaded before the extension is clicked to 
// remove latency
// TODO : Work on python script to make the app Dynamic. Just the Firebase-import module
Firebase.enableLogging(true);
var root = new Firebase('https://cs-465-sportshub-1.firebaseio.com/');

var today = root.child('Schedule/Today');
var yesterday = root.child('Schedule/Yesterday');
var tomorrow = root.child('Schedule/Tomorrow');
var num_clicks_settings = 0;
var today_data = {}; // holds today's data from Firebase
var tomorrow_data = {}; // holds tomorrow's data from Firebase
var yesterday_data = {}; // holds yesterday's data from Firebase

// document .ready function keeps track of onclick listeners that are recorded when an action occurs 
// place all listeners here. 
// set up Listerners for all the 4 games tabs. 
// work on encapsulating function
$(document).ready(function(){

//	generate_today();	
	setupFirebase();
	generate_today();
	$('#yesterday').on('click', function(event)
		{
			generate_yesterday();
		});
	$('#tomorrow').on('click', function(event)
	{
			generate_tomorrow();
	});
	$('#setting_frame').on('click', function(event) {
		control_setting();
	    });



});



function generate_sidebar()// either use this function or do it manually in each generate function. 
{


}

function generate_tables() // either use this function or do it manually in each generate function. 
{



}



function control_setting() /// used to trigger the settings menu.Need to get input and do stuff with it
{
	num_clicks_settings = num_clicks_settings +1;
    if(num_clicks_settings== 1)
     	{
			iframe = document.createElement("IFRAME");
  			iframe.setAttribute("src", "window.html");
  			iframe.style.position = "absolute";
  			iframe.style.top = "30px";
  			iframe.style.left = "140px";
  			iframe.style.background = "#FFFFFF";
  			iframe.style.width = "200px";
  			iframe.style.height = "200px";
  			document.body.appendChild(iframe);
        } 
        else if(num_clicks_settings %2 == 1)
        {
        	$(iframe).show();

        }
        else if(num_clicks_settings %2 == 0)
        {
        	$(iframe).hide();
        }
}


function setupFirebase() // gets json information from firebase
 {
 	today.on("value", function(snapshot) {
 		// console.log(snapshot.val());
 		var data = snapshot.val(); // gets a snapshow view for the kson data
 		today_data = data; /// assign the data to a local variable. No more calls to Firebase necessary
 		renderToday(); // get the dates working.
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
 	yesterday.on("value", function(snapshot) {
 		var data1 = snapshot.val();
 		yesterday_data = data1;
 		renderYesterday();
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
 	tomorrow.on("value", function(snapshot) {
 		var data2 = snapshot.val();
 		tomorrow_data = data2;
 		renderTomorrow();
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});

 }

function generate_today()
{
	// TODO : Fill up tables
}	


function generate_tomorrow()
{
		// TODO : Fill up tables

}

function generate_yesterday()
{	
			// TODO : Fill up tables

	
}


function generate_dates()
{

	var parse_date = yesterday_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
	$("#yesterday").text(returner);
	var parse_date_tm= tomorrow_data['date'].split("-");
	var returner_tm = parse_date[1]+"/"+parse_date[2];
	$("#tomorrow").text(  returner_tm);


}
 function renderToday()  // testing to see if it loads the right dates
 {
 	var parse_date = today_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
 	//$("#today").text('today');


 	//today
 }
function renderYesterday()// testing to see if it loads the right dates
{
	var parse_date = yesterday_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
	$("#yesterday").text(returner);

}
function renderTomorrow()// testing to see if it loads the right dates
{
	var parse_date= tomorrow_data['date'].split("-");
	var returner = parse_date[1]+"/"+parse_date[2];
	$("#tomorrow").text(  returner);


}

