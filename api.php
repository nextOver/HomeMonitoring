<?php 

#variáveis de configuração
$valueFile = "value.txt";
$statusFile = "status.txt";
$private_key="kS2W2~aZ68>5=rt!";

# Receber conteúdo e gravar em arquivo
if(isset($_GET["distance"]) && isset($_GET["passcode"])){
	
	if($_GET["passcode"] == $private_key){
		file_put_contents($valueFile, $_GET['distance'], LOCK_EX) or die("error to save data on file");
	}else{
		echo "[!] Private key incorrect";
	}
}

if (isset($_GET['servicestate'])) {
	if($_GET["passcode"] == $private_key){
		file_put_contents($statusFile, $_GET['servicestate'], LOCK_EX) or die("error to save data on file");
	}else{
		echo "[!] Private key incorrect";
	}
}

# Funções 
function getServicesState($file)
{
	$res = str_replace("ActiveState=","", file_get_contents($file));
	$getServiceStatus = str_replace(array("ActiveState=","\n"),"",shell_exec('systemctl show -p ActiveState homemonitor.service'));
	$json = json_decode($res);
	array_push($json->service_status=$getServiceStatus, NULL);
	$json = json_encode($json); 
	echo $json;
}

function getValue($file)
{
	$res = file_get_contents($file);
	echo "&value=".$res;
}


# Chamando funções
if (isset($_GET['function']) && $_GET['function'] == "getValue") {
	getValue($valueFile);
}

if (isset($_GET['function']) && $_GET['function'] == "getServiceState") {
	getServicesState($statusFile);
}




 ?>