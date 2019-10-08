window.onload = function() {
  const xmlhttp = new this.XMLHttpRequest();
  xmlhttp.open("GET", "/getData", true);
  xmlhttp.send(null)

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      
    }
  }
}