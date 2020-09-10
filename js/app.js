console.log("Filter erp");
// DOM manipulation
// Control Structures
// Array.Foreach
// JS CSS manipulation
// Eventlisteners
// Inmediately inoked Function Expressions
/* Two different sections: 1. the filter buttons,
whose purpose are filter the store items by class
the 2 section is the searc filter, whose purpose is o filter the store items by search
*/
const carrouselItem = document.querySelectorAll(".carrousel-item");
const buttons = document.querySelectorAll(".main-buttons__services");
let input = document.getElementById("search-input");
let modal = document.querySelector(".lightbox-container");
let modalItem = document.querySelector(".lightbox-holder ");
let buttonModalClose = document.querySelector(".lightbox-close");
let images = document.querySelectorAll(".store-img");
let imageList = [];
let imageCounter = 0;

images.forEach(function (image) {
    imageList.push(image.src);
})

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

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


(function () {
    carrouselItem.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let image = e.target.src;

            modalItem.style.backgroundImage = `url(${image})`;
            modalItem.style.width = '90%';
            modalItem.style.backgroundPosition = 'center';
            modalItem.style.backgroundRepeat = 'no - repeat';
            modalItem.style.backgroundSize = 'cover';
            modal.style.display = 'block';

        })

        let btnLeft = document.querySelector('.btnLeft');
        btnLeft.addEventListener('click', function () {
            imageCounter--;
            if (imageCounter < 0) {
                imageCounter = imageList.length - 1;
            }
            modalItem.style.backgroundImage = `url(${imageList[imageCounter]})`
        });
        //select left button from the DOM
        let btnRight = document.querySelector('.btnRight');
        btnRight.addEventListener('click', function () {
            imageCounter++;
            if (imageCounter >= imageList.length) {
                imageCounter = 0;
            }
            modalItem.style.backgroundImage = `url(${imageList[imageCounter]})`;
        });

        buttonModalClose.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    })

})();






