var pstTimer = -10;
var porsTimer = -10;
$('document').ready(function(){
	/* Starting to define Login link */
	$('#login a')[0].setAttribute('href','https://bbs.psucssa.org/cgi-bin/webAccess/?cback=acg&pn='+document.location['pathname']);
	/* Starting to define Search bar script */
	$('#search').mouseout(function(){
		$('#sform input:first').attr('disabled','');
	});
	$('#search').mouseover(function(){
		$('#sform input:first').removeAttr('disabled');
	});
	/* Starting to define pst slideshow initialization script */
	$('.pst figure:last img')[0].setAttribute('src',imgprefix+pstdata[0].figurl);
	$('.pst figure:last figcaption')[0].innerText = pstdata[0].figcap;
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
	/* Starting to define pors slideshow initialization script */
	$('.pors figure:last img')[0].setAttribute('src',imgprefix+porsdata[0].figurl);
	$('.pors figure:last figcaption')[0].innerText = porsdata[0].figcap;
	porsNext();
	porsTimer = setInterval(porsNext,10000);
	$('.pors').mouseover(function(){
		if(porsTimer >= 0){
			clearInterval(porsTimer);
			porsTimer = -10;
		}
	});
	$('.pors').mouseout(function(){
		if(porsTimer <= 0){
			porsTimer = setInterval(porsNext,10000);
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
		pstId = (pstId +1) % pstdata.length;
		setTimeout(function(){
			$('.pst figure:last img')[0].setAttribute('src',imgprefix+pstdata[pstId].figurl);
			$('.pst figure:last figcaption')[0].innerText = pstdata[pstId].figcap;
		},1000);
	});
}
var porsID = 0;
function porsNext(){
	$('.pors figure:first').animate({'left':'-297px'},'slow');
	$('.pors figure:last').animate({'left':'0'},'slow',function(){
		$('.pors figure:first img')[0].setAttribute('src',$('.pors figure:last img')[0].getAttribute('src'));
		$('.pors figure:first figcaption')[0].innerText = $('.pors figure:last figcaption')[0].innerText;
		$('.pors figure').removeAttr('style');
		porsID = (porsID +1) % porsdata.length;
		setTimeout(function(){
			$('.pors figure:last img')[0].setAttribute('src',imgprefix+porsdata[porsID].figurl);
			$('.pors figure:last figcaption')[0].innerText = porsdata[porsID].figcap;
		},1000);
	});
}
