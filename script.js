const galeria = document.querySelector('#img-seccion1')
fetch('/data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((post) =>{
            const img = document.createElement('img' )
            img.innerHTML= `<img col-sm-4 src= ${post.img}>`
            galeria.append(img)
           console.log('img')
        })
    })


const listaDeProductos = [
    {
        img: "./img/Pier.jpg",
        id: 1,
        nombre: "Pier",
        precio: 1200,
        stock: 1000
    },
    {
        img: "./img/kerme.jpg",   
        id: 2,
        nombre: "Kermesse",
        precio: 2500,
        stock: 3000
    },
    {
        img: "./img/superlogico.jpg",
        id: 3,
        nombre: "Superlogico",
        precio: 3000,
        stock: 2500,
    },
    {
        img: "./img/divididos.jpg",
        id: 4,
        nombre: "Divididos",
        precio: 6000,
        stock: 5000
    },
    {
        img: "./img/nagual.jpg",
        id: 5,
        nombre: "Nagual",
        precio: 1200,
        stock: 1200
    },
    {
        img: "./img/dividi2.jpg",
        id: 6,
        nombre: "Divididos",
        precio: 1200,
        stock: 1200
    }
]
 

let catalogo = document.getElementById('items')
let cartList = document.getElementById('carrito')
let botonVaciar = document.getElementById('boton-vaciar')
let valorTotal = document.getElementById('total')
let cart = []

botonVaciar.addEventListener('click', controlBotonVaciar)

cargarCarrito() 
renderCart()


listaDeProductos.forEach((prod) => {
    let container = document.createElement('div')
    container.classList.add('card', 'col-sm-4')
    //Body
    let cardBody = document.createElement("div")
    cardBody.classList.add('card-body')
    //imagen
    let cardImg = document.createElement("img")
    cardImg.classList.add('card-img')
    cardImg.src = `${prod.img}`
    //Title
    let cardTitle = document.createElement("h5")
    cardTitle.classList.add('card-title')
    cardTitle.innerText = prod.nombre
    //Precio
    let cardPrice = document.createElement("p")
    cardPrice.classList.add('card-text')
    cardPrice.innerText = `$${prod.precio}`
    //Stock
    let cardStock = document.createElement("p")
    cardStock.classList.add('card-text')
    cardStock.innerText = `Stock: ${prod.stock}`
    //Button
    let cardButton = document.createElement("button")
    cardButton.classList.add('btn', 'btn-primary')
    cardButton.innerText = `Comprar`
    cardButton.setAttribute('mark', prod.id)
    cardButton.addEventListener('click', addProdToCart)

    
    cardBody.append(cardTitle)
    cardBody.append(cardImg)
    cardBody.append(cardPrice)
    cardBody.append(cardStock)
    cardBody.append(cardButton)
    container.append(cardBody)
    catalogo.append(container)
})

function addProdToCart(event){
    cart.push(event.target.getAttribute('mark'))
    renderCart()
}

function renderCart(){

    guardarCarrito()

    cartList.innerHTML = ''

    //Que no se repiten los elementos en el carrito

    let carroSinRepetir = [...new Set(cart)]

    carroSinRepetir.forEach((itemId) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id === parseInt(itemId)
        })
        let quantity = cart.reduce((total, id) => {
            return id === itemId ? total += 1 : total
        }, 0)
   
    // lista para colocar elementos de carrito
    
    let linea = document.createElement('li')
    linea.classList.add('list-group-item', 'text-right', 'mx-2')
    linea.innerText = `${quantity} x ${item[0].nombre} - $${item[0].precio}`

    // creo boton de borrar

    let borrar = document.createElement('button')
    borrar.classList.add('btn', 'btn-danger', 'mx-5')
    borrar.innerText = 'Eliminar'
    borrar.dataset.item = itemId
    borrar.addEventListener('click', eliminarProducto)

    linea.append(borrar)
    cartList.append(linea)
    })
    valorTotal.innerText = calcularElTotal()
} 
//Eliminar productos
function eliminarProducto(event) {
    
          // Agrego libreria para confirmar evento      
          Swal.fire({
            title: '¿Quiere eliminar este producto?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Calcelar`,

          }).then((result) => {
            
            if (result.isConfirmed) {
                let id = event.target.dataset.item
                cart = cart.filter((cartId) => {
                    return cartId != id 
                })
                renderCart()
              Swal.fire('¡Eliminado!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('No se elimino el producto', '', 'info')
            }
          })
    }
function controlBotonVaciar(){
    cart = []
    cartList.innerHTML = ''
    valorTotal.innerText = 0
}



function calcularElTotal(){
    return cart.reduce((total, itemId) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id === parseInt(itemId)
        })

        return total + item[0].precio

    }, 0)
}

function guardarCarrito(){
    localStorage.setItem('cart', JSON.stringify(cart))
}
function cargarCarrito(){
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'))
    }
}