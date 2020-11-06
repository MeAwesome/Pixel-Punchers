window.onload = function(){
  var deviceScript = document.createElement("script");
  deviceScript.id = "deviceScript";
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    deviceScript.src = "/src/public/js/phone.js";
  } else {
    deviceScript.src = "/src/public/js/phone.js";
  }
  deviceScript.onload = function(){
    onLoad();
  }
  document.head.appendChild(deviceScript);
}
