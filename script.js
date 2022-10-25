const listaDeProductos = [
    {
        id: 1,
        nombre: "Pier",
        precio: 1200,
        stock: 1000
    },
    {
        id: 2,
        nombre: "Kermesse",
        precio: 2500,
        stock: 3000
    },
    {
        id: 3,
        nombre: "Superlogico",
        precio: 3000,
        stock: 2500,
    },
    {
        id: 4,
        nombre: "Divididos",
        precio: 6000,
        stock: 5000
    },
    {
        id: 5,
        nombre: "Pier",
        precio: 1200,
        stock: 1200
    }
]


let catalog = document.getElementById('items')

listaDeProductos.forEach((prod) => {
    let container = document.createElement('div')
    container.classList.add('card', 'col-sm-4')
    //Body
    let cardBody = document.createElement("div")
    cardBody.classList.add('card-body')
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
    //cardButton.addEventListener('click', addProdToCart)

    cardBody.append(cardTitle)
    cardBody.append(cardPrice)
    cardBody.append(cardStock)
    cardBody.append(cardButton)
    container.append(cardBody)
    catalog.append(container)
}) 
