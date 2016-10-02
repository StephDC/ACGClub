$('document').ready(function(){
	$('#search').mouseout(function(){
		$('#sform input:first').attr('disabled','');
	});
	$('#search').mouseover(function(){
		$('#sform input:first').removeAttr('disabled');
	});
});
