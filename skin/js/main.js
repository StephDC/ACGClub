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
	$('.pst figure:last img')[0].setAttribute('src',pstprefix+imgdata[0].figurl);
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
		setTimeout(function(){
			$('.pst figure:last img')[0].setAttribute('src',imgprefix+imgdata[pstId].figurl);
			$('.pst figure:last figcaption')[0].innerText = imgdata[pstId].figcap;
		},1000);
	});
}
var porsID = 0;
function porsNext(){
	$('.pors figure:first').css('left','0');
	$('.pors figure:last').css('left','297px');
	setTimeout(function(){
		$('.pors figure:first img')[0].setAttribute('src',$('.pors figure:last img')[0].getAttribute('src'));
		$('.pors figure:first figcaption')[0].innerText = $('.pors figure:last figcaption')[0].innerText;
		$('.pors figure').removeAttr('style');
		porsID = (porsID +1) % porsdata.length;
		setTimeout(function(){
			$('.pors figure:last img')[0].setAttribute('src',imgprefix+porsdata[porsID].figurl);
			$('.pors figure:last figcaption')[0].innerText = porsdata[porsID].figcap;
		},1000);
	},2000);)
}
