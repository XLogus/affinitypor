$.mobile.popup.prototype.options.history = false;

$(document).bind( "pagebeforechange", function( e, data ) {    
    if ( typeof data.toPage === "string" ) {
        var u = $.mobile.path.parseUrl( data.toPage );
        var params = hashParams(u.hash);   
        var re1 = /^#chienouchat/;
        var re2 = /^#voircontacts/;
        var re3 = /^#selector/;
        var re4 = /^#syncro/;
        var re5 = /^#suivi/;
        
        if ( u.hash.search(re1) !== -1 ) {
            chienouchat__limpiar();
        } else if( u.hash.search(re2) !== -1 ){            
            contactos__ver();
        } else if( u.hash.search(re3) !== -1 ){            
            sincronizacion__ver();
        } else if( u.hash.search(re4) !== -1 ){            
            sincronizacion__ejecutar();
        } else if( u.hash.search(re5) !== -1 ){            
            debutactivite();
        }
    }
    verificaLogin();
});



function hashParams(hash) {
		var ret = {};
	    var match;
	    var plus   = /\+/g;
	    var search = /([^\?&=]+)=([^&]*)/g;
	    var decode = function(s) { 
	    	return decodeURIComponent(s.replace(plus, " ")); 
	    };
	    while( match = search.exec(hash) ) ret[decode(match[1])] = decode(match[2]);
	    
	    return ret
};


/**************************
  General
***************************/
var usuario__activo;
var actividad__activa = "0";
var debut__activite = [];
var mismascotas = [];
var contacto;
var mascota__tipo;
var urlpost = "http://actimundi.com/affinitypor/backend/";
var msg;

// Verificar si esta logeado
if (window.localStorage.getItem("contactos") === null) {
    var contactos =  [];
} else {
    var contactos = JSON.parse(window.localStorage.getItem("actividad__activa"));
}

// Verificar actividad activa
if (window.localStorage.getItem("actividad__activa") === null) {
    var actividad__activa =  0;
} else {
    var actividad__activa = window.localStorage.getItem("actividad__activa");
}



$(function() {
    $('[data-toggle="datepicker"]').datepicker({
        language: 'fr-FR',
        format: 'dd/mm/yyyy'
    }); 
});

/**** Corregir problema link en label *****/
/*
$('.conditionslabel a').bind("tap click", function( event, data ){
    event.stopPropagation();
    $.mobile.changePage($(this).attr('href'));
});
*/


function verificaLogin() {
    if (window.localStorage.getItem("usuario__activo") === null) {
        // Signifca que no se inicio sesion
        if (location.hash != "" || location.hash != "homepage") {
            document.location.hash = "#homepage";
        }
        console.log("no se inicio sesion");
    } else {
        usuario__activo = window.localStorage.getItem("usuario__activo");    
        console.log("Usuario Activo:"+usuario__activo);
        if (location.hash == "" || location.hash == "homepage") {
            document.location.hash = "#selector";
        }
    }
}


/**************************
  Login
***************************/
$(".js-login").on("click", function(e) {
    e.preventDefault();
    $login = $('.login__txt').val();
    $login = $login.toLowerCase();
    if($login == "") {
        //alert("Por favor ingrese un usuario");
        $( "#popupLogin1" ).popup("open");
    } else if($login != "user1" && $login != "user2" && $login != "user3" && $login != "user4" && $login != "user5" && $login != "user6" && $login != "user7" && $login != "user8" && $login != "user9" && $login != "user10" && $login != "user11" && $login != "user12" && $login != "user13" && $login != "user14" && $login != "user15" && $login != "user16" && $login != "user17" && $login != "user18" && $login != "user19" && $login != "portugal1" && $login != "portugal2" && $login != "portugal3" && $login != "portugal4" && $login != "portugal5" && $login != "portugal6" && $login != "portugal7" && $login != "portugal8" && $login != "portugal9" && $login != "portugal10" && $login != "portugal11" && $login != "portugal12" && $login != "portugal13" && $login != "portugal14" && $login != "portugal15" && $login != "portugal16" && $login != "portugal17" && $login != "portugal18" && $login != "portugal19" && $login != "portugal20" && $login != "portugal21" && $login != "portugal22" && $login != "portugal23" && $login != "portugal24" && $login != "portugal25") {
        $( "#popupLogin2" ).popup("open");
    } else {
        usuario__activo = $login;
        window.localStorage.setItem("usuario__activo", usuario__activo);
        $.mobile.navigate( "#selector" );
    }
});



/**************************
  Cerrar sesion
****************************/
$('.js-cerrarsesion').on("click", function() {
     window.localStorage.clear();
    document.location.hash = "#homepage";
});



/*****************************
  Ver todos los contactos
****************************/
function contactos__ver() {
    $(".contactos__listado tbody").html("");
    
    if (window.localStorage.getItem("contactos") === null) {
        $(".contactos__listado tbody").append('<td colspan="8">Nenhum contato do feno</td>');
    } else {
        listado = JSON.parse(window.localStorage.getItem("contactos"));
        console.log(window.localStorage.getItem("contactos"));
        var mismascotas = "";
        $.each(listado, function( index, value ) {
            // Enumerar mascotas  
            mismascotas = "";
            $.each(value.mascotas, function( index, mascota ) {
                mismascotas += '<p>'+mascota.nom+'</p>';
            });
        
            rpta = '<tr>';
            rpta += '<td>'+value.nom+'</td>';
            rpta += '<td>'+value.genre+'</td>';
            rpta += '<td>'+value.codepostal+'</td>';
            rpta += '<td>'+value.telephone+'</td>';
            rpta += '<td>'+value.email+'</td>';
            rpta += '<td>'+value.magasin+'</td>';
            rpta += '<td>'+value.habituellement+'</td>';
            rpta += '<td>'+mismascotas+'</td>';
            rpta += '</tr>';
            $(".contactos__listado tbody").append(rpta);
        });
    }
}

/***********************
  Sincronizacion
*****************************/
function sincronizacion__ver() {
    console.log("msg "+msg);
    if(msg == "guardado") {
        $('#js-messages').html('<div role="alert" class="alert alert-success"><strong>Usuário registrado</strong></div>');
        msg = "";
    } else if(msg == "nointernet") {
        $('#js-messages').html('<div role="alert" class="alert alert-danger"><strong>Usuário registrado na memória interna.</strong></div>');
        msg = "";
    } else if(msg == "guardadoevento") {
        $('#js-messages').html('<div role="alert" class="alert alert-success"><strong>Atividade salva</strong></div>');
        msg = "";
    } else if(msg == "repetido") {
        $('#js-messages').html('<div role="alert" class="alert alert-danger"><strong>Usuário repetido</strong></div>');
        msg = "";
    } else {
        $('#js-messages').html('');
    }
    if (window.localStorage.getItem("contactos") !== null) {
        sinsincronizar = JSON.parse(window.localStorage.getItem("contactos"));
        cuantos = sinsincronizar.length;
        $('#js-sync span').html(cuantos);
    } else {
        cuantos = 0;
        $('#js-sync span').html(cuantos);
    }
    
    // Verificar actividad creada
    if (window.localStorage.getItem("actividad__activa") === null) {
        $('.js-menucontacts').addClass('disabled');
        $('.js-menucontactsalert').show();
    } else {
        $('.js-menucontacts').removeClass('disabled');
        $('.js-menucontactsalert').hide();
    }
}

function sincronizacion__ejecutar() {
    if (window.localStorage.getItem("contactos") === null) {
        $('.sync__wrap').html("Nenhum usuário");
    } else {
        listado = JSON.parse(window.localStorage.getItem("contactos"));
        $('.sync__wrap').html("Sincronização, aguarde");
        $.each(listado, function( index, value ) {
            $.ajax({
                dataType: "json",
                url: urlpost + 'usuario_guardar.php',
                data: {
                    nom: value.nom,
                    genre: value.genre,
                    codepostal: value.codepostal,
                    telephone: value.telephone,
                    email: value.email,
                    magasin: value.magasin,
                    habituellement: value.habituellement,
                    mascotas: JSON.stringify(value.mascotas)
                },
                timeout: 3000,
                method: "GET",
                async: false,
                crossDomain: true,
            }).success(function (response) {
                //console.log( "success" + data );
                syncCallBack(index);
                //$('.sync__wrap').html("Synchronisation, veuillez patienter");
            }).error(function (request, error) {
                //console.log("status" + error);
                //guardarCallBack("nointernet");
                $('.sync__wrap').html("Sem conexão à internet");
            });
        });
        listado2 = JSON.parse(window.localStorage.getItem("contactos"));
        if(listado2.length <= 0) {
            $('.sync__wrap').html("Done");
        } else {
            $('.sync__wrap').html(listado2.length + " usuários não sincronizados. ");
        }
    }
}

function syncCallBack(index) {
    console.log(index);
    contactos = JSON.parse(window.localStorage.getItem("contactos"));
    contactos.splice(index, 1);
    window.localStorage.setItem("contactos", JSON.stringify(contactos));
}

function debutactivite() {    
    usuario_activo = window.localStorage.getItem("usuario__activo");
    $('#js-usuario').val(usuario_activo);
    debut_limpiar();
}