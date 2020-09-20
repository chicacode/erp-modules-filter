console.log("Filter erp");

const carrouselItem = document.querySelectorAll(".carrousel-item");
const buttons = document.querySelectorAll(".main-buttons__services");
const cartContent = document.querySelector('#cart-list tbody');
const cart = document.querySelector('#cart');
const emptyCartBtn = document.querySelector('#empty-cart');
const productList = document.querySelector('#list-products');

let input = document.getElementById("search-input");
let modal = document.querySelector(".lightbox-container");
let modalItem = document.querySelector(".lightbox-holder ");
let buttonModalClose = document.querySelector(".lightbox-close");
let images = document.querySelectorAll(".store-img");
let imageList = [];
let cartItems = [];
let imageCounter = 0;

images.forEach(function (image) {
    imageList.push(image.src);
})

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

loadListeners();
//iterate over the button array for each button when i click it filters
(function () {
    buttons.forEach(button => { //get the event target
        button.addEventListener("click", (e) => {
            e.preventDefault()
            // get the value wit dataset filter
            const filterValue = e.target.dataset.filter;

            carrouselItem.forEach((element) => {
                if (filterValue === 'all') {
                    element.style.display = 'inline-block';
                } else {
                    if (element.classList.contains(filterValue)) {
                        element.style.display = 'inline-block';
                    } else {
                        element.style.display = 'none';
                    }
                }
            })
        })
    })

})();
// Input Fn
(function () {
    input.addEventListener('keyup', (e) => {
        console.log(e.target.value);
        const searchFilter = e.target.value.toLowerCase().trim()
        carrouselItem.forEach((item) => {
            if (item.textContent.includes(searchFilter)) {
                item.style.display = 'inline-block';
            } else {
                item.style.display = 'none';
            }
        })
    })

})();
// Modal Fn
(function () {
    carrouselItem.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let image = e.target.src;

            modalItem.style.backgroundImage = `url(${image})`;
            modalItem.style.width = '70%';
            modalItem.style.backgroundPosition = 'center';
            modalItem.style.backgroundRepeat = 'no - repeat';
            modalItem.style.backgroundSize = 'cover';
            modal.style.display = 'block';

        })

        let btnLeft = document.querySelector('.btnLeft');
        btnLeft.addEventListener('click', function () {
            imageCounter--;
            if (imageCounter <= 0) {
                imageCounter = imageList.length - 1;
            }
            modalItem.style.backgroundImage = `url(${imageList[imageCounter]})`
        });
        //select left button from the DOM
        let btnRight = document.querySelector('.btnRight');
        btnRight.addEventListener('click', function () {
            imageCounter++;
            if (imageCounter > imageList.length - 1) {
                imageCounter = 1;
            }
            modalItem.style.backgroundImage = `url(${imageList[imageCounter]})`;
        });

        buttonModalClose.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    })

})();

function loadListeners() {
    productList.addEventListener('click', addProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-cart')) {
        const itemSelected = e.target.parentElement.parentElement;
        readProductData(itemSelected);
    }
}

function deleteItem(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        cartItems = cartItems.filter(item => item.id !== cursoId);

        carritoHTML();
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function readProductData(curso) {
    // console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = cartItems.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = cartItems.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        cartItems = [...cursos];
    } else {
        // Agrega elementos al arreglo de carrito
        cartItems = [...cartItems, infoCurso];
    }




    console.log(cartItems);

    carritoHTML();
}


// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();


    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });


}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';


    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}




