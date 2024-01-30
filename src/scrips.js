
let products = ['Cheeseburger', 'Pizza Salami', 'Pizza Margherita', 'Salat Mista', 'Krautsalat', 'Pizzabrötchen','Hausgemachtes Tiramisu', 'Hausgemachtes Panacotta' ];
let prices = [5.60, 9.90, 8.50, 6.90, 7.80, 8.50, 9.00, 9.20 ];
let discriptions = ['mit 100g saftigem Rindfleischpatty, Käse, Hamburgersauce und Ketchup','Wahl aus: Ø 32 cm oder 52cm x 32cm.', 'Wahl aus: Ø 32 cm oder 52cm x 32cm.', 'gemischter Salat der Saison mit Gurken, Tomaten und Möhren', 'mit Peperoni, Oliven, Gurken, Tomaten und Möhren', 
                    'gefüllt mit Schinken und Käse', '', 'Mit Sauce nach Wahl',];

let cardProducts = [];
let cardPrices   = [];
let amounts      = [];

window.onscroll = function moveShoppingCartPosition(){
    let shoppingCart = document.getElementById('shopping-card');

    if ( window.scrollY > 64){
        shoppingCart.style = 'top:0';
    }else{
        shoppingCart.style = 'top:50px';
    }
}
//----------läd die bestellbaren Produkte------------//

function loadFood(){

 let foods = document.getElementById("foods");

 foods.innerHTML = ``;

for(let i = 0; i<products.length; i++){

    const eat = products[i];
    const price = prices[i];
    const discription = discriptions[i];

 foods.innerHTML += generateFoofHTML(eat, price, discription, i);

}
}

function generateFoofHTML(eat, price, discription, i){
    return /*html*/ `
    <div class="food-container">
     <div class="food-border">
            <div>
            <h3 class="container-font">${eat}</h3>
            <span class="container-text"><I>${discription}</I></span><br>
            <h3 class="container-price">${price}0€</h3>
            </div>
            <div>
                <button class="addToBasket" onclick="addToBasket(${i})">+</button>
     </div>
     </div>
     
     `;
}


//------------packt das gewählte Produkt in den Warenkorb----------//
function addToBasket(i, index){

 document.getElementById('basketOverlay').classList.add('d-none');

    let product = products[i];
    
    if(cardProducts.includes(product)){
        let index = cardProducts.indexOf(product);
        amounts[index]++;
    }else{
        cardProducts.push(products[i]);
        cardPrices.push(prices[i]);
        amounts.push(1);
    }

    renderBasket();
    document.getElementById('payOrder').classList.remove('d-none');
    
}


    
function deleteFromBasket(i){
    const button = document.getAnimations('minus-button');
    let product = products[i];

    if(cardProducts.includes(product)){
        let index = cardProducts.indexOf(product);
        amounts[index]--;
        }
    else{
        cardProducts.splice(products[i]);
        cardPrices.splice(prices[i]);
        amounts.splice(1);

}
    renderBasket();
    

}

function renderBasket(){

let basket = document.getElementById('shopping-card-products');

let sum = 0;
basket.innerHTML = ``;
    for(let i =0; i < cardPrices.length; i++){
  
        let total = cardPrices[i] * amounts[i];
        sum += total;

         basket.innerHTML += generateBasketHTML(i, total),

    

    toPayIs(sum);
    checkProductsAmounts(i);
    }
    
}


function generateBasketHTML(i, total){
  
return /*html*/ ` 
    <div id="cartProduct${i}" class="cart-product">
        <div id="product-and-price${i}" class="cart-product-and-price">
        <div><b>${amounts[i]}x${cardProducts[i]}</b></div>
        <div>    ${total.toFixed(2)}€   </div>         
        </div>

        <div id="cartProductButtons${i}" class="cart-product-buttons">
        <div>Anmerkung hinzufügen</div>
         <div>   <button class="plus-minus-button" onclick="addAmount(${i})">+</button> <button class="plus-minus-button" onclick="deleteFromBasket(${i})">-</button></div>
        </div>
        </div>

    `;
    


}

function addAmount(i){
    
    amounts[i]++;
    renderBasket();
    
    
}

function checkProductsAmounts(i){
    let productAmounts = document.getElementById('cartProduct' +i);
    let orders = document.getElementById('shopping-cart-endprices');
    
    let amount = amounts[i];
    if(amount < 1){
        productAmounts.classList.add('d-none');
        orders.classList.add('d-none');
       
       
    

    }if(amount >= 1){
        productAmounts.classList.remove('d-none');
        orders.classList.remove('d-none');
        

    }

}

//----------berechnet den zu zahlenden Betrag-------------//
function toPayIs(sum){

    let orders = document.getElementById('shopping-cart-endprices');
    
    let topay = sum + 5;

    orders.innerHTML = `
    
    <div>
        Zwischensumme    <br>
        Lieferkosten   <br>
        <b>Gesamt        </b>
    </div>
    <div>
        ${sum.toFixed(2)}€<br>
        5.00€<br>
        <b>${topay.toFixed(2)}€</b>
    
    </div>
    `;

    if( topay > 20){

        document.getElementById('min-to-pay').classList.add('d-none')
        document.getElementById('paybtn').style.backgroundColor = "#125fca";
        document.getElementById('paybtn').style.color = "white";
    }if( topay < 20){
        document.getElementById('min-to-pay').classList.remove('d-none')
    }
}

function openbasket(){

    let basket = document.getElementById('main-container');

    document.getElementById('main-container').style.zIndex = "-2";
    document.getElementById('shopping-card').style.zIndex = "0";
    document.body.style.overflow = 'hidden';
    document.getElementById('openBasket').classList.add('d-none');
 
}

function closeBasket(){

    document.getElementById('main-container').style.zIndex = "2";
    document.getElementById('openBasket').classList.remove('d-none');
    document.body.style.overflow = 'auto';

}



    
    
    










    
  

    
    










    











