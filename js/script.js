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

    if (telefono == '') {
        div_error_telefono.innerHTML = 'El campo teléfono es obligatorio.';
        div_error_telefono.className = 'text-danger small mt-1';
        return false;
    }

    // Limpiar la entrada eliminando todos los caracteres no numéricos y espacios
    var telefono_limpio = '';
    for (var i = 0; i < telefono.length; i++) {
        var char = telefono.charAt(i);
        if (!isNaN(char) && char != ' ') {
            telefono_limpio += char;
        }
    }

    // Determinar el máximo de dígitos permitidos según el prefijo
    var maximo_digitos;
    if (telefono_limpio.startsWith('9')) {
        maximo_digitos = 9;
    } else if (telefono_limpio.startsWith('56')) {
        maximo_digitos = 11;
    } else if (telefono_limpio.startsWith('+56')) {
        maximo_digitos = 12
    }else {
        div_error_telefono.innerHTML = 'El teléfono debe comenzar con 9, 56 o +56.';
        div_error_telefono.className = 'text-danger small mt-1';
        return false;
    }

    // Verificar que el teléfono no supere el máximo de dígitos permitidos
    if (telefono_limpio.length > maximo_digitos) {
        div_error_telefono.innerHTML = `El teléfono no puede tener más de ${maximo_digitos} dígitos.`;
        div_error_telefono.className = 'text-danger small mt-1';
        return false;
    }

    div_error_telefono.innerHTML = '';
    return true;
}





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
    var div_error_aficiones = document.getElementById('error-aficiones');
    
    if (lista_aficiones.length < 2) {
        div_error_aficiones.innerHTML = 'Debe ingresar al menos dos aficiones.';
        div_error_aficiones.className = 'text-danger small mt-1';
        return false;
    } else {
        div_error_aficiones.innerHTML = '';
        return true;
    }
}

function agregar_aficion() {
    var aficiones = document.getElementById('input-aficiones').value;
    var div_error_aficiones = document.getElementById('error-aficiones');
    var div_ul_aficiones = document.getElementById('ul-aficiones');

    if (aficiones == '') {
        div_error_aficiones.innerHTML = 'La afición no puede estar vacía.';
        div_error_aficiones.className = 'text-danger small mt-1';
        return;
    }

    // Separar las aficiones por comas y eliminar espacios en blanco adicionales
    var aficiones_array = aficiones.split(',').map(aficion => aficion.trim());

    var errores = [];
    aficiones_array.forEach(aficion => {
        if (aficion == '') {
            errores.push('La afición no puede estar vacía.');
            return;
        }

        if (lista_aficiones.includes(aficion.toLowerCase())) {
            errores.push(`La afición "${aficion}" ya está en la lista.`);
            return;
        }

        lista_aficiones.push(aficion.toLowerCase());

        var lista = document.createElement('li');
        lista.className = 'list-group-item list-group-item-success col-6';
        lista.appendChild(document.createTextNode(aficion));
        div_ul_aficiones.appendChild(lista);
    });

    if (errores.length > 0) {
        div_error_aficiones.innerHTML = errores.join('<br>');
        div_error_aficiones.className = 'text-danger small mt-1';
    } else {
        document.getElementById('input-aficiones').value = '';
        div_error_aficiones.innerHTML = '';
    }
}



function validar_url() {
    var url = document.getElementById('input-url').value;
    var div_error_url = document.getElementById('error-url');

    const isValidUrl = urlString => {
        let url;
        try {
            // Si la URL no empieza con 'http://' o 'https://', se le añade 'http://'
            if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
                urlString = 'http://' + urlString;
            }
            url = new URL(urlString);

            // Verificar que la URL tiene un dominio válido
            const hostname = url.hostname;

            // Eliminar el prefijo 'www.' si está presente
            const domain = hostname.startsWith('www.') ? hostname.slice(4) : hostname;

            // Verificar que el dominio contiene al menos un punto y no empieza ni termina con él
            if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
                return false;
            }

            // Asegurarse de que el dominio tenga al menos dos partes separadas por puntos
            const parts = domain.split('.');
            if (parts.length < 2 || parts.some(part => part === '')) {
                return false;
            }

            // Verificar que la extensión del dominio tenga al menos dos caracteres
            const extension = parts[parts.length - 1];
            if (extension.length < 2) {
                return false;
            }
        }
        catch(e) {
            return false;
        }
        return url.protocol === 'http:' || url.protocol === 'https:';
    };

    if (url == '') {
        div_error_url.innerHTML = '';
        return true;
    } else if (!isValidUrl(url)) {
        div_error_url.innerHTML = 'El formato de URL es incorrecto.';
        div_error_url.className = 'text-danger small mt-1';
        return false;
    } else {
        div_error_url.innerHTML = '';
        return true;
    }
};
