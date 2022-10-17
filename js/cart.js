let cartProd = document.getElementById('cartProd');
let cartProdArray = [];

async function cartInfo () {
    let cartUrl = await fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json');
    let cartProd = await cartUrl.json();
    cartProdArray = cartProd.articles;

    cartProductsFunc();
} 

function cartProductsFunc() {
    for (let product of cartProdArray) {
        cartProd.innerHTML += `
        <tr>
            <th scope="row" class=" col-3">
                <img class="rounded mx-auto d-block w-50" src="${product.image}">
            </th>
            <td class="text-center">${product.name}</td>
            <td class="text-center">${product.currency} ${product.unitCost}</td>
            <td class="text-center"> <input class="rounded" type="number" placeholder="Cant." style="width: 75px;" id="inp${product.id}" oninput="subTotalCalc(${product.id},${product.unitCost})"> </td>
            <td class="text-center"><b>${product.currency} <span id="totVal"></span></b></td>
        </tr>
        `
    }

}



function subTotalCalc(id,costU) {

    const cantidad = document.getElementById('inp'+id).value;
    const precioUnit = parseInt(costU);

    let resultado = cantidad * precioUnit;
    document.getElementById('totVal').innerHTML= resultado;
};

document.addEventListener("DOMContentLoaded", function() {
    getEmail()
    cartInfo();
})