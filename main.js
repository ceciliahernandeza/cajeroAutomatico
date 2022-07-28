//Inicio del código javascript

var cuentas = [
    { nombre: "Cecilia", saldo: 500, password: '12345678' },
    { nombre: "Cristina", saldo: 80, password: '123' },
    { nombre: "Marcos", saldo: 1000, password: '12345' }
];
var indice = -1;

//Crear cuenta
var htmlInicio = '<button class= "iniciarSesion" onclick="login()">Iniciar sesión</button> <button class= "crearCuenta" onclick="crearCuenta()">Crear cuenta</button>';
//Retirar
var htmlOperaciones = '<h2>Elija la operación que desea realizar:</h2><button class= "consultarSaldo" onclick="consultarDisponible()">Consultar saldo</button> <button class= "ingresar" onclick="ingresar()">Ingresar monto</button> <button class= "retirarMonto" onclick="retirar()">Retirar monto</button> <button class= "salir" onclick="salir()">Salir</button>';
//Regresar
var htmlRespuesta = '<p id="texto"></p><button class= "volver" onclick="operaciones()">Volver</button>';

//Funcionalidad de los botones
function operaciones() {
    document.getElementById("cajero").innerHTML = htmlOperaciones;
};
function login() { 
    var nombreCuenta;
    for (var i = 0; i < cuentas.length; i++) {
        // Cuando el loop acaba de iniciar o reinicia, pedir el nombre de usuario
        if (i===0) {
            nombreCuenta=prompt("Ingrese el usuario:");
        };
        //---------------------------------------------------------------
        if (nombreCuenta === null) {
            // Si el usuario da clic en cancelar, romper el loop
            break;
        } else if (nombreCuenta === cuentas[i].nombre) {
            // Si existe el usuario, guardar el indiceCuenta, verificar contraseña y romper el loop de fuera
            
            var indiceCuenta = i;
            //Verifica contraseña
            var pwCuenta;
            while (pwCuenta !== cuentas[indiceCuenta].password) {
                pwCuenta = prompt('Accediendo a la cuenta de "' + cuentas[indiceCuenta].nombre + '". Ingrese su contraseña:');
                if (pwCuenta === null) {
                    indiceCuenta === -1;
                    break;
                } else if (pwCuenta === cuentas[indiceCuenta].password) {
                    operaciones();
                    // Sacar el valor de indice
                    indice = indiceCuenta;
                } else {
                    alert("Contraseña incorrecta, intente de nuevo.");
                };
            };
            break;
        } else if (i === cuentas.length-1) {
            // Al haber revisado todo el array y no encontrar el usuario, reiniciar el loop y mostrar mensaje
            // El loop reinicia con i=-1 porque al volver "arriba", se le suma 1, quedando en 0 de nuevo
            alert("No se ha encontrado un usuario con este nombre. Intente nuevamente.");
            i=-1;
        };
    };
};
function crearCuenta() { 
    var existe = true;
    while (existe !== false) {
        var ccNombre = prompt("Ingrese nombre de usuario:");
        if (ccNombre !== null) {
            // Verificar si existe la cuenta
            for (var i = 0; i < cuentas.length; i++) {
                if (ccNombre === cuentas[i].nombre) {
                    existe = true;
                    alert("El nombre de usuario ya existe.");
                    break;
                } else {
                    existe = false;
                };
            };
            // Seguir solo si no existe
            if (existe === false) {
                var ccPassword = prompt("Ingrese contraseña:");
                if (ccPassword !== null) {
                    var ccSaldo=NaN;
                    while (isNaN(ccSaldo)===true) {
                        ccSaldo = prompt("Ingrese saldo inicial:");
                        if (ccSaldo !== null) {
                            ccSaldo = Number(ccSaldo);
                            if (isNaN(ccSaldo)===true) {
                                alert("Valor ingresado no es numérico, intente de nuevo.");
                            } else if (ccSaldo === null) {
                                break;
                            } else if (ccSaldo < 10) {
                                alert("Valor ingresado es menor que el monto mínimo, el monto mínimo que una cuenta debe tener es de $10."); 
                                ccSaldo = NaN;                               
                            } else if (ccSaldo > 990) {
                                alert("Valor ingresado es mayor que el monto máximo, el monto máximo que una cuenta puede tener es de $990");
                                ccSaldo = NaN;                              
                            } else {
                                cuentas.push({ nombre: ccNombre, saldo: ccSaldo, password: ccPassword });
                                alert('Se ha guardado la cuenta, el nombre de usuario es "'+ccNombre+'", la contraseña es "'+ccPassword+'"y El saldo inicial es de $'+ccSaldo+'.')
                            };
                        } else {
                            break;
                        };
                    };
                };
            };
        } else {
            break;
        };
    };
};
function consultarDisponible() {
    var textToShow = ("El saldo disponible en la cuenta de "+"<b>"+cuentas[indice].nombre+"</b>"+" es de: <b>$"+cuentas[indice].saldo+"</b>");
    document.getElementById("cajero").innerHTML = htmlRespuesta
    document.getElementById("texto").innerHTML = textToShow;
};
function ingresar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = monto + saldoActual
            if (nuevoSaldo>990) {
                alert("Su saldo actual es de $"+saldoActual+", al ingresar $"+monto+ " se superaría el máximo de $990. La operación no es permitida.");
            } else {
                var textToShow = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                cuentas[indice].saldo =  nuevoSaldo;
                document.getElementById("cajero").innerHTML = htmlRespuesta;
                document.getElementById("texto").innerHTML = textToShow
            };
        };
    };
};
function retirar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = saldoActual - monto;
            if (nuevoSaldo<10) {
                alert("Su saldo actual es de $"+saldoActual+". Al retirar $"+monto+ " la cuenta tendría menos de  $10. La operación no es permitida.");
            } else {
                var textToShow = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                cuentas[indice].saldo =  nuevoSaldo;
                document.getElementById("cajero").innerHTML = htmlRespuesta;
                document.getElementById("texto").innerHTML = textToShow;
            };
        };
    };
};
function salir() {
    indice = -1;
    document.getElementById("cajero").innerHTML = htmlInicio;
};