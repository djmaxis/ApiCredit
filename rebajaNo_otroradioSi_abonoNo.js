function rebajaNo_otroradioSi_abonoNo() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = parseFloat(document.getElementById('saldoActual').value);
    var nombreCliente = document.getElementById('nombreCliente').value;
    nombreCliente = nombreCliente.split("_")[0];  // Aquí se obtienen los caracteres antes de "_"
    var telefonoCliente = document.getElementById('telefono').value;
    var otroCarritoDiv = document.getElementById('otroCarrito').innerText.trim().replace(/X/g, '');
    var otroTotal = limpiarNumero(document.getElementById('otroTotal').innerText.replace('Total: $', ''));

    // Realiza los cálculos
    var saldoTotal = saldoActual + otroTotal;

    // Si saldoTotal es negativo, añade " pesos a tu favor"
    var saldoTotalString = saldoTotal < 0 ? formatoMilesComa(Math.abs(saldoTotal)) + " pesos a tu favor" : formatoMilesComa(saldoTotal);

    // Genera el mensaje final
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}*\n\n* Saldo anterior:* ${formatoMilesComa(saldoActual)}\n\nAhora, sumaremos...\n${otroCarritoDiv}\n__________________________________\n${formatoMilesComa(otroTotal)} *Total:*\n\n${saldoTotalString} *Saldo total:*`;
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
