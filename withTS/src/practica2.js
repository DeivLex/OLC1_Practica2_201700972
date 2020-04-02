"use strict";
var prueba = /** @class */ (function () {
    function prueba() {
    }
    prueba.prototype.mostrarts = function () {
        var h1 = document.getElementById("h1ts");
        var h2 = document.getElementById("h2ts");
        h1.innerText = "Nombre: nombre del alumno con ts";
        h1.innerHTML = "Nombre: nombre del alumno con ts";
        h2.innerText = "Carné: carné del alumno con ts";
    };
    prueba.prototype.mostrar2 = function () {
        var h1 = document.getElementById("h1js");
        var h2 = document.getElementById("h2js");
        h1.innerText = "Nombre: nombre del alumno con js";
        h1.innerHTML = "Nombre: nombre del alumno con js";
        h2.innerText = "Carné: carné del alumno con js";
    };
    prueba.prototype.main = function () {
        this.mostrarts();
        this.mostrar2();
    };
    return prueba;
}());
var p = new prueba();
p.main();
