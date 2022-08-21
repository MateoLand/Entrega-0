

document.addEventListener("DOMContentLoaded", function(){
    let email = sesionStorage.getItem("mail")
    if (email == null){
        alert("Vaya a Loggearse >:(");
        this.location.href = "login.html";
    } else {
        this.document.getElementById("email").innerHTML = email;
    }
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});