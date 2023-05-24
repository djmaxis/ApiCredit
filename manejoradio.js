window.onload = function() {
    // Obtener los elementos del formulario
    var rebajaNo = document.getElementById("rebajaNo");
    var rebajaSi = document.getElementById("rebajaSi");
    var otroradioNo = document.getElementById("otroradioNo");
    var otroradioSi = document.getElementById("otroradioSi");
    var abonoNo = document.getElementById("abonoNo");
    var abonoSi = document.getElementById("abonoSi");
var montoabonoLabel = document.querySelector('label[for="montoabono"]');
var metodoDePagoLabel = document.querySelector('label[for="metodoDePago"]');
var fechaAbonoLabel = document.querySelector('label[for="fechaAbono"]');
var bancoLabel = document.querySelector('label[for="banco"]');

	

    var camposProducto = document.querySelectorAll('#cantidad, #producto, #precio, #agregarProducto, #carrito, #total, #headerRProductos, #labelCantidad, #labelProducto, #labelPrecio');
    var camposFactura = document.querySelectorAll('#numerofactura, #montofactura, #agregarOtroProducto, #otroCarrito, #otroTotal, #headerFacturas, #labelFactura, #labelMonto');
   var camposAbono = document.querySelectorAll('#headerAbono, #montoabono, #metodoDePago, #fechaAbono, #banco, #CarritoAbono, #totalAbono, #Addabono, #montoabonoLabel, #metodoDePagoLabel, #fechaAbonoLabel');


    var carritoGroup1 = document.querySelector('.carrito-group1');
    var carritoGroup2 = document.querySelector('.carrito-group2');
    var carritoGroup3 = document.querySelector('.carrito-group3');

    // Esconder todos los elementos al principio
    camposProducto.forEach(function(campo) {
        campo.style.display = "none";
    });

    camposFactura.forEach(function(campo) {
        campo.style.display = "none";
    });

    camposAbono.forEach(function(campo) {
        campo.style.display = "none";
    });

    carritoGroup1.style.display = "none";
    carritoGroup2.style.display = "none";
    carritoGroup3.style.display = "none";
	montoabonoLabel.style.display = "none";
metodoDePagoLabel.style.display = "none";
fechaAbonoLabel.style.display = "none";
bancoLabel.style.display = "none";


    // Manejar el cambio en los radios
    rebajaNo.addEventListener('change', manejarRadios);
    rebajaSi.addEventListener('change', manejarRadios);
    otroradioNo.addEventListener('change', manejarRadios);
    otroradioSi.addEventListener('change', manejarRadios);
    abonoNo.addEventListener('change', manejarRadios);
    abonoSi.addEventListener('change', manejarRadios);

    function manejarRadios() {
        var mostrarProducto = rebajaSi.checked;
        var mostrarFactura = otroradioSi.checked;
        var mostrarAbono = abonoSi.checked;
		
        camposProducto.forEach(function(campo) {
            campo.style.display = mostrarProducto ? "block" : "none";
        });

        camposFactura.forEach(function(campo) {
            campo.style.display = mostrarFactura ? "block" : "none";
        });

        camposAbono.forEach(function(campo) {
            campo.style.display = mostrarAbono ? "block" : "none";
        });

        carritoGroup1.style.display = mostrarProducto ? "block" : "none";
        carritoGroup2.style.display = mostrarFactura ? "block" : "none";
        carritoGroup3.style.display = mostrarAbono ? "block" : "none";
    }

    // Llamar a manejarRadios para manejar el estado inicial
    manejarRadios();
}
