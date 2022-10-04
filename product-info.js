let num_coment = 0;

function CeroIzq(tiempo){
    if(tiempo>=10){
        return tiempo;
    } else {
        return '0'+tiempo;
    }
}

function fechaCompleta(fecha){
    let año = fecha.getFullYear()
    let mes = CeroIzq(fecha.getMonth());
    let dia = CeroIzq(fecha.getDate());
    let horas = CeroIzq(fecha.getHours());
    let min = CeroIzq(fecha.getMinutes());
    let Seg = CeroIzq(fecha.getSeconds())

    return año+'-'+mes+'-'+dia +' '+horas+':'+min+':'+Seg;
}

function puntuación(puntos){
    var estrellas='';
    for(let i=0; i<5; i++){
        if(i<puntos){
            estrellas+='<i class="fas fa-star checked"></i>'
        }else{
            estrellas+='<i class="far fa-star "></i>'
        }        
    }
    return estrellas;
}

function mostrarProducto(prod) {
    let htmlContentProdInfo = "";
    let htmlContentComentarios = "";
    let htmlContentRelated = "";

    htmlContentProdInfo = ` 
        <h2>${prod.name}</h2><br>
        <hr>
        <p><strong>Precio</strong><br>${prod.currency} ${prod.cost}</p>
        <p><strong>Descripcion</strong><br>${prod.description}</p>
        <p><strong>Categoria</strong><br>${prod.category}</p>
        <p><strong>Cantidad de vendidos</strong><br>${prod.soldCount}</p>
        <p><strong>Imágenes Ilustrativas</strong><br></p>
        <div class="row justify-content-md-center">`

    for (image of prod.images){
        htmlContentProdInfo += `
            <div class="col">
                <img src="`+image+`" alt="product image" class="img-thumbnail">
            </div>
        `
    }

    htmlContentComentarios = `</div>
    <div>
    <br><br><br><br> 
    <h4>Comentarios</h4>            
    </div>
    
    <ul class="list-group mb-3" id="commentList-container">
    
    </ul>
    <h4>Comentar:</h4>  
        <div class="row">
        <div class="col-4">
                <label for="opinion">Tu opinión:</label>
                <textarea name="opinion" class="form-control " id="opinión"></textarea>
        </div>
        <div class="row">
        <div class="col-2 my-3">
        <label for="puntaje" class="ml-auto">Tu puntuación</label>
        <select name="puntaje" class="custom-select form-select d-block w-100" id="puntaje">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        </div>
        </div>
    ` 

    htmlContentRelated = `
    <h4>Productos relacionados</h4> 
    <div class="row justify-content-md-start">
    `
    let i=0;
    for(let related of prod.relatedProducts){

        htmlContentRelated+=`
            <div class="col-3 cursor-active" onclick="setProdID(` + related.id + `)">
                <img src="`+related.image+`" alt="product image" id="img`+i+`"  class="img-thumbnail">
                <label for="img`+i+`">`+related.name+`</label>
            </div>
         `
        i++;
        }
    
    document.getElementById("prod-info-container").innerHTML = htmlContentProdInfo;
    document.getElementById("comentarios-container").innerHTML = htmlContentComentarios;
    document.getElementById("related-container").innerHTML = htmlContentRelated;
}

function mostrarComentarios(listaComment) {
    let htmlContentListComent = ""
    if(listaComment != null){
        for (let i=0; i<listaComment.length; i++){
            let comentario = listaComment[i];
            if(comentario.product == prodId){
                num_coment+=1 
                htmlContentListComent= `
                <li class="list-group-item d-flex justify-content-between lh-condensed " id="coment"`+num_coment+`">
                    <div class="row w-100" >
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between" >
                                    <h6 class="my-0"> <strong>`+comentario.user+`</strong> `+comentario.dateTime+` `+puntuación(comentario.score)+`  </h6><br>
                            </div>
                                    <small class="text-muted">`+comentario.description+`</small>    
                        </div>
                    </div>
                </li> `
            }document.getElementById("commentList-container").innerHTML+=htmlContentListComent;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    prodId = localStorage.getItem("prodID");
    getJSONData(PRODUCT_INFO_URL + prodId + EXT_TYPE).then(function(resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;
            mostrarProducto(producto)
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodId + ".json").then(function (resultObj){
        if (resultObj.status === "ok") {
            listaDeComentarios = resultObj.data;
            com_ant=listaDeComentarios.length;
            mostrarComentarios(listaDeComentarios)
            
    }
})
})
