/****** Validar cada X periodo ***********/
function validar__debut() {
    valid = false;
    if (jQuery("#date").val().length > 0 && jQuery("#dactivation").val().length > 0) { valid = true; } else { valid = false; }
    if (valid == true) {
        jQuery(".js-aceptar-debut").removeClass('disabled');
    } else {
        jQuery(".js-aceptar-debut").addClass('disabled');
    }
}
setInterval(function(){ validar__debut(); }, 500);


/***** Guardar datos ***********/
/*
$('.js-aceptar-debut').on("click", function() {
    
    // Guardar datos
    $date = $('#date').val();
    $dactivation = $('#dactivation').val();
    $incidentes = $('#incidentes').val();
    
    // Limpiar campos
    $('#date').val("");
    $('select#dactivation>option:eq(0)').attr('selected', true);
    $('select#dactivation').selectmenu('refresh');
    $('#incidentes').val("");
    jQuery(".js-aceptar-debut").addClass('disabled');
    
    $.mobile.navigate( "#selector" );
});
*/

function debut_limpiar() {
    $('#date').val("");
    //$('select#dactivation>option:eq(0)').attr('selected', true);
    //$('select#dactivation').selectmenu('refresh');
    $('#incidentes').val("");
    $('#pro-image').val("");
    $('.preview-images-zone').html("");
    $('#status').html('');
    jQuery(".js-aceptar-debut").addClass('disabled');
    //$.mobile.navigate( "#selector" );
    $(".js-typea:checked").each(function(){
        $(this).checked = false;  
    });
}


// Elegir type
$(document).on("pagecreate", "#suivi", function(){
    if (usuario__activo == "bretagne1" || usuario__activo == "bretagne2" || usuario__activo == "bretagne3" || usuario__activo == "bretagne4" || usuario__activo == "bretagne5") {
        $('.col-bus').hide();
        $('.col-carrito').hide();
    }
    
    if (usuario__activo == "languedoc1" || usuario__activo == "languedoc2" || usuario__activo == "languedoc3" || usuario__activo == "languedoc4" || usuario__activo == "languedoc5" || usuario__activo == "languedoc6" || usuario__activo == "languedoc7" || usuario__activo == "languedoc8" || usuario__activo == "languedoc9" || usuario__activo == "languedoc10") { 
            $('.col-bus').hide();
    }
    
$('.js-typea').on("change", function() {
    cual = $(this).val();
    var opciones="";
    
    if(usuario__activo != "paris1" && usuario__activo != "paris2" && usuario__activo != "paris3" && usuario__activo != "paris4" && usuario__activo != "paris5") {
        if (usuario__activo == "bretagne1" || usuario__activo == "bretagne2" || usuario__activo == "bretagne3" || usuario__activo == "bretagne4" || usuario__activo == "bretagne5") {            
            opciones += '<option value="Tregueux/St Brieuc">Tregueux/St Brieuc</option>';
            opciones += '<option value="Vannes">Vannes</option>';
            opciones += '<option value="Avranche">Avranche</option>';
            opciones += '<option value="Brest">Brest</option>';
        } else if (usuario__activo == "languedoc1" || usuario__activo == "languedoc2" || usuario__activo == "languedoc3" || usuario__activo == "languedoc4" || usuario__activo == "languedoc5" || usuario__activo == "languedoc6" || usuario__activo == "languedoc7" || usuario__activo == "languedoc8" || usuario__activo == "languedoc9" || usuario__activo == "languedoc10") {             
            if(cual == "space tourer"){
                opciones += '<option value="Baumel, Marguerittes">Baumel, Marguerittes</option>';
                opciones += '<option value="Croq N Dog à Aigues Mortes">Croq N Dog à Aigues Mortes</option>';
                opciones += '<option value="Animoland à Cournonsec">Animoland à Cournonsec</option>';
                opciones += '<option value="Zooland à Rivesaltes">Zooland à Rivesaltes</option>';
                opciones += '<option value="L’Animalerie à Castelnau Le Lez">L’Animalerie à Castelnau Le Lez</option>';
                opciones += '<option value="Comme Chien & Chat à Lunel">Comme Chien & Chat à Lunel</option>';
            } else if(cual == "carrito"){
                opciones += '<option value="Auchan Perpignan">Auchan Perpignan</option>';
                opciones += '<option value="Carré d’Or Perpignan">Carré d’Or Perpignan</option>';
                opciones += '<option value="Place de l’Europe Montpellier">Place de l’Europe Montpellier</option>';
                opciones += '<option value="Place de la Comédie Montpellier">Place de la Comédie Montpellier</option>';
                opciones += '<option value="Carrefour St Jean de Védas">Carrefour St Jean de Védas</option>';
            }
        } else {
            if(cual == "bus"){
                opciones += '<option value="Exponor">Exponor</option>';
                opciones += '<option value="Zu Coimbra">Zu Coimbra</option>';
                opciones += '<option value="Auchan Sintra">Auchan Sintra</option>';
                opciones += '<option value="Petfil">Petfil</option>';
                opciones += '<option value="Gare Oriente">Gare Oriente</option>';
                opciones += '<option value="Mar Shopping">Mar Shopping</option>';
                opciones += '<option value="Congresso Montenegro">Congresso Montenegro</option>';
                opciones += '<option value="Zu Braga Minho">Zu Braga Minho</option>';
                opciones += '<option value="Avenida Central Braga">Avenida Central Braga</option>';                
            } else if(cual == "space tourer"){                
                opciones += '<option value="Cascais Shopping">Cascais Shopping</option>';
                opciones += '<option value="Almada Forum">Almada Forum</option>';
                opciones += '<option value="Norte Shopping">Norte Shopping</option>';   
				opciones += '<option value="Zu Braga Minho">Zu Braga Minho</option>'; 				
            } else if(cual == "carrito"){
                opciones += '<option value="Exponor">Exponor</option>';
                opciones += '<option value="Colombo">Colombo</option>';
                opciones += '<option value="Parque das Nações">Parque das Nações</option>';
                opciones += '<option value="Gare Oriente">Gare Oriente</option>';
                opciones += '<option value="Avenida Central Braga">Avenida Central Braga</option>';                
            }
        }
    } else {
        opciones += '<option value="Paris">Paris</option>';
    }
    $('#dactivation').html("");
    $('#dactivation').append(opciones);
    $('#dactivation').selectmenu('refresh');
});
});