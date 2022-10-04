let productsArray = [];
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_REL = "Rel.";

let currentCategoriesArray = undefined;
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function showProductsList(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    htmlContentToAppend +=
      `
        <div onclick="setProdID(` + product.id + `)" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      product.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      product.name +
      " - USD " +
      product.cost +
      `</h4> 
                        <p> ` +
      product.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      product.soldCount +
      ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function setProdID(id){
  localStorage.setItem("prodID", id);
  window. location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function () {
  let catId = localStorage.getItem("catID");
  getJSONData(PRODUCTS_URL + catId + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      Arry = resultObj.data;
      let productsArray = Arry.products
      showProductsList(productsArray);
    }
  });
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST, productsArray);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST, productsArray);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_REL, productsArray);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList(Arry.products);
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }
      let filtrado = Arry.products.filter( producto => producto.cost >= minCount && producto.cost <= maxCount);
      showProductsList(filtrado);
    });
});

/******************************************************************/

function sortProducts(criteria, array) {
  console.log(array);
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function sortAndShowProducts(sortCriteria, Arry) {
  currentSortCriteria = sortCriteria;

  if (Arry != undefined) {
    currentCategoriesArray = Arry;
  }

  currentCategoriesArray = sortProducts(
    currentSortCriteria,
    currentCategoriesArray
  );

  showProductsList();
}


