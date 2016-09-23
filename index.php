<!DOCTYPE html>
<html lang="en_US">
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="skin/css/main.css" />
		<script src="skin/js/jquery.js"></script>
		<title>PSU ACG Club</title>
	</head>
	<body>
		<header>
			<nav>
				<?php system('skin/ss/nav'); ?>
			</nav>
			<div id="search">
				<form action="search.php">
					<input type="text" name="q" />
					<input type="submit" name="s" />
				</form>
			</div>
			<div class="navitem" id="login"><a href="login.php">Login/Register</a></div>
			<div id="lang"><a href="?lang=zh_CN">zh_CN</a>|<a href="?lang=zh_TW">zh_TW</a></div>
		</header>
		<content>
			<section id="tophit"></section>
			<section id="cos"></section>
			<section id="draw"></section>
			<section id="idol"></section>
		</content>
		<footer>
			<div id="fb" class="share"></div>
			<div id="bl" class="share"></div>
			<div id="wb" class="share"></div>
		</footer>
	</body>
</html>
