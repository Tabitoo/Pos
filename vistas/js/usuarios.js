$(".nuevaFoto").change(function(){
   
    var imagen = this.files[0];

    console.log(imagen);



    if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png"){
        $(".nuevaFoto").val("");

        swal({
            title: "Error al subir l imagen",
            text: "la imagen debe estar en formato JPG o PNG",
            type: "error",
            confirmButtonText: "cerrar"
        })
    } else if(imagen["size"] > 2000000){

        $(".nuevaFoto").val("");

        swal({
            title: "Error al subir l imagen",
            text: "la imagen debe estar en formato JPG o PNG",
            type: "error",
            confirmButtonText: "cerrar"
        })

    } else {
        var datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagen)

        $(datosImagen).on("load", function(event){
            var rutaImagen = event.target.result;

            $(".previsualizar").attr("src", rutaImagen)
        })
    }
})

/* Editar Usuario */

$(document).on("click",".btnEditarUsuario",function(){
    var idUsuario = $(this).attr("idUsuario")

    var datos = new FormData();
    datos.append("idUsuario", idUsuario)

    $.ajax({
        url:"ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType : "json",
        success: function(respuesta){
            $("#editarNombre").val(respuesta["nombre"])
            $("#editarUsuario").val(respuesta["usuario"])
            $("#editarPerfil").html(respuesta["perfil"])
            $("#editarPerfil").val(respuesta["perfil"])
            $("#fotoActual").val(respuesta["foto "])

            $("#passwordActual").val(respuesta["password"])

            if(respuesta["foto"] != ""){
                $(".previsualizar").attr("src", respuesta["foto"])

            }
        }
    })


})

/* Activar usuario */
$(document).on("click",".btnActivar",function() {
    var idUsuario = $(this).attr("idUsuario");
    var estadoUsuario = $(this).attr("estadoUsuario");

    /*console.log("Se esta tocando el boton :)")
    console.log("idUsuario", idUsuario)*/

    console.log("IdUsuario", idUsuario);
    console.log("estadoUsuario", estadoUsuario);


    var datos = new FormData();
    datos.append("activarId", idUsuario);
    datos.append("activarUsuario", estadoUsuario);

    $.ajax({
        url: "ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success: function(respuesta){

            console.log("respuesta", respuesta);

            if(window.matchMedia("(max-width:767px)").matches){
                swal({
                    title: "El usuario ha sido actualizado",
                    type: "success",
                    confirmButtonText: "cerrar"
                }).then(function(result){
                    if(result.value){
                        window.location = "usuarios";
                    }
                })

            }

        }

    })

    if(estadoUsuario == 0){
        //console.log("Se esta tocando el boton desde el if :)")
        $(this).removeClass('btn-success')
        $(this).addClass('btn-danger')
        $(this).html('Desactivado')
        $(this).attr('estadoUsuario', 1)
    } else {
        //console.log("Se esta tocando el boton desde el else :)")
        $(this).addClass('btn-success')
        $(this).removeClass('btn-danger')
        $(this).html('Activado')
        $(this).attr('estadoUsuario', 0)

    }
})

/* Verificar nombre repetido */

$("#nuevoUsuario").change(function(){
    $(".alert").remove();
    var usuario = $(this).val()

    var datos = new FormData();
    datos.append("validarUsuario", usuario);

    $.ajax({
        url: "ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta){

            if(respuesta){
                $("#nuevoUsuario").parent().after('<div class="alert alert-waring">Este usuario ya existe</div>')
                $("#nuevoUsuario").val("")
            }

        }

    })

})

/* Eliminar Usuario */

$(document).on("click",".btnEliminarUsuario",function(){

    var idUsuario = $(this).attr("idUsuario")
    var fotoUsuario = $(this).attr("fotoUsuario")
    var usuario = $(this).attr("usuario")

    swal({
        title: "Estas seguro de borrar el usuario?",
        text: "si no lo esta puede cancelar la accion",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "cancelar",
        confirmButtonText: "Si, borrar usuario!"
    }).then((response) => {
        if(response.value){
            window.location = "index.php?ruta=usuarios&idUsuario="+idUsuario+"&usuario"+usuario+"&fotoUsuario="+fotoUsuario
        }
    })
})