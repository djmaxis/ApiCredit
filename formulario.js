$(document).ready(function(){
    $("#botonFormato").click(function(){
        // Verificar si los campos "nombreCliente" y "saldoActual" están completos
        var nombreCliente = $("#nombreCliente").val();
        var saldoActual = $("#saldoActual").val();
        
        if (nombreCliente === '' || saldoActual === '') {
            if (nombreCliente === '') {
                $("#nombreCliente").focus();
                alert('Por favor, ingrese el nombre del cliente.');
            } else if (saldoActual === '') {
                $("#saldoActual").focus();
                alert('Por favor, ingrese el saldo actual.');
            }
            return;
        }
        
        // Combinación 1: rebajaSi, otroradioSi, 
        if ($('#rebajaSi').is(':checked') && $('#otroradioSi').is(':checked') && $('#abonoNo').is(':checked')) {
            if (carrito.length > 0 && facturas.length > 0) {
                rebajaSi_otroradioSi_abonoNo();
            } else {
                alert('No hay elementos suficientes en los carritos.');
            }
        }

        // Combinación 2: rebajaSi, otroradioSi,
        if ($('#rebajaSi').is(':checked') && $('#otroradioSi').is(':checked') && $('#abonoSi').is(':checked')) {
            if (carrito.length > 0 && facturas.length > 0 && CarritoAbono.length > 0) {
                rebajaSi_otroradioSi_abonoSi();
            } else {
                alert('No hay elementos suficientes en los carritos.');
				
            }
        }

        // Combinación 3: rebajaSi, otroradioNo, abonoNo /*/* Listo */*/
        if ($('#rebajaSi').is(':checked') && $('#otroradioNo').is(':checked') && $('#abonoNo').is(':checked')) {
            if (carrito.length > 0) {
                rebajaSi_otroradiono_abonoNo();
            } else {
                alert('El carrito de productos no tiene elementos.');
            }
        }

        // Combinación 4: rebajaSi, otroradioNo, abonoSi
        if ($('#rebajaSi').is(':checked') && $('#otroradioNo').is(':checked') && $('#abonoSi').is(':checked')) {
            if (carrito.length > 0 && CarritoAbono.length > 0) {
                rebajaSi_otroradioNo_abonoSi();
            } else {
                alert('No hay elementos suficientes en los carritos.');
            }
        }

        // Combinación 5: rebajaNo, otroradioSi, abonoNo ****listo****
        if ($('#rebajaNo').is(':checked') && $('#otroradioSi').is(':checked') && $('#abonoNo').is(':checked')) {
            if (facturas.length > 0) {
                rebajaNo_otroradioSi_abonoNo();
            } else {
                alert('No hay facturas en el carrito de facturas.');
            }
        }

        // Combinación 6: rebajaNo, otroradioSi, abonoSi 
        if ($('#rebajaNo').is(':checked') && $('#otroradioSi').is(':checked') && $('#abonoSi').is(':checked')) {
            if (facturas.length > 0 && CarritoAbono.length > 0) {
                rebajaNo_otroradioSi_abonoSi();
		     } else {
                alert('No hay elementos suficientes en los carritos.');
            }
        }

        // Combinación 7: rebajaNo, otroradioNo, abonoNo
        if ($('#rebajaNo').is(':checked') && $('#otroradioNo').is(':checked') && $('#abonoNo').is(':checked')) {
            alert('No se ha seleccionado ninguna opción.');
        }

        // Combinación 8: rebajaNo, otroradioNo, abonoSi ****listo****
        if ($('#rebajaNo').is(':checked') && $('#otroradioNo').is(':checked') && $('#abonoSi').is(':checked')) {
            if (CarritoAbono.length > 0) {
                rebajaNo_otroradioNo_abonoSi();
            } else {
                alert('No hay facturas en el carrito de abono.');
            }
        }
    });
});






/*Controlar el metodo pago*/
$(document).ready(function(){
    $('#metodoDePago').change(function(){
        if($(this).val() == 'Transferencia'){
            $('#bancoDiv').show();
        }
        else{
            $('#bancoDiv').hide();
        }
    });
});

/*Controlar el metodo pago*/
	
/*Nombre y telefono en listbox*/
function rellenarTelefono() {
    var clienteSeleccionado = document.getElementById('nombreCliente').value;
    var telefonoCliente = clienteSeleccionado.split('_')[1];

    // Rellena el campo de teléfono
    document.getElementById('telefono').value = telefonoCliente;
	
}


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





$(document).ready(function() {
    const ids = ["#saldoActual", "#montoabono", "#precio", "#montofactura"];

    // Función para formatear un número con comas como separadores de miles
    function formatoMilesComa(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Función para convertir un número formateado con comas a un número regular
    function convertirNumero(cadena) {
        return parseFloat(cadena.replace(/,/g, ''));
    }

    ids.forEach(function(id) {
        $(id).on('input', function() {
            // Obtenemos el valor actual del campo de entrada
            let valorActual = $(this).val();
            // Quitamos las comas y lo convertimos a un número
            let valorNumerico = convertirNumero(valorActual);

            // Si no es un número válido, limpiamos el campo
            if (isNaN(valorNumerico)) {
                $(this).val('');
            } else {
                // Si es un número válido, formateamos el número con comas y lo establecemos como el valor del campo de entrada
                $(this).val(formatoMilesComa(valorNumerico));
            }
        });
    });
});
