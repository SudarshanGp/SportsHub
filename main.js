function get_data(){
var xhr = new XMLHttpRequest();
 xhr.onreadystatechange = function () {
        if (xhr.readyState < 4)
            document.getElementById('content').innerHTML = "Loading...";
        else if (xhr.readyState === 4) {
            if (xhr.status == 200 && xhr.status < 300) 
            {
                  var obj = JSON.parse(xhr.responseText);
                  console.log("Here");
                  //alert(obj.count);
                 // Console.log(obj.result);
            	  document.getElementById('loaded').innerHTML = obj.season;
            	  
            	//  document.getElementById('loaded').innerHTML = xhr.responseText;

            }
        }
    }
xhr.open("GET", "https://api.sportsdatallc.org/nba-t3/games/2014/reg/schedule.json?api_key=skt8qqacw6dv83kvkxfcrybk", true);
//xhr.open("GET", "data_nba.json",true);
xhr.send();
}


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('click-this');
    // onClick's logic below:
    link.addEventListener('click', get_data);
});

function handle_line()
{
		var c = document.getElementById("Line1");
		var ctx = c.getContext("2d");
		ctx.moveTo(0,0);
		ctx.lineTo(100,100);
		ctx.stroke();
}