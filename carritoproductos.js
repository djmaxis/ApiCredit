let carrito = []; // Este arreglo contendrá los productos en el carrito

document.getElementById('agregarProducto').addEventListener('click', (e) => {
	e.preventDefault(); // Prevenir la envío del formulario

	let cantidadInput = document.getElementById('cantidad');
	let productoInput = document.getElementById('producto');
	let precioInput = document.getElementById('precio');

	// Verificar que todos los campos estén completos
	if (cantidadInput.value === '' || productoInput.value === '' || precioInput.value === '') {
		// Mostrar un mensaje de error
		alert('Todos los campos deben estar completos');

		// Poner el foco en el primer campo vacío
		if (cantidadInput.value === '') cantidadInput.focus();
		else if (productoInput.value === '') productoInput.focus();
		else if (precioInput.value === '') precioInput.focus();

		return; // Salir de la función
	}

	let cantidad = parseInt(cantidadInput.value);
	let producto = productoInput.value;
	let precio = parseFloat(precioInput.value);

	// Crear un objeto que representa el producto
	let productoObj = {
		cantidad: cantidad,
		nombre: producto,
		precio: precio,
		total: cantidad * precio
	};

	// Agregar el producto al carrito
	carrito.push(productoObj);

	// Limpiar los campos de entrada
	cantidadInput.value = '';
	productoInput.value = '';
	precioInput.value = '';

	// Actualizar el carrito
	actualizarCarrito();
});

// Iniciar el carrito
actualizarCarrito();


