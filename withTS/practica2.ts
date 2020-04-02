class prueba{
    mostrarts(): void {
        var h1:HTMLElement = document.getElementById("h1ts") as HTMLElement;
        var h2:HTMLElement = document.getElementById("h2ts") as HTMLElement;

        h1.innerText = "Nombre: nombre del alumno con ts";
        h1.innerHTML = "Nombre: nombre del alumno con ts";
        h2.innerText = "Carné: carné del alumno con ts";
    }


    mostrar2():void{
        var h1:HTMLElement = document.getElementById("h1js") as HTMLElement;
        var h2:HTMLElement = document.getElementById("h2js") as HTMLElement;

        h1.innerText = "Nombre: nombre del alumno con js";
        h1.innerHTML = "Nombre: nombre del alumno con js";
        h2.innerText = "Carné: carné del alumno con js";

    }

    main(){
        this.mostrarts();
        this.mostrar2();

    }
}

let p = new prueba();
p.main();