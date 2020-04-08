"use strict";
var listaLexema;
var listaToken;
var listaLexemaH;
var listaTokenH;
var auxLex = "";
var isId = /^[0-9|a-zA-Z|_]*$/;
var isLetra = /^[a-zA-Z]$/;
var isDigito = /^[0-9]$/;
var h1 = document.getElementById('h1ts');
function analizadorC() {
    var ListaHtml = "";
    listaLexema = [];
    listaToken = [];
    var estado = 0;
    var texto = document.getElementById('editor').value;
    var c;
    for (var num = 0; num < texto.length; num++) {
        c = texto.charAt(num);
        switch (estado) {
            case 0:
                if (c == '*') {
                    addList(c, "multiplicacion");
                    estado = 0;
                }
                else if (c == String.fromCharCode(92)) {
                    addList(c, "barra izq");
                    estado = 0;
                }
                else if (c == '/') {
                    if (texto.charAt(num + 1) == '/' || texto.charAt(num + 1) == '*') {
                        auxLex += c;
                        estado = 2;
                    }
                    else {
                        addList(c, "division");
                        estado = 0;
                    }
                }
                else if (c == ';') {
                    addList(c, "punto y coma");
                    estado = 0;
                }
                else if (c == ':') {
                    addList(c, "dos puntos");
                    estado = 0;
                }
                else if (c == '=') {
                    if (texto.charAt(num + 1) == '=') {
                        auxLex += c;
                        estado = 8;
                    }
                    else {
                        addList(c, "asignacion");
                        estado = 0;
                    }
                }
                else if (c == '+') {
                    if (texto.charAt(num + 1) == '+') {
                        auxLex += c;
                        estado = 12;
                    }
                    else {
                        addList(c, "suma");
                        estado = 0;
                    }
                }
                else if (c == '-') {
                    if (texto.charAt(num + 1) == '-') {
                        auxLex += c;
                        estado = 13;
                    }
                    else {
                        addList(c, "resta");
                        estado = 0;
                    }
                }
                else if (c == '}') {
                    addList(c, "llave der");
                    estado = 0;
                }
                else if (c == '{') {
                    addList(c, "llave izq");
                    estado = 0;
                }
                else if (c == '(') {
                    addList(c, "parentesis izq");
                    estado = 0;
                }
                else if (c == ')') {
                    addList(c, "parentesis der");
                    estado = 0;
                }
                else if (c == ',') {
                    addList(c, "coma");
                    estado = 0;
                }
                else if (c == '.') {
                    addList(c, "punto");
                    estado = 0;
                }
                else if (c == '<') {
                    if (texto.charAt(num + 1) == '=') {
                        auxLex += c;
                        estado = 8;
                    }
                    else {
                        addList(c, "menor que");
                        estado = 0;
                    }
                }
                else if (c == '>') {
                    if (texto.charAt(num + 1) == '=') {
                        auxLex += c;
                        estado = 8;
                    }
                    else {
                        addList(c, "mayor que");
                        estado = 0;
                    }
                }
                else if (c == '\"') {
                    addList(c, "comillas dobles");
                    estado = 10;
                }
                else if (c == '\'') {
                    if (texto.charAt(num + 2) == '\'') {
                        addList(c, "comillas simples");
                        addList(texto.charAt(num + 1), "caracter");
                        addList(c, "comillas simples");
                        num = num + 2;
                        estado = 0;
                    }
                    else {
                        addList(c, "comillas simples");
                        estado = 11;
                    }
                }
                else if (c == '|') {
                    if (texto.charAt(num + 1) == '|') {
                        auxLex += c;
                        estado = 6;
                    }
                    else {
                        addList(c, "barra vertical");
                        estado = 0;
                    }
                }
                else if (c == '&') {
                    if (texto.charAt(num + 1) == '&') {
                        auxLex += c;
                        estado = 7;
                    }
                    else {
                        addList(c, "y");
                        estado = 0;
                    }
                }
                else if (c == '!') {
                    if (texto.charAt(num + 1) == '=') {
                        auxLex += c;
                        estado = 8;
                    }
                    else {
                        addList(c, "not");
                        estado = 0;
                    }
                }
                else if (c.match(isDigito)) {
                    if (texto.charAt(num + 1).match(isDigito)) {
                        auxLex += c;
                        estado = 9;
                    }
                    else {
                        addList(c, "numero");
                        estado = 0;
                    }
                }
                else if (c.match(isLetra)) {
                    auxLex += c;
                    estado = 1;
                }
                else if (c == '_') {
                    auxLex += c;
                    estado = 1;
                }
                else if (esEspacio(c)) {
                    estado = 0;
                }
                else {
                    addList(c, "Error lexico");
                    estado = 0;
                }
                break;
            case 2:
                if (c == '/') {
                    auxLex += c;
                    estado = 3;
                }
                else if (c == '*') {
                    auxLex += c;
                    estado = 4;
                }
                break;
            case 3:
                if (c == '\n') {
                    addList(auxLex, "Comentario");
                    estado = 0;
                }
                else {
                    auxLex += c;
                    estado = 3;
                }
                break;
            case 4:
                if (c == '*') {
                    auxLex += c;
                    estado = 5;
                }
                else {
                    auxLex += c;
                    estado = 4;
                }
                break;
            case 5:
                if (c == '/') {
                    auxLex += c;
                    addList(auxLex, "Comentario");
                    estado = 0;
                }
                else {
                    addList(c, "Error lexico");
                    estado = 0;
                }
                break;
            case 6:
                if (c == '|') {
                    auxLex += c;
                    addList(auxLex, "or");
                    estado = 0;
                }
                break;
            case 7:
                if (c == '&') {
                    auxLex += c;
                    addList(auxLex, "and");
                    estado = 0;
                }
                break;
            case 8:
                if (texto.charAt(num - 1) == '=') {
                    auxLex += c;
                    addList(auxLex, "igual");
                    estado = 0;
                }
                else if (texto.charAt(num - 1) == '!') {
                    auxLex += c;
                    addList(auxLex, "distinto");
                    estado = 0;
                }
                else if (texto.charAt(num - 1) == '<') {
                    auxLex += c;
                    addList(auxLex, "menor igual");
                    estado = 0;
                }
                else if (texto.charAt(num - 1) == '>') {
                    auxLex += c;
                    addList(auxLex, "mayor igual");
                    estado = 0;
                }
                break;
            case 9:
                if (c.match(isDigito)) {
                    auxLex += c;
                    estado = 9;
                }
                else {
                    addList(auxLex, "numero");
                    num = num - 1;
                    estado = 0;
                }
                break;
            case 10:
                if (c == '\"') {
                    addList(auxLex, "texto");
                    addList(c, "comillas dobles");
                    estado = 0;
                }
                else {
                    auxLex += c;
                    estado = 10;
                }
                break;
            case 11:
                if (c == '\'') {
                    ListaHtml += auxLex;
                    addList(auxLex, "html");
                    addList(c, "comillas dobles");
                    estado = 0;
                }
                else {
                    auxLex += c;
                    estado = 11;
                }
                break;
            case 12:
                if (c == '+') {
                    auxLex += c;
                    addList(auxLex, "masmas");
                    estado = 0;
                }
                break;
            case 13:
                if (c == '-') {
                    auxLex += c;
                    addList(auxLex, "menosmenos");
                    estado = 0;
                }
                break;
            case 1:
                if (c.match(isId)) {
                    auxLex += c;
                    estado = 1;
                }
                else if (auxLex.toLowerCase() == "int") {
                    addList(auxLex, "Int");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "string") {
                    addList(auxLex, "String");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "double") {
                    addList(auxLex, "Double");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "char") {
                    addList(auxLex, "Char");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "bool") {
                    addList(auxLex, "Bool");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "void") {
                    addList(auxLex, "Void");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "main") {
                    addList(auxLex, "Main");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "console") {
                    addList(auxLex, "Console");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "write") {
                    addList(auxLex, "Write");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "if") {
                    addList(auxLex, "If");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "else") {
                    addList(auxLex, "Else");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "switch") {
                    addList(auxLex, "Switch");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "case") {
                    addList(auxLex, "Case");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "break") {
                    addList(auxLex, "Break");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "default") {
                    addList(auxLex, "Default");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "for") {
                    addList(auxLex, "For");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "while") {
                    addList(auxLex, "While");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "do") {
                    addList(auxLex, "Do");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "return") {
                    addList(auxLex, "Return");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "continue") {
                    addList(auxLex, "Continue");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "true") {
                    addList(auxLex, "True");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "false") {
                    addList(auxLex, "False");
                    num = num - 1;
                    estado = 0;
                }
                else {
                    addList(auxLex, "Id");
                    num = num - 1;
                    estado = 0;
                }
                break;
        }
    }
    analizadorH(ListaHtml.toString());
    imprimirLista();
}
function analizadorH(texto) {
    var aaa = document.getElementById('editor_html');
    aaa.innerHTML = texto;
    listaLexemaH = [];
    listaTokenH = [];
    var estado = 0;
    var c;
    for (var num = 0; num < texto.length; num++) {
        c = texto.charAt(num);
        switch (estado) {
            case 0:
                if (c == '<') {
                    addListH(c, "menor que");
                    estado = 1;
                }
                else if (c == '>') {
                    addListH(c, "mayor que");
                    estado = 0;
                }
                else if (c == '/') {
                    addListH(c, "division");
                    estado = 0;
                }
                else if (esEspacio(c)) {
                    estado = 0;
                }
                else {
                    addListH(c, "Error lexico");
                    estado = 0;
                }
                break;
            case 1:
                if (c.match(isId)) {
                    auxLex += c;
                    estado = 1;
                }
                else if (auxLex.toLowerCase() == "html") {
                    addListH(auxLex, "Html");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "head") {
                    addListH(auxLex, "Head");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "body") {
                    addListH(auxLex, "Body");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "title") {
                    addListH(auxLex, "Title");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "div") {
                    addListH(auxLex, "Div");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "br") {
                    addListH(auxLex, "Br");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "p") {
                    addListH(auxLex, "P");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h1") {
                    addListH(auxLex, "H1");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "button") {
                    addListH(auxLex, "Button");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "label") {
                    addListH(auxLex, "Label");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "input") {
                    addListH(auxLex, "Input");
                    num = num - 1;
                    estado = 0;
                }
                else {
                    addListH(auxLex, "Etiqueta desconocida");
                    num = num - 1;
                    estado = 0;
                }
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
        }
    }
}
function esEspacio(c) {
    return c == '\n' || c == '\t' || c == ' ';
}
function imprimirLista() {
    var auxiliar = "Token    -------   Lexema\n";
    for (var i = 0; i < listaLexemaH.length; i++) {
        auxiliar += listaTokenH[i] + "  -------  " + listaLexemaH[i] + "\n";
    }
    h1.innerText = auxiliar;
}
function addList(lex, token) {
    listaLexema.push(lex);
    listaToken.push(token);
    auxLex = "";
}
function addListH(lex, token) {
    listaLexemaH.push(lex);
    listaTokenH.push(token);
    auxLex = "";
}
