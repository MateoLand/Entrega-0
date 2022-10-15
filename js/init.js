const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function getEmail(){
  let email = localStorage.getItem("mail")
    if (email == null) {
        alert("Vaya a Loggearse >:(");
        location.href = "login.html";
    } else {
        document.getElementById("email").innerHTML = `
        <div class="collapse navbar-collapse" id="navbarDarkDropdown">
              <ul class="navbar-nav w-100 justify-content-between">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDarkDropdownLinks" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ${email}
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="login.html" onclick="localStorage.removeItem('gmail')">Cerrar sesión</a></li>
                  </ul>
                </li>
              </ul>
        
        </div>`;
    }
}

function setProdID(id){
  localStorage.setItem("prodID", id);
  window. location = "product-info.html"
}