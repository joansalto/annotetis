var numberOfComments = 0;
var commentsLoaded = 0;

function getCurrentTabUrl() {
  /*var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });*/
  //chrome.runtime.getURL();
  document.getElementById('labelURL').innerHTML = "HOLA";
}

function loadComments() {
  if (commentsLoaded == 0) {
    var json = '{"coments":[{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum quis lacus vitae malesuada. In in sagittis magna, at eleifend neque. ","author":"author1","date":"25/12/2017","punctuation":10,"isResponse":0},{"text":"Cras tincidunt interdum nibh eu malesuada. Maecenas et ullamcorper nisi. Maecenas porta erat at ex condimentum iaculis. Duis vehicula ipsum nec arcu sodales tincidunt id in erat. Praesent at purus quis turpis molestie congue ut sed leo. Fusce a venenatis tortor, a cursus ligula. In hac habitasse platea dictumst. Aliquam nec iaculis mi.","author":"author2","date":"25/12/2017","punctuation":-1,"isResponse":1},{"text":"Vivamus mattis neque sit amet mauris pulvinar, vitae condimentum ipsum lacinia. Aliquam erat volutpat. Quisque magna justo, viverra eget eros non, ornare elementum nunc. Mauris condimentum, enim sit amet convallis suscipit, libero risus molestie orci, tincidunt bibendum justo ante at neque. ","author":"author3","date":"25/12/2017","punctuation":3,"isResponse":0}]}';
    var obj = JSON && JSON.parse(json) || $.parseJSON(json);

    for(var i = 0; i < obj.coments.length; i++) {
      if(obj.coments[i].isResponse == 0) {
        var string = '<li class="list-group-item"><div class="container"><div class="row"><div class="col-sm-2 container-fluid"><h2 id="'+'punctuation'+i+'">'+ obj.coments[i].punctuation + '</h2><div class="btn-group center-block"><button class="btn btn-default" onclick="upvote(this)" id="'+'up'+i+'"><span class="glyphicon glyphicon glyphicon-chevron-up"></span></button><button class="btn btn-default" onclick="downvote(this)" id="'+'down'+i+'"><span class="glyphicon glyphicon glyphicon-chevron-down"></span></button></div></div><div class="col-sm-10 container-fluid"><h5 style="color:#3361AD;">' + obj.coments[i].author + ':</h5><p class="text-justify">'+ htmlEntities(obj.coments[i].text) +'</p><span class="label label-primary">' + obj.coments[i].date + '</span></div></div></div></li>';
        document.getElementById('commentsList').innerHTML = document.getElementById('commentsList').innerHTML + string;
      } else {
        var string = '<li class="list-group-item"><div class="container"><div class="row"><div class="col-sm-1" container-fluid></div><div class="col-sm-2 container-fluid"><h2 id="'+'punctuation'+i+'">'+ obj.coments[i].punctuation + '</h2><div class="btn-group center-block"><button class="btn btn-default" onclick="upvote(this)" id="'+'up'+i+'"><span class="glyphicon glyphicon glyphicon-chevron-up"></span></button><button class="btn btn-default" onclick="downvote(this)" id="'+'down'+i+'"><span class="glyphicon glyphicon glyphicon-chevron-down"></span></button></div></div><div class="col-sm-9 container-fluid"><h5 style="color:#3361AD;">' + obj.coments[i].author + ':</h5><p class="text-justify">'+ htmlEntities(obj.coments[i].text) +'</p><span class="label label-primary">' + obj.coments[i].date + '</span></div></div></div></li>';
        document.getElementById('commentsList').innerHTML = document.getElementById('commentsList').innerHTML + string;
      }
    }
    numberOfComments = numberOfComments + obj.coments.length;
    commentsLoaded = 1;
  } else {
    alert("Comments already loaded");
  }
}

function postComment() {
  if(document.getElementById('textArea').value != "") {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"+ (currentdate.getMonth()+1) + "/"+ currentdate.getFullYear()
    var string = '<li class="list-group-item"><div class="container"><div class="row"><div class="col-sm-2 container-fluid"><h2 id="'+'punctuation'+numberOfComments+'">'+ 0 + '</h2><div class="btn-group center-block"><button class="btn btn-default" onclick="upvote(this)" id="'+'up'+numberOfComments+'"><span class="glyphicon glyphicon glyphicon-chevron-up"></span></button><button class="btn btn-default" onclick="downvote(this)" id="'+'down'+numberOfComments+'"><span class="glyphicon glyphicon glyphicon-chevron-down"></span></button></div></div><div class="col-sm-10 container-fluid"><h5 style="color:#3361AD;">' + 'Adrià Munuera' + ':</h5><p class="text-justify">'+ htmlEntities(document.getElementById('textArea').value) +'</p><span class="label label-primary">' + datetime + '</span></div></div></div></li>';
    document.getElementById('commentsList').innerHTML = document.getElementById('commentsList').innerHTML + string;
    document.getElementById('textArea').value = ""
    numberOfComments = numberOfComments + 1;
  } else {
    alert("Empty comment");
  }
}

function upvote(id) {
  var idResult = "";
  for (var i = 2; i < id.id.length; i++) {
    idResult = idResult + id.id.charAt(i);
  }
  document.getElementById('punctuation'+idResult).innerHTML = parseInt(document.getElementById('punctuation'+idResult).innerHTML) + 1;
}

function downvote(id) {
  var idResult = "";
  for (var i = 4; i < id.id.length; i++) {
    idResult = idResult + id.id.charAt(i);
  }
  document.getElementById('punctuation'+idResult).innerHTML = parseInt(document.getElementById('punctuation'+idResult).innerHTML) - 1;
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//document.getElementById("buttonLoadURL").addEventListener("click", getCurrentTabUrl);
window.onload = initializePage;
//window.onload = getCurrentTabUrl;
function initializePage() {
  loadComments();
  document.querySelector('#buttonPostComment').addEventListener('click', postComment);
  document.querySelector('#buttonLoadURL').addEventListener('click', getCurrentTabUrl);
  document.querySelector('#buttonLoadComments').addEventListener('click', loadComments);
}
