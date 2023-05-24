// Función para formatear números con comas como separadores de miles
function formatearMiles(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let CarritoAbono = []; 

document.getElementById('metodoDePago').addEventListener('change', (e) => {
    let bancoDiv = document.getElementById('bancoDiv');
    if(e.target.value === 'Transferencia') {
        bancoDiv.style.display = '';
    } else {
        bancoDiv.style.display = 'none';
    }
});

document.getElementById('Addabono').addEventListener('click', () => {
    let montoAbonoInput = document.getElementById('montoabono');
    let fechaAbonoInput = document.getElementById('fechaAbono');
    let metodoDePagoInput = document.getElementById('metodoDePago');
    let bancoInput = document.getElementById('banco');

    if (montoAbonoInput.value === '' || fechaAbonoInput.value === '' || metodoDePagoInput.value === '' || (metodoDePagoInput.value === 'Transferencia' && bancoInput.value === '')) {
        alert('Todos los campos deben estar completos');
        return;
    }

    let abono = {
        monto: parseFloat(montoAbonoInput.value.replace(/,/g, '')).toFixed(2),
        fechaAbono: fechaAbonoInput.value,
        metodoDePago: metodoDePagoInput.value,
        banco: metodoDePagoInput.value === 'Transferencia' ? bancoInput.value : null,
    };

    CarritoAbono.push(abono);

    montoAbonoInput.value = '';
    fechaAbonoInput.value = '';
    metodoDePagoInput.value = '';
    bancoInput.value = '';

    actualizarCarritoAbono();
});

function actualizarCarritoAbono() {
    let CarritoAbonoDiv = document.getElementById('CarritoAbono');
    let totalAbonoDiv = document.getElementById('totalAbono');
    CarritoAbonoDiv.innerHTML = '';

    if (CarritoAbono.length === 0) {
        totalAbonoDiv.innerHTML = '<i style="color: #FF6666; text-align: center; display: block;">Carrito está vacío</i>';
        return;
    }

    CarritoAbono.forEach((abono, index) => {
        let abonoDiv = document.createElement('div');
        abonoDiv.style.textAlign = 'center';

        let abonoInfo;
        if(abono.metodoDePago === 'Transferencia') {
            abonoInfo = document.createTextNode(`$${formatearMiles(abono.monto)} el ${abono.fechaAbono} al ${abono.banco}`);
        } else {
            abonoInfo = document.createTextNode(`$${formatearMiles(abono.monto)} el ${abono.fechaAbono} en ${abono.metodoDePago}`);
        }
        abonoDiv.appendChild(abonoInfo);

        let eliminarBoton = document.createElement('button');
        eliminarBoton.classList.add('eliminar');
        eliminarBoton.setAttribute('data-index', index);
        eliminarBoton.textContent = 'X';
        eliminarBoton.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-index'); 
            CarritoAbono.splice(index, 1);
            actualizarCarritoAbono();
        });
        abonoDiv.appendChild(eliminarBoton);

        CarritoAbonoDiv.appendChild(abonoDiv);
    });

    let sumaTotalAbono = CarritoAbono.reduce((total, abono) => total + parseFloat(abono.monto), 0);
    totalAbonoDiv.textContent = `Total: $${formatearMiles(sumaTotalAbono.toFixed(0))}`;
}

document.getElementById('Addabono').addEventListener('click', () => {
    const fechaAbonoInput = document.getElementById('fechaAbono');
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    fechaAbonoInput.value = formattedDate;
});

	
/*Fin de la funcion*/

/*Este es para actualizar fecha despues de agregar algo al carrito*/
 const agregarAbonoBtn = document.getElementById('Addabono');

    // Agregar evento click al botón
    agregarAbonoBtn.addEventListener('click', () => {
        // Obtener referencia al campo de fecha de abono
        const fechaAbonoInput = document.getElementById('fechaAbono');

        // Obtener la fecha actual
        const currentDate = new Date();

        // Formatear la fecha actual en formato YYYY-MM-DD para asignarla al campo de fecha de abono
        const formattedDate = currentDate.toISOString().split('T')[0];
        fechaAbonoInput.value = formattedDate;
    });
