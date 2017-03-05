var URL = 'web';

function writeComment() {
    alert("has posteado");
}
function desplegable(padre) {
    if ($("#comment-hijos" + padre).is(":visible")) ocultar(padre);
    else mostrar(padre)
}
function ocultar(padre) {
    $("#comment-flecha" + padre).attr("src", "res/next.png");
    $("#comment-hijos" + padre).hide();
}
function mostrar(padre) {
    $("#comment-flecha" + padre).attr("src", "res/next-bot.png");
    $("#comment-hijos" + padre).show();
}
function moriartyIcon(id, face) {
    var icono = $("#moriarty" + id);
    switch (face) {
        case 0:
            icono.attr("src", "res/mori-good.png");
            break;
        case 1:
            icono.attr("src", "res/mori-normal.png");
            break;
        case 2:
            icono.attr("src", "res/mori-bad.png");
            break;
    }
}
function postComment() {
    if($("#writeText").val()!=""){
        //lo rellena toni, insertar datos en firebase

        var sessionsRef = firebase.database().ref(URL + "/comments");
        var llave = sessionsRef.push({
            comment: htmlEntities($("#writeText").val()),
            score: 0
        }).key;

        var hijo = firebase.database().ref(URL + "/subcomments");
        hijo.push({
            papi: llave,
            comment: "JELOU"
        })
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function load(id,idPadre, snapshot){
     update(id,idPadre, snapshot);
}

function update(id,idPadre, snapshot) {
    var container = makeContainer(id); // LA PONE TONI
    container = fillupContainer(container, snapshot);
    if(idPadre != '0'){
        $("#comment-hijos"+idPadre).append(container);
    }else{
        var padre = makeFather(container);
        $("#readComments").append(padre);
    }
}

function firstLoad(id, snapshot, esPadre) {
    var container = makeContainer(id); // LA PONE TONI
    container = fillupContainer(container, snapshot);
    if(esPadre){
        if(!primerPadre){
            $("#readComments").append(padre);
        }else primerPadre = false;
        padre = makeFather(container);
    }else{
        insertChild(padre,container);
    }
}

function makeFather(container) {
    var superPadre = document.createElement("div");
    superPadre.className = "container comment-superPadre";
    var subContainer = makeSubContainer(container.id);
    superPadre.appendChild(container);
    superPadre.appendChild(subContainer);
    return superPadre;
}

function insertChild(father, child) {
    father.childNodes.item(1).childNodes.item(1).appendChild(child);
    return father;
}
function makeContainer(id) {
    var divContainer = document.createElement("div");
    divContainer.className = "comment-divContainer";
    divContainer.id = id;
    var divText = document.createElement("div");
    divText.className = "comment-divText";
    var divCab = document.createElement("div");
    divCab.className="comment-divCab";
    var nick = document.createElement("div");
    nick.className = "comment-nick";
    var fecha = document.createElement("div");
    fecha.className = "comment-fecha";
    var text = document.createElement("p");
    text.className = "comment-text";
    var divVal = document.createElement("div");
    divVal.className = "comment-divVal";
    divVal.id = "comment-divVal"+id;
    var valTot = document.createElement("div");
    valTot.className = "comment-valTot";
    valTot.id = "comment-valTot"+id;
    var like = document.createElement("div");
    like.className = "comment-like";
    like.id = "comment-divVal"+id;
    var img = document.createElement("img");
    img.className = "iconos";
    img.src = "./res/up.png";
    like.appendChild(img);
    var dislike = document.createElement("div");
    dislike.className = "comment-dislike";
    dislike.id = "comment-divVal"+id;
    var img2 = document.createElement("img");
    img2.className = "iconos";
    img2.src="./res/down.png";
    dislike.appendChild(img2);
    var moriatyLike = document.createElement("div");
    moriatyLike.className = "comment-moriatyLike";
    moriatyLike.id = "comment-divVal"+id;

    divVal.appendChild(valTot);
    divVal.appendChild(like);
    divVal.appendChild(dislike);
    divVal.appendChild(moriatyLike);

    divCab.appendChild(nick);
    divCab.appendChild(fecha);

    divText.appendChild(divCab);
    divText.appendChild(text);
    divText.appendChild(divVal);

    divContainer.appendChild(divText);

    return divContainer;
}

function makeSubContainer(id) {
    var subContainer = document.createElement("div");
    subContainer.className = "container comment-subContainer";
    var minimizar = document.createElement("div");
    minimizar.className = "comment-minimizar";
    var flecha = document.createElement("img");
    flecha.className = "iconos";
    flecha.id = "comment-flecha"+id;
    flecha.src = "./res/next-bot.png";
    flecha.setAttribute("onclick","desplegable("+id+")");
    var hijos = document.createElement("div");
    hijos.className="comment-hijos";
    hijos.id = "comment-hijos"+id;

    minimizar.appendChild(flecha);

    subContainer.appendChild(minimizar);
    subContainer.appendChild(hijos);

    return subContainer;
}


function fillupContainer(container, snapshot){
    var divText = container.childNodes.item(0);

    var divCab = divText.childNodes.item(0);
    var text = divText.childNodes.item(1);
    var divVal = divText.childNodes.item(2);

    var nick = divCab.childNodes.item(0);
    var fecha = divCab.childNodes.item(1);

    var valTot = divVal.childNodes.item(0);
    var like = divVal.childNodes.item(1);
    var dislike = divVal.childNodes.item(2);
    var moriartyLike = divVal.childNodes.item(3);

    nick.innerHTML = "Pepe";
    var date = new Date();;
    fecha.innerHTML = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
    text.innerHTML = snapshot.val().comment;
    valTot.innerHTML = snapshot.val().score;
    return container;
}
function moriartyRequest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
                this.responseText;
        }
    };

    xhttp.open("POST", "https://jmlk74oovf.execute-api.eu-west-1.amazonaws.com", false);
    xhttp.setRequestHeader("x-api-key", "9CAfxmC4WB10tnS9RY9oG92Io0M4trVp7HpTUEjR");
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ textIn: "barcelona esta en cataluña" })); // parametros de la peticion
    xhttp.send(JSON.stringify({ language: "barcelona esta en cataluña" })); // parametros de la peticion
    var respuesta = JSON.parse(xhttp.responseText);
    console.log(response);
}


var cargaComments = firebase.database().ref(URL + '/comments');
var cargaSubComments = firebase.database().ref(URL + '/subcomments');

cargaComments.on('child_added', function(snapshot) {
    load(snapshot.key, 0, snapshot);

    /*var container = makeContainer(snapshot.key);
    container = fillupContainer(container, snapshot);
    container = makeFather(container);
    $("#readComments").append(container);*/
});

cargaSubComments.on('child_added', function(snapshot) {
    load(snapshot.key, snapshot.val().papi, snapshot);

    /*var container = makeContainer(snapshot.key);
     container = fillupContainer(container, snapshot);
     container = makeFather(container);
     $("#readComments").append(container);*/
});

function getLanguage(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://178.32.148.247:3000/language", false);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ textIn: $("#"+id).val()}));
    console.log(xhttp.responseText);
    if(xhttp.responseText == 'Spanish' || xhttp.responseText == 'English') {
        getSentiment($("#"+id).val(),xhttp.responseText);
    }else $("#una").attr("src","res/mori-normal.png");
}

function getSentiment(text,lang,id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://178.32.148.247:3000/sentiment", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ textIn: text, language: lang }));
    console.log(xhttp.responseText);
    if(xhttp.responseText == 'positive') {
        $("#"+id).attr("src","../res/mori-good.png");
    }else if(xhttp.responseText == 'negative') {
        $("#"+id).attr("src","../res/mori-bad.png");
    }else $("#"+id).attr("src","../res/mori-normal.png");
}
