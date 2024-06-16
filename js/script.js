function validar() {
    var retorno_usuario = validar_usuario();
    var retorno_contrasena = validar_contrasena();
    var retorno_direccion = validar_direccion();
    var retorno_telefono = validar_telefono();
    var retorno_comuna = validar_comuna();
    var retorno_aficiones = validar_aficiones();
    var retorno_url = validar_url();

    if ( retorno_usuario && retorno_contrasena && retorno_direccion 
    && retorno_telefono && retorno_comuna && retorno_aficiones && retorno_url) {
        guardarDatos();
        window.location.href = 'destino.html';
        return false;
    } else {
        return false;
    }
};


function guardarDatos() {
    var formulario = document.forms['formulario'];
    var datos = {};

    for (var i = 0; i < formulario.length; i++){
        if (formulario[i].name) {
            datos[formulario[i].name] = formulario[i].value;
        }
    }
    datos.aficiones = lista_aficiones;
    localStorage.setItem('formData', JSON.stringify(datos));
};

window.onload = function() {
    if (window.location.pathname.endsWith('destino.html')) {
        imprimirResultado();
    }
};

// Se obtienen los datos de localStorage
function imprimirResultado() {
    var formData = JSON.parse(localStorage.getItem('formData'));
    var tabla = document.getElementById('datosTabla').getElementsByTagName('tbody')[0];
    
    // Para crear filas
    for (var key in formData) {
        if (formData.hasOwnProperty(key)) {
            var row = tabla.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = key.charAt(0).toUpperCase() + key.slice(1);

            //Oculta la contraseña del destino y se guarda como 'data-real-value'
            if (key === 'contrasena' || key === 'confirmar-contrasena') {
                        cell2.innerHTML = '********';
                        cell2.setAttribute('data-real-value', formData[key]);
                    } else {
                        cell2.innerHTML = formData[key];

            // cell2.innerHTML = formData[key];
        }
    }}
};

// Para mostrar contraseña en el destino
function ver_contrasena() {
    var tabla = document.getElementById('datosTabla').getElementsByTagName('tbody')[0];
    var mostrar = document.getElementById('mostrar-contrasena').checked;

    for (var i = 0; i < tabla.rows.length; i++) {
        var row = tabla.rows[i];
        var cell1 = row.cells[0];
        var cell2 = row.cells[1];

        if (cell1.innerHTML.toLowerCase() == 'contrasena' || cell1.innerHTML.toLowerCase() == 'confirmar-contrasena') {
            if (mostrar) {
                cell2.innerHTML = cell2.getAttribute('data-real-value');
            } else {
                cell2.innerHTML = '*******';
            }
        }
    }
};


function validar_usuario() {
    var usuario = document.getElementById('input-usuario').value;
    var div_error_usuario = document.getElementById('error-usuario');


    // var letras = ' áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    var letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var numeros = '0123456789'
    var caracteres_validos = letras + numeros;
    // charAt(0) devuelve el primer caracter
    var letra_inicial = usuario.charAt(0);
    
    if (usuario == '') {
        div_error_usuario.innerHTML = 'El usuario es obligatorio';
        div_error_usuario.className = 'text-danger small mt-1';
        return false;
    } else if (usuario.length < 5 || usuario.length > 10) {
        div_error_usuario.innerHTML = 'El usuario debe tener entre 5 y 10 caracteres';
        div_error_usuario.className = 'text-danger small mt-1';
        return false;

    } else if (letras.indexOf(letra_inicial) == -1) {
        div_error_usuario.innerHTML = 'El nombre de usuario debe comenzar con una letra.';
        div_error_usuario.className = 'text-danger small mt-1';
        return false;
    } else{
        // i se posiciona donde haya un número, al final si no hay ninguno
        var i = 0;
        while (i < usuario.length && letras.indexOf(usuario.charAt(i)) != -1) {
            i++;
        }
        // Si antes i encontro un numero y despues de eso hay letras, retorna falso
        // No funciona de momento ;c
        // console.log(usuario.charAt(usuario.length - 1));
        while (i < usuario.length) {
            if (caracteres_validos.indexOf(usuario.charAt(i)) == -1) {
                div_error_usuario.innerHTML = 'El nombre de usuario no puede tener caracteres especiales.';
                div_error_usuario.className = 'text-danger small mt-1';
                return false;

            }else if (numeros.indexOf(usuario.charAt(i)) == -1) {
                div_error_usuario.innerHTML = 'Los dígitos solo pueden ir al final.';
                div_error_usuario.className = 'text-danger small mt-1';
                return false;
            }
            i++;
        }
    }

    div_error_usuario.innerHTML = '';
    // s_usuario.innerHTML = usuario;
    return true;
};

function validar_contrasena() {
    var contrasena = document.getElementById('input-contrasena').value;
    var div_error_contrasena = document.getElementById('error-contrasena');
    var confirmar_contrasena = document.getElementById('input-con-contra').value;
    var div_error_con_contra = document.getElementById('error-con-contra');
    var usuario = document.getElementById('input-usuario').value;
    var usuario_minuscula = usuario.toLowerCase()
    var contrasena_minuscula = contrasena.toLowerCase();

    function validar_validacionxD(str) {
        var letra = false;
        var digito = false;
        for (var i = 0; i < str.length; i++){
            if (isNaN(str[i])) {
                letra = true;
            } else {
                digito = true;
            }
            if (letra && digito) {
                return true;
            }
        }
    };

    if (contrasena == '') {
        div_error_contrasena.innerHTML = 'La contraseña es obligatoria';
        div_error_contrasena.className = 'text-danger small mt-1';
        return false;
    } else if (contrasena.length < 3 || contrasena.length > 6) {
        div_error_contrasena.innerHTML = 'La contraseña debe tener entre 3 y 6 caracteres.';
        div_error_contrasena.className = 'text-danger small mt-1';
        return false;
    }else if (!validar_validacionxD(contrasena)) {
        div_error_contrasena.innerHTML = 'La contraseña debe contener al menos una letra y un digito.'
        div_error_contrasena.className = 'text-danger small mt-1'
        return false;
    //Por mejorar contra
    }else if (contrasena_minuscula.includes(usuario_minuscula) || usuario_minuscula.includes(contrasena_minuscula)) {
        if (usuario != '') {
            div_error_contrasena.innerHTML = 'La contraseña no debe aparecer dentro de tu nombre de usuario.';
            div_error_contrasena.className = 'text-danger small mt-1';
            return false;
        } else {
            div_error_contrasena.innerHTML = ''
            return false
        }

    }else if(contrasena != confirmar_contrasena) {
        div_error_con_contra.innerHTML = 'Las contraseñas deben coinicidir.';
        div_error_con_contra.className = 'text-danger small mt-1';
        div_error_contrasena.innerHTML = ''
        return false;
    }else {
        div_error_contrasena.innerHTML = ''
        div_error_con_contra.innerHTML = ''
        return true;
    };
    
};

function mostrar_contrasena(){
    var contrasena = document.getElementById('input-contrasena');
    var confirmar_contrasena = document.getElementById('input-con-contra');

    if (contrasena.type === 'password') {
        contrasena.type = 'text';
        confirmar_contrasena.type = 'text';
    } else {
        contrasena.type = 'password';
        confirmar_contrasena.type = 'password';
    }
};


function validar_direccion() {
    var direccion = document.getElementById('input-direccion').value;
    var div_error_direccion = document.getElementById('error-direccion');
    console.log(direccion);

    if (direccion == '') {
        div_error_direccion.innerHTML = 'El campo direccion es obligatorio.';
        div_error_direccion.className = 'text-danger small mt-1';
        return false;
    } else {
        div_error_direccion.innerHTML = '';
        return true;
    }
};

function validar_telefono() {
    var telefono = document.getElementById('input-telefono').value;
    var div_error_telefono = document.getElementById('error-telefono');
    var numeros = ' +0123456789'
    // var numero_inicial = telefono.indexOf(2);

    if (telefono == '') {
        div_error_telefono.innerHTML = 'El campo teléfono es obligatorio.';
        div_error_telefono.className = 'text-danger small mt-1';
        return false;
    } else if (telefono.substring(0,3) != '+56')/**numeros.indexOf(numero_inicial) == -1) **/{
        div_error_telefono.innerHTML = 'El teléfono debe tener el formato de Chile.';
        div_error_telefono.className = 'text-danger small mt-1';
        return false;

    } else if (telefono.length != 12) {
        div_error_telefono.innerHTML = 'Formato de teléfono incorrecto.';
        div_error_telefono.className = 'text-danger small mt-1';
        return false;
    }else{
        // i se posiciona donde haya un número, al final si no hay ninguno
        var i = 0;
        while (i < telefono.length && numeros.indexOf(telefono.charAt(i)) != -1) {
            i++;
        }
        // Si antes i encontro un numero y despues de eso hay letras, retorna falso
        while (i < telefono.length) {
            if (numeros.indexOf(telefono.charAt(i)) == -1) {
                div_error_telefono.innerHTML = 'El telefono no puede tener caracteres.';
                div_error_telefono.className = 'text-danger small mt-1';
                return false;
            }
            i++;
        };
    };

    div_error_telefono.innerHTML = '';
    return true;
};


function validar_comuna() {
    var comuna = document.getElementById('select-comuna').value;
    var div_error_comuna = document.getElementById('error-comuna');
    
    if (comuna == 'default') {
        div_error_comuna.innerHTML = 'Debe seleccionar una comuna.';
        div_error_comuna.className = 'text-danger small mt-1';
        return false;
    }else {
        div_error_comuna.innerHTML = '';
        return true;
    }
};

var lista_aficiones = [];
function validar_aficiones() {
    var aficiones = document.getElementById('input-aficiones').value;
    var div_error_aficiones = document.getElementById('error-aficiones');
    
    // console.log(Array(aficiones));
    // lista_aficiones.push(aficiones);
    // console.log(lista_aficiones)
    if (lista_aficiones.length < 2) {
        div_error_aficiones.innerHTML = 'Debe ingresar al menos dos aficiones.';
        div_error_aficiones.className = 'text-danger small mt-1';
        return false;
    } else {
        div_error_aficiones.innerHTML = '';
        return true;
    }
    
};

function agregar_aficion() {
    var aficion = document.getElementById('input-aficiones').value.toLowerCase();
    var div_error_aficiones = document.getElementById('error-aficiones');
    var div_ul_aficiones = document.getElementById('ul-aficiones');
    var lista = document.createElement('li');

    if (aficion == '') {
        div_error_aficiones.innerHTML = 'La afición no puede estar vacia.';
        div_error_aficiones.className = 'text-danger small mt-1';
    } else if (lista_aficiones.includes(aficion)) {
        div_error_aficiones.innerHTML = 'La aficion ya esta en la lista.'
        div_error_aficiones.className = 'text-danger small mt-1';
    } else {
        lista_aficiones.push(aficion);
        lista.className = 'list-group-item list-group-item-success col-6';
        lista.appendChild(document.createTextNode(aficion));
        div_ul_aficiones.appendChild(lista);
        document.getElementById('input-aficiones').value = '';
        div_error_aficiones.innerHTML = '';
    }
};

function validar_url() {
    var url = document.getElementById('input-url').value;
    var div_error_url = document.getElementById('error-url');

    // Del 
    const isValidUrl = urlString => {
        let url;
        try {
            url = new URL(urlString);
        }
        catch(e){
            return false
        }
        return url.protocol === 'http:' || url.protocol === 'https:';
    };

    if (url == ''){
        div_error_url.innerHTML = ''
        return true;
        
    } else if (!isValidUrl(url)) {
        div_error_url.innerHTML = 'El formato de URL es incorrecto.'
        div_error_url.className = 'text-danger small mt-1'
        return false;
    } else {
        div_error_url.innerHTML = ''
        return true;
    }
};
