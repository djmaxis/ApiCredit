function formatoMilesComa(n) {
    var partes = n.toString().split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return partes.join(".");
}

function limpiarNumero(numero) {
    return parseFloat(numero.replace(/\./g, '').replace(/,/g, ''));
}

function rebajaNo_otroradioNo() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = parseFloat(document.getElementById('saldoActual').value);
    var montoAbono = parseFloat(document.getElementById('montoabono').value);
    var fechaAbono = document.getElementById('fechaAbono').value;
    var nombreCliente = document.getElementById('nombreCliente').value;
    var telefonoCliente = document.getElementById('telefono').value;

    // Realiza los cálculos
    var saldoRestante = saldoActual - montoAbono;

    // Si saldoRestante es negativo, añade " pesos a tu favor"
    var saldoRestanteString = saldoRestante < 0 ? formatoMilesComa(Math.abs(saldoRestante)) + " pesos a tu favor" : formatoMilesComa(saldoRestante);

    // Genera el mensaje final
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}*\n\n*Saldo anterior:* ${formatoMilesComa(saldoActual)}\n-"${formatoMilesComa(montoAbono)}" *Abono: El ${fechaAbono}*\n=${saldoRestanteString}\n\n*Saldo total:* ${saldoRestanteString}`;
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
