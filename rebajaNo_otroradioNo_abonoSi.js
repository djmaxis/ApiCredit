function formatoMilesComa(n) {
    var partes = n.toString().split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return partes.join(".");
}

function limpiarNumero(numero) {
    return Math.floor(parseFloat(numero.replace(/,/g, '')));
}

function rebajaNo_otroradioNo_abonoSi() {
    // Get form elements
    var fecha = document.getElementById('fecha').value;
    var saldoActual = limpiarNumero(document.getElementById('saldoActual').value);
    var fechaAbono = document.getElementById('fechaAbono').value;
    var nombreCliente = document.getElementById('nombreCliente').value; 
    var seleccion = document.getElementById('nombreCliente').value; 
    var nombreCliente = seleccion.split('_')[0];
    var telefonoCliente = document.getElementById('telefono').value;

    // Calculate the total of abonos
    var totalAbonos = Math.floor(CarritoAbono.reduce((total, abono) => total + limpiarNumero(abono.monto), 0));

    // Check if saldoActual is less than the total of abonos
    if (saldoActual < totalAbonos) {
        // Alert the user with an error message
        alert('El saldo actual no puede ser menor que la suma total de los abonos');
        return;
    }

    // Calculate saldoRestante
    var saldoRestante = saldoActual - totalAbonos;
    var saldoRestanteString = saldoRestante < 0 ? formatoMilesComa(Math.abs(saldoRestante)) + " pesos a tu favor" : formatoMilesComa(saldoRestante);

    if (saldoRestante == 0) {
        alert(`${nombreCliente} ha saldado todas sus cuentas.`);
    } else {

        // Generate the final message
        var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}* \n\n${formatoMilesComa(saldoActual)} ➖ *Saldo anterior*\n`;

        // Add details of each abono to the message
        CarritoAbono.forEach((abono, index) => {
            mensajeFinal += `-${formatoMilesComa(limpiarNumero(abono.monto))} ➖ *abono* ${abono.fechaAbono} en ${abono.metodoDePago}\n`;
            if (abono.metodoDePago === "Transferencia") {
                mensajeFinal += ` al ${abono.banco}\n`;
            }
            mensajeFinal += `\n`;
        });

        mensajeFinal += `_________________________________\n=${saldoRestanteString} ➖ *Saldo total*\n\n_*Credit control made easy with iMaxis*_`;
        
        var mensajeWhatsAppCliente = `https://wa.me/${telefonoCliente}?text=${encodeURIComponent(mensajeFinal)}`;

        mensajeFinal += `\n\nEnviar al cliente: ${mensajeWhatsAppCliente}`;

        var mensajeWhatsAppPrincipal = `https://wa.me/18295463303?text=${encodeURIComponent(mensajeFinal)}`;

        // Open the WhatsApp link in a new tab
        window.open(mensajeWhatsAppPrincipal, '_blank');

        // Create txt file
        var blob = new Blob([mensajeFinal], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = `Balance_de_${nombreCliente}_${fecha}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
}


