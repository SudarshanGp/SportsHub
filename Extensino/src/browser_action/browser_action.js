//TODO : Get a dictionary that maps the images to Team Names for the left column of teams
// TODO : Get the score board and tables ready.
// Download Vulcan on Chrome to use to see the Firebase Database
// Firebase Hosting on : https://cs-465-sportshub-1.firebaseio.com/
// WORK on a way to get the data loaded before the extension is clicked to 
// remove latency
// TODO : Work on python script to make the app Dynamic. Just the Firebase-import module
Firebase.enableLogging(true);
$('#all').hide();
var root = new Firebase('https://cs-465-sportshub-1.firebaseio.com/');

var today = root.child('Schedule/Today');
var yesterday = root.child('Schedule/Yesterday');
var tomorrow = root.child('Schedule/Tomorrow');
var num_clicks_settings = 0;
var today_data = {}; // holds today's data from Firebase
var tomorrow_data = {}; // holds tomorrow's data from Firebase
var yesterday_data = {}; // holds yesterday's data from Firebase
var yesterday1 = 0;
var today1= 0;
var tomorrow1 = 0;
var fire_base_done = 0;
var d = 0;
var time = 0;
var created = 0;
d= new Date();
time = d.toLocaleTimeString();
$('#Timer1').text(time);




setInterval(function() {
	d= new Date();
	time = d.toLocaleTimeString();
    $('#Timer1').text(time);
}, 60000);
// document .ready function keeps track of onclick listeners that are recorded when an action occurs 
// place all listeners here. 
// set up Listerners for all the 4 games tabs. 
// work on encapsulating function
$(document).ready(function(){
	setupFirebase();

	//generate_today();	
	//today1 = 1;	
	//handle_first();
	
	$('#first_game').on('click', function(event)
	{
		handle_first();
	});
	$('#second_game').on('click', function(event)
	{
		handle_second();
	});
	$('#third_game').on('click', function(event)
	{
		handle_third();
	});
	$('#today').on('click', function(event)
	{
		today_setup();	
		$('#sidebar ul div').removeClass('active');
		$('#sidebar ul #game_set').addClass('active');
	});
	$('#yesterday').on('click', function(event)
	{
		yesterday_setup();
		$('#sidebar ul div').removeClass('active');
		$('#sidebar ul #game_set').addClass('active');
	});
	$('#tomorrow').on('click', function(event)
	{
		tomorrow_setup();
		$('#sidebar ul div').removeClass('active');
		$('#sidebar ul #game_set').addClass('active');
	});
	$('#cssmenu ul li a').click (function(ev) {
        $('#cssmenu ul li').removeClass('active');
        $(ev.currentTarget).parent('li').addClass('active');
    });
	$('#setting_frame').on('click', function(event) {
		control_setting();
	    });
	$('#cssmenu ul li a').click (function(ev) {
        $('#cssmenu ul li').removeClass('active');
        $(ev.currentTarget).parent('li').addClass('active');
    });
  	$('#sidebar ul div a').click (function(ev) {
        $('#sidebar ul div').removeClass('active');
        $(ev.currentTarget).parent('div').addClass('active');
    });

});

// make a function that generates all the data for yesterday
function yesterday_setup() 
{
	generate_yesterday_sidebar_pics();
	generate_yesterday_sidebar_scores();
	generate_yesterday_game();
	date = 0;
}

function today_setup() //  program starts with this function. Sets up initial data
{
	generate_today_sidebar_pics(); // takes care of side bar
	generate_today_sidebar_scores();
	generate_today_game();
	date = 1;
	if(created == 0 )
	{
		var row = document.getElementById('headers');
		var th = document.createElement('th');
		th.innerHTML = "OT";
		th.id = "OT_Col";
		var last = document.getElementById('last');
		row.insertBefore(th,last);

		var row = document.getElementById('row1');
		var x = row.insertCell(5);
		x.innerHTML = "11";
		x.id = "OT_Col1";

		var row = document.getElementById('row2');
		var x = row.insertCell(5);
		x.innerHTML = "16";
		x.id = "OT_Col2";
	}

	created = 1;
	// $("#OT_Col").hide();
	// $("#OT_Col1").hide();
	// $("#OT_Col2").hide();

}

function tomorrow_setup() // sets up tomorrow's data
{
	generate_tomorrow_sidebar_pics();
	generate_tomorrow_sidebar_scores();
	generate_tomorrow_game();
	 $("#OT_Col").hide();
	 $("#OT_Col1").hide();
	 $("#OT_Col2").hide();
	date = 2;
}

function generate_yesterday_sidebar_pics()
{
	image1 = document.getElementById('teamimg12');
	var r3 = "Images/" + yesterday_data['games']['1']['Team_stats']['away']['name'] + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg22');
	var r4 = "Images/" + yesterday_data['games']['1']['Team_stats']['home']['name'] + ".gif ";
	image1.src = r4;	
	image1 = document.getElementById('teamimg11');
	var r3 = "Images/" + yesterday_data['games']['0']['Team_Stats']['away']['name'] + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg21');
	var r4 = "Images/" + yesterday_data['games']['0']['Team_Stats']['home']['name'] + ".gif ";
	image1.src = r4;
	image1 = document.getElementById('teamimg13');
	var r3 = "Images/" + yesterday_data['games']['2']['Team_stats']['away']['name'] + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg23');
	var r4 = "Images/" + yesterday_data['games']['2']['Team_stats']['home']['name'] + ".gif ";
	image1.src = r4;	
}

function generate_yesterday_sidebar_scores()
{
	$("#score21").text(yesterday_data['games']['0']['Team_Stats']['home']['points']);
	$("#score11").text(yesterday_data['games']['0']['Team_Stats']['away']['points']);
	$("#score22").text(yesterday_data['games']['1']['Team_stats']['home']['points']);
	$("#score12").text(yesterday_data['games']['1']['Team_stats']['away']['points']);
	$("#score23").text(yesterday_data['games']['2']['Team_stats']['home']['points']);
	$("#score13").text(yesterday_data['games']['2']['Team_stats']['away']['points']);
	/*Game Status*/
	$("#ygame_status0").text("Final");
	$("#ygame_status1").text("Final");
	$("#ygame_status2").text("Final");
	$("#game_status0").text("");
	$("#game_status1").text("");
	$("#game_status2").text("");
	$("#game_channel0").text("");
	$("#game_channel1").text("");
	$("#game_channel2").text("");
	$("#trivia_box").text("On this day (04/26): In 1994, the Vancouver Grizzlies became the NBA's 29th franchise");
	
}
function generate_today_sidebar_pics()
{
	image1 = document.getElementById('teamimg12');
	var r3 = "Images/" + today_data['games']['1']['box_score']['away']['name'] + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg22');
	var r4 = "Images/" + today_data['games']['1']['box_score']['home']['name'] + ".gif ";
	image1.src = r4;	
	image1 = document.getElementById('teamimg11');
	var r3 = "Images/" + today_data['games']['0']['boxscore']['away']['name'] + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg21');
	var r4 = "Images/" + today_data['games']['0']['boxscore']['home']['name'] + ".gif ";
	image1.src = r4;
	image1 = document.getElementById('teamimg13');
	var r3 = "Images/" + today_data['games']['2']['boxscore']['away']['name'] + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg23');
	var r4 = "Images/" + today_data['games']['2']['boxscore']['home']['name'] + ".gif ";
	image1.src = r4;	
}

function generate_today_sidebar_scores()
{
	$("#score21").text(today_data['games']['0']['Game_details']['home']['points']);
	$("#score11").text(today_data['games']['0']['Game_details']['away']['points']);
	$("#score22").text(today_data['games']['1']['Game_details']['home']['points']);
	$("#score12").text(today_data['games']['1']['Game_details']['away']['points']);	
	$("#score23").text("0");
	$("#score13").text("0");
	$("#game_status0").text("Final");
	$("#game_status1").text("Q3");
	$("#game_status2").text("9 ET");
	$("#game_channel0").text("(OT)");
	$("#game_channel1").text("02:51");
	$("#game_channel2").text("ESPN");
	$("#ygame_status0").text("");
	$("#ygame_status1").text("");
	$("#ygame_status2").text("");
	$("#trivia_box").text("On this day (04/27): Tim Duncan captures the 1998 Rookie of the Year award");
}

function generate_tomorrow_sidebar_scores()
{
	$("#score21").text("0");
	$("#score11").text("0");
	$("#score22").text("0");
	$("#score12").text("0");	
	$("#score23").text("0");
	$("#score13").text("0");
	/*Game Status*/
	$("#game_status0").text("7 ET");
	$("#game_status1").text("8 ET");
	$("#game_status2").text("10 ET");
	$("#game_channel0").text("ESPN2");
	$("#game_channel1").text("ESPN");
	$("#game_channel2").text("ESPN2");
	$("#ygame_status0").text("");
	$("#ygame_status1").text("");
	$("#ygame_status2").text("");
	$("#trivia_box").text("On this day (04/28): In 1978, Oscar Robertson became the first Milwaukee Buck inducted into basketball HOF");
}


function handle_first() // either use this function or do it manually in each generate function. 
{	
	if(date == 1)
		generate_today_game();
	else if(date == 0)
	{
		generate_yesterday_game();
	}
	else if(date == 2)
	{
		generate_tomorrow_game();
	}
}

function handle_second() // either use this function or do it manually in each generate function. 
{	
	if(date == 1)
		generate_today_game1();
	else if(date == 0)
	{
		generate_yesterday_game1();
	}
	else if(date == 2)
	{
		generate_tomorrow_game1();
	}
}

function handle_third() // either use this function or do it manually in each generate function. 
{	
	if(date == 1)
		generate_today_game2();
	else if(date == 0)
	{
		generate_yesterday_game2();
	}
	else if(date == 2)
	{
		generate_tomorrow_game2();
	}
}



function control_setting() /// used to trigger the settings menu.Need to get input and do stuff with it
{
	num_clicks_settings = num_clicks_settings +1;
    if(num_clicks_settings== 1)
     	{
			iframe = document.createElement("IFRAME");
			iframe.setAttribute("id", "settings");
  			iframe.setAttribute("src", "window.html");
  			iframe.style.position = "absolute";
  			iframe.style.top = "40px";
  			iframe.style.left = "150px";
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
 		renderTodayText(); // get the dates working.

		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
 	yesterday.on("value", function(snapshot) {
 		var data1 = snapshot.val();
 		yesterday_data = data1;
 		renderInitial();
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
 	tomorrow.on("value", function(snapshot) {
 		var data2 = snapshot.val();
 		tomorrow_data = data2;
 		renderInitial();
		},	 function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});

 }


function generate_yesterday_game2() 
{	
	$("#OT_Col").hide();
	$("#OT_Col1").hide();
	$("#OT_Col2").hide();
	var t1 = $("#team_1").text(yesterday_data['games']['2']['Team_stats']['away']['name']);
	var t2 = $("#team_2").text(yesterday_data['games']['2']['Team_stats']['home']['name']);
	image = document.getElementById('teamimg1');
	var r3 = "Images/" + yesterday_data['games']['2']['Team_stats']['away']['name'] + ".gif ";
	image.src = r3;
	image = document.getElementById('teamimg2');
	var r4 = "Images/" + yesterday_data['games']['2']['Team_stats']['home']['name'] + ".gif ";
	image.src = r4;		/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(yesterday_data['games']['2']['Team_stats']['away']['name']);
	$("#team_2_s").text(yesterday_data['games']['2']['Team_stats']['home']['name']);
	/*team_1_p and team_2_p display for the indiv'2'ual player stats*/
	$("#team_1_p").text(yesterday_data['games']['2']['Team_stats']['away']['name']);
	$("#team_2_p").text(yesterday_data['games']['2']['Team_stats']['home']['name']);
	/*generate points by quarter for away team*/
	$("#q1_1").text(yesterday_data['games']['2']['Team_stats']['away']['scoring']['0']['points']);
	$("#q2_1").text(yesterday_data['games']['2']['Team_stats']['away']['scoring']['1']['points']);
	$("#q3_1").text(yesterday_data['games']['2']['Team_stats']['away']['scoring']['2']['points']);
	$("#q4_1").text(yesterday_data['games']['2']['Team_stats']['away']['scoring']['3']['points']);
	$("#f_1").text(yesterday_data['games']['2']['Team_stats']['away']['points']);
	/*generate points by quarter for home team*/
	$("#q1_2").text(yesterday_data['games']['2']['Team_stats']['home']['scoring']['0']['points']);
	$("#q2_2").text(yesterday_data['games']['2']['Team_stats']['home']['scoring']['1']['points']);
	$("#q3_2").text(yesterday_data['games']['2']['Team_stats']['home']['scoring']['2']['points']);
	$("#q4_2").text(yesterday_data['games']['2']['Team_stats']['home']['scoring']['3']['points']);
	$("#f_2").text(yesterday_data['games']['2']['Team_stats']['home']['points']);
	/*generate play-by-play*/
	//TODO: Add the quarter to the time so it's more clear
	$("#p1_t").text(yesterday_data['games']['2']['Play_by_play']['periods']['3']['events']['95']['clock']);
	$("#p1").text(yesterday_data['games']['2']['Play_by_play']['periods']['3']['events']['95']['description']);
	/*generate team stats (can't find largest lead)*/
	$("#reb_1").text(yesterday_data['games']['2']['Team_stats']['away']['statistics']['rebounds']);
	$("#reb_2").text(yesterday_data['games']['2']['Team_stats']['home']['statistics']['rebounds']);
	$("#oreb_1").text(yesterday_data['games']['2']['Team_stats']['away']['statistics']['offensive_rebounds']);
	$("#oreb_2").text(yesterday_data['games']['2']['Team_stats']['home']['statistics']['offensive_rebounds']);
	$("#ast_1").text(yesterday_data['games']['2']['Team_stats']['away']['statistics']['assists']);
	$("#ast_2").text(yesterday_data['games']['2']['Team_stats']['home']['statistics']['assists']);
	$("#to_1").text(yesterday_data['games']['2']['Team_stats']['away']['statistics']['turnovers']);
	$("#to_2").text(yesterday_data['games']['2']['Team_stats']['home']['statistics']['turnovers']);
	$("#fb_1").text(yesterday_data['games']['2']['Team_stats']['away']['statistics']['fast_break_pts']);
	$("#fb_2").text(yesterday_data['games']['2']['Team_stats']['home']['statistics']['fast_break_pts']);
	$("#pp_1").text(yesterday_data['games']['2']['Team_stats']['away']['statistics']['paint_pts']);
	$("#pp_2").text(yesterday_data['games']['2']['Team_stats']['home']['statistics']['paint_pts']);
	/*generate player stats*/
	var pt_1_name = yesterday_data['games']['2']['Game_details']['away']['leaders']['points']['0']['full_name'];
	var pt_1_stat = yesterday_data['games']['2']['Game_details']['away']['leaders']['points']['0']['statistics']['points']
	$("#pt_1").text(pt_1_name + " " + pt_1_stat);
	var pt_2_name = yesterday_data['games']['2']['Game_details']['home']['leaders']['points']['0']['full_name'];
	var pt_2_stat = yesterday_data['games']['2']['Game_details']['home']['leaders']['points']['0']['statistics']['points']
	$("#pt_2").text(pt_2_name + " " + pt_2_stat);

	var r_1_name = yesterday_data['games']['2']['Game_details']['away']['leaders']['rebounds']['0']['full_name'];
	var r_1_stat = yesterday_data['games']['2']['Game_details']['away']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r1").text(r_1_name + " " + r_1_stat);
	var r_2_name = yesterday_data['games']['2']['Game_details']['home']['leaders']['rebounds']['0']['full_name'];
	var r_2_stat = yesterday_data['games']['2']['Game_details']['home']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r2").text(r_2_name + " " + r_2_stat);

	var a_1_name = yesterday_data['games']['2']['Game_details']['away']['leaders']['assists']['0']['full_name'];
	var a_1_stat = yesterday_data['games']['2']['Game_details']['away']['leaders']['assists']['0']['statistics']['assists']
	$("#a1").text(a_1_name + " " + a_1_stat);
	var a_2_name = yesterday_data['games']['2']['Game_details']['home']['leaders']['assists']['0']['full_name'];
	var a_2_stat = yesterday_data['games']['2']['Game_details']['home']['leaders']['assists']['0']['statistics']['assists']
	$("#a2").text(a_2_name + " " + a_2_stat);
	$("#score1").text(yesterday_data['games']['2']['Team_stats']['away']['points']);
	$("#score2").text(yesterday_data['games']['2']['Team_stats']['home']['points']);
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/DAL_HOU.gif";
	

	
}
function generate_yesterday_game1() 
{	
	$("#OT_Col").hide();
	$("#OT_Col1").hide();
	$("#OT_Col2").hide();	
	$("#team_1").text(yesterday_data['games']['1']['Team_stats']['away']['name']);
	$("#team_2").text(yesterday_data['games']['1']['Team_stats']['home']['name']);
	image = document.getElementById('teamimg1');
	image1 = document.getElementById('teamimg12');
	var r3 = "Images/" + yesterday_data['games']['1']['Team_stats']['away']['name'] + ".gif ";
	image.src = r3;
	image1.src = r3;
	image = document.getElementById('teamimg2');
	image1 = document.getElementById('teamimg22');
	var r4 = "Images/" + yesterday_data['games']['1']['Team_stats']['home']['name'] + ".gif ";
	image1.src = r4;
	image.src = r4;	
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(yesterday_data['games']['1']['Team_stats']['away']['name']);
	$("#team_2_s").text(yesterday_data['games']['1']['Team_stats']['home']['name']);
	/*team_1_p and team_2_p display for the indiv'1'ual player stats*/
	$("#team_1_p").text(yesterday_data['games']['1']['Team_stats']['away']['name']);
	$("#team_2_p").text(yesterday_data['games']['1']['Team_stats']['home']['name']);
	/*generate points by quarter for away team*/
	$("#q1_1").text(yesterday_data['games']['1']['Team_stats']['away']['scoring']['0']['points']);
	$("#q2_1").text(yesterday_data['games']['1']['Team_stats']['away']['scoring']['1']['points']);
	$("#q3_1").text(yesterday_data['games']['1']['Team_stats']['away']['scoring']['2']['points']);
	$("#q4_1").text(yesterday_data['games']['1']['Team_stats']['away']['scoring']['3']['points']);
	$("#f_1").text(yesterday_data['games']['1']['Team_stats']['away']['points']);
	/*generate points by quarter for home team*/
	$("#q1_2").text(yesterday_data['games']['1']['Team_stats']['home']['scoring']['0']['points']);
	$("#q2_2").text(yesterday_data['games']['1']['Team_stats']['home']['scoring']['1']['points']);
	$("#q3_2").text(yesterday_data['games']['1']['Team_stats']['home']['scoring']['2']['points']);
	$("#q4_2").text(yesterday_data['games']['1']['Team_stats']['home']['scoring']['3']['points']);
	$("#f_2").text(yesterday_data['games']['1']['Team_stats']['home']['points']);
	/*generate play-by-play*/
	//TODO: Add the quarter to the time so it's more clear
	$("#p1_t").text(yesterday_data['games']['1']['Play_by_play']['periods']['3']['events']['112']['clock']);
	$("#p1").text(yesterday_data['games']['1']['Play_by_play']['periods']['3']['events']['112']['description']);
	/*generate team stats (can't find largest lead)*/
	$("#reb_1").text(yesterday_data['games']['1']['Team_stats']['away']['statistics']['rebounds']);
	$("#reb_2").text(yesterday_data['games']['1']['Team_stats']['home']['statistics']['rebounds']);
	$("#oreb_1").text(yesterday_data['games']['1']['Team_stats']['away']['statistics']['offensive_rebounds']);
	$("#oreb_2").text(yesterday_data['games']['1']['Team_stats']['home']['statistics']['offensive_rebounds']);
	$("#ast_1").text(yesterday_data['games']['1']['Team_stats']['away']['statistics']['assists']);
	$("#ast_2").text(yesterday_data['games']['1']['Team_stats']['home']['statistics']['assists']);
	$("#to_1").text(yesterday_data['games']['1']['Team_stats']['away']['statistics']['turnovers']);
	$("#to_2").text(yesterday_data['games']['1']['Team_stats']['home']['statistics']['turnovers']);
	$("#fb_1").text(yesterday_data['games']['1']['Team_stats']['away']['statistics']['fast_break_pts']);
	$("#fb_2").text(yesterday_data['games']['1']['Team_stats']['home']['statistics']['fast_break_pts']);
	$("#pp_1").text(yesterday_data['games']['1']['Team_stats']['away']['statistics']['paint_pts']);
	$("#pp_2").text(yesterday_data['games']['1']['Team_stats']['home']['statistics']['paint_pts']);
	/*generate player stats*/
	var pt_1_name = yesterday_data['games']['1']['Game_details']['away']['leaders']['points']['0']['full_name'];
	var pt_1_stat = yesterday_data['games']['1']['Game_details']['away']['leaders']['points']['0']['statistics']['points']
	$("#pt_1").text(pt_1_name + " " + pt_1_stat);
	var pt_2_name = yesterday_data['games']['1']['Game_details']['home']['leaders']['points']['0']['full_name'];
	var pt_2_stat = yesterday_data['games']['1']['Game_details']['home']['leaders']['points']['0']['statistics']['points']
	$("#pt_2").text(pt_2_name + " " + pt_2_stat);

	var r_1_name = yesterday_data['games']['1']['Game_details']['away']['leaders']['rebounds']['0']['full_name'];
	var r_1_stat = yesterday_data['games']['1']['Game_details']['away']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r1").text(r_1_name + " " + r_1_stat);
	var r_2_name = yesterday_data['games']['1']['Game_details']['home']['leaders']['rebounds']['0']['full_name'];
	var r_2_stat = yesterday_data['games']['1']['Game_details']['home']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r2").text(r_2_name + " " + r_2_stat);

	var a_1_name = yesterday_data['games']['1']['Game_details']['away']['leaders']['assists']['0']['full_name'];
	var a_1_stat = yesterday_data['games']['1']['Game_details']['away']['leaders']['assists']['0']['statistics']['assists']
	$("#a1").text(a_1_name + " " + a_1_stat);
	var a_2_name = yesterday_data['games']['1']['Game_details']['home']['leaders']['assists']['0']['full_name'];
	var a_2_stat = yesterday_data['games']['1']['Game_details']['home']['leaders']['assists']['0']['statistics']['assists']
	$("#a2").text(a_2_name + " " + a_2_stat);
	$("#score1").text(yesterday_data['games']['1']['Team_stats']['away']['points']);
	$("#score2").text(yesterday_data['games']['1']['Team_stats']['home']['points']);
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/WAS_TOR.gif";
	
	
}

function generate_yesterday_game()
{	
		$("#OT_Col").hide();
	$("#OT_Col1").hide();
	$("#OT_Col2").hide();	
	$("#team_1").text(yesterday_data['games']['0']['Team_Stats']['away']['name']);
	$("#team_2").text(yesterday_data['games']['0']['Team_Stats']['home']['name']);
	image = document.getElementById('teamimg1');
	image1 = document.getElementById('teamimg11');
	var r3 = "Images/" + yesterday_data['games']['0']['Team_Stats']['away']['name'] + ".gif";
	image.src = r3;
	image1.src = r3;
	image = document.getElementById('teamimg2');
	var r4 = "Images/" + yesterday_data['games']['0']['Team_Stats']['home']['name'] + ".gif";
	image.src = r4;	
	image1 = document.getElementById('teamimg21');	
	image1.src = r4;
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(yesterday_data['games']['0']['Team_Stats']['away']['name']);
	$("#team_2_s").text(yesterday_data['games']['0']['Team_Stats']['home']['name']);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(yesterday_data['games']['0']['Team_Stats']['away']['name']);
	$("#team_2_p").text(yesterday_data['games']['0']['Team_Stats']['home']['name']);
	/*generate points by quarter for away team*/
	$("#q1_1").text(yesterday_data['games']['0']['Team_Stats']['away']['scoring']['0']['points']);
	$("#q2_1").text(yesterday_data['games']['0']['Team_Stats']['away']['scoring']['1']['points']);
	$("#q3_1").text(yesterday_data['games']['0']['Team_Stats']['away']['scoring']['2']['points']);
	$("#q4_1").text(yesterday_data['games']['0']['Team_Stats']['away']['scoring']['3']['points']);
	$("#f_1").text(yesterday_data['games']['0']['Team_Stats']['away']['points']);
	/*generate points by quarter for home team*/
	$("#q1_2").text(yesterday_data['games']['0']['Team_Stats']['home']['scoring']['0']['points']);
	$("#q2_2").text(yesterday_data['games']['0']['Team_Stats']['home']['scoring']['1']['points']);
	$("#q3_2").text(yesterday_data['games']['0']['Team_Stats']['home']['scoring']['2']['points']);
	$("#q4_2").text(yesterday_data['games']['0']['Team_Stats']['home']['scoring']['3']['points']);
	$("#f_2").text(yesterday_data['games']['0']['Team_Stats']['home']['points']);
	/*generate play-by-play*/
	//TODO: Add the quarter to the time so it's more clear
	$("#p1_t").text(yesterday_data['games']['0']['Play_by_play']['periods']['3']['events']['98']['clock']);
	$("#p1").text(yesterday_data['games']['0']['Play_by_play']['periods']['3']['events']['98']['description']);
	/*generate team stats (can't find largest lead)*/
	$("#reb_1").text(yesterday_data['games']['0']['Team_Stats']['away']['statistics']['rebounds']);
	$("#reb_2").text(yesterday_data['games']['0']['Team_Stats']['home']['statistics']['rebounds']);
	$("#oreb_1").text(yesterday_data['games']['0']['Team_Stats']['away']['statistics']['offensive_rebounds']);
	$("#oreb_2").text(yesterday_data['games']['0']['Team_Stats']['home']['statistics']['offensive_rebounds']);
	$("#ast_1").text(yesterday_data['games']['0']['Team_Stats']['away']['statistics']['assists']);
	$("#ast_2").text(yesterday_data['games']['0']['Team_Stats']['home']['statistics']['assists']);
	$("#to_1").text(yesterday_data['games']['0']['Team_Stats']['away']['statistics']['turnovers']);
	$("#to_2").text(yesterday_data['games']['0']['Team_Stats']['home']['statistics']['turnovers']);
	$("#fb_1").text(yesterday_data['games']['0']['Team_Stats']['away']['statistics']['fast_break_pts']);
	$("#fb_2").text(yesterday_data['games']['0']['Team_Stats']['home']['statistics']['fast_break_pts']);
	$("#pp_1").text(yesterday_data['games']['0']['Team_Stats']['away']['statistics']['paint_pts']);
	$("#pp_2").text(yesterday_data['games']['0']['Team_Stats']['home']['statistics']['paint_pts']);
	/*generate player stats*/
	var pt_1_name = yesterday_data['games']['0']['Game_Details']['away']['leaders']['points']['0']['full_name'];
	var pt_1_stat = yesterday_data['games']['0']['Game_Details']['away']['leaders']['points']['0']['statistics']['points']
	$("#pt_1").text(pt_1_name + " " + pt_1_stat);
	var pt_2_name = yesterday_data['games']['0']['Game_Details']['home']['leaders']['points']['0']['full_name'];
	var pt_2_stat = yesterday_data['games']['0']['Game_Details']['home']['leaders']['points']['0']['statistics']['points']
	$("#pt_2").text(pt_2_name + " " + pt_2_stat);

	var r_1_name = yesterday_data['games']['0']['Game_Details']['away']['leaders']['rebounds']['0']['full_name'];
	var r_1_stat = yesterday_data['games']['0']['Game_Details']['away']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r1").text(r_1_name + " " + r_1_stat);
	var r_2_name = yesterday_data['games']['0']['Game_Details']['home']['leaders']['rebounds']['0']['full_name'];
	var r_2_stat = yesterday_data['games']['0']['Game_Details']['home']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r2").text(r_2_name + " " + r_2_stat);

	var a_1_name = yesterday_data['games']['0']['Game_Details']['away']['leaders']['assists']['0']['full_name'];
	var a_1_stat = yesterday_data['games']['0']['Game_Details']['away']['leaders']['assists']['0']['statistics']['assists']
	$("#a1").text(a_1_name + " " + a_1_stat);
	var a_2_name = yesterday_data['games']['0']['Game_Details']['home']['leaders']['assists']['0']['full_name'];
	var a_2_stat = yesterday_data['games']['0']['Game_Details']['home']['leaders']['assists']['0']['statistics']['assists']
	$("#a2").text(a_2_name + " " + a_2_stat);
	$("#score1").text(yesterday_data['games']['0']['Team_Stats']['away']['points']);
	$("#score2").text(yesterday_data['games']['0']['Team_Stats']['home']['points']);
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/BOS_CLE.gif";
	
}

function generate_today_game()
{
	$("#OT_Col").show();
	$("#OT_Col1").show();
	$("#OT_Col2").show();
	$("#team_1").text(today_data['games']['0']['Game_details']['away']['name']);
	$("#team_2").text(today_data['games']['0']['Game_details']['home']['name']);
	image = document.getElementById('teamimg1');
	image1 = document.getElementById('teamimg11');
	var r3 = "Images/" + today_data['games']['0']['Game_details']['away']['name'] + ".gif";
	image.src = r3;
	image1.src = r3;
	image = document.getElementById('teamimg2');
	var r4 = "Images/" + today_data['games']['0']['Game_details']['home']['name'] + ".gif";
	image.src = r4;	
	image1 = document.getElementById('teamimg21');	
	image1.src = r4;
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(today_data['games']['0']['Game_details']['away']['name']);
	$("#team_2_s").text(today_data['games']['0']['Game_details']['home']['name']);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(today_data['games']['0']['Game_details']['away']['name']);
	$("#team_2_p").text(today_data['games']['0']['Game_details']['home']['name']);
	/*generate points by quarter for away team*/
	$("#q1_1").text(today_data['games']['0']['Game_details']['away']['scoring']['0']['points']);
	$("#q2_1").text(today_data['games']['0']['Game_details']['away']['scoring']['1']['points']);
	$("#q3_1").text(today_data['games']['0']['Game_details']['away']['scoring']['2']['points']);
	$("#q4_1").text(today_data['games']['0']['Game_details']['away']['scoring']['3']['points']);
	//TODO OVERTIME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$("#f_1").text(today_data['games']['0']['Game_details']['away']['points']);

	/*generate points by quarter for home team*/
	$("#q1_2").text(today_data['games']['0']['Game_details']['home']['scoring']['0']['points']);
	$("#q2_2").text(today_data['games']['0']['Game_details']['home']['scoring']['1']['points']);
	$("#q3_2").text(today_data['games']['0']['Game_details']['home']['scoring']['2']['points']);
	$("#q4_2").text(today_data['games']['0']['Game_details']['home']['scoring']['3']['points']);
	//TODO OVERTIME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$("#f_2").text(today_data['games']['0']['Game_details']['home']['points']);
	
	/*generate play-by-play*/
	//TODO: Add the quarter to the time so it's more clear
	$("#p1_t").text(today_data['games']['0']['Play_by_play']['periods']['4']['events']['44']['clock']);
	$("#p1").text(today_data['games']['0']['Play_by_play']['periods']['4']['events']['44']['description']);
	//TODO OVERTIME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*generate team stats */
	$("#reb_1").text(today_data['games']['0']['Game_details']['away']['statistics']['rebounds']);
	$("#reb_2").text(today_data['games']['0']['Game_details']['home']['statistics']['rebounds']);
	$("#oreb_1").text(today_data['games']['0']['Game_details']['away']['statistics']['offensive_rebounds']);
	$("#oreb_2").text(today_data['games']['0']['Game_details']['home']['statistics']['offensive_rebounds']);
	$("#ast_1").text(today_data['games']['0']['Game_details']['away']['statistics']['assists']);
	$("#ast_2").text(today_data['games']['0']['Game_details']['home']['statistics']['assists']);
	$("#to_1").text(today_data['games']['0']['Game_details']['away']['statistics']['turnovers']);
	$("#to_2").text(today_data['games']['0']['Game_details']['home']['statistics']['turnovers']);
	$("#fb_1").text(today_data['games']['0']['Game_details']['away']['statistics']['fast_break_pts']);
	$("#fb_2").text("15");//today_data['games']['0']['Game_details']['home']['statistics']['fast_break_pts']);
	$("#pp_1").text(today_data['games']['0']['Game_details']['away']['statistics']['paint_pts']);
	$("#pp_2").text("45");//today_data['games']['0']['Game_details']['home']['statistics']['paint_pts']);
	/*generate player stats*/
	var pt_1_name = today_data['games']['0']['boxscore']['away']['leaders']['points']['0']['full_name'];
	var pt_1_stat = today_data['games']['0']['boxscore']['away']['leaders']['points']['0']['statistics']['points']
	$("#pt_1").text(pt_1_name + " " + pt_1_stat);
	var pt_2_name = today_data['games']['0']['boxscore']['home']['leaders']['points']['0']['full_name'];
	var pt_2_stat = today_data['games']['0']['boxscore']['home']['leaders']['points']['0']['statistics']['points']
	$("#pt_2").text(pt_2_name + " " + pt_2_stat);

	var r_1_name = today_data['games']['0']['boxscore']['away']['leaders']['rebounds']['0']['full_name'];
	var r_1_stat = today_data['games']['0']['boxscore']['away']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r1").text(r_1_name + " " + r_1_stat);
	var r_2_name = today_data['games']['0']['boxscore']['home']['leaders']['rebounds']['0']['full_name'];
	var r_2_stat = today_data['games']['0']['boxscore']['home']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r2").text(r_2_name + " " + r_2_stat);

	var a_1_name = today_data['games']['0']['boxscore']['away']['leaders']['assists']['0']['full_name'];
	var a_1_stat = today_data['games']['0']['boxscore']['away']['leaders']['assists']['0']['statistics']['assists']
	$("#a1").text(a_1_name + " " + a_1_stat);
	var a_2_name = today_data['games']['0']['boxscore']['home']['leaders']['assists']['0']['full_name'];
	var a_2_stat = today_data['games']['0']['boxscore']['home']['leaders']['assists']['0']['statistics']['assists']
	$("#a2").text(a_2_name + " " + a_2_stat);
	$("#score1").text(today_data['games']['0']['Game_details']['away']['points']);
	$("#score2").text(today_data['games']['0']['Game_details']['home']['points']);
	/*tweet*/
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/BKN_ATL.gif";
}
function generate_today_game1()
{
	$("#OT_Col").hide();
	$("#OT_Col1").hide();
	$("#OT_Col2").hide();
	$("#team_1").text(today_data['games']['1']['Game_details']['away']['name']);
	$("#team_2").text(today_data['games']['1']['Game_details']['home']['name']);
	image = document.getElementById('teamimg1');
	image1 = document.getElementById('teamimg12');
	var r3 = "Images/" + today_data['games']['1']['box_score']['away']['name'] + ".gif ";
	image.src = r3;
	image1.src = r3;
	image = document.getElementById('teamimg2');
	image1 = document.getElementById('teamimg22');
	var r4 = "Images/" + today_data['games']['1']['box_score']['home']['name'] + ".gif ";
	image1.src = r4;
	image.src = r4;	
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(today_data['games']['1']['Game_details']['away']['name']);
	$("#team_2_s").text(today_data['games']['1']['Game_details']['home']['name']);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(today_data['games']['1']['Game_details']['away']['name']);
	$("#team_2_p").text(today_data['games']['1']['Game_details']['home']['name']);
	/*generate points by quarter for away team*/
	$("#q1_1").text(today_data['games']['1']['Game_details']['away']['scoring']['0']['points']);
	$("#q2_1").text(today_data['games']['1']['Game_details']['away']['scoring']['1']['points']);
	$("#q3_1").text(today_data['games']['1']['Game_details']['away']['scoring']['2']['points']);
	$("#q4_1").text("0");//DOESN'T EXIST 
	//TODO OVERTIME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$("#f_1").text(today_data['games']['1']['Game_details']['away']['points']);

	/*generate points by quarter for home team*/
	$("#q1_2").text(today_data['games']['1']['Game_details']['home']['scoring']['0']['points']);
	$("#q2_2").text(today_data['games']['1']['Game_details']['home']['scoring']['1']['points']);
	$("#q3_2").text(today_data['games']['1']['Game_details']['home']['scoring']['2']['points']);
	$("#q4_2").text("0"); //DOESN'T EXIST YET
	$("#f_2").text(today_data['games']['1']['Game_details']['home']['points']);

	/*generate play-by-play*/
	//TODO: Add the quarter to the time so it's more clear
	$("#p1_t").text(today_data['games']['1']['Play_by_play']['periods']['2']['events']['83']['clock']);
	$("#p1").text(today_data['games']['1']['Play_by_play']['periods']['2']['events']['83']['description']);
	/*generate team stats */
	$("#reb_1").text(today_data['games']['1']['Game_details']['away']['statistics']['rebounds']);
	$("#reb_2").text(today_data['games']['1']['Game_details']['home']['statistics']['rebounds']);
	$("#oreb_1").text(today_data['games']['1']['Game_details']['away']['statistics']['offensive_rebounds']);
	$("#oreb_2").text(today_data['games']['1']['Game_details']['home']['statistics']['offensive_rebounds']);
	$("#ast_1").text(today_data['games']['1']['Game_details']['away']['statistics']['assists']);
	$("#ast_2").text(today_data['games']['1']['Game_details']['home']['statistics']['assists']);
	$("#to_1").text(today_data['games']['1']['Game_details']['away']['statistics']['turnovers']);
	$("#to_2").text(today_data['games']['1']['Game_details']['home']['statistics']['turnovers']);
	$("#fb_1").text("12");//today_data['games']['1']['Game_details']['away']['statistics']['fast_break_pts']);
	$("#fb_2").text("9");//today_data['games']['1']['Game_details']['home']['statistics']['fast_break_pts']);
	$("#pp_1").text("6");//today_data['games']['1']['Game_details']['away']['statistics']['paint_pts']);
	$("#pp_2").text("18");//today_data['games']['1']['Game_details']['home']['statistics']['paint_pts']);
	/*generate player stats*/
	var pt_1_name = today_data['games']['1']['box_score']['away']['leaders']['points']['0']['full_name'];
	var pt_1_stat = today_data['games']['1']['box_score']['away']['leaders']['points']['0']['statistics']['points']
	$("#pt_1").text(pt_1_name + " " + pt_1_stat);
	var pt_2_name = today_data['games']['1']['box_score']['home']['leaders']['points']['0']['full_name'];
	var pt_2_stat = today_data['games']['1']['box_score']['home']['leaders']['points']['0']['statistics']['points']
	$("#pt_2").text(pt_2_name + " " + pt_2_stat);

	var r_1_name = today_data['games']['1']['box_score']['away']['leaders']['rebounds']['0']['full_name'];
	var r_1_stat = today_data['games']['1']['box_score']['away']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r1").text(r_1_name + " " + r_1_stat);
	var r_2_name = today_data['games']['1']['box_score']['home']['leaders']['rebounds']['0']['full_name'];
	var r_2_stat = today_data['games']['1']['box_score']['home']['leaders']['rebounds']['0']['statistics']['rebounds']
	$("#r2").text(r_2_name + " " + r_2_stat);

	var a_1_name = today_data['games']['1']['box_score']['away']['leaders']['assists']['0']['full_name'];
	var a_1_stat = today_data['games']['1']['box_score']['away']['leaders']['assists']['0']['statistics']['assists']
	$("#a1").text(a_1_name + " " + a_1_stat);
	var a_2_name = today_data['games']['1']['box_score']['home']['leaders']['assists']['0']['full_name'];
	var a_2_stat = today_data['games']['1']['box_score']['home']['leaders']['assists']['0']['statistics']['assists']
	$("#a2").text(a_2_name + " " + a_2_stat);
	$("#score1").text(today_data['games']['1']['Game_details']['away']['points']);
	$("#score2").text(today_data['games']['1']['Game_details']['home']['points']);
	/*tweet*/
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/CHI_MIL.gif";
}
function generate_today_game2()
{
	
	$("#OT_Col").hide();
	$("#OT_Col1").hide();
	$("#OT_Col2").hide();
	$("#team_1").text(today_data['games']['2']['boxscore']['away']['name']);
	$("#team_2").text(today_data['games']['2']['boxscore']['home']['name']);
	image = document.getElementById('teamimg1');
	var r3 = "Images/" + today_data['games']['2']['boxscore']['away']['name'] + ".gif ";
	image.src = r3;
	image = document.getElementById('teamimg2');
	var r4 = "Images/" + today_data['games']['2']['boxscore']['home']['name'] + ".gif ";
	image.src = r4;		/*team_1_s and team 2_s display down in the team stats box*/
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(today_data['games']['2']['boxscore']['away']['name']);
	$("#team_2_s").text(today_data['games']['2']['boxscore']['home']['name']);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(today_data['games']['2']['boxscore']['home']['name']);
	$("#team_2_p").text(today_data['games']['2']['boxscore']['away']['name']);
	/*tweet*/
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/MEM_POR.gif";
	clear_empty_game();
	
}

function generate_tomorrow_sidebar_pics()
{
	/*extract game 1 teams*/
	var away_0 = tomorrow_data['games']['1']['away']['name'];
	var home_0 = tomorrow_data['games']['1']['home']['name'];
	away_0 = away_0.substr(away_0.indexOf(" ") + 1); //get team name
	home_0 = home_0.substr(home_0.indexOf(" ") + 1); //get team name

	/*extract game 2 teams*/
	var away_1 = tomorrow_data['games']['2']['away']['name'];
	var home_1 = tomorrow_data['games']['2']['home']['name'];
	away_1 = away_1.substr(away_1.indexOf(" ") + 1); //get team name (do twice since there is extra space)
	away_1 = away_1.substr(away_1.indexOf(" ") + 1); 
	home_1 = home_1.substr(home_1.indexOf(" ") + 1); 
	home_1 = home_1.substr(home_1.indexOf(" ") + 1); 

	/*extract game 3 teams*/
	var away_2 = tomorrow_data['games']['3']['away']['name'];
	var home_2 = tomorrow_data['games']['3']['home']['name'];
	away_2 = away_2.substr(away_2.indexOf(" ") + 1); //get team name (do twice since there is extra space)
	away_2 = away_2.substr(away_2.indexOf(" ") + 1); 
	home_2 = home_2.substr(home_2.indexOf(" ") + 1); 
	home_2 = home_2.substr(home_2.indexOf(" ") + 1); 
	
	image1 = document.getElementById('teamimg12');
	var r3 = "Images/" + away_1 + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg22');
	var r4 = "Images/" + home_1 + ".gif ";
	image1.src = r4;	
	image1 = document.getElementById('teamimg11');
	var r3 = "Images/" + away_0 + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg21');
	var r4 = "Images/" + home_0 + ".gif ";
	image1.src = r4;
	image1 = document.getElementById('teamimg13');
	var r3 = "Images/" + away_2 + ".gif ";
	image1.src = r3;
	image1 = document.getElementById('teamimg23');
	var r4 = "Images/" + home_2+ ".gif ";
	image1.src = r4;	

}
function generate_tomorrow_game()
{
	var away = tomorrow_data['games']['1']['away']['name'];
	var home = tomorrow_data['games']['1']['home']['name'];
	away = away.substr(away.indexOf(" ") + 1); //get team name
	home = home.substr(home.indexOf(" ") + 1); //get team name
	$("#team_1").text(away);
	$("#team_2").text(home);
	image = document.getElementById('teamimg1');
	image1 = document.getElementById('teamimg11');
	var r3 = "Images/" + away + ".gif";
	image.src = r3;
	image1.src = r3;
	image = document.getElementById('teamimg2');
	var r4 = "Images/" + home + ".gif";
	image.src = r4;	
	image1 = document.getElementById('teamimg21');	
	image1.src = r4; 
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(away);
	$("#team_2_s").text(home);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(away);
	$("#team_2_p").text(home);
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/DAL_HOU2.gif";
	clear_empty_game();

}

function generate_tomorrow_game1()
{
	var away = tomorrow_data['games']['2']['away']['name'];
	var home = tomorrow_data['games']['2']['home']['name'];
	away = away.substr(away.indexOf(" ") + 1); //get team name (do twice since there is extra space)
	away = away.substr(away.indexOf(" ") + 1); 
	home = home.substr(home.indexOf(" ") + 1); 
	home = home.substr(home.indexOf(" ") + 1); 
	$("#team_1").text(away);
	$("#team_2").text(home);
	image = document.getElementById('teamimg1');
	image1 = document.getElementById('teamimg12');
	var r3 = "Images/" + away + ".gif ";
	image.src = r3;
	image1.src = r3;
	image = document.getElementById('teamimg2');
	image1 = document.getElementById('teamimg22');
	var r4 = "Images/" + home + ".gif ";
	image1.src = r4;
	image.src = r4;	
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(away);
	$("#team_2_s").text(home);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(away);
	$("#team_2_p").text(home);
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/NO_GS.gif";
	clear_empty_game();
}

function generate_tomorrow_game2()
{

	var away = tomorrow_data['games']['3']['away']['name'];
	var home = tomorrow_data['games']['3']['home']['name'];
	away = away.substr(away.indexOf(" ") + 1); //get team name (do twice since there is extra space)
	away = away.substr(away.indexOf(" ") + 1); 
	home = home.substr(home.indexOf(" ") + 1); 
	home = home.substr(home.indexOf(" ") + 1); 
	$("#team_1").text(away);
	$("#team_2").text(home);
	image = document.getElementById('teamimg1');
	var r3 = "Images/" + away + ".gif ";
	image.src = r3;
	image = document.getElementById('teamimg2');
	var r4 = "Images/" + home + ".gif ";
	image.src = r4;		
	/*team_1_s and team 2_s display down in the team stats box*/
	$("#team_1_s").text(away);
	$("#team_2_s").text(home);
	/*team_1_p and team_2_p display for the indiv'0'ual player stats*/
	$("#team_1_p").text(away);
	$("#team_2_p").text(home);
	t_image = document.getElementById('tweet_image');
	t_image.src = "Images/SA_LAC.gif";
	clear_empty_game();

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
 function renderTodayText()  
 {
 	var parse_date = today_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
 }
function renderInitial()
{
	var parse_date = yesterday_data['date'].split("-");
 	var returner = parse_date[1]+"/"+parse_date[2];
	$("#yesterday").text(returner);
	
	parse_date= tomorrow_data['date'].split("-");
	returner = parse_date[1]+"/"+parse_date[2];
	$("#tomorrow").text(  returner);
	
	/*put a call here to GENERATE GAME 1!!!!!*/
	today_setup();
	$('#load').hide();
	$('#all').fadeToggle(1000);
	//render_sidebar_pics
}

function clear_empty_game()
{
/*generate points by quarter for away team*/
	$("#q1_1").text("0");
	$("#q2_1").text("0");
	$("#q3_1").text("0");
	$("#q4_1").text("0");
	$("#f_1").text("0");
	/*generate points by quarter for home team*/
	$("#q1_2").text("0");
	$("#q2_2").text("0");
	$("#q3_2").text("0");
	$("#q4_2").text("0");
	$("#f_2").text("0");
	/*generate play-by-play*/
	//TODO: Add the quarter to the time so it's more clear
	$("#p1_t").text("Q1 12:00");
	$("#p1").text("No game data yet");
	/*generate team stats */
	$("#reb_1").text("0");
	$("#reb_2").text("0");
	$("#oreb_1").text("0");
	$("#oreb_2").text("0");
	$("#ast_1").text("0");
	$("#ast_2").text("0");
	$("#to_1").text("0");
	$("#to_2").text("0");
	$("#fb_1").text("0");
	$("#fb_2").text("0");
	$("#pp_1").text("0");
	$("#pp_2").text("0");
	/*generate player stats*/
	$("#pt_1").text("N/A");
	$("#pt_2").text("N/A");
	$("#r1").text("N/A");
	$("#r2").text("N/A");
	$("#a1").text("N/A");
	$("#a2").text("N/A");
	$("#score1").text("0");
	$("#score2").text("0");
}	
