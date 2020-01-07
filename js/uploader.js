$(document).ready(function() {
    document.getElementById('pro-image').addEventListener('change', readImage, false);
    
    //$( ".preview-images-zone" ).sortable();
    
    $(document).on('click', '.image-cancel', function() {
        let no = $(this).data('no');
        $(".preview-image.preview-show-"+no).remove();
    });
    
    $('.js-uploadphoto').on("click", function() {
       $('#pro-image').click(); 
    });
});

var num = 4;
function readImage() {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files; //FileList object
        var output = $(".preview-images-zone");

        for (let i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;
            
            var picReader = new FileReader();
            
            picReader.addEventListener('load', function (event) {
                var picFile = event.target;
                var html =  '<div class="col-md-3 preview-image preview-show-' + num + '">' +
                            '<div class="image-cancel" data-no="' + num + '">x</div>' +
                            '<div class="image-zone"><img id="pro-img-' + num + '" src="' + picFile.result + '"></div></div>';

                output.append(html);
                num = num + 1;
            });

            picReader.readAsDataURL(file);
        }
        //$("#pro-image").val('');
    } else {
        console.log('Browser not support');
    }
}



// Enviar formulario
$(document).ready(function(){
    $('#submitForm').ajaxForm({
        //target:'#imagesPrev',
        //forceSync:true,
        beforeSubmit:function(){
            $('#status').html('<img src="img/loader.gif" />');
        },
        success: function(data) {
            //$('#pro-image').val('');
            //$('#status').html('');
            //console.log("status "+status);
            //debut_limpiar();
            guardaractiviteCallBack(data);
        },
        error:function(){
            $('#status').html('Images uploading failed, please try again.');
        }
    });
});

function guardaractiviteCallBack(rpta) {
    msg = "guardadoevento";        
    actividad__activa = rpta.id;
    console.log(rpta.id);
    window.localStorage.setItem("actividad__activa", actividad__activa);
    //console.log("guardado");
    $.mobile.navigate( "#selector" );
}