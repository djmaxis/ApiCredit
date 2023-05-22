/*refrescar pagina con boton pedido nuevo*/

document.addEventListener('DOMContentLoaded', function() {
	var botonNuevoPedido = document.getElementById('nuevoPedido');

	if (botonNuevoPedido) {
		botonNuevoPedido.addEventListener('click', function() {
			location.reload();
		});
	} else {
		console.error('El botón de nuevo pedido no se encontró en la página.');
	}
});



/*refrescar pagina con boton pedido nuevo*/

window.onload = function() {
	// Obtener los elementos del formulario
	var rebajaNo = document.getElementById("rebajaNo");
	var rebajaSi = document.getElementById("rebajaSi");
	var otroradioNo = document.getElementById("otroradioNo");
	var otroradioSi = document.getElementById("otroradioSi");

	var camposProducto = document.querySelectorAll('#cantidad, #producto, #precio, #agregarProducto, #carrito, #total, #headerRProductos, #labelCantidad, #labelProducto, #labelPrecio');
	var camposFactura = document.querySelectorAll('#numerofactura, #montofactura, #agregarOtroProducto, #otroCarrito, #otroTotal, #headerFacturas, #labelFactura, #labelMonto');

	var carritoGroup1 = document.querySelector('.carrito-group1');
	var carritoGroup2 = document.querySelector('.carrito-group2');

	// Esconder todos los elementos al principio
	camposProducto.forEach(function(campo) {
		campo.style.display = "none";
	});

	camposFactura.forEach(function(campo) {
		campo.style.display = "none";
	});

	// Manejar el cambio en los radios
	rebajaNo.addEventListener('change', manejarRadios);
	rebajaSi.addEventListener('change', manejarRadios);
	otroradioNo.addEventListener('change', manejarRadios);
	otroradioSi.addEventListener('change', manejarRadios);

	function manejarRadios() {
		var mostrarTodo = (rebajaSi.checked && otroradioSi.checked);
		var mostrarCarritoGroup2 = (rebajaNo.checked && otroradioSi.checked);
		var mostrarCarritoGroup1 = (rebajaSi.checked && otroradioNo.checked);

		camposProducto.forEach(function(campo) {
			campo.style.display = mostrarTodo ? "block" : ((rebajaNo.checked || otroradioSi.checked) ? "none" : "block");
		});

		camposFactura.forEach(function(campo) {
			campo.style.display = mostrarTodo ? "block" : ((otroradioNo.checked || rebajaSi.checked) ? "none" : "block");
		});

		carritoGroup1.style.display = (mostrarCarritoGroup1 || mostrarTodo) ? "block" : "none";
		carritoGroup2.style.display = (mostrarCarritoGroup2 || mostrarTodo) ? "block" : "none";
	}





	// Llamar a manejarRadios para manejar el estado inicial
	manejarRadios();
}



let carrito = []; // Este arreglo contendrá los productos en el carrito

document.getElementById('agregarProducto').addEventListener('click', (e) => {
	e.preventDefault(); // Prevenir la envío del formulario

	let cantidadInput = document.getElementById('cantidad');
	let productoInput = document.getElementById('producto');
	let precioInput = document.getElementById('precio');

	// Verificar que todos los campos estén completos
	if (cantidadInput.value === '' || productoInput.value === '' || precioInput.value === '') {
		// Mostrar un mensaje de error
		alert('Todos los campos deben estar completos');

		// Poner el foco en el primer campo vacío
		if (cantidadInput.value === '') cantidadInput.focus();
		else if (productoInput.value === '') productoInput.focus();
		else if (precioInput.value === '') precioInput.focus();

		return; // Salir de la función
	}

	let cantidad = parseInt(cantidadInput.value);
	let producto = productoInput.value;
	let precio = parseFloat(precioInput.value);

	// Crear un objeto que representa el producto
	let productoObj = {
		cantidad: cantidad,
		nombre: producto,
		precio: precio,
		total: cantidad * precio
	};

	// Agregar el producto al carrito
	carrito.push(productoObj);

	// Limpiar los campos de entrada
	cantidadInput.value = '';
	productoInput.value = '';
	precioInput.value = '';

	// Actualizar el carrito
	actualizarCarrito();
});


function actualizarCarrito() {
	let carritoDiv = document.getElementById('carrito');

	let totalDiv = document.getElementById('total');
	carritoDiv.innerHTML = ''; // Limpiar el carrito

	if (carrito.length === 0) {
		totalDiv.innerHTML = '<i style="color: #FF6666; text-align: center; display: block;">Carrito está vacío</i>';
	} else {
		let sumaTotal = 0;
		carrito.forEach((producto, index) => {
			let productoDiv = document.createElement('div');
			productoDiv.style.textAlign = 'center'; // Centrar el contenido del producto

			let cantidadSpan = document.createElement('span'); // Crear un span para la cantidad
			cantidadSpan.textContent = producto.cantidad; // Setear el texto del span a la cantidad del producto
			productoDiv.appendChild(cantidadSpan);

			let productoInfo = document.createTextNode(` x ${producto.nombre} de $${producto.precio.toLocaleString()} = $${producto.total.toLocaleString()} `);
			productoDiv.appendChild(productoInfo);

			let eliminarBoton = document.createElement('button');
			eliminarBoton.classList.add('eliminar');
			eliminarBoton.setAttribute('data-index', index);
			eliminarBoton.style.cssText = 'border-radius: 50%; color: white; background-color: red; width: 20px; height: 20px;';
			eliminarBoton.textContent = 'X';
			eliminarBoton.addEventListener('click', (e) => {
				let index = e.target.getAttribute('data-index'); // Obtener el índice del producto
				carrito.splice(index, 1); // Eliminar el producto del carrito
				actualizarCarrito(); // Actualizar el carrito
			});
			productoDiv.appendChild(eliminarBoton);

			carritoDiv.appendChild(productoDiv);

			// Sumar el total del producto al total general
			sumaTotal += producto.total;
		});

		totalDiv.textContent = `Total: $${sumaTotal.toLocaleString()}`;
	}
}

// Iniciar el carrito
actualizarCarrito();



function actualizarFactura() {
	let facturaDiv = document.getElementById('otroCarrito');
	let totalDiv = document.getElementById('otroTotal');
	facturaDiv.innerHTML = ''; // Limpiar el carrito

	if (facturas.length === 0) {
		totalDiv.innerHTML = '<i style="color: #FF6666; text-align: center; display: block;">Carrito está vacío</i>';
	} else {
		let sumaTotal = 0;
		facturas.forEach((factura, index) => {
			let facturaDivElem = document.createElement('div');
			facturaDivElem.style.textAlign = 'center'; // Centrar el contenido del producto

			let facturaInfo = document.createTextNode(`Factura # ${factura.numero} Monto $${factura.monto.toLocaleString()} `);
			facturaDivElem.appendChild(facturaInfo);

			let eliminarBoton = document.createElement('button');
			eliminarBoton.classList.add('eliminar');
			eliminarBoton.setAttribute('data-index', index);
			eliminarBoton.style.cssText = 'border-radius: 50%; color: white; background-color: red; width: 20px; height: 20px;';
			eliminarBoton.textContent = 'X';
			eliminarBoton.addEventListener('click', (e) => {
				let index = e.target.getAttribute('data-index'); // Obtener el índice de la factura
				facturas.splice(index, 1); // Eliminar la factura del carrito
				actualizarFactura(); // Actualizar el carrito
			});
			facturaDivElem.appendChild(eliminarBoton);

			facturaDiv.appendChild(facturaDivElem);

			// Sumar el total del producto al total general
			sumaTotal += factura.monto;
		});

		totalDiv.textContent = `Total: $${sumaTotal.toLocaleString()}`;
	}
}

document.getElementById('agregarOtroProducto').addEventListener('click', function() {
	var numeroFactura = document.getElementById('numerofactura').value;
	var monto = document.getElementById('montofactura').value;

	if (numeroFactura && monto) {
		// Asegúrate de convertir monto a un número ya que el valor de un input es siempre un string
		facturas.push({
			numero: numeroFactura,
			monto: Number(monto)
		});
		actualizarFactura();
	} else {
		alert('Por favor ingresa un número de factura y un monto.');
	}
});


var facturas = [];

document.getElementById('agregarOtroProducto').addEventListener('click', agregarOtroProducto);

function agregarOtroProducto() {
	var numeroFactura = document.getElementById('numerofactura').value;
	var monto = document.getElementById('montofactura').value;

	var facturaExistente = facturas.find(function(factura) {
		return factura.numero === numeroFactura;
	});

	if (!facturaExistente) {
		if (numeroFactura && monto) {
			// Asegúrate de convertir monto a un número ya que el valor de un input es siempre un string
			facturas.push({
				numero: numeroFactura,
				monto: Number(monto)
			});
			actualizarFactura();
		} else {
			alert('Por favor ingresa un número de factura y un monto.');
		}
	} else {

	}
}

if (rebajaNo.checked && otroradioSi.checked) {
	carritoGroup1.style.display = "none";
	carritoGroup2.style.display = "block";
	actualizarFactura();
}

// Iniciar las facturas
actualizarFactura();



// función para formatear números con comas

function formatearNumeroConComas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// función para formatear números con comas




function rebajaSi_otroradioSi() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = parseFloat(document.getElementById('saldoActual').value);
    var montoAbono = parseFloat(document.getElementById('montoabono').value);

    var fechaAbonoValue = document.getElementById('fechaAbono').value;
    var fechaAbono = new Date(fechaAbonoValue);
    var dia = String(fechaAbono.getDate()).padStart(2, '0');
    var mes = String(fechaAbono.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    var anio = fechaAbono.getFullYear();
    fechaAbono = `${dia}/${mes}/${anio}`;

    var nombreCliente = document.getElementById('nombreCliente').value;
    var telefonoCliente = document.getElementById('telefono').value;

    // Eliminar el 'Total: $' y convertir en número. Asegurarse de que sean convertibles a número.
    var total = document.getElementById('total').innerText.replace('Total: $','');
    total = total === '' ? 0 : parseFloat(total);
    var otroTotal = document.getElementById('otroTotal').innerText.replace('Total: $','');
    otroTotal = otroTotal === '' ? 0 : parseFloat(otroTotal);

    var carritoDiv = document.getElementById('carrito').innerText.split(' X').slice(0,-1).join('');
    var otroCarritoDiv = document.getElementById('otroCarrito').innerText.split(' X').slice(0,-1).join('');

    // Continúa con el cálculo de saldo restante y total
    var saldoRestante = saldoActual - total;
    var saldoTotal = saldoRestante + montoAbono + otroTotal;

    // Genera el mensaje final formateando los montos con comas separando los miles
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}*\n\n*Saldo anterior:* ${saldoActual.toLocaleString()}\n\nDel saldo anterior *rebajaremos* estos productos:\n${carritoDiv}\n*Total:* ${total.toLocaleString()}\n\n*Saldo restante:* ${saldoRestante.toLocaleString()}\n\n*Abono:* ${montoAbono.toLocaleString()} El ${fechaAbono}\n\n*Sumaremos:*\n${otroCarritoDiv}\n*Total:* ${otroTotal.toLocaleString()}\n\n*Saldo total:* ${saldoTotal.toLocaleString()}`;
    mensajeFinal += `(https://wa.me/${telefonoCliente}?text=${encodeURIComponent(mensajeFinal)})`;

    // Crea el enlace de WhatsApp
    var mensajeWhatsAppCliente = `https://wa.me/18295463303?text=${encodeURIComponent(mensajeFinal)}`;

    // Abre el enlace de WhatsApp en una nueva pestaña
    window.open(mensajeWhatsAppCliente, '_blank');
}




$(document).ready(function(){
    $("#botonFormato").click(function(){
        // Primero: verifica que ambos radios están en "Sí"
        if ($('#rebajaSi').is(':checked') && $('#otroradioSi').is(':checked')) {

            // Segundo: verifica si hay elementos en el carrito de productos
            if (carrito.length > 0) {

                // Tercero: verifica si hay elementos en el carrito de facturas
                if (facturas.length > 0) {
                    rebajaSi_otroradioSi();
                } else {
                    alert('No hay facturas en el carrito de facturas.');
                }
            } else {
                alert('El carrito de productos no tiene elementos.');
            }
        } else {
            alert('Alguno de los radios esta en no.');
        }
    });
});


$("#botonFormato").click(function(){
    let saldoActual = $("#saldoActual");
    let montoAbono = $("#montoabono");
    let fechaAbono = $("#fechaAbono");
    let nombreCliente = $("#nombreCliente");
    let telefono = $("#telefono");

    // elimina mensajes anteriores
    $(".error").remove();

    if (!saldoActual.val().trim()) {
        saldoActual.after('<span class="error">Completa este campo</span>');
        saldoActual.focus();
        return;
    }

    if (!montoAbono.val().trim()) {
        montoAbono.after('<span class="error">Completa este campo</span>');
        montoAbono.focus();
        return;
    }

    if (!fechaAbono.val().trim()) {
        fechaAbono.after('<span class="error">Completa este campo</span>');
        fechaAbono.focus();
        return;
    }

    if (!nombreCliente.val().trim()) {
        nombreCliente.after('<span class="error">Completa este campo</span>');
        nombreCliente.focus();
        return;
    }

    if (!telefono.val().trim()) {
        telefono.after('<span class="error">Completa este campo</span>');
        telefono.focus();
        return;
    }

    // Si todos los campos tienen datos, continúa con la lógica del botón
    // Tu código aquí...
});


