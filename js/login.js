const formularioLogin = document.getElementById('formulario-login');
const contenedorLogin = document.getElementById('contenedor-login');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const btnEnviarLogin = document.getElementById('btn-enviar-login');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let errorEmail = true;
let errorPassword = true;

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    agregarEventListeners();
    btnEnviarLogin.disabled = true;
    btnEnviarLogin.classList.add('disabled');
};

function agregarEventListeners() {
    inputEmail.addEventListener('keyup', validarLogin);
    inputPassword.addEventListener('keyup', validarLogin);
    btnEnviarLogin.addEventListener('click', submitLogin);
}

function validarLogin(e) {
    e.preventDefault();
    
    switch(e.target.id) {
        case 'input-email':
            const email = inputEmail.value;
            if(email === '') {
                errorEmail = true;
                mostrarMensaje('El email no puede estar vacío', 'error', formularioLogin.parentElement.nextElementSibling);
                return;
            }

            if(!expresionRegular.test(email)) {
                errorEmail = true;
                mostrarMensaje('El email no es válido', 'error', formularioLogin.parentElement.nextElementSibling);
                return;
            }

            errorEmail = false;
            break;

        case 'input-password':
            const password = inputPassword.value;
            if(password === '') {
                errorPassword = true;
                mostrarMensaje('El password no puede estar vacío', 'error', formularioLogin.parentElement.nextElementSibling);
                return;
            }

            if(password.length < 6) {
                errorMensaje = true;
                mostrarMensaje('El password no puede contener menos de 6 caracteres', 'error', formularioLogin.parentElement.nextElementSibling);
                return;
            }

            errorPassword = false;
            break;

        default:
            return;
    }

    if(!errorEmail && !errorPassword) {
        btnEnviarLogin.disabled = false;
        btnEnviarLogin.classList.remove('disabled');
    }
}

function submitLogin(e) {
    e.preventDefault();

    if(inputEmail.value == 'correo@correo.com') {
        if(inputPassword.value == '123456') {
            localStorage.setItem('alurageek', 'correo@correo.com');
            window.location.replace('productos.html');
        }
    } else {
        mostrarMensaje('Email o Password incorrectos', 'error', formularioLogin.parentElement.nextElementSibling);
    }
}

function mostrarMensaje(mensaje, tipo, origen) {
    let mostrarMensaje;
    if(tipo == 'error') {
        mostrarMensaje = document.querySelector('.error');
    } else if (tipo == 'exito'){
        mostrarMensaje = document.querySelector('.exito');
    }
    
    if(!mostrarMensaje) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add(tipo);
        divMensaje.textContent = mensaje;
        contenedorLogin.insertBefore(divMensaje, origen);
        
        setTimeout(()=> {
            divMensaje.remove();
            if (tipo == 'exito') {
                formularioLogin.reset();
                btnEnviarLogin.disabled = true;
                btnEnviarLogin.classList.add('disabled');
            }
        }, 2000);
    }
}