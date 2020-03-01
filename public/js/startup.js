window.onload = function(){
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  	document.getElementById("deviceScript").src = "/public/js/phone.js";
  } else {
  	document.getElementById("deviceScript").src = "/public/js/laptop.js";
  }
  document.getElementById("deviceScript").onload = function(){
    onLoad();
  }
}
