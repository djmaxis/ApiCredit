/*Cambio de tecla ENTER por TAB*/
 const options = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    const formatter = new Intl.NumberFormat('es-DO', options);
    window.formatter = formatter;


window.addEventListener('keydown', function(e){
    if(e.key=='Enter') {
        e.preventDefault(); // Evita la acción predeterminada de la tecla "Enter"
        var input = document.activeElement; // Elemento activo en el que se presionó "Enter"

        // Revisa todos los elementos que pueden recibir el foco en la página
        var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        var focusable = Array.prototype.slice.call(document.querySelectorAll(focusableElements)).filter(el => el.offsetParent !== null);

        // Obtiene el índice del elemento activo y se mueve al siguiente
        var nextIndex = (focusable.indexOf(input) + 1) % focusable.length;
        focusable[nextIndex].focus();
    }
});

/*Cambio de tecla ENTER por TAB*/

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

            let productoInfo = document.createTextNode(` x ${producto.nombre} de $${formatter.format(producto.precio)} = $${formatter.format(Number(producto.cantidad) * Number(producto.precio))}`);
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
            sumaTotal += Number(producto.cantidad) * Number(producto.precio);
        });

        totalDiv.textContent = `Total: $${formatter.format(sumaTotal)}`;
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

			let facturaInfo = document.createTextNode(`Factura #${factura.numero} Monto $${factura.monto.toLocaleString()} `);
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
			
           if ($('#rebajaNo').is(':checked') && $('#otroradioNo').is(':checked')) {
			 rebajaNo_otroradioNo();
			   
		   }
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


