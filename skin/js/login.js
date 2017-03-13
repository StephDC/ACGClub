$(document).ready(function() {
/*	$("#logout").click(function(){
		logout_Cookie();
	});
	$("#update").click(function(){
		update_Nickname();
	});
*/
});

function encrypt_uName() {
	var data = document.getElementById("uName").value;
	var numVal = 0;
	if (!isNaN(parseInt(data.slice(3)))) numVal += parseInt(data.slice(3));
	numVal *= 256;
	if (data.charCodeAt(0)>256 || isNaN(data.charCodeAt(0))) throw "Invalid character found";
	else numVal += data.charCodeAt(0);
	numVal *= 256;
	if (data.charCodeAt(1)>256 || isNaN(data.charCodeAt(1))) throw "Invalid character found";
	else numVal += data.charCodeAt(1);
	numVal *= 256;
	if (data.charCodeAt(2)>256 || isNaN(data.charCodeAt(2))) throw "Invalid character found";
	else numVal += data.charCodeAt(2);
	return bsthencode(numVal);
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
	document.cookie=c_name+"="+escape(c_value)+";expires="+exDate.toGMTString()+";path=/";
}

function remCookie(c_name) {
	var exDate = new Date();
	exDate.setDate(exDate.getDate()-1);
	document.cookie=c_name+"="+";expires="+exDate.toGMTString();
}

function logout_Cookie() {
	var uName = getCookie("uName");
	var pWord = getCookie("pWord");
	if (uName != null && uName != "" && pWord != null && pWord != ""){
		$.post("https://bbs.psucssa.org/cgi-bin/webAccess.py",{"encType":"logout","uName":uName,"pWord":pWord},function(res,stat){
			document.getElementById("loginResponse").value = "Logout "+res;
			if (res == "Success\n"){
				remCookie("uName");remCookie("pWord");
				document.getElementById("pWord").disabled=false;
				document.getElementById("uName").disabled=false;
				$("#login").children()[0].innerText = nickName;
				document.getElementById("logout").disabled=true;
			};
		});
	}
}

function update_Nickname() {
	var uName = getCookie("uName");
	var pWord = getCookie("pWord");
	if (uName != null && uName != "" && pWord != null && pWord != ""){
		$.post("https://bbs.psucssa.org/cgi-bin/webAccess.py",{"encType":"update","uName":uName,"pWord":pWord},function(res,stat){
			document.getElementById("loginResponse").value = "Update Nickname "+res;
		});
	}
}

function backPage(addr) {
	document.location = "https://steph.hanfucw.com/webserver/ACGClub"+addr;
}

function query_Cookie(cback) {
	var uName = getCookie("uName");
	var pWord = getCookie("pWord");
	if (uName != null && uName != "" && pWord != null && pWord != ""){
		$.post("https://bbs.psucssa.org/cgi-bin/webAccess.py",{"encType":"check","uName":uName,"pWord":pWord},function(res,stat){
			if (res == 'Success\n') {
				document.getElementById("loginResponse").value = "You are logged in.";
				$("#submit").click(function(){backPage(cback);});
				document.getElementById("pWord").disabled=true;
				document.getElementById("uName").disabled=true;
				document.getElementById("logout").disabled=false;
				$("#update").show();
				document.getElementById("submit").focus();
			}
			else {
				document.getElementById("uName").focus();
				document.getElementById("loginResponse").value = "You are not logged in.";
				remCookie('uName'); remCookie('pWord');
				$("#submit").click(function(){query_Hash();});
			};
		});
	}
	else {
		document.getElementById("loginResponse").value = "You are not logged in.";
		remCookie('uName'); remCookie('pWord');
		$("#submit").click(function(){query_Hash();});
	};
}

function query_Hash() {
	var result = "";
	$.post("https://bbs.psucssa.org/cgi-bin/webAccess.py",{"encType":"hash","uName":encrypt_uName(),"pWord":"None"},function(res,stat){
		var pWord = hex_hmac_sha512($.trim(res),document.getElementById("pWord").value);
		$.post("https://bbs.psucssa.org/cgi-bin/webAccess.py",{"encType":"hash","uName":encrypt_uName(),"pWord":pWord},function(resp,stat){
			if (resp != "Success\n"){
				document.getElementById("loginResponse").value = "Processing login request...";
				query_RSA();
			}
			else{
				document.getElementById("loginResponse").value = "Login success.";
				setCookie("uName",encrypt_uName());setCookie("pWord",pWord); backForum();
			};
		});
	});
}

function query_RSA() {
	var rsa = new RSAKey();
	var pubKeyMod = "D3728252E50AC71912006EAA7B08B9A9CEF75E5CDFEF7538B0A780CF628A49B781ABBFE08BC670E52765453DD26014ABC7B31648364F3F66C9618A537A6FA514E8CB42B023FE887BF29DAEEB3DF552C75A367A5E3FDADB735F7B34B4DC44CA616F4847DABF63FC34BF2ED14B80DB59FD109AED4E99F877C5C060D82AA5AE73C93255EE47383800E1D8B5A1B12E2909A10D1FA9B6FE3E72B526F6AFE824F281449ADED3F1E7CD002035E53FEBB73B748A726E44F6657C39CC2970545FE4379521632CFF6DD6D3ABA3099F9897A53B66122612CA9B13563E56775DE09AB2026610020F880C61F973C0837F0D6AEB7D5AB9DBFB27D17C247E43B5948F030E40CA93C40B63BB545B76F8BE9A924B6F83A6AEF7D8019C0F1F75E1A9C3FCB1710BEC42BEAEB5C3171BB5DF3102B94D4BF90CBF05FD1B08F0A9D718A82A2100B77FF1FBEAF80A1E36DCC2C91481A3FC99AB47794EB07BE87B14ADD788AAC06FF2A9545DB5A5B7FF62DEC19810D24221476D7615E119209567FB13F3DED97B3EB02DF70C9E5592504A3A47684D35644C49E2262A17CD4B260F1C2262DB48510FDA7C13CD5D738CA7D948120E5BBA7C5A8194E4B8E49C0CEDFCAAEEDABF7FA873F3734E80AB22D0D27ED9C467D4B1939AE74D2CA14D888C499D1AADD43A537877122A45C41F8106329951FAC33788B32EF960C731348FCADA5B94597687FA2E7105181073";
	var pubKeyExp = "10001"
	rsa.setPublic(pubKeyMod, pubKeyExp);
	var uName = hex2b64(rsa.encrypt(document.getElementById("uName").value));
	var pWord = hex2b64(rsa.encrypt(document.getElementById("pWord").value));
	if(uName && pWord) {
		$.post("https://bbs.psucssa.org/cgi-bin/webAccess.py",{"encType":"rsa","uName":uName,"pWord":pWord},function(res,stat){
			if (res != "Fail\n") {
				document.getElementById("loginResponse").value = "Login success.";
				setCookie("uName",encrypt_uName());
				pWord = hex_hmac_sha512($.trim(res),document.getElementById("pWord").value);
				setCookie("pWord",pWord);
				backAddr();
			}
			else{
				document.getElementById("loginResponse").value = "Login failed. Check your password.";
			}
		});
	}
}
