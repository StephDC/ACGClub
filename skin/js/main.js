var pstTimer = -10;
$('document').ready(function(){
	/* Starting to define Search bar script */
	$('#search').mouseout(function(){
		$('#sform input:first').attr('disabled','');
	});
	$('#search').mouseover(function(){
		$('#sform input:first').removeAttr('disabled');
	});
	/* Starting to define pst slideshow initialization script */
	$('.pst figure:last img')[0].setAttribute('src','uploads/pst/'+imgdata[0].figurl);
	$('.pst figure:last figcaption')[0].innerText = imgdata[0].figcap;
	pstNext();
	pstTimer = setInterval(pstNext,8000);
	$('.pst').mouseover(function(){
		if(pstTimer >= 0){
			clearInterval(pstTimer);
			pstTimer = -10;
		}
	});
	$('.pst').mouseout(function(){
		if(pstTimer <= 0){
			pstTimer = setInterval(pstNext,8000);
		}
	});
});
var pstId = 0;
function pstNext(){
	$('.pst figure:first').animate({left:'-509px'},'slow');
	$('.pst figure:last').animate({left:'0'},'slow',function(){
		$('.pst figure:first img')[0].setAttribute('src',$('.pst figure:last img')[0].getAttribute('src'));
		$('.pst figure:first figcaption')[0].innerText = $('.pst figure:last figcaption')[0].innerText;
		$('.pst figure').removeAttr('style');
		pstId = (pstId +1) % imgdata.length;
		$('.pst figure:last img')[0].setAttribute('src','uploads/pst/'+imgdata[pstId].figurl);
		$('.pst figure:last figcaption')[0].innerText = imgdata[pstId].figcap;
	});
}
