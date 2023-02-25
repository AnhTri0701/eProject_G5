const name_item = document.querySelectorAll('.name_item');
const search_item = document.getElementById('search-item');
const element_cosmetics = document.querySelectorAll('.element_cosmetics');
const filter_button = document.querySelectorAll('#filter_button .btn');
const h1_price = document.querySelectorAll('h1.price');

search_item.addEventListener('keyup', getItem);
search_item.addEventListener('click', reset);

// when click to search filter => all to search
function reset() {
    for (let i = 0; i < filter_button.length; i++) {
        filter_button[i].classList.remove('active'); //remove active
    }
    Array.from(element_cosmetics).forEach(function (element) { //sections
        element.style.display = 'block';
    })
    filter_button[0].classList.add('active');
}

// search item
const h1Text = document.getElementById('showtext');
const infor = document.querySelectorAll('.infor');
function getItem(event) {
    // convert text to lowerCase to search 
    let lower_item = search_item.value.toLowerCase();
    Array.from(infor).forEach(function (cosmetics) {
        let item_Name = cosmetics.firstElementChild.textContent;
        if (item_Name.toLowerCase().indexOf(lower_item) != -1) {
            cosmetics.parentElement.style.display = 'block';
        }
        else {
            cosmetics.parentElement.style.display = 'none';

        }
    })

    checkNone(infor);
}

// function check if all infor[] has display none => textContent = 'can't find'
function checkNone(target_element) {
    var sum = 0;
    for (let i = 0; i < target_element.length; i++) {
        if (target_element[i].parentElement.style.display === 'block') {
            sum++;
        }
    }
    if (sum == 0) {
        h1Text.textContent = "can't find.";
    }
    else {
        h1Text.textContent = "";
    }
}

// filter
Array.from(filter_button).forEach(function (button) {
    button.addEventListener('click', function (event) {
        // when click filter current button has class active 
        for (let i = 0; i < filter_button.length; i++) {
            filter_button[i].classList.remove('active');
        }
        this.classList.add('active');

        let buttonAttr = event.target.dataset.filter; // get data of filter
        // let buttonAttr = button.getAttribute('data-filter');
        Array.from(element_cosmetics).forEach(function (element) {
            let elementAttr = element.dataset.item; // get value data-* use getAttribute or dataset
            if (buttonAttr === elementAttr || buttonAttr === 'all') {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        })
    })
})
//modal
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery-item")) {
        const src = e.target.getAttribute("src");
        document.querySelector(".modal-img").src = src;
        const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
        myModal.show();
    };
});

