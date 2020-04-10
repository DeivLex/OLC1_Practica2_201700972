"use strict";
var listaLexema;
var listaToken;
var listaLexemaH;
var listaTokenH;
var listaLexemaS;
var listaTokenS;
var auxLex = "";
var isId = /^[0-9|a-zA-Z|_]*$/;
var isLetra = /^[a-zA-Z]$/;
var isDigito = /^[0-9]$/;
var h1 = document.getElementById('h1ts');
var h2 = document.getElementById('h2ts');
function analizadorC() {
    var ListaHtml = "";
    listaLexema = [];
    listaToken = [];
    listaLexemaS = [];
    listaTokenS = [];
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
                    if (texto.charAt(num + 1).match(isDigito) || texto.charAt(num + 1) == '.') {
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
                    if (texto.charAt(num + 1) == '/') {
                        auxLex += c;
                        estado = 5;
                    }
                    else {
                        auxLex += c;
                        estado = 4;
                    }
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
                else if (c == '.') {
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
                    addList(auxLex, "TipoDato");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "string") {
                    addList(auxLex, "TipoDato");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "double") {
                    addList(auxLex, "TipoDato");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "char") {
                    addList(auxLex, "TipoDato");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "bool") {
                    addList(auxLex, "TipoDato");
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
    //Analisis Sintactico--------------------------------------
    estado = 0;
    for (var nums = 0; nums < listaToken.length; nums++) {
        c = listaToken[nums].toLowerCase();
        if (c != 'error lexico' && c != 'comentario' && c != 'comillas dobles' && c != 'comillas simples') {
            switch (estado) {
                case 0:
                    if (c == "tipodato") {
                        addListS(c, "Aceptado");
                        estado = 1;
                    }
                    else if (c == "void") {
                        addListS(c, "Aceptado");
                        estado = 1;
                    }
                    else if (c == "console") {
                        addListS(c, "Aceptado");
                        estado = 10;
                    }
                    else if (c == "llave der") {
                        addListS(c, "Aceptado");
                        estado = 0;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 1:
                    if (c == "id") {
                        addListS(c, "Aceptado");
                        estado = 2;
                    }
                    else if (c == "main") {
                        addListS(c, "Aceptado");
                        estado = 9;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 2:
                    if (c == "coma") {
                        addListS(c, "Aceptado");
                        estado = 1;
                    }
                    else if (c == "punto y coma") {
                        addListS(c, "Aceptado");
                        estado = 0;
                    }
                    else if (c == "asignacion") {
                        addListS(c, "Aceptado");
                        estado = 3;
                    }
                    else if (c == "parentesis izq") {
                        addListS(c, "Aceptado");
                        estado = 5;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 3:
                    if (c == "numero") {
                        addListS(c, "Aceptado");
                        estado = 4;
                    }
                    else if (c == "texto") {
                        addListS(c, "Aceptado");
                        estado = 4;
                    }
                    else if (c == "caracter") {
                        addListS(c, "Aceptado");
                        estado = 4;
                    }
                    else if (c == "true") {
                        addListS(c, "Aceptado");
                        estado = 4;
                    }
                    else if (c == "false") {
                        addListS(c, "Aceptado");
                        estado = 4;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 4:
                    if (c == "suma") {
                        addListS(c, "Aceptado");
                        estado = 3;
                    }
                    else if (c == "resta") {
                        addListS(c, "Aceptado");
                        estado = 3;
                    }
                    else if (c == "multiplicacion") {
                        addListS(c, "Aceptado");
                        estado = 3;
                    }
                    else if (c == "division") {
                        addListS(c, "Aceptado");
                        estado = 3;
                    }
                    else if (c == "punto y coma") {
                        addListS(c, "Aceptado");
                        estado = 0;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 5:
                    if (c == "tipodato") {
                        addListS(c, "Aceptado");
                        estado = 6;
                    }
                    else if (c == "parentesis der") {
                        addListS(c, "Aceptado");
                        estado = 8;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 6:
                    if (c == "id") {
                        addListS(c, "Aceptado");
                        estado = 7;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 7:
                    if (c == "coma") {
                        addListS(c, "Aceptado");
                        estado = 5;
                    }
                    else if (c == "parentesis der") {
                        addListS(c, "Aceptado");
                        estado = 8;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 8:
                    if (c == "llave izq") {
                        addListS(c, "Aceptado");
                        estado = 0;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 9:
                    if (c == "parentesis izq") {
                        addListS(c, "Aceptado");
                        estado = 7;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 10:
                    if (c == "punto") {
                        addListS(c, "Aceptado");
                        estado = 11;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 11:
                    if (c == "write") {
                        addListS(c, "Aceptado");
                        estado = 12;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 12:
                    if (c == "parentesis izq") {
                        addListS(c, "Aceptado");
                        estado = 13;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 13:
                    if (c == "texto") {
                        addListS(c, "Aceptado");
                        estado = 15;
                    }
                    else if (c == "numero") {
                        addListS(c, "Aceptado");
                        estado = 15;
                    }
                    else if (c == "caracter") {
                        addListS(c, "Aceptado");
                        estado = 15;
                    }
                    else if (c == "parentesis der") {
                        addListS(c, "Aceptado");
                        estado = 14;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 14:
                    if (c == "punto y coma") {
                        addListS(c, "Aceptado");
                        estado = 0;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 15:
                    if (c == "suma") {
                        addListS(c, "Aceptado");
                        estado = 13;
                    }
                    else if (c == "resta") {
                        addListS(c, "Aceptado");
                        estado = 13;
                    }
                    else if (c == "multiplicacion") {
                        addListS(c, "Aceptado");
                        estado = 13;
                    }
                    else if (c == "division") {
                        addListS(c, "Aceptado");
                        estado = 13;
                    }
                    else if (c == "parentesis der") {
                        addListS(c, "Aceptado");
                        estado = 14;
                    }
                    else {
                        addListS(c, "Error Sintactico");
                        estado = 0;
                    }
                    break;
                case 16:
                    break;
                case 17:
                    break;
                case 18:
                    break;
                case 19:
                    break;
                case 20:
                    break;
                case 21:
                    break;
                case 22:
                    break;
                case 23:
                    break;
                case 24:
                    break;
                case 25:
                    break;
                case 26:
                    break;
                case 27:
                    break;
                case 28:
                    break;
                case 29:
                    break;
                case 30:
                    break;
                case 31:
                    break;
                case 32:
                    break;
                case 33:
                    break;
                case 34:
                    break;
                case 35:
                    break;
            }
        }
    }
    imprimirLista();
    imprimirListaS();
    analizadorH(ListaHtml.toString());
}
function analizadorH(texto) {
    var fin = false;
    var ListaJson = "";
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
                else if (c == '=') {
                    addListH(c, "igual");
                    estado = 0;
                }
                else if (c == '\"') {
                    addListH(c, "comillas dobles");
                    estado = 0;
                }
                else if (c == ':') {
                    addListH(c, "dos puntos");
                    estado = 0;
                }
                else if (c.match(isLetra) || c.match(isDigito)) {
                    auxLex += c;
                    estado = 2;
                }
                else if (esEspacio(c)) {
                    estado = 0;
                }
                else {
                    addListH(c, "Error lexico");
                    estado = 0;
                }
                break;
            case 2:
                if (c.match(isId)) {
                    auxLex += c;
                    estado = 2;
                }
                else if (auxLex.toLowerCase() == "style") {
                    if (fin == false) {
                        ListaJson += "\"Style\":";
                    }
                    fin = false;
                    addListH(auxLex, "Style");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "background") {
                    if (fin == false) {
                        ListaJson += "\"background:";
                    }
                    fin = false;
                    addListH(auxLex, "Background");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "yellow") {
                    if (fin == false) {
                        ListaJson += "yellow\",\n";
                    }
                    fin = false;
                    addListH(auxLex, "Yellow");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "green") {
                    if (fin == false) {
                        ListaJson += "green\",\n";
                    }
                    fin = false;
                    addListH(auxLex, "Green");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "blue") {
                    if (fin == false) {
                        ListaJson += "blue\",\n";
                    }
                    fin = false;
                    addListH(auxLex, "Blue");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "red") {
                    if (fin == false) {
                        ListaJson += "red\",\n";
                    }
                    fin = false;
                    addListH(auxLex, "Red");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "white") {
                    if (fin == false) {
                        ListaJson += "white\",\n";
                    }
                    fin = false;
                    addListH(auxLex, "White");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "skyblue") {
                    if (fin == false) {
                        ListaJson += "skyblue\",\n";
                    }
                    fin = false;
                    addListH(auxLex, "Skyblue");
                    num = num - 1;
                    estado = 0;
                }
                else if (c == '<') {
                    if (fin == false) {
                        ListaJson += "\"Texto\":\"" + auxLex + "\"";
                    }
                    fin = false;
                    addListH(auxLex, "Etiqueta");
                    addListH(c, "menor que");
                    estado = 1;
                }
                else if (esEspacio(c)) {
                    auxLex += c;
                    estado = 2;
                }
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 1:
                if (c.match(isId)) {
                    auxLex += c;
                    estado = 1;
                }
                else if (auxLex.toLowerCase() == "html") {
                    if (fin == false) {
                        ListaJson += "\"Html\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "Html");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "head") {
                    if (fin == false) {
                        ListaJson += "\"Head\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "Head");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "body") {
                    if (fin == false) {
                        ListaJson += "\"Body\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "Body");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "title") {
                    if (fin == false) {
                        ListaJson += "\"Title\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "Title");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "div") {
                    if (fin == false) {
                        ListaJson += "\"Div\":{\n";
                    }
                    fin = false;
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
                    if (fin == false) {
                        ListaJson += "\"P\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "P");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h1") {
                    if (fin == false) {
                        ListaJson += "\"H1\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "H1");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h2") {
                    if (fin == false) {
                        ListaJson += "\"H2\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "H2");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h3") {
                    if (fin == false) {
                        ListaJson += "\"H3\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "H3");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h4") {
                    if (fin == false) {
                        ListaJson += "\"H4\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "H4");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "button") {
                    if (fin == false) {
                        ListaJson += "\"Button\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "Button");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "label") {
                    if (fin == false) {
                        ListaJson += "\"Label\":{\n";
                    }
                    fin = false;
                    addListH(auxLex, "Label");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "input") {
                    addListH(auxLex, "Input");
                    num = num - 1;
                    estado = 0;
                }
                else if (c == '/') {
                    fin = true;
                    ListaJson += "\n}";
                    addListH(c, "division");
                    estado = 1;
                }
                else {
                    addListH(auxLex, "Etiqueta desconocida");
                    num = num - 1;
                    estado = 0;
                }
                break;
        }
    }
    var bbb = document.getElementById('editor_json');
    bbb.innerHTML = ListaJson;
}
function esEspacio(c) {
    return c == '\n' || c == '\t' || c == ' ';
}
function imprimirLista() {
    var auxiliar = "Token    -------   Lexema\n";
    for (var i = 0; i < listaLexema.length; i++) {
        auxiliar += listaToken[i] + "  -------  " + listaLexema[i] + "\n";
    }
    h1.innerText = auxiliar;
}
function imprimirListaS() {
    var auxiliar = "Token    -------   Lexema\n";
    for (var i = 0; i < listaLexemaS.length; i++) {
        auxiliar += listaTokenS[i] + "  -------  " + listaLexemaS[i] + "\n";
    }
    h2.innerText = auxiliar;
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
function addListS(lex, token) {
    listaLexemaS.push(lex);
    listaTokenS.push(token);
}
