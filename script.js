let productos = [
  { id: 60500, nombre: "Tortuga", categoria: "Lámparas de mesa", stock: 2, precio: 5000, rutaImagen: "Tortuga-Art-60500.jpg" },
  { id: 60203, nombre: "Odín", categoria: "Lámparas de mesa", stock: 20, precio: 2650, rutaImagen: "Odín-Art-60203.jpg" },
  { id: 60710, nombre: "Tortuga", categoria: "Lámparas de mesa", stock: 4, precio: 4500, rutaImagen: "Tortuga-Art-60710.jpg" },
  { id: 1200, nombre: "Dixon", categoria: "Colgantes", stock: 6, precio: 2800, rutaImagen: "Dixon-Art-1200.jpg" },
  { id: 1212, nombre: "Odín", categoria: "Colgantes", stock: 3, precio: 7300, rutaImagen: "Odín-Art-1212.jpg" },
  { id: 1300, nombre: "Dixon", categoria: "Colgantes", stock: 2, precio: 5600, rutaImagen: "Dixon-Art-1300.jpg" },
  { id: 77710, nombre: "Tortuga", categoria: "Lámparas de pie", stock: 7, precio: 2650, rutaImagen: "Tortuga-Art-77710.jpg" },
  { id: 66000, nombre: "Odín", categoria: "Lámparas de pie", stock: 9, precio: 2650, rutaImagen: "Odín-Art-66000.png" },
  { id: 7820, nombre: "Pixar XL", categoria: "Lámparas de pie", stock: 8, precio: 50000, rutaImagen: "PixarXL-Art-7820.png" },
  { id: 30900, nombre: "Dixon", categoria: "Aplique de pared", stock: 1, precio: 2650, rutaImagen: "Dixon-Art-30900.jpg" },
  { id: 30905, nombre: "Dixon", categoria: "Aplique de pared", stock: 10, precio: 2650, rutaImagen: "Dixon-Art-30905.png" },
  { id: 3460, nombre: "Tortuga", categoria: "Aplique de pared", stock: 15, precio: 50000, rutaImagen: "Tortuga-Art-3460.png" }
]

localStorage.setItem("productos", JSON.stringify(productos))

let input = document.getElementById("barraBusqueda")
input.addEventListener("input", () => filtrarYRenderizar(input.value))

renderizar()
renderizarCategorias()
activarBotonesCategoria()


function renderizarCategorias() {

  let productosEnStorage = JSON.parse(localStorage.getItem("productos"))

  let contenedorCategorias = document.getElementById("contenedorCategorias")
  contenedorCategorias.innerHTML = ""

  let categorias = []

  productosEnStorage.forEach(producto => {

    let categoria = producto.categoria

    let index = categorias.indexOf(categoria)
    if (index == -1) {

      categorias.push(categoria)
      //CREA BOTON
      let botonCategoria = document.createElement("button")
      botonCategoria.setAttribute('id', categoria)
      botonCategoria.innerHTML = `
      ${categoria}
      `
      contenedorCategorias.appendChild(botonCategoria)


    }

  })

  let botonLimpiarFiltros = document.createElement("button")
  botonLimpiarFiltros.setAttribute("id", "limpiarFiltro")
  botonLimpiarFiltros.innerHTML = `
      Limpiar Filtros
      `
  botonLimpiarFiltros.addEventListener("click", () => resetCategorias(contenedorProductos))
  contenedorCategorias.appendChild(botonLimpiarFiltros)


}

function renderizar(conFiltros) {

  let productosEnStorage

  if (conFiltros) {
    productosEnStorage = JSON.parse(localStorage.getItem("productosFiltrados"))
  } else {
    productosEnStorage = JSON.parse(localStorage.getItem("productos"))
  }

  let contenedorProductos = document.getElementById("contenedorProductos")
  contenedorProductos.innerHTML = ""

  productosEnStorage.forEach(productosEnStorage => {
    //MENSAJE DE UNIDADES:
    let mensaje = "Unidades " + productosEnStorage.stock
    //CAJA + ESTILO DE CAJA
    let tarjetaProducto = document.createElement("div")


    //Logica para ultimas unidades que cambien de color
    if (productosEnStorage.stock < 5) {
      mensaje = "Últimas unidades"
      tarjetaProducto.classList.add("ultimasUnidades")
    }

    tarjetaProducto.classList.add("tarjetaProducto")
    tarjetaProducto.setAttribute("id", productosEnStorage.categoria)

    //ELEMENTOS DENTRO DE LA CAJA
    tarjetaProducto.innerHTML = `
   <div class=imagen style="background-image: url(./images/${productosEnStorage.rutaImagen})"></div>
   <h2> ${productosEnStorage.nombre} </h2>
   <h3> ${"Art. " + productosEnStorage.id} </h3>
   <h4> ${"$" + productosEnStorage.precio} </h4>
   <p> ${mensaje} </p>
   `
    contenedorProductos.appendChild(tarjetaProducto)
  })
}

function filtrarProductosPorCategoria(contenedorProductos, idBoton) {

  resetCategorias(contenedorProductos)
  let tarjetasProductos = contenedorProductos.children
  for (let i = 0; i < tarjetasProductos.length; i++) {
    let tarjeta = tarjetasProductos[i]
    let categoriaTarjeta = tarjeta.getAttribute("id")

    if (categoriaTarjeta !== idBoton) {
      tarjeta.style.display = "none"
    }

  }

}

function activarBotonesCategoria() {

  let botones = document.getElementById("contenedorCategorias").children
  let contenedorProductos = document.getElementById("contenedorProductos")

  for (let i = 0; i < botones.length; i++) {
    let boton = botones[i]
    let idBoton = boton.getAttribute("id")
    if (idBoton !== "limpiarFiltro") {
      boton.addEventListener("click", () => filtrarProductosPorCategoria(contenedorProductos, idBoton))
    }
  }

}

function resetCategorias(contenedorProductos) {
  let tarjetasProductos = contenedorProductos.children
  for (let i = 0; i < tarjetasProductos.length; i++) {
    let tarjeta = tarjetasProductos[i]
    tarjeta.style.display = "flex"
  }
}

function filtrarYRenderizar(valorFiltro) {
  let conFiltros = true
  let productosEnStorage = JSON.parse(localStorage.getItem("productos"))
  let elementosFiltrados = productosEnStorage.filter(elemento => elemento.nombre.toLowerCase().includes(valorFiltro.toLowerCase()))
  localStorage.setItem("productosFiltrados", JSON.stringify(elementosFiltrados))
  renderizar(conFiltros)
}


















/*
//variable mensaje
let mensaje = "Tienda - Luz inteiror SRL\n1 - Listado de productos\n2 - Agregar productos al carrito \n3 - Filtrar por categoría \n4 - Ordenar por precio \n5 - Ver carrito \n6 - Finalizar compra \n0 - Salir"

//variable opcion
let opcion

//array carrito6
let carrito = []
 */

/* do {
  //Opción 1
  opcion = Number(prompt(mensaje))
  if (opcion === 1) {
    alert(listarProductosConStock(productos))

    //Opción 2 find
  } else if (opcion === 2) {
    let id = Number(prompt("Seleccione Art. del producto\n" + listar(productos)))
    let productoBuscado = productos.find(prod => prod.id === id)
    let posicionProductoEnCarrito = carrito.findIndex(prod => prod.id === productoBuscado.id)

    if (posicionProductoEnCarrito === -1) {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio
      })
    } else {
      carrito[posicionProductoEnCarrito].unidades++
      carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].precioUnitario * carrito[posicionProductoEnCarrito].unidades
    }

    //Filter categorias
    console.log(carrito)
  } if (opcion === 3) {
    let categoria = prompt("Seleccione categoría")
    let productosFiltrados = productos.filter(producto => producto.categoria === categoria)
    alert(listar(productosFiltrados))

    //Opcion 4
  } if (opcion === 4) {
    let tipoDeOrden = Number(prompt("Ingrese tipo de orden \n 1 - Menor a mayor precio \n 2 - Mayor a menor precio"))
    if (tipoDeOrden === 1) {
      ordenarPorPrecios("asc", productos)

    } else if (tipoDeOrden === 2) {
      ordenarPorPrecios("des", productos)

    } else (
      alert("Ingreso un valor incorrecto")
    )

    //Opción 5
  } if (opcion === 5) {
    if (carrito.length > 0) {
      alert(listarCarrito(carrito))
    } else {
      alert(" Primero debe agregar productos al carrito")
    }
    //Oción6
  } if (opcion === 6) {
    if (carrito.length > 0) {
      alert(listarCarritoConTotal(carrito))
    } else {
      alert(" Primero debe agregar productos al carrito")
    }
  }

} while (opcion !== 0) */




/*
//Funcion ForEach
function listarProductosConStock(arrayAListar) {
  let listado = "Listado de productos:\n";
  arrayAListar.forEach(element => {
    listado += "Nombre: " + element.nombre + "\n";
    listado += "Precio: $" + element.precio + "\n";
    listado += "Stock: " + element.stock + "\n";
    listado += "------------------------\n";
  });
  return listado;
}

function listarCarritoConTotal(carrito) {
  let listado = "ID - Nombre - Unidades - Precio\n"
  let total = 0
  carrito.forEach(element => {
    listado = listado + element.id + " - " + element.nombre + " - Unidades:" + element.unidades + " - $" + element.precioUnitario + "\n"
    total += element.subtotal
  })
  return listado + "\n Precio Total: $" + total
}

function listar(arrayAListar) {
  let listado = "ID - Nombre \n"
  arrayAListar.forEach(element => {
    listado = listado + element.id + " - " + element.nombre + "\n"
  })
  return listado
}

function listarCarrito(arrayAListar) {
  let listado = "ID - Nombre - Unidades\n"
  arrayAListar.forEach(element => {
    listado = listado + element.id + " - " + element.nombre + " - Unidades:" + element.unidades + "\n"
  })
  return listado
}

function listarConPrecio(arrayAListar) {
  let listado = "Precio - Nombre\n"
  arrayAListar.forEach(element => {
    listado = listado + "$" + element.precio + " - " + element.nombre + "\n"
  })
  return listado
}

function ordenarPorPrecios(tipoDeOrden, arrayAOrdenar) {
  if (tipoDeOrden === "asc") {
    arrayAOrdenar.sort((x, y) => x.precio - y.precio)
    alert(listarConPrecio(arrayAOrdenar))
  } else if (tipoDeOrden === "des") {
    arrayAOrdenar.sort((x, y) => y.precio - x.precio)
    alert(listarConPrecio(arrayAOrdenar))
  }
} */







// NOTAS
//Forma de eliminar: contenedorproductos.remove()