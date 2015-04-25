Firebase.enableLogging(true);
var root = new Firebase('https://cs-465-sportshub-1.firebaseio.com/');

var today = root.child('Schedule/Today');
var yesterday = root.child('Schedule/Yesterday');
var tomorrow = root.child('Schedule/Tomorrow');
var num_clicks_settings = 0;
var today_data = {};
var tomorrow_data = {};
var yesterday_data = {};

$(document).ready(function(){

	$('#setting_frame').on('click', function(event) {
		control_setting();
	    });

	$('#yesterday').on('click', function(event)
		{
			generate_yesterday();
		});
	$('#tomorrow').on('click', function(event)
	{
			generate_tomorrow();
	});

	setupPage();
	generate_sidebar();
});

function generate_sidebar()
{


}

function control_setting()
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

function generate_tomorrow()
{

}

function generate_yesterday()
{	
	//alert("Yest");
}



function setupPage()
 {
 	today.on("value", function(snapshot) {
 		// console.log(snapshot.val());
 		var data = snapshot.val();
 		today_data = data;
 		renderToday();
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

 function renderToday()
 {
 	var parse_date = today_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
 	//$("#today").text('today');


 	//today
 }
function renderYesterday()
{
	var parse_date = yesterday_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
	$("#yesterday").text(returner);

}
function renderTomorrow()
{
	var parse_date= tomorrow_data['date'].split("-");
	var returner = parse_date[1]+"/"+parse_date[2];
	$("#tomorrow").text(  returner);


}

