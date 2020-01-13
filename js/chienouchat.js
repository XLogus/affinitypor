// Radio Button elije perro o gato
$(".js-chienouchat").on("change", function(e) {
    e.preventDefault();
    
    // Elige si va a la pantalla de gatos o perros
    var mascota = $("input[name='pet']:checked").val();
    $('.mascota__chienouchat').hide();
    if(mascota == "chien") {
        $('.mascota__perro').show();
        mascota__tipo = "perro";
    } else {
        $('.mascota__gato').show();
        mascota__tipo = "gato";
    }
});


/************************************
  Gato
*********************************/
function validar__gato() {
    valid2 = false;
    if(mascota__tipo == "gato") {    
        if ($("#nomanimalg").val().length > 0 && $('#conditions1').prop('checked') && $('#conditions2').prop('checked') && $("#chienouchatnom").val().length > 0 && $("#chienouchatprenom").val().length > 0 && $("#chienouchatemail").val().length > 0) { valid2 = true; } else { valid2 = false; }
        if (valid2 === true) {
            jQuery(".js-ok-chienouchat").removeClass('disabled');
            jQuery(".js-ok-chienouchat2").removeClass('disabled');
        } else {
            jQuery(".js-ok-chienouchat").addClass('disabled');
            jQuery(".js-ok-chienouchat2").addClass('disabled');
        }
    }
}
setInterval(function(){ validar__gato(); }, 500);



/************************************
  Perro
*********************************/
function validar__perro() {
    valid2 = false;
    if(mascota__tipo == "perro") {  
        if (jQuery("#nomanimalp").val().length > 0 && jQuery("#poidsp").val().length > 0 && $('#conditions1').prop('checked') && $('#conditions2').prop('checked') && $("#chienouchatprenom").val().length > 0 && $("#chienouchatnom").val().length > 0 && $("#chienouchatemail").val().length > 0) { valid2 = true; } else { valid2 = false; }
        if (valid2 === true) {
            jQuery(".js-ok-chienouchat").removeClass('disabled');
            jQuery(".js-ok-chienouchat2").removeClass('disabled');
        } else {
            jQuery(".js-ok-chienouchat").addClass('disabled');
            jQuery(".js-ok-chienouchat2").addClass('disabled');
        }
    }
}
setInterval(function(){ validar__perro(); }, 500);


// Guarda solo a la mascota
$('.js-ok-chienouchat').on("click", function(e) {
    e.preventDefault();
    chienouchat__recogedatos();
    
    // Limpia formularios
    $('#nomanimalg').val("");
    $('#nomanimalp').val("");
    $('#poidsp').val("");
    
    // Muestra la pantalla de seleccion
    $('.mascota__perro').hide();
    $('.mascota__gato').hide();
    $('.mascota__chienouchat').show();
    mascota__tipo = "";
});


// Guarda los datos y a la mascota
$('.js-ok-chienouchat2').on("click", function(e) {
    e.preventDefault();
    $(".chienouchat_msg").html("Salvando, por favor espere");
    jQuery(".js-ok-chienouchat2").addClass('disabled');

    chienouchat__recogedatos();
    
    // Guarda datos del usuario
    /*
    var jqxhr = $.getJSON( urlpost + 'usuario_guardar.php?nom='+contacto.nom+'&genre='+contacto.genre+'&codepostal='+contacto.codepostal+'&telephone='+contacto.telephone+'&email='+contacto.email+'&magasin='+contacto.magasin+'&habituellement='+contacto.habituellement+'&mascotas='+JSON.stringify(contacto.mascotas), function(data, status, xhr) {
        if (status == "success"){
            console.log( "success" );
            msg = "guardado";
        }   else if (status == "timeout"){
            console.log( "No hay conexion a internet" );
            msg = "nointernet";
        } 
        console.log("status "+status);
    });
    */
    msg = "esperando";
    // Enviar al servidor
    $.ajax({
        dataType: "json",
        url: urlpost + 'usuario_guardar.php',
        data: { prenom:contacto.prenom, nom:contacto.nom, genre: contacto.genre, codepostal:contacto.codepostal, telephone:contacto.telephone, email:contacto.email, magasin:contacto.magasin, habituellement:contacto.habituellement, mascotas:JSON.stringify(contacto.mascotas), usuario:usuario__activo, actividad__activa:actividad__activa },
        timeout: 5000,        
        method:"GET",
        async:false,
        crossDomain:true,
    }).success(function(data) {
        console.log( "success" + data );
        if(data == "0") {
            guardarCallBack("repetido");    
        } else {
            guardarCallBack("guardado");             
        }
        $(".chienouchat_msg").html("");
        $("#chienouchatmagasin").val("");
    }).error(function(request, error) {
        console.log( "status" + error );
        guardarCallBack("nointernet");
    });
     
    chienouchat__limpiar();
    mismascotas = [];
    delete mismascotas;
    delete contacto;    
    $.mobile.navigate( "#selector" );
});

// Cambia el msg
function guardarCallBack(rpta) {
    msg = rpta;
    if(rpta == "nointernet") {
        contactos.push(contacto);
        window.localStorage.setItem("contactos", JSON.stringify(contactos));
    }
}

// Recoge datos
function chienouchat__recogedatos() {
    // Recoge datos del usuario
    prenom = $('#chienouchatprenom').val();
    nom = $('#chienouchatnom').val();
    genre = $('#chienouchatgenre').val();
    codepostal = $('#chienouchatcodepostal').val();
    telephone = $('#chienouchattelephone').val();
    email = $('#chienouchatemail').val();
    magasin = $('#chienouchatmagasin').val();
    habituellement = $('#chienouchathabituellement').val();    
    
    // Almacena datos del usuario
    contacto =
        {
            'prenom':prenom,
            'nom':nom,
            'genre':genre,
            'codepostal':codepostal,
            'telephone':telephone,
            'email':email,
            'magasin':magasin,
            'habituellement':habituellement
        };
    
    
    if(mascota__tipo == "perro") {  
        // Recoge info del perro
        nom = $('#nomanimalp').val();
        taille = $("input[name='taillep']:checked").val();
        genre = $('input[name=genrep]:checked').val();
        race = $('#racep').val();
        poids = $('#poidsp').val();
        sterilized = "";
        tipo = "dog";
    } else if(mascota__tipo == "gato") {
        // Recoge info del gato
         nom = $('#nomanimalg').val();
         taille = "";
        race = $('#raceg').val();
        sterilized = $('#sterilizedg').val();
        genre = $('input[name=genreg]:checked').val();
        poids = "";
        tipo = "cat";
    }
    
    // Alamacena datos de la mascota
    delete mimascota;
    mimascota = {
        'nom':nom,
        'taille':taille,
        'race':race,
        'sterilized':sterilized,
        'genre':genre,
        'poids':poids,
        'tipo':tipo
    };
    
    /// Guarda datos de la mascota
    mismascotas.push(mimascota);
    contacto.mascotas = mismascotas;
    
    //console.log("contacto"+JSON.stringify(contacto));
    //console.log("mimascota"+JSON.stringify(mimascota));
    //console.log("mismascotas"+JSON.stringify(mismascotas));
}


// Limpiar campos y resetear
function chienouchat__limpiar() {
    // Limpiar campos
    $('#chienouchatprenom').val("");
    $('#chienouchatnom').val("");
    $('#chienouchatcodepostal').val("");
    $('#chienouchattelephone').val("");
    $('#chienouchatemail').val("");
    $('select#chienouchathabituellement>option:eq(0)').attr('selected', true);
    //$('select#chienouchathabituellement').selectmenu('refresh');
    $('select#chienouchatmagasin>option:eq(0)').attr('selected', true);
    //$('select#chienouchatmagasin').selectmenu('refresh');
    $('select#racep>option:eq(0)').attr('selected', true);
    $('select#race>option:eq(0)').attr('selected', true);
    
    $('#nomanimalg').val("");
    $('#nomanimalp').val("");
    $('#poidsp').val("");
    
    $("#conditions1").checkboxradio();
    $("#conditions2").checkboxradio();
    $('#conditions1').attr("checked",false).checkboxradio("refresh");    
    $('#conditions2').attr("checked",false).checkboxradio("refresh");
    
    // Borrar variables globales
    delete mismascotas;
    delete contacto;
    
    // Dejar la pantalla de inicio
    $('.mascota__perro').hide();
    $('.mascota__gato').hide();
    $('.mascota__chienouchat').show();
    
    mascota__tipo = "";
}

/******************************
  Select Autres
*******************************/
$('.js-comboautres').on("change", function() {
    if($(this).val() == "Autres") {
        cual = $(this).attr("id");
        //console.log(cual);
        $('.js-combo').val(cual);
        $( "#ajouterPop" ).popup("open");
    }
});

$('.js-popupSave').on("click", function(e) {
    e.preventDefault();
    autres = $('#ajouterop').val();
    combo = $('.js-combo').val();
    $('#'+combo).append('<option selected="selected" value="'+autres+'">'+autres+'</option>');
    $('#'+combo).selectmenu('refresh');
    $('#ajouterop').val("");
    $( "#ajouterPop" ).popup("close");
});

/**************************
  Conditions
*****************************/
$('.conditionslabel a').bind("tap click", function( event, data ){
    event.stopPropagation();
    event.preventDefault();
    condiciones = $('#conditions').html();
    $('.conditions__content').html(condiciones);
    $( "#conditionsPop" ).popup("open");
    
});


/***********************************
  Loja
**************************************/  
$('#filter-loja').on("click", "li", function() {
    $valor = $(this).html();
    $(".ui-input-search input").val($valor);
    $('#filter-loja').addClass("ui-screen-hidden");
});