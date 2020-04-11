"use strict";
//Crear Tabla
// Obtener la referencia del elemento body
var body = document.getElementsByTagName("body")[0];
// Crea un elemento <table> y un elemento <tbody>
var tabla = document.createElement("table");
var tblBody = document.createElement("tbody");
function genera_tabla() {
    tblBody.innerHTML = "";
    var hileraP = document.createElement("tr");
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("Nombre"));
    hileraP.appendChild(celdaP);
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("Tipo"));
    hileraP.appendChild(celdaP);
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("Linea"));
    hileraP.appendChild(celdaP);
    tblBody.appendChild(hileraP);
    // Crea las celdas
    for (var i = 0; i < Tabla_de_datos.length; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
        var splitted = Tabla_de_datos[i].split(",");
        for (var j = 0; j < 3; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(splitted[j]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}
function genera_reporte() {
    var contador = 1;
    tblBody.innerHTML = "";
    var hileraP = document.createElement("tr");
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("No."));
    hileraP.appendChild(celdaP);
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("Tipo Error"));
    hileraP.appendChild(celdaP);
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("Linea"));
    hileraP.appendChild(celdaP);
    var celdaP = document.createElement("td");
    celdaP.appendChild(document.createTextNode("Descripcion"));
    hileraP.appendChild(celdaP);
    tblBody.appendChild(hileraP);
    // Crea las celdas
    for (var i = 0; i < listaLexema.length; i++) {
        if (listaToken[i] == "Error lexico") {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");
            //-------------------------------------------------------------
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(contador.toString());
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(listaToken[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(Linea_de_datos[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode("El carácter \"" + listaLexema[i] + "\" no pertenece al lenguaje.");
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            contador++;
            //-------------------------------------------------------------
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }
    }
    for (var i = 0; i < listaLexemaS.length; i++) {
        if (listaTokenS[i] == "Error Sintactico") {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");
            //-------------------------------------------------------------
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(contador.toString());
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(listaTokenS[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(Linea_de_datos[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode("Se encontro un \"" + listaLexemaS[i] + "\" y no se esperaba eso");
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            contador++;
            //-------------------------------------------------------------
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }
    }
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}
function saveTextAsFile() {
    var textToWrite = document.getElementById('editor').value;
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = "myNewFile.cs";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
