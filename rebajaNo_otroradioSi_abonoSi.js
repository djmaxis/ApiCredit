function rebajaNo_otroradioSi_abonoSi() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = parseFloat(limpiarNumero(document.getElementById('saldoActual').value));
    var nombreCliente = document.getElementById('nombreCliente').value.split("_")[0];
    var telefonoCliente = limpiarNumero(document.getElementById('telefono').value);
    var otroCarritoDiv = document.getElementById('otroCarrito').innerText.trim().replace(/X/g, '');
    var otroTotal = limpiarNumero(document.getElementById('otroTotal').innerText.replace('Total: $', ''));

    // Calcular el total de los abonos
    var totalAbonos = CarritoAbono.reduce((total, abono) => total + parseFloat(limpiarNumero(abono.monto)), 0);

    // Calcular el saldo restante
    var saldoRestante = saldoActual - totalAbonos + otroTotal;
    var saldoRestanteString = saldoRestante < 0 ? formatoMilesComa(Math.abs(saldoRestante)) : formatoMilesComa(saldoRestante);

    // Genera el mensaje final
    var mensajeFinal = `*Fecha:* ${fecha}\nBalance de: *${nombreCliente}* \n\n${formatoMilesComa(saldoActual)} ➖ *Saldo anterior*\n`;

    // Añadir detalles de cada abono al mensaje
    mensajeFinal += "\n*Abonos*\n";
    CarritoAbono.forEach((abono, index) => {
        mensajeFinal += `${formatoMilesComa(limpiarNumero(abono.monto))} el ${abono.fechaAbono} por ${abono.metodoDePago}`;
        if (abono.metodoDePago === "Transferencia") {
            mensajeFinal += ` al ${abono.banco}`;
        }
        mensajeFinal += `\n`;
    });
    mensajeFinal += `=${formatoMilesComa(totalAbonos)} ➖ *Total abonos*\n`;

    // Añadir detalles de cada factura al mensaje
    mensajeFinal += "\n*Facturas adicionadas*\n" + otroCarritoDiv;
    mensajeFinal += `\n=${formatoMilesComa(otroTotal)} ➖ *Total facturas*\n`;

    mensajeFinal += `\n${formatoMilesComa(saldoActual)} ➖ *Saldo anterior*\n+${formatoMilesComa(totalAbonos)} ➖ *Total facturas*\n-${formatoMilesComa(otroTotal)} ➖ *Total abonos\n__________________________________\n=${saldoRestanteString} ➖ *Saldo restante*\n\n_*Credit control made easy with iMaxis*_`;

    // Genera el enlace de WhatsApp para el telefonoCliente
    var mensajeWhatsAppCliente = `https://wa.me/${telefonoCliente}?text=${encodeURIComponent(mensajeFinal)}`;

    // Incluye el enlace de WhatsApp para el telefonoCliente en el mensajeFinal
    mensajeFinal += `\n\nEviar al cliente ➡️ ${mensajeWhatsAppCliente}`;

    // Genera el enlace de WhatsApp para el número "8295463303"
    var mensajeWhatsApp = `https://wa.me/18295463303?text=${encodeURIComponent(mensajeFinal)}`;

    // Abre el enlace de WhatsApp en una nueva pestaña
    window.open(mensajeWhatsApp, '_blank');

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

function formatoMilesComa(n) {
    var partes = n.toString().split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return partes.join(".");
}

function limpiarNumero(numero) {
    return parseFloat(numero.replace(/,/g, ''));
}
