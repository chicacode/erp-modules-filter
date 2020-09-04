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

//iterate over the button array for each button when i click it filters
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
    });
});





