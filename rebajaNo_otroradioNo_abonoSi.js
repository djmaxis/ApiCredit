function formatoMilesComa(n) {
    var partes = n.toString().split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return partes.join(".");
}

function limpiarNumero(numero) {
    return parseFloat(numero.replace(/,/g, ''));
}

function rebajaNo_otroradioNo_abonoSi() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = parseFloat(document.getElementById('saldoActual').value.replace(/,/g, ''));
    var fechaAbono = document.getElementById('fechaAbono').value;
    var nombreCliente = document.getElementById('nombreCliente').value; 
    var seleccion = document.getElementById('nombreCliente').value; 
    var nombreCliente = seleccion.split('_')[0];
    var telefonoCliente = document.getElementById('telefono').value;

    // Calcular el total de los abonos
    var totalAbonos = CarritoAbono.reduce((total, abono) => total + parseFloat(abono.monto), 0);

    // Verificar que el saldo actual sea mayor o igual a la suma total de los abonos
    if (saldoActual < totalAbonos) {
        // Mostrar un mensaje de error al usuario
        alert('El saldo actual no puede ser menor que la suma total de los abonos');
        return;
    }
	
	if (saldoActual = totalAbonos) {
		alert(`${nombreCliente} ha saldado todas sus cuentas.`);
        return;
		}

    // Calcular el saldo restante
    var saldoRestante = saldoActual - totalAbonos;
    var saldoRestanteString = saldoRestante < 0 ? formatoMilesComa(Math.abs(saldoRestante)) + " pesos a tu favor" : formatoMilesComa(saldoRestante);

    // Genera el mensaje final
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}* \n\n${formatoMilesComa(saldoActual)} *Saldo anterior:*\n`;

    // Añadir detalles de cada abono al mensaje
    CarritoAbono.forEach((abono, index) => {
        mensajeFinal += `-${formatoMilesComa(abono.monto)} el ${abono.fechaAbono} por ${abono.metodoDePago}`;
        if (abono.metodoDePago === "Transferencia") {
            mensajeFinal += ` al ${abono.banco}`;
        }
        mensajeFinal += `\n`;
    });

    mensajeFinal += `=${saldoRestanteString}* Saldo total:*`;
    
    var mensajeWhatsAppCliente = `https://wa.me/18295463303?text=${encodeURIComponent(mensajeFinal)}`;

    // Abre el enlace de WhatsApp en una nueva pestaña
    window.open(mensajeWhatsAppCliente, '_blank');

    // Crea el archivo txt
    var blob = new Blob([mensajeFinal], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = `Balance_de_${nombreCliente}_${fecha}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
