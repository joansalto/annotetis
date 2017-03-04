function writeComment() {
    alert("has posteado");
}
function desplegable(padre) {
    if ($("#hijos" + padre).is(":visible")) ocultar(padre);
    else mostrar(padre)
}
function ocultar(padre) {
    $("#flecha" + padre).attr("src", "res/next.png");
    $("#hijos" + padre).hide();
}
function mostrar(padre) {
    $("#flecha" + padre).attr("src", "res/next-bot.png");
    $("#hijos" + padre).show();
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
        var superPadre = document.createElement("div");
        superPadre.className = "comment-superPadre";
        var date = new Date();
        var fecha = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        

    }
}
function makeContainer(id) {
    var divContainer = document.createElement("div");
    divContainer.className = "comment-container";
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
    var dislike = document.createElement("div");
    dislike.className = "comment-dislike";
    dislike.id = "comment-divVal"+id;
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
    subContainer.className = "comment-subContainer";
    var minimizar = document.createElement("div");
    minimizar.className = "comment-minimizar";
    var flecha = document.createElement("img");
    flecha.className = "comment-flecha";
    flecha.id = "comment-flecha"+id;
    flecha.src = "./res/next.png";
    var hijos = document.createElement("div");
    hijos.className="comment-hijos";
    hijos.id = "comment-hijos"+id;

    minimizar.appendChild(flecha);

    subContainer.appendChild(minimizar);
    subContainer.appendChild(hijos);

    return subContainer;

}

function rellenar(container,id){

}
