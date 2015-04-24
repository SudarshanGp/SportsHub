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
		//alert("clicked");
		num_clicks_settings = num_clicks_settings +1;
 	//	$('#setting_frame').html('window.html');
 	// $('<iframe id="myIframe" src="window.html" width="200" height="200"></iframe>');
     	if(num_clicks_settings== 1)
     	{
     		 var url = "window.html";
	        if($('#frame').size() == 0) {
	        $('<iframe />', {
	            name: 'frame',
	            id:   'frame',
	            src: url,
	            width : '200px',
	            height : '200px',
	            position: 'absolute',
	            top : '40px',
	            left : '150px',
	            zIndex : 100
	       	 }).appendTo('body'); 
	  		  }
	        // frame.style.left = "150px";
	        // frame.style.top = "40px";
	        // frame.style.position= "absolute";
        } 
        else if(num_clicks_settings %2 == 1)
        {
        	$('#frame').show();

        }
        else if(num_clicks_settings %2 == 0)
        {
        	$('#frame').hide();
        }

     	
         
    });



	setupPage();
});
// $('#button').click(function() {
//    // if($('#myIframe').size() == 0) {
//    //     $('<iframe id="myIframe" src="window.html" width="200" height="200"></iframe>');
//    // }
// });


function setupPage()
 {
 	today.on("value", function(snapshot) {
 		// console.log(snapshot.val());
 		var data = snapshot.val();
 		today_data = data;
 		renderToday();
 	//	alert(1);
 	// 	 var bkg = chrome.extension.getBackgroundPage();
		// bkg.console.log(data);
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
 	yesterday.on("value", function(snapshot) {
 		// console.log(snapshot.val());
 		var data1 = snapshot.val();
 		yesterday_data = data1;
 	//	renderYesterday();
 	// 	 var bkg = chrome.extension.getBackgroundPage();
		// bkg.console.log(data);
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
 	tomorrow.on("value", function(snapshot) {
 		// console.log(snapshot.val());
 		var data2 = snapshot.val();
 		tomorrow_data = data2;
 	//	renderTomorrow();
 	// 	 var bkg = chrome.extension.getBackgroundPage();
		// bkg.console.log(data);
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});

 }

 function renderToday()
 {
 	//alert("I'm here");
 	$("#test").text("tester");

 }



