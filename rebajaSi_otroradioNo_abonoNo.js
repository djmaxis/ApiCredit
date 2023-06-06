function formatoMilesComa(n) {
    var partes = n.toString().split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return partes.join(".");
}

function limpiarNumero(numero) {
    return parseFloat(numero.replace(/\./g, '').replace(/,/g, ''));
}

function rebajaSi_otroradiono_abonoNo() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = limpiarNumero(document.getElementById('saldoActual').value);
    var nombreCliente = document.getElementById('nombreCliente').value;
    nombreCliente = nombreCliente.split("_")[0];  // Aquí se obtienen los caracteres antes de "_"
    var telefonoCliente = limpiarNumero(document.getElementById('telefono').value);
    var total = limpiarNumero(document.getElementById('total').innerText.replace('Total: $', ''));
    var carritoDiv = document.getElementById('carrito').innerText.trim().replace(/X/g, '');

    // Realiza los cálculos
    var saldoRestante = saldoActual - total;

    // Si saldoRestante es negativo, añade " pesos a tu favor"
    var saldoRestanteString = saldoRestante < 0 ? formatoMilesComa(Math.abs(saldoRestante)) + " pesos a tu favor" : formatoMilesComa(saldoRestante);

    // Genera el mensaje final
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}*\n\n*Saldo anterior:* ${formatoMilesComa(saldoActual)}\n\nDel saldo anterior *rebajaremos...*\n${carritoDiv}\n__________________________________\n${formatoMilesComa(total)} ðŸ¡¸ *Total*\n-${formatoMilesComa(saldoActual)} ðŸ¡¸ *Saldo anterior*\n\n ${saldoRestanteString} ðŸ¡¸ *Saldo restante*\n\n_*Credit control made easy with iMaxis*_`;
    mensajeFinal += `\n\n(https://wa.me/1${telefonoCliente}?text=${encodeURIComponent(mensajeFinal)})`;

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
