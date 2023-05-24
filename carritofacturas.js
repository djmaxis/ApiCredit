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

