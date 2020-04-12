let listaLexema: Array<string>;
let listaToken: Array<string>;
let listaLexemaH: Array<string>;
let listaTokenH: Array<string>;
let listaLexemaS: Array<string>;
let listaTokenS: Array<string>;
let Tabla_de_datos: Array<string>;
let Linea_de_datos: Array<string>;
var Tipo_dato="";
var Nombre_dato="";
let Linea_dato : number = 1;
var auxLex="";
var isId = /^[0-9|a-zA-Z|_]*$/;
var isLetra = /^[a-zA-Z]$/;
var isDigito = /^[0-9]$/;
var ListaPython="";
var FuncionFor=false;
var FuncionDo=false;
var FuncionSwitch=false;
var h1:HTMLElement = document.getElementById('h1ts') as HTMLElement;
var h2:HTMLElement = document.getElementById('h2ts') as HTMLElement;
class analizadorLexico{
    analizadorC(): void{ 
    Tipo_dato="";
    Nombre_dato="";
    Linea_dato=1;
    var ListaHtml="";
    ListaPython="";
    listaLexema=[];
    listaToken=[];
    listaLexemaS=[];
    listaTokenS=[];
    Tabla_de_datos=[];
    Linea_de_datos=[];
    let estado : number = 0;
    var texto = (document.getElementById('editor') as HTMLInputElement).value;
    var c;
    for(var num:number = 0;num<texto.length;num++) {
        c=texto.charAt(num);
        switch (estado) {
            case 0:
                if(c=='*'){
                    this.addList(c,"multiplicacion");
                    estado=0;
                }else if(c==String.fromCharCode(92)){
                    this.addList(c,"barra izq");
                    estado=0;                    
                }else if(c=='/'){
                    if(texto.charAt(num+1)=='/'||texto.charAt(num+1)=='*'){
                        auxLex+=c;
                        estado=2;
                    }else{
                        this.addList(c,"division");
                        estado=0;
                    }                       
                }else if(c==';'){
                    this.addList(c,"punto y coma");
                    estado=0;
                }else if(c==':'){
                    this.addList(c,"dos puntos");
                    estado=0;
                }else if(c=='='){
                    if(texto.charAt(num+1)=='='){
                        auxLex+=c;
                        estado=8;
                    }else{
                        this.addList(c,"asignacion");
                        estado=0;
                    }
                }else if(c=='+'){
                    if(texto.charAt(num+1)=='+'){
                        auxLex+=c;
                        estado=12;
                    }else{
                        this.addList(c,"suma");
                        estado=0;
                    }   
                }else if(c=='-'){
                    if(texto.charAt(num+1)=='-'){
                        auxLex+=c;
                        estado=13;
                    }else{
                        this.addList(c,"resta");
                        estado=0;
                    }
                }else if(c=='}'){
                    this.addList(c,"llave der");
                    estado=0;
                }else if(c=='{'){
                    this.addList(c,"llave izq");
                    estado=0;
                }else if(c=='('){
                    this.addList(c,"parentesis izq");
                    estado=0;
                }else if(c==')'){
                    this.addList(c,"parentesis der");
                    estado=0;
                }else if(c==','){
                    this.addList(c,"coma");
                    estado=0;
                }else if(c=='.'){
                    this.addList(c,"punto");
                    estado=0;
                }else if(c=='<'){
                    if(texto.charAt(num+1)=='='){
                        auxLex+=c;
                        estado=8;
                    }else{
                        this.addList(c,"menor que");
                        estado=0;
                    }
                }else if(c=='>'){
                    if(texto.charAt(num+1)=='='){
                        auxLex+=c;
                        estado=8;
                    }else{
                        this.addList(c,"mayor que");
                        estado=0;
                    }
                }else if(c=='\"'){
                    this.addList(c,"comillas dobles");
                    estado=10;
                }else if(c=='\''){
                    if(texto.charAt(num+2)=='\''){
                        this.addList(c,"comillas simples");
                        this.addList(texto.charAt(num+1),"caracter");
                        this.addList(c,"comillas simples");
                        num=num+2;
                        estado=0;
                    }else{
                        this.addList(c,"comillas simples");
                        estado=11;
                    }
                }else if(c=='|'){
                    if(texto.charAt(num+1)=='|'){
                        auxLex+=c;
                        estado=6;
                    }else{
                        this.addList(c,"barra vertical");
                        estado=0;
                    }     
                }else if(c=='&'){
                    if(texto.charAt(num+1)=='&'){
                        auxLex+=c;
                        estado=7;
                    }else{
                        this.addList(c,"y");
                        estado=0;
                    }  
                }else if(c=='!'){
                    if(texto.charAt(num+1)=='='){
                        auxLex+=c;
                        estado=8;
                    }else{
                        this.addList(c,"not");
                        estado=0;
                    }  
                }else if(c.match(isDigito)){
                    if(texto.charAt(num+1).match(isDigito)||texto.charAt(num+1)=='.'){
                        auxLex+=c;
                        estado=9;
                    }else{
                        this.addList(c,"numero");
                        estado=0;
                    }
                }else if(c.match(isLetra)){
                    auxLex+=c;
                    estado=1;
                }else if(c=='_'){
                    auxLex+=c;
                    estado=1;
                }else if(this.esEspacio(c)){
                    estado=0;
                }else{
                    this.addList(c,"Error lexico");
                    estado=0;
                }
                break;
            case 2:
                if(c=='/'){
                    auxLex+=c;
                    estado=3;                    
                }else if(c=='*'){
                    auxLex+=c;
                    estado=4;  
                }
                break;
            case 3:
                if(c=='\n'){
                    Linea_dato++;
                    this.addList(auxLex,"Comentario");
                    estado=0;  
                }else{
                    auxLex+=c;
                    estado=3;
                }
                break;
            case 4:
                if(c=='*'){
                    if(texto.charAt(num+1)=='/'){
                        auxLex+=c;
                        estado=5; 
                    }else{
                        auxLex+=c;
                        estado=4;
                    }
                }else{
                    auxLex+=c;
                    estado=4;
                }
                break;
            case 5:
                if(c=='/'){
                    auxLex+=c;
                    this.addList(auxLex,"Multi Comentario");
                    estado=0;                    
                }
                break;
            case 6:
                if(c=='|'){
                    auxLex+=c;
                    this.addList(auxLex,"or");
                    estado=0;                    
                }
                break;
            case 7:
                if(c=='&'){
                    auxLex+=c;
                    this.addList(auxLex,"and");
                    estado=0;                    
                }
                break;
            case 8:
                if(texto.charAt(num-1)=='='){
                    auxLex+=c;
                    this.addList(auxLex,"igual");
                    estado=0;                    
                }else if(texto.charAt(num-1)=='!'){
                    auxLex+=c;
                    this.addList(auxLex,"distinto");
                    estado=0; 
                }else if(texto.charAt(num-1)=='<'){
                    auxLex+=c;
                    this.addList(auxLex,"menor igual");
                    estado=0; 
                }else if(texto.charAt(num-1)=='>'){
                    auxLex+=c;
                    this.addList(auxLex,"mayor igual");
                    estado=0;
                }
                break;
            case 9:
                if(c.match(isDigito)){
                    auxLex+=c;
                    estado=9;
                }else if(c=='.'){
                    auxLex+=c;
                    estado=9;
                }else{
                    this.addList(auxLex,"numero");
                    num=num-1;
                    estado=0;
                }
                break;
            case 10:
                if(c=='\"'){
                    this.addList(auxLex,"texto");
                    this.addList(c,"comillas dobles");
                    estado=0;
                }else{
                    auxLex+=c;
                    estado=10;
                }
                break;
            case 11:
                if(c=='\''){
                    ListaHtml+=auxLex;
                    this.addList(auxLex,"html");
                    this.addList(c,"comillas dobles");
                    estado=0;
                }else{
                    auxLex+=c;
                    estado=11;
                }
                break;
            case 12:
                if(c=='+'){
                    auxLex+=c;
                    this.addList(auxLex,"masmas");
                    estado=0;                    
                }
                break;
            case 13:
                if(c=='-'){
                    auxLex+=c;
                    this.addList(auxLex,"menosmenos");
                    estado=0;                    
                }
                break;
            case 1:
                if(c.match(isId)){
                    auxLex+=c;
                    estado=1;
                }else if(auxLex.toLowerCase()=="int"){
                    Tipo_dato=auxLex;
                    this.addList(auxLex,"TipoDato");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="string"){
                    Tipo_dato=auxLex;
                    this.addList(auxLex,"TipoDato");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="double"){
                    Tipo_dato=auxLex;
                    this.addList(auxLex,"TipoDato");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="char"){
                    Tipo_dato=auxLex;
                    this.addList(auxLex,"TipoDato");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="bool"){
                    Tipo_dato=auxLex;
                    this.addList(auxLex,"TipoDato");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="void"){
                    this.addList(auxLex,"Void");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="main"){
                    this.addList(auxLex,"Main");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="console"){
                    this.addList(auxLex,"Console");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="write"){
                    this.addList(auxLex,"Write");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="if"){
                    this.addList(auxLex,"If");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="else"){
                    this.addList(auxLex,"Else");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="switch"){
                    this.addList(auxLex,"Switch");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="case"){
                    this.addList(auxLex,"Case");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="break"){
                    this.addList(auxLex,"Break");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="default"){
                    this.addList(auxLex,"Default");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="for"){
                    this.addList(auxLex,"For");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="while"){
                    this.addList(auxLex,"While");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="do"){
                    this.addList(auxLex,"Do");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="return"){
                    this.addList(auxLex,"Return");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="continue"){
                    this.addList(auxLex,"Continue");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="true"){
                    this.addList(auxLex,"True");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="false"){
                    this.addList(auxLex,"False");
                    num=num-1;
                    estado=0;
                }else{
                    if(texto.charAt(num+1)=='='||c=="="||texto.charAt(num+2)=='='){
                    Nombre_dato=auxLex;
                    Tabla_de_datos.push(Nombre_dato+","+Tipo_dato+","+Linea_dato);
                    }
                    this.addList(auxLex,"Id");
                    num=num-1;
                    estado=0;
                }
                break;
        }
    }
    //Analisis Sintactico--------------------------------------
    estado=0;
    var d="";
    var Cmain:number = 0;
    for(var nums:number = 0;nums<listaToken.length;nums++) {
        c=listaToken[nums].toLowerCase();
        d=listaLexema[nums];
        if(c!='error lexico'&&c!='comentario'&&c!='comillas dobles'&&c!='comillas simples'&&c!='multi comentario'){
            switch (estado) {
                case 1:
                    if(c=="id"){
                        if(FuncionFor==true){
                            ListaPython+=d+" in range (";
                        }else{
                            ListaPython+=d;
                        }
                        this.addListS(c,"Aceptado");
                        estado=2;
                    }else if(c=="main"){
                        ListaPython+=d;
                        Cmain++;
                        this.addListS(c,"Aceptado");
                        estado=9;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 2:
                    if(c=="coma"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=1;
                    }else if(c=="punto y coma"){
                        ListaPython+="\n";
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else if(c=="asignacion"){
                        if(FuncionFor==true){
                            
                        }else{
                            ListaPython+=" "+d+" ";
                        }
                        this.addListS(c,"Aceptado");
                        estado=3;
                    }else if(c=="parentesis izq"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=5;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 3:
                    if(c=="numero"){
                        if(FuncionFor==true){
                            ListaPython+=d+",";
                        }else{
                            ListaPython+=d;
                        }
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else if(c=="id"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else if(c=="texto"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else if(c=="html"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else if(c=="caracter"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else if(c=="true"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else if(c=="false"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=4;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 4:
                    if(c=="suma"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=3;
                    }else if(c=="resta"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=3;
                    }else if(c=="multiplicacion"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=3;
                    }else if(c=="division"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=3;
                    }else if(c=="punto y coma"){
                        if(FuncionFor==true){
                            
                        }else{
                            ListaPython+="\n";
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 5:
                    if(c=="tipodato"){
                        ListaPython+="var ";
                        this.addListS(c,"Aceptado");
                        estado=6;
                    }else if(c=="parentesis der"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=8;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 6:
                    if(c=="id"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=7;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 7:
                    if(c=="coma"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=5;
                    }else if(c=="parentesis der"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=8;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 8:
                    if(c=="llave izq"){
                        ListaPython+=":\n";
                        if(FuncionFor==true){
                            FuncionFor=false;
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 9:
                    if(c=="parentesis izq"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=7;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 10:
                    if(c=="punto"){
                        this.addListS(c,"Aceptado");
                        estado=11;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 11:
                    if(c=="write"){
                        this.addListS(c,"Aceptado");
                        estado=12;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 12:
                    if(c=="parentesis izq"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=13;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 13:
                    if(c=="texto"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=15;
                    }else if(c=="html"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=15;
                    }else if(c=="numero"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=15;
                    }else if(c=="caracter"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=15;
                    }else if(c=="id"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=15;
                    }else if(c=="parentesis der"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=14;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 14:
                    if(c=="punto y coma"){
                        if(FuncionFor==true){
                            
                        }else{
                            ListaPython+="\n";
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 15:
                    if(c=="suma"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=13;
                    }else if(c=="resta"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=13;
                    }else if(c=="multiplicacion"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=13;
                    }else if(c=="division"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=13;
                    }else if(c=="parentesis der"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=14;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 16:
                    if(c=="parentesis izq"){
                        ListaPython+=" ";
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 17:
                    if(c=="texto"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else if(c=="html"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else if(c=="numero"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else if(c=="caracter"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else if(c=="id"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else if(c=="true"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else if(c=="false"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=18;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 18:
                    if(c=="mayor que"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="menor que"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="mayor igual"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="menor igual"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="igual"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="distinto"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="and"){
                        ListaPython+=c;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="or"){
                        ListaPython+=c;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="not"){
                        ListaPython+=c;
                        this.addListS(c,"Aceptado");
                        estado=17;
                    }else if(c=="parentesis der"){
                        if(FuncionSwitch==true){
                            ListaPython+=")";
                        }else{
                        ListaPython+=" ";
                        }
                        this.addListS(c,"Aceptado");
                        estado=19;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 19:
                    if(c=="llave izq"){
                        ListaPython+=":\n";
                        if(FuncionSwitch==true){
                            ListaPython+="switcher = {\n";    
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else if(c=="punto y coma"){
                        if(FuncionDo==true){
                            ListaPython+=":\nbreak\n";
                            FuncionDo=false;
                        }else{
                        ListaPython+="\n";
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 20:
                    if(c=="if"){
                        ListaPython+="elif";
                        this.addListS(c,"Aceptado");
                        estado=16;
                    }else if(c=="llave izq"){
                        ListaPython+="else:\n";
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 21:
                    if(c=="dos puntos"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 22:
                    if(c=="numero"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        if(listaToken[nums+1]=="punto y coma"){
                            estado=14;
                        }else{
                            estado=21;
                        }
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 23:
                    if(c=="mayor que"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="menor que"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="mayor igual"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="menor igual"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="igual"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="distinto"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="asignacion"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 24:
                    if(c=="parentesis izq"){
                        if(FuncionFor==true){
                            
                        }else{
                            ListaPython+=d;
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }
                    break;
                case 25:
                    if(c=="masmas"){
                        this.addListS(c,"Aceptado");
                        estado=7;
                    }else if(c=="menosmenos"){
                        this.addListS(c,"Aceptado");
                        estado=7;
                    }
                    break;
                case 0: 
                    if(c=="tipodato"){
                        if(listaToken[nums+2]=="parentesis izq"){
                            ListaPython+="def ";
                        }else if(FuncionFor==true){

                        }else{
                            ListaPython+="var ";
                        }
                        this.addListS(c,"Aceptado");
                        estado=1;
                    }else if(c=="void"){
                        ListaPython+="def ";
                        this.addListS(c,"Aceptado");
                        estado=1;
                    }else if(c=="console"){
                        ListaPython+="print";
                        this.addListS(c,"Aceptado");
                        estado=10;
                    }else if(c=="if"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=16;
                    }else if(c=="while"){
                        if(FuncionDo==true){
                            ListaPython+="\n"+listaLexema[nums+2]+" = "+listaLexema[nums+2]+" + 1\n\tif";
                        }else{
                            ListaPython+=d;
                        }
                        this.addListS(c,"Aceptado");
                        estado=16;
                    }else if(c=="do"){
                        FuncionDo=true;
                        ListaPython+="while True";
                        this.addListS(c,"Aceptado");
                        estado=8;
                    }else if(c=="for"){
                        FuncionFor=true;
                        ListaPython+=d+" ";
                        this.addListS(c,"Aceptado");
                        estado=24;
                    }else if(c=="switch"){
                        ListaPython+="def switch(case,";
                        FuncionSwitch=true;
                        this.addListS(c,"Aceptado");
                        estado=16;
                    }else if(c=="else"){
                        this.addListS(c,"Aceptado");
                        estado=20;
                    }else if(c=="return"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        if(listaToken[nums+1]=="punto y coma"){
                            estado=14;
                        }else{
                            estado=3;
                        }
                    }else if(c=="continue"){
                        ListaPython+=d;
                        this.addListS(c,"Aceptado");
                        estado=14;
                    }else if(c=="break"){
                        if(FuncionSwitch=false){
                            ListaPython+=d;
                        }
                        this.addListS(c,"Aceptado");
                        estado=14;
                    }else if(c=="case"){
                        this.addListS(c,"Aceptado");
                        estado=22;
                    }else if(c=="default"){
                        ListaPython+="0";
                        this.addListS(c,"Aceptado");
                        estado=21;
                    }else if(c=="llave der"){
                        if(FuncionSwitch==true){
                            ListaPython+="}\n";
                            FuncionSwitch=false;    
                        }
                        this.addListS(c,"Aceptado");
                        estado=0;
                    }else if(c=="id"){
                        if(FuncionFor==true){
                            
                        }else{
                            ListaPython+=d;
                        }
                        this.addListS(c,"Aceptado");
                        if(listaToken[nums+2]=="numero"){
                            estado=23;
                        }else if(listaToken[nums+1]=="masmas"||listaToken[nums+1]=="menosmenos"){
                            estado=25;
                        }else{
                            estado=2;
                        }
                    }else{
                        this.addListS(c,"Error Sintactico");
                        estado=0;
                    }  
                    break;
            }
        }else{
            if(c=="comentario"){
                ListaPython+=d.replace("//","#")+"\n";
            }else if(c=="multi comentario"){
                ListaPython+=d.replace("/*","\'\'\'").replace("*/","\'\'\'")+"\n";
            }else if(c=="comillas simples"){
                ListaPython+=d;
            }else if(c=="comillas dobles"){
                ListaPython+=d;
            }
        }
    }
    for(var l:number = 0;l<Cmain;l++){
        ListaPython+="if __name__ = “__main__”:\n\tmain()\n";
    }
    this.analizadorH(ListaHtml.toString());
    var ddd = (document.getElementById('editor_python') as HTMLElement);
    ddd.innerHTML=ListaPython;
    }
    analizadorH(texto:string): void{
    var fin : Boolean=false;
    var ListaJson="";
    var aaa = (document.getElementById('editor_html') as HTMLElement);
    aaa.innerHTML=texto;
    listaLexemaH=[];
    listaTokenH=[];
    let estado : number = 0;
    var c;
    for(var num:number = 0;num<texto.length;num++){
        c=texto.charAt(num);
        switch (estado) {
            case 0:
                if(c=='<'){
                    this.addListH(c,"menor que");
                    estado=1;
                }else if(c=='>'){
                    this.addListH(c,"mayor que");
                    estado=0;
                }else if(c=='='){
                    this.addListH(c,"igual");
                    estado=0;
                }else if(c=='\"'){
                    this.addListH(c,"comillas dobles");
                    estado=0;
                }else if(c==':'){
                    this.addListH(c,"dos puntos");
                    estado=0;
                }else if(c.match(isLetra)||c.match(isDigito)){
                    auxLex+=c;
                    estado=2;
                }else if(this.esEspacio(c)){
                    estado=0;
                }else{
                    this.addListH(c,"Error lexico");
                    estado=0;
                }
                break;
            case 2:
                if(c.match(isId)){
                    auxLex+=c;
                    estado=2;
                }else if(auxLex.toLowerCase()=="style"){
                    if(fin==false){
                        ListaJson+="\"Style\":";
                    }
                    fin =false;
                    this.addListH(auxLex,"Style");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="background"){
                    if(fin==false){
                        ListaJson+="\"background:";
                    }
                    fin =false;
                    this.addListH(auxLex,"Background");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="yellow"){
                    if(fin==false){
                        ListaJson+="yellow\",\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Yellow");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="green"){
                    if(fin==false){
                        ListaJson+="green\",\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Green");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="blue"){
                    if(fin==false){
                        ListaJson+="blue\",\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Blue");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="red"){
                    if(fin==false){
                        ListaJson+="red\",\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Red");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="white"){
                    if(fin==false){
                        ListaJson+="white\",\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"White");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="skyblue"){
                    if(fin==false){
                        ListaJson+="skyblue\",\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Skyblue");
                    num=num-1;
                    estado=0;
                }else if(c=='<'){
                    if(fin==false){
                        ListaJson+="\"Texto\":\""+auxLex+"\"";
                    }
                    fin =false;
                    this.addListH(auxLex,"Etiqueta")
                    this.addListH(c,"menor que");
                    estado=1;
                }else if(this.esEspacio(c)){
                    auxLex+=c;
                    estado=2;
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
                if(c.match(isId)){
                    auxLex+=c;
                    estado=1;
                }else if(auxLex.toLowerCase()=="html"){
                    if(fin==false){
                        ListaJson+="\"Html\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Html");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="head"){
                    if(fin==false){
                        ListaJson+="\"Head\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Head");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="body"){
                    if(fin==false){
                        ListaJson+="\"Body\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Body");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="title"){
                    if(fin==false){
                        ListaJson+="\"Title\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Title");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="div"){
                    if(fin==false){
                        ListaJson+="\"Div\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Div");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="br"){
                    this.addListH(auxLex,"Br");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="p"){
                    if(fin==false){
                        ListaJson+="\"P\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"P");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="h1"){
                    if(fin==false){
                        ListaJson+="\"H1\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"H1");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="h2"){
                    if(fin==false){
                        ListaJson+="\"H2\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"H2");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="h3"){
                    if(fin==false){
                        ListaJson+="\"H3\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"H3");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="h4"){
                    if(fin==false){
                        ListaJson+="\"H4\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"H4");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="button"){
                    if(fin==false){
                        ListaJson+="\"Button\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Button");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="label"){
                    if(fin==false){
                        ListaJson+="\"Label\":{\n";
                    }
                    fin =false;
                    this.addListH(auxLex,"Label");
                    num=num-1;
                    estado=0;
                }else if(auxLex.toLowerCase()=="input"){
                    this.addListH(auxLex,"Input");
                    num=num-1;
                    estado=0;
                }else if(c=='/'){
                    fin=true;
                    ListaJson+="\n}";
                    this.addListH(c,"division");
                    estado=1;
                }else{
                    this.addListH(auxLex,"Etiqueta desconocida");
                    num=num-1;
                    estado=0;
                }
                break;
        }
    }
    var bbb = (document.getElementById('editor_json') as HTMLElement);
    bbb.innerHTML=ListaJson;
    }
    esEspacio(c:string):boolean{
    if(c == '\n'){
        Linea_dato++;
    }
    return c == '\n' || c== '\t' || c == ' ';
    }
    imprimirLista(): void{
    var auxiliar = "Token    -------   Lexema\n";
    for(var i:number = 0; i < listaLexema.length; i++){
        auxiliar += listaToken[i] + "  -------  " + listaLexema[i] + "\n";
    }
    h1.innerText = auxiliar;
    }
    imprimirListaS(): void{
    var auxiliar = "Token    -------   Lexema\n";
    for(var i:number = 0; i < listaLexemaS.length; i++){
        auxiliar += listaTokenS[i] + "  -------  " + listaLexemaS[i] + "\n";
    }
    h2.innerText = auxiliar;
    }
    addList(lex:string,token:string):void{
    listaLexema.push(lex);
    listaToken.push(token);
    Linea_de_datos.push(Linea_dato.toString());
    auxLex = "";
    }
    addListH(lex:string,token:string):void{
    listaLexemaH.push(lex);
    listaTokenH.push(token);
    auxLex = "";
    }  
    addListS(lex:string,token:string): void{
    listaLexemaS.push(lex);
    listaTokenS.push(token);
    }
    main(){
        this.analizadorC();
    }
}
function iniciar(){
    let p= new analizadorLexico();
    p.main();
}