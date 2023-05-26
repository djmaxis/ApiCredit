function limpiarNumero(cadena) {
    let numero = cadena.replace(/,/g, '');
    return parseFloat(numero);
}

function rebajaNo_otroradioSi_abonoNo() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = limpiarNumero(document.getElementById('saldoActual').value);
    var nombreCliente = document.getElementById('nombreCliente').value;
    nombreCliente = nombreCliente.split("_")[0];
    var telefonoCliente = document.getElementById('telefono').value;
    var otroCarritoDiv = document.getElementById('otroCarrito').innerText.trim().replace(/X/g, '');
    var otroTotal = limpiarNumero(document.getElementById('otroTotal').innerText.replace('Total: $', ''));

    // Realiza los cálculos
    var saldoTotal = saldoActual + otroTotal;
    saldoTotal = formatoMilesComa(saldoTotal);  // Añade el formato de miles con comas

    // Si saldoTotal es negativo, añade " pesos a tu favor"
    var saldoTotalString = saldoTotal < 0 ? formatoMilesComa(Math.abs(saldoTotal)) + " pesos a tu favor" : saldoTotal;

    // Genera el mensaje final
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}*\n\n*Saldo anterior:* ${formatoMilesComa(saldoActual)}\n\nAhora, sumaremos...\n${otroCarritoDiv}\n__________________________________\n${formatoMilesComa(otroTotal)} ðŸ¡¸ *Total facturas*\n+${formatoMilesComa(saldoActual)} ðŸ¡¸ *Saldo anterior:*\n\n=${saldoTotalString} ðŸ¡¸ *Saldo total\n\n_*Credit control made easy with iMaxis*_`;
    mensajeFinal += `\n\n(https://wa.me/${telefonoCliente}?text=${encodeURIComponent(mensajeFinal)})`;

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
