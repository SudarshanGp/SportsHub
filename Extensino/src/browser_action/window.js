
	$('#set_team').hide();
	$('#set_league').hide();
var team;
var league;
 $(document).ready(function(){
	//alert("etst");

	$('#league').on('click', function()
	{

		set_league();
		// $('#set_team').fadeOut(10000, function()
		// 	{
		// 		$('#set_team').hide();

		// 	});

	});
	//);
	$('#team').on('click', function()
	{
	//$('#set_team').show();
	// alert("Tea");	
		set_team();

	});
	//);	
	

});

function set_league()
{
		league = document.getElementById("league1");
//		alert(select.options[select.selectedIndex].value);
		$('#set_league').show();//.delay(3000).fadeOut();;
		$('#set_league').fadeToggle(1000);
}
function set_team()
{		
		team = document.getElementById("team1");
		$('#set_team').show();
		$('#set_team').fadeToggle(1000);

}