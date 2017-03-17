var sid = 'None';
var cf = false;
function queryBG(parseData){
	$.ajax({
		url:"https://worm.hanfucw.com/cgi/maidReservation.py",
		method:"POST",
		data:parseData,
		dataType: "script",
	});
}

function searchSpot(){
	if (!(cf && confirm("Our record suggests you already have a confirmed reservation with Reservation ID of "+sid+".\nDo you want to modify that reservation?"))){
		data = {
			act:"search",
			pop:$("#pop").val(),
			uName:$("#uName").val(),
			pNum:$("#pNum").val(),
			eMail:$("#eMail").val(),
			aTime:$("#aHour").val()+":"+$("#aMin").val(),
			rNum:"None",
		};
	} else {
		data = {
			act:"modify",
			pop:$("#pop").val(),
			uName:$("#uName").val(),
			pNum:$("#pNum").val(),
			eMail:$("#eMail").val(),
			aTime:$("#aHour").val()+":"+$("#aMin").val(),
			rNum:sid,
		};
	}
	queryBG(data);
}

function lookupSpot(){
	data = {
		act:"retrieve",
		uName:$('#rName').val(),
		rNum:$('#rNum').val()
	};
	queryBG(data);
}

function cancelSpot(){
	getname = $("#rName").val();
        if (getname == '') getname=$("#uName").val();
	if (getname == '') getname=prompt("Please enter your name for identification purpose.");
	data = {
		act:"book",
		uName:getname,
		rNum:sid,
		tNum:"CC"
	};
	if (confirm("Are you sure that you want to cancel the reservation with Reservation ID of "+sid+" ?")) queryBG(data);
}

function getCookie(c_name) {
        if (document.cookie.length>0){
                c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1){
                        c_start=c_start + c_name.length+1;
                        c_end=document.cookie.indexOf(";",c_start);
                        if (c_end==-1) c_end=document.cookie.length;
                        return unescape(document.cookie.substring(c_start,c_end));
                }
        }
        return "";
}


function setCookie(c_name,c_value) {
        var exDate = new Date();
        exDate.setDate(exDate.getDate()+1);
        document.cookie=/*(document.cookie.length>0?document.cookie + "; ":"")+*/c_name+"="+escape(c_value)+";expires="+exDate.toGMTString()+";path=/";
}

function remCookie(c_name) {
        var exDate = new Date();
        exDate.setDate(exDate.getDate()-1);
        document.cookie=/*(document.cookie.length>0?document.cookie + "; ":"")+*/c_name+"="+";expires="+exDate.toGMTString()+";path=/";
}
