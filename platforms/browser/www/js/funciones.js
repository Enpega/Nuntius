var mapa;
var latitud, longitud;

function mapear(latitud1, longitud1) { 
    console.log(!(isNaN(latitud1) && isNaN(longitud1)));
    if (!(isNaN(latitud1) && isNaN(longitud1))) {
        mapa = new google.maps.Map(document.getElementById('mapa'), {
            center: {lat: latitud1, lng: longitud1},   //center: {lat: 37.09024, lng: -95.712891},
            zoom: 16
        });
    
        console.log("Latitud " + latitud1);
        console.log("longitud " + longitud1);
        var marcador1 = new google.maps.Marker({
            position: {lat: parseFloat(latitud1), lng: parseFloat(longitud1)},
            map: mapa
        });
    }
} //mapear

var onSuccess = function(position) {
        /*alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');*/
    
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    mapear(latitud, longitud);
}; //onSuccess
 

function onError(error) {
    alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
} //onError

function appActivada() {
    var clave = window.localStorage.getItem("clave");
    if (!clave) {
        alert("La aplicación no está activada.\nProporcione su clave de activación");
        activarCapa("registro");
    }
} //appActivada

function activarCapa(capa) {
    document.getElementById("principal").style.visibility = "hidden";
    document.getElementById("mapa").style.visibility = "hidden";
    document.getElementById("registro").style.visibility = "hidden";
    //Se hace visible la capa deseada
    document.getElementById(capa).style.visibility = "visible";
}

function validarRegistroPaseador()
{
	var bValido = true;
    
    //Revisar que no falte ninguna información
    if($.trim($("#correoPaseador").val()) == "") {
        alert("El correo no puede quedar vacío");
        bValido = false;
    }
    
    if($.trim($("#nombrePaseador").val()) == "") {
        alert("El nombre no puede quedar vacío");
        bValido = false;
    }
    
    if($.trim($("#apellidopPaseador").val()) == "") {
        alert("El apellido paterno no puede quedar vacío");
        bValido = false;
    }
    
    if($.trim($("#apellidomPaseador").val()) == "") {
        alert("El apellido materno no puede quedar vacío");
        bValido = false;
    }
    
    if($.trim($("#telefonoPaseador").val()) == "") {
        alert("El teléfono no puede quedar vacío");
        bValido = false;
    }
    
    if($.trim($("#ciudadPaseador").val()) == "") {
        alert("La ciudad no puede quedar vacía");
        bValido = false;
    }
    
    if($("#contrasenaPaseador").val() == "") {
        alert("La contraseña no puede quedar vacía");
        bValido = false;
    }
    
    if($("#confirmacionPaseador").val() == "") {
        alert("La confirmación no puede quedar vacía");
        bValido = false;
    }
    
    if ($("#contrasenaPaseador").val() != $("#confirmacionPaseador").val()) {
        alert("La contraseña y confirmación no coinciden");
        bValido = false;
    }
    
    if (bValido == false) {
        return false;
    }
    //Si no falta nada se procede a registrar
    
    var url = "http://canem.awardspace.biz/registroPaseador.php"; //El PHP que registrará en la base de datos.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#frmRegistroPaseador").serialize(), // Adjuntar los campos del formulario enviado.
            

          beforeSend:function() {
                //alert("Conectando...");
          },

          success:function(data) {
              console.log(data);
               if (data == "9") {
                   alert("Falló la conexión al servidor");
               } //data = 9
              
               if (data == "1062") {
                   //alert("No fue posible realizar el registro");
                   alertify.alert("Ese correo ya se encuentra registrado.", function(){
                        alertify.message('OK');
                   });
               } //data = 8
			 
               if (data == "0") {
                   //alert("Paseador registrado");
                   alertify.alert("Paseador registrado.<br />Se le ha enviado un correo. Por favor revíselo.", function(){
                        alertify.message('Aceptar');
                        activarCapa("principal");
                   });
               } //data = 0
          },
          error: function(result) {
              alert("Error: " + result.status + " " + result.statusText);
          }
          
    });

    return false; // Evitar ejecutar el submit del formulario.


} //registroPaseador