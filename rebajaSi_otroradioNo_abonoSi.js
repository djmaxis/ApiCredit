function rebajaSi_otroradioNo_abonoSi() {
    // Obtén los elementos del formulario
    var fecha = document.getElementById('fecha').value;
    var saldoActual = parseFloat(document.getElementById('saldoActual').value.replace(/,/g, ''));
    var fechaAbono = document.getElementById('fechaAbono').value;
    var seleccion = document.getElementById('nombreCliente').value; 
    var nombreCliente = seleccion.split('_')[0];
    var telefonoCliente = document.getElementById('telefono').value;
    var total = limpiarNumero(document.getElementById('total').innerText.replace('Total: $', ''));
    var carritoDiv = document.getElementById('carrito').innerText.trim().replace(/X/g, '');

    // Calcular el total de los abonos
    var totalAbonos = CarritoAbono.reduce((total, abono) => total + parseFloat(abono.monto), 0);

    // Verificar que el saldo actual sea mayor o igual a la suma total de los abonos y productos
    if (saldoActual < (totalAbonos + total)) {
        // Mostrar un mensaje de error al usuario
        alert('El saldo actual no puede ser menor que la suma total de los abonos y productos');
        return;
    }
    
    if (saldoActual === (totalAbonos + total)) {
        alert(`${nombreCliente} ha saldado todas sus cuentas.`);
        return;
    }

    // Calcular el saldo restante
    var saldoRestante = saldoActual - totalAbonos - total;
    var saldoRestanteString = saldoRestante < 0 ? formatoMilesComa(Math.abs(saldoRestante)) + " pesos a tu favor" : formatoMilesComa(saldoRestante);

    // Genera el mensaje final
    var mensajeFinal = `Fecha: ${fecha}\nBalance de: *${nombreCliente}* \n\n${formatoMilesComa(saldoActual)} 🡸 *Saldo anterior:*\n\nDel saldo anterior *rebajaremos...*\n${carritoDiv}\n=${formatoMilesComa(total)}  🡸 *Total productos*\n\n`;

    // Añadir detalles de cada abono al mensaje
    mensajeFinal += "\Abonos adicionados\n";
    CarritoAbono.forEach((abono, index) => {
        mensajeFinal += `${formatoMilesComa(abono.monto)} el ${abono.fechaAbono} por ${abono.metodoDePago}`;
        if (abono.metodoDePago === "Transferencia") {
            mensajeFinal += ` al ${abono.banco}`;
        }
        mensajeFinal += `\n`;
    });
    mensajeFinal += `=${formatoMilesComa(totalAbonos)} 🡸 *Total abonos*\n`;

    mensajeFinal += `\n${formatoMilesComa(saldoActual)} 🡸 *Saldo anterior:*\n-${formatoMilesComa(totalAbonos)} 🡸 *Total abonos:*\n-${formatoMilesComa(total)} 🡸 *Total productos:*\n__________________________________\n=${saldoRestanteString} 🡸 *Saldo restante:*\n\n_*Credit control made easy with iMaxis*_`;

    // Genera el enlace de WhatsApp para el telefonoCliente
    var mensajeWhatsAppCliente = `https://wa.me/1${telefonoCliente}?text=${encodeURIComponent(mensajeFinal)}`;

    // Incluye el enlace de WhatsApp para el telefonoCliente en el mensajeFinal
    mensajeFinal += `\n\nEnviale al cliente: ${mensajeWhatsAppCliente}`;

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
