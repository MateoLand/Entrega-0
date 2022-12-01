let cartProd = document.getElementById("cartProd");
let cartProdArray = [];

document.addEventListener("DOMContentLoaded", function () {
  getEmail();
  cartInfo();
  document.getElementById("card-number").disabled = true;
  document.getElementById("card-code").disabled = true;
  document.getElementById("card-expiration-date").disabled = true;
  document.getElementById("bank-account-number").disabled = true;
  actualizarCostos();

});

async function cartInfo() {
  let cartUrl = await fetch(
    "https://japceibal.github.io/emercado-api/user_cart/25801.json"
  );
  let cartProd = await cartUrl.json();
  cartProdArray = cartProd.articles;

  cartProductsFunc();
  actualizarCostos();
}

function cartProductsFunc() {
  for (let product of cartProdArray) {
    cartProd.innerHTML += `
        <tr>
            <th scope="row" class=" col-3">
                <img class="rounded mx-auto d-block w-50" src="${product.image}">
            </th>
            <td class="text-center">${product.name}</td>
            <td class="text-center" id = "idCostoUnit">${product.currency} ${product.unitCost}</td>
            <td class="text-center"> <input class="rounded" type="number" min = "1" value = "1" placeholder="Cant." style="width: 75px;" id="inp${product.id}" oninput="subTotalCalc(${product.id},${product.unitCost})"> </td>
            <td class="text-center"><b>USD<span id="totVal"> ${product.unitCost}</span></b></td>
        </tr>
        `;
  }
}

function subTotalCalc(id, costU) {
  const cantidad = document.getElementById("inp" + id).value;
  const precioUnit = parseInt(costU);

  let resultado = cantidad * precioUnit;
  document.getElementById("totVal").innerHTML = " " + resultado;
  document.getElementById("general-subtotal").innerHTML =
    "USD" + " " + resultado;

  const radioButtons = document.querySelectorAll(
    'input[name="shiptment-type"]'
  );
  let selectedSize;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedSize = radioButton.value;
      break;
    }
  }

  if (selectedSize == "premium") {
    seleccionoPremium();
  }
  if (selectedSize == "express") {
    seleccionoExpress();
  }
  if (selectedSize == "standard") {
    seleccionoStandard();
  }
  actualizarCostos();
}

function actualizarInputs() {
  for (let product of cartProdArray) {
    const cantidad = document.getElementById("inp" + product.id).value;
    const precioUnit = parseInt(product.unitCost);

    let resultado = cantidad * precioUnit;
    document.getElementById("totVal").innerHTML = " " + resultado;
    document.getElementById("general-subtotal").innerHTML =
      "USD" + " " + resultado;

    const radioButtons = document.querySelectorAll(
      'input[name="shiptment-type"]'
    );
    let selectedSize;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedSize = radioButton.value;
        break;
      }
    }

    if (selectedSize == "premium") {
      seleccionoPremium();
    }
    if (selectedSize == "express") {
      seleccionoExpress();
    }
    if (selectedSize == "standard") {
      seleccionoStandard();
    }
  }
}

function actualizarTransferencia() {
  const radioButtons = document.querySelectorAll('input[name="payMethod"]');
  let selectedSize;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedSize = radioButton.value;
      break;
    }
  }

  if (selectedSize == "credit-card") {
    document.getElementById("bank-account-number").value = "";
    document.getElementById("card-number").disabled = false;
    document.getElementById("card-code").disabled = false;
    document.getElementById("card-expiration-date").disabled = false;
    document.getElementById("bank-account-number").disabled = true;
    document.getElementById("pay-method-selected").innerHTML =
      "Tarjeta de crédito";
  }
  if (selectedSize == "bank-transfer") {
    document.getElementById("card-number").value = "";
    document.getElementById("card-code").value = "";
    document.getElementById("card-expiration-date").value = "";
    document.getElementById("card-number").disabled = true;
    document.getElementById("card-code").disabled = true;
    document.getElementById("card-expiration-date").disabled = true;
    document.getElementById("bank-account-number").disabled = false;
    document.getElementById("pay-method-selected").innerHTML =
      "Transferencia Bancaria";
  }
}

function validacion() {
  let formulario = document.getElementById("address-and-shipment");
  if (formulario.reportValidity()) {
    alert("Compra exitosa");
  } else {
    const radioButtons = document.querySelectorAll('input[name="payMethod"]');
    let selectedSize;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedSize = radioButton.value;
        break;
      }
    }
    const radioButtons1 = document.querySelectorAll(
      'input[name="shiptment-type"]'
    );
    let selectedSize1;
    for (const radioButton of radioButtons1) {
      if (radioButton.checked) {
        selectedSize1 = radioButton.value;
        break;
      }
    }

    let calle = document.getElementById("address-street").value;
    let numero = document.getElementById("address-number").value;
    let esquina = document.getElementById("corner-street").value;
    let numeroCredito = document.getElementById("card-number").value;
    let codigo = document.getElementById("card-code").value;
    let expiracion = document.getElementById("card-expiration-date").value;
    let cuentaBanco = document.getElementById("bank-account-number").value;
    let frase = "Falta: ";

    if (calle.length == 0) {
      frase += ", calle";
    }
    if (numero.length == 0) {
      frase += ", Numero";
    }
    if (esquina.length == 0) {
      frase += ", Esquina";
    }

    if (selectedSize == "credit-card") {
      if (numeroCredito.length == 0) {
        frase += ", Número de tarjeta";
      }
      if (codigo.length == 0) {
        frase += ", Código de seg.";
      }
      if (expiracion.length == 0) {
        frase += ", Vencimiento(MM/AA)";
      }
    } else if (selectedSize == "bank-transfer") {
      if (cuentaBanco.length == 0) {
        frase += ", Número de cuenta";
      }
    } else {
      frase += ", Forma de pago";
    }
    if (
      selectedSize1 != "premium" &&
      selectedSize1 != "express" &&
      selectedSize1 != "standard"
    ) {
      frase += ", Tipo de envío";
    }

    frase += ".";

    frase = alteracion(frase);
    alert(frase);
  }
}

function alteracion(frase) {
  let aux1 = frase.substring(8);
  let aux2 = frase.substring(0, 6);
  return aux2 + aux1;
}

function actualizarCostos() {
  for (let product of cartProdArray) {
    const cantidad = document.getElementById("inp" + product.id).value;
    const precioUnit = parseInt(product.unitCost);
    let costo = product.unitCost;
    let shipping = document.getElementById("shipping-cost").innerHTML;
    let resultado = cantidad * precioUnit;
    const radioButtons = document.querySelectorAll(
      'input[name="shiptment-type"]'
    );
    let selectedSize;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedSize = radioButton.value;
        break;
      }
    }

    document.getElementById("general-subtotal").innerHTML =
      "USD " + costo * cantidad;
    if (shipping != "No has seleccionado tipo de envío") {
      if (selectedSize == "standard") {
        document.getElementById("total-cost").innerHTML =
          "USD " + Math.round(resultado * 0.05 + resultado);
      }
      if (selectedSize == "express") {
        document.getElementById("total-cost").innerHTML =
          "USD " + Math.round(resultado * 0.07 + resultado);
      }
      if (selectedSize == "premium") {
        document.getElementById("total-cost").innerHTML =
          "USD " + Math.round(resultado * 0.15 + resultado);
      }
    } else {
      document.getElementById("total-cost").innerHTML = "USD " + resultado;
    }
  }
}

function seleccionoPremium() {
  for (let product of cartProdArray) {
    const cantidad = document.getElementById("inp" + product.id).value;
    const precioUnit = parseInt(product.unitCost);
    let resultado = cantidad * precioUnit;
    document.getElementById("shipping-cost").innerHTML =
      "USD" + " " + Math.round(resultado * 0.15);
    document.getElementById("total-cost").innerHTML =
      "USD" + " " + Math.round(resultado * 0.15 + resultado);
  }
}

function seleccionoExpress() {
  for (let product of cartProdArray) {
    const cantidad = document.getElementById("inp" + product.id).value;
    const precioUnit = parseInt(product.unitCost);
    let resultado = cantidad * precioUnit;
    document.getElementById("shipping-cost").innerHTML =
      "USD" + " " + Math.round(resultado * 0.07);
    document.getElementById("total-cost").innerHTML =
      "USD" + " " + Math.round(resultado * 0.07 + resultado);
  }
}

function seleccionoStandard() {
  for (let product of cartProdArray) {
    const cantidad = document.getElementById("inp" + product.id).value;
    const precioUnit = parseInt(product.unitCost);
    let resultado = cantidad * precioUnit;
    document.getElementById("shipping-cost").innerHTML =
      "USD" + " " + Math.round(resultado * 0.05);
    document.getElementById("total-cost").innerHTML =
      "USD" + " " + Math.round(resultado * 0.05 + resultado);
  }
}


