
let styleMain; //Estilo
let widthMain; 
let textoEncriptar, longitudTextoEncr, charValidosEncr;
let textoDesencriptar, longitudTextoDescr, charValidosDescr, stringArregloValidar;
let mainContenido=document.getElementById("contenidoprincipal");

//Logo
let divLogo=document.getElementById("divlogo");
let imgLogo=document.getElementById("imglogo");

//Elementos de Entrada

let textAreaEncriptar=document.getElementById("textoencriptar");
let divIngreso=document.getElementById("divingreso");
let divtextAreaIngreso=document.getElementById("divtextareaingeso");

//Elementos de Salida

let textParrDesencriptar=document.getElementById("textodesencriptar");
let divResultadoInicial=document.getElementById("divresultadoinicial");
let divResultadoEncriptado=document.getElementById("divresultadoencriptado");
let divSalida=document.getElementById("divsalida");

//Variable Auxiliares
let i, j;
let arrayEncriptar, arrayDesencriptar, indexVocal;
let vocalesEncriptar=["e","i","a","o","u"];
let vocalesDesencriptar=["enter","imes","ai","ober","ufat"];
let caracteresAdmitidos=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z","¡","!","¿","?",",",";",".","'","(",")","—","-","\""," ","\n"];

function encriptar(){
    //Leer el texto ingresado sin espacios al principio y al final
    textoEncriptar=textAreaEncriptar.value.trim();
    if(textoEncriptar!==""){
        //Contar caracteres totales del texto a encriptar
        longitudTextoEncr=textoEncriptar.length;
        //Convertir el texto en un arreglo
        arrayEncriptar=textoEncriptar.split("");
        //Contar caracteres validos del texto a encriptar
        charValidosEncr=contarCacteresValidos(arrayEncriptar);
        if(longitudTextoEncr===charValidosEncr){ //caracteres totales=caracteres validos luego encriptar
            //Reemplazar las vocales por la vocal encriptada del arreglo anterior
            for(i=0;i<vocalesEncriptar.length;i++){
                indexVocal=arrayEncriptar.indexOf(vocalesEncriptar[i],0);
                while(indexVocal>-1){
                    arrayEncriptar.splice(indexVocal,1,vocalesDesencriptar[i]);
                    indexVocal=arrayEncriptar.indexOf(vocalesEncriptar[i],indexVocal+1);
                }
            }
            //Convertir el arreglo con su reemplazo en cadena de texto y mostrar en los resultados
            textoDesencriptar=arrayEncriptar.join("");
            textParrDesencriptar.innerHTML=textoDesencriptar;
            mostrarResultados(true);
        }else{ //Mostrar mensaje de texto no válido
            alert("Utilizar solo letras minúsculas, sin acentos y sin caracteres especiales");
            mostrarResultados(false);
        }
    }else{
        textAreaEncriptar.value="";
        mostrarResultados(false);
    }
}

function copiarTextoEncriptado(){
        
    let texto = textParrDesencriptar.textContent;
    navigator.clipboard.writeText(texto).then(function() {
        alert("Texto copiado al portapapeles");
    }).catch(function(err) {
        console.error("Error al copiar el texto: ", err);
    });
}

function desencriptar(){
    //Leer el texto ingresado sin espacios al principio y al final
    textoDesencriptar=textAreaEncriptar.value.trim();
    if(textoDesencriptar!==""){
        //Contar caracteres totales del texto a desencriptar
        longitudTextoDescr=textoDesencriptar.length;
        //Convertir el texto en un arreglo
        arrayDesencriptar=textoDesencriptar.split("");
        //Contar caracteres validos del texto a desencriptar
        charValidosDescr=contarCacteresValidos(arrayDesencriptar);
        if(longitudTextoDescr===charValidosDescr){ //caracteres totales=caracteres validos luego desencriptar
            //Reemplazar las vocales por la vocal desencriptada del arreglo anterior
            for(i=0;i<vocalesEncriptar.length;i++){
                indexVocal=arrayDesencriptar.indexOf(vocalesEncriptar[i],0);
                while(indexVocal>-1){
                    stringArregloValidar=JSON.stringify(arrayDesencriptar.slice(indexVocal,indexVocal+vocalesDesencriptar[i].length));
                    if(JSON.stringify(vocalesDesencriptar[i].split(""))===stringArregloValidar){
                        arrayDesencriptar.splice(indexVocal,vocalesDesencriptar[i].length,vocalesEncriptar[i]);
                    }
                    indexVocal=arrayDesencriptar.indexOf(vocalesEncriptar[i],indexVocal+1);
                }
            }
            //Convertir el arreglo con su reemplazo en cadena de texto y mostrar en los resultados
            textoEncriptar=arrayDesencriptar.join("");
            textParrDesencriptar.innerHTML=textoEncriptar;
            mostrarResultados(true);
        }else{ //Mostrar mensaje de texto no válido
            alert("Utilizar solo letras minúsculas, sin acentos y sin caracteres especiales");
            mostrarResultados(false);
        }
    }else{
        textAreaEncriptar.value="";
        mostrarResultados(false);
    }

}

function contarCacteresValidos(arrayValidar){
    let contadorCarateres=0;
    caracteresAdmitidos.forEach(caracterAdmitido => {
        arrayValidar.forEach(caracterValidar => {
            if(caracterAdmitido===caracterValidar){ contadorCarateres++; }
        });
    });
    return contadorCarateres;
}

function reportWindowSize() {
    widthMain = window.innerWidth;
    styleMain=window.getComputedStyle(divSalida);
    if(styleMain.getPropertyValue('flex-direction')==="column-reverse" && widthMain>768){
        divSalida.style.flexDirection="row-reverse";
    }else if(styleMain.getPropertyValue('flex-direction')==="row-reverse" && widthMain<=768){
        divSalida.style.flexDirection="column-reverse";
    }
    redimensionar(widthMain, styleMain);
}

function mostrarResultados(mostrar){
    widthMain=mainContenido.clientWidth;
    styleMain=window.getComputedStyle(divSalida);
    if(mostrar){
        if(widthMain>768){ //Desktop
            divSalida.style.flexDirection="row-reverse";
        }else{
            divSalida.style.flexDirection="column-reverse";
        } 
        divResultadoInicial.style.visibility="hidden";
        divResultadoEncriptado.style.visibility="visible";
    }else{
        if(widthMain>768){
            divSalida.style.flexDirection="row";
        }else{
            divSalida.style.flexDirection="column";
        }
        divResultadoEncriptado.style.visibility="hidden";
        divResultadoInicial.style.visibility="visible";
    }
    redimensionar(widthMain, styleMain);
}

function redimensionar(widthFlex,styleFlex){
    if(widthFlex>768){ /* Desktop */
        mainContenido.style.height="1024px";
        divLogo.style.padding="40px 84px 936px";
        imgLogo.style.width="32px";
        imgLogo.style.height="48px";
        divIngreso.style.height="896px";
        divtextAreaIngreso.style.height="667px";
        divtextAreaIngreso.style.padding="104px 0px 8px";
        divSalida.style.width="800px";
        divSalida.style.padding="40px";
    }else if(widthFlex>375){ /* Tablet */
        if(styleFlex.flexDirection==="column"){
            mainContenido.style.height="1174px";
        }else{ /* column-reverse */
            mainContenido.style.height="1384px";
        }
        imgLogo.style.width="31.09px";
        imgLogo.style.height="46.64px";
        divLogo.style.padding="73.42px 696.91px 92px 40px";
        divIngreso.style.height="721px";
        divtextAreaIngreso.style.height="538px";
        divtextAreaIngreso.style.padding="16px 0px 50px";
        divSalida.style.width="688px";
        divSalida.style.padding="48px 40px 40px 40px";
    }else{ /* Celular */
        if(styleFlex.flexDirection==="column"){
            mainContenido.style.height="933px";
            imgLogo.style.width="32px";
            imgLogo.style.height="48px";
            divLogo.style.padding="24px 327px 48px 16px";
            divIngreso.style.height="523px";
            divtextAreaIngreso.style.height="243px";
            divtextAreaIngreso.style.padding="24px 0px 48px";
            divSalida.style.width="327px";
            divSalida.style.padding="48px 24px 40px 24px";
        }else{ /* column-reverse */
            mainContenido.style.height="1715px"
            imgLogo.style.width="30.43px";
            imgLogo.style.height="45.65px";
            divLogo.style.padding="23.97px 328.57px 48px 16px";
            divIngreso.style.height="912px";
            divtextAreaIngreso.style.height="624px";
            divtextAreaIngreso.style.padding="24px 0px 56px";
            divSalida.style.width="343px";
            divSalida.style.padding="48px 16px 24px 16px";
        }
    }
}

window.onresize = reportWindowSize;