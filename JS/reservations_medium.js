/* Table of Contents
********************

1. Click on Purchase Button
2. Click on Remove Button
3. Click on Make Reservation Button

*/


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('propertiesReservation_cartquantity-input')
    for (i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('propertiesReservation_button')
    for (i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

// Click on Purchase Button
function purchaseClicked() {
    alert('Thank you for your reservation')
    var cartItems = document.getElementsByClassName('propertiesReservation_cartitems')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// Click on Remove Button
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.removeChild(buttonClicked.parentElement.parentElement);
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('propertiesReservation_title')[0].innerText
    var price = shopItem.getElementsByClassName('propertiesReservation_price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('propertiesReservation_image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

// Click on Make Reservation Button
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('propertiesReservation_cartrow')
    var cartItems = document.getElementsByClassName('propertiesReservation_cartitems')[0]
    var cartItemNames = cartItems.getElementsByClassName('propertiesReservation_itemtitle')
    for (i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = "\n        <div>\n     \n        <div>\n            <span class = \"propertiesReservation_cartitem propertiesReservation_cartheader propertiesReservation_cartcolumn\">\n                ROAD TO INDIA\n            </span>\n            <img class = \"img-fluid propertiesReservation_itemimage\" src = \"" + imageSrc + "\">\n           </div>\n        <span class = \"propertiesReservation_cartitem propertiesReservation_cartheader propertiesReservation_cartcolumn\">\n            TAJ MAHAL, INDIA\n        </span>\n        <span class = \"propertiesReservation_cartprice propertiesReservation_cartcolumn\">\n            " + price + "\n        </span>\n        <span class = \"propertiesReservation_cartitem propertiesReservation_cartheader propertiesReservation_cartcolumn\">\n            \n        </span>\n        <div id = \"test\">\n            \n            <button class = \"btn btn-danger\" type = \"button\">REMOVE</button>\n        </div>   \n        <div class = \"propertiesReservation_carttotal\">\n           \n        </div>      \n        </div>";
    cartRow.innerHTML = cartRowContents
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('propertiesReservation_cartquantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('propertiesReservation_cartitems')[0]
    var cartRows = cartItemContainer.getElementsByClassName('propertiesReservation_cartrow')
    var total = 0
    for (i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('propertiesReservation_cartprice')[0]
        var quantityElement = cartRow.getElementsByClassName('propertiesReservation_cartquantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('propertiesReservation_carttotalprice')[0].innerText = '$' + total
}