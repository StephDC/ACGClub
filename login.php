<?php
// First check if the user is logged in
// create a new cURL resource
$ch = curl_init();
if (!isset($_REQUEST['uName']) || !isset($_REQUEST['pWord'])){
	echo "未登入，請訪問<a href='https://bbs.psucssa.org/cgi-bin/webAccess/?cback=acg'>此處</a>登入";
	exit();
}
$authInfo = "encType=check&uName=".$_REQUEST['uName']."&pWord=".$_REQUEST['pWord'];
// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, "https://bbs.psucssa.org/cgi-bin/webAccess.py");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, $authInfo);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);
curl_setopt($ch, CURLOPT_FAILONERROR, True);

// grab URL and pass it to the browser
$curlResult = curl_exec($ch);
if ($curlResult == False || $curlResult != "Success\n"){
	echo "登入資訊錯誤，請訪問<a href='https://bbs.psucssa.org/cgi-bin/webAccess/?cback=acg'>此處</a>重新登入";
	//echo $authInfo.$curlResult;
	curl_close($ch);
	exit();
}
// close cURL resource, and free up system resources
curl_close($ch);
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Login Info</title>
		<meta charset="utf-8" />
	</head>
	<body>
		<h1>User Name:</h1>
		<p><?php echo($_POST['uName']); ?></p>
		<h1>Password:</h1>
		<p><?php echo($_POST['pWord']); ?></p>
		<h1>Path Name:</h1>
		<p><?php echo($_POST['pName']); ?></p>
	</body>
</html>
