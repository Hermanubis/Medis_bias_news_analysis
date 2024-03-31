window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the text info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'text'},
        getData);
  });
});

const getData = async (info) => {

  let data = info?.text;
  console.log(info);
  
	var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://127.0.0.1:8000/data",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": JSON.stringify(data)
  }

  var xhttp = new XMLHttpRequest();
  var post_data = JSON.stringify({"data":encodeURIComponent(data)});
  xhttp.open(settings.method, settings.url, settings.async);
  xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(post_data);
  xhttp.onreadystatechange = async function(){
    var obj = JSON.stringify(this.responseText).replace(/\s+/g, '-');;
    console.log(obj)
    document.dispatchEvent(new CustomEvent('keywords', {detail: obj}));
  }
};
