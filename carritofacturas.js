var numeroInput = document.getElementById('numerofactura');
var montoInput = document.getElementById('montofactura');

function actualizarFactura() {
    let facturaDiv = document.getElementById('otroCarrito');
    let totalDiv = document.getElementById('otroTotal');
    facturaDiv.innerHTML = ''; 

    if (facturas.length === 0) {
        totalDiv.innerHTML = '<i style="color: #FF6666; text-align: center; display: block;">Carrito está vacío</i>';
    } else {
        let sumaTotal = 0;
        facturas.forEach((factura, index) => {
            let facturaDivElem = document.createElement('div');
            facturaDivElem.style.textAlign = 'center';

            let facturaInfo = document.createTextNode(`Factura #${factura.numero} Monto $${formatoMilesComa(factura.monto)} `);
            facturaDivElem.appendChild(facturaInfo);

            let eliminarBoton = document.createElement('button');
            eliminarBoton.classList.add('eliminar');
            eliminarBoton.setAttribute('data-index', index);
            eliminarBoton.style.cssText = 'border-radius: 50%; color: white; background-color: red; width: 20px; height: 20px;';
            eliminarBoton.textContent = 'X';
            eliminarBoton.addEventListener('click', (e) => {
                let index = e.target.getAttribute('data-index'); 
                facturas.splice(index, 1);
                actualizarFactura();
            });
            facturaDivElem.appendChild(eliminarBoton);

            facturaDiv.appendChild(facturaDivElem);

            sumaTotal += factura.monto;
        });

        totalDiv.textContent = `Total: $${formatoMilesComa(sumaTotal)}`;
    }
}

document.getElementById('agregarOtroProducto').addEventListener('click', function() {
    var numeroFactura = numeroInput.value;
    var monto = montoInput.value;

    var facturaExistente = facturas.find(function(factura) {
        return factura.numero === numeroFactura;
    });

    if (!facturaExistente) {
        if (numeroFactura && monto) {
            facturas.push({
                numero: numeroFactura,
                monto: Number(monto)
            });
            numeroInput.value = '';
			montoInput.value = '';
            montoInput.focus();
            actualizarFactura();
        } else {
            alert('Por favor ingresa un número de factura y un monto.');
        }
    }
});

var facturas = [];

if (rebajaNo.checked && otroradioSi.checked) {
    carritoGroup1.style.display = "none";
    carritoGroup2.style.display = "block";
    actualizarFactura();
}

// Iniciar las facturas
actualizarFactura();
