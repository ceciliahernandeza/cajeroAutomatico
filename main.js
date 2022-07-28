//Inicio del código javascript

//usuarios
var usuarios = [
    { nombre: "cecilia", saldo: 500, contraseña: '12345678' },
    { nombre: "cristina", saldo: 80, contraseña: '123' },
    { nombre: "marcos", saldo: 1000, contraseña: '12345' },
	{ nombre: "jorge", saldo: 300, contraseña: 'hola' },
    { nombre: "luis", saldo: 990, contraseña: '1a2b' }
];
var indice = -1;

//Crear cuenta
var htmlInicioSesion = '<h2>Bienvenido</h2> <button class= "iniciarSesion" onclick="login()">Iniciar sesión</button>';
//Retirar
var htmlSaldos = '<h2>Elija la operación que desea realizar:</h2><button class= "consultarSaldo" onclick="consultarSaldoDisponible()">Consultar saldo</button> <button class= "ingresarSaldo" onclick="ingresarSaldo()">Ingresar monto</button> <button class= "retirarMonto" onclick="retirarSaldo()">Retirar monto</button> <button class= "salir" onclick="salir()">Salir</button>';
//Regresar
var htmlResultadoOperaciones = '<p id="texto"></p><button class= "volver" onclick="operaciones()">Volver</button>';

//Funcionalidad de los botones
function operaciones() {
    document.getElementById("contenedorCajero").innerHTML = htmlSaldos;
};
function login() { 
    var nombreCuenta;
    for (var i = 0; i < usuarios.length; i++) {
        //Pedir el nombre de usuario
        if (i===0) {
            nombreCuenta=prompt("Ingrese el usuario:");
        };
        //---------------------------------------------------------------
        if (nombreCuenta === null) {
            //Si da cancelar, se cancela el ciclo
            break;
        } else if (nombreCuenta === usuarios[i].nombre) {
            // Se guarda el indice del usuario
            
            var indiceCuenta = i;
            //Verifica contraseña
            var contraseñaCuenta;
            while (contraseñaCuenta !== usuarios[indiceCuenta].contraseña) {
                contraseñaCuenta = prompt('Ingrese su contraseña:');
                if (contraseñaCuenta === null) {
                    indiceCuenta === -1;
                    break;
                } else if (contraseñaCuenta === usuarios[indiceCuenta].contraseña) {
                    operaciones();
                    // Obtiene el índice
                    indice = indiceCuenta;
                } else {
                    alert("La contraseña incorrecta, intente de nuevo.");
                };
            };
            break;
        } else if (i === usuarios.length-1) {
            //Si no encuentra al usuario, regresa para volver a capturar
            alert("No se ha encontrado un usuario con este nombre. Intente nuevamente.");
            i=-1;
        };
    };
};
//Función para consultar el saldo disponible del cliente, esto se hace en el botón Consultar Saldo
function consultarSaldoDisponible() {
    var mensaje = ("El saldo disponible es de: <b>$"+usuarios[indice].saldo+"</b>");
    document.getElementById("contenedorCajero").innerHTML = htmlResultadoOperaciones
    document.getElementById("texto").innerHTML = mensaje;
};

//Función para ingresar saldo del cliente
function ingresarSaldo() {
    var saldoActual = usuarios[indice].saldo;
    while (saldoActual === usuarios[indice].saldo) {
        var obtieneMonto = prompt("Capturar monto");
        var monto = Number(obtieneMonto);
        if (obtieneMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = monto + saldoActual
            if (nuevoSaldo>990) {
                alert("Su saldo actual es de $"+saldoActual+", al ingresar $"+monto+ " se superaría el máximo de $990. La operación no es permitida.");
            } else {
                var mensaje = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                usuarios[indice].saldo =  nuevoSaldo;
                document.getElementById("contenedorCajero").innerHTML = htmlResultadoOperaciones;
                document.getElementById("texto").innerHTML = mensaje
            };
        };
    };
};
function retirarSaldo() {
    var saldoActual = usuarios[indice].saldo;
    while (saldoActual === usuarios[indice].saldo) {
        var obtieneMonto = prompt("Capturar monto");
        var monto = Number(obtieneMonto);
        if (obtieneMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = saldoActual - monto;
            if (nuevoSaldo<10) {
                alert("Su saldo actual es de $"+saldoActual+". Al retirar $"+monto+ " la cuenta tendría menos de  $10. La operación no es permitida.");
            } else {
                var mensaje = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                usuarios[indice].saldo =  nuevoSaldo;
                document.getElementById("contenedorCajero").innerHTML = htmlResultadoOperaciones;
                document.getElementById("texto").innerHTML = mensaje;
            };
        };
    };
};
function salir() {
    indice = -1;
    document.getElementById("contenedorCajero").innerHTML = htmlInicioSesion;
};