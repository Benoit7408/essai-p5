window.addEventListener("DOMContentLoaded", (event) => {
    principaleProduct();
  });

/*------------------ fonction principale qui utilise le resultat des autres fonctions -------------------------*/
async function principaleProduct(){
    const myProductUrl = `http://localhost:3000/api/products/` + findEltUrl("id");
    console.log(myProductUrl);
    const monKanap = await fetchProduct(myProductUrl);
    console.table(monKanap);
    if("undefined"===typeof(monKanap.error)){
            console.log(monKanap);
            console.log(monKanap.colors);
            afficheOneElement(monKanap);
            monKanap.colors.map(couleur => { 
                optionKanap(couleur);
            });
    }else{
        console.log(monKanap.message);
    }
    console.table(monKanap.colors);
    choixElementForOrder(monKanap);
  
}
/*------------------ fonction qui va chercher l'id -------------------------*/
function findEltUrl(elt){

    let EltUrl= new URLSearchParams(window.location.search);
    return EltUrl.get(elt);
}
/*------------------ fonction qui retourne le fetch de l'url avec l'id -------------------------*/

 async function fetchProduct(myProductUrl){
    
    try {
    const myProduct = await fetch(myProductUrl);
    console.log(myProduct);
    if(myProduct.ok){
        return myProduct.json();
    }
    } catch (e) {
        return {error: true, message: e}; 
    }
}

/*------------------ fonction qui va afficher les éléments -------------------------*/

function afficheOneElement(monKanap){
    
    let oneProduct = document.getElementsByClassName("item__img")[0];

    let imgProduct = document.createElement("img");
    imgProduct.src = monKanap.imageUrl;
    imgProduct.setAttribute("alt",monKanap.altTxt);
    let nameProduct = document.getElementById("title");
    nameProduct.textContent= monKanap.name;

    let priceProduct = document.getElementById("price");
    priceProduct.textContent= monKanap.price;

    let descriptProduct = document.getElementById("description");
    descriptProduct.textContent= monKanap.description;
    
    let quantiteElt = document.querySelector("#quantity");
    quantiteElt.setAttribute("value", quantiteElt.min); 

    oneProduct.append(imgProduct); 
    defaultQChange();
}

function defaultQChange(){
    let quantiteElt = document.querySelector("#quantity");
    quantiteElt.addEventListener("change",function (){
        console.log(typeof quantiteElt.value)
        if (parseInt(quantiteElt.value) < 0 ){
            quantiteElt.value = quantiteElt.min
        }
    });
}
/*------------------ fonction pour la proposition des options de couleur-------------------------*/

function optionKanap(couleur){
   console.log(couleur);
   let newOptionColors = document.createElement("option");
   newOptionColors.textContent= couleur;
   let selectOption = document.querySelector("select");
   selectOption.append(newOptionColors);
}

/*------------------ gestion du pannier-------------------------*/

function choixElementForOrder(monKanap){

    const monPanier = document.querySelector("#addToCart");
    monPanier.addEventListener("click",function (){

    const optionColors = document.querySelector("#colors");
    const choixColors = optionColors.value;
    const quantiteElt= document.querySelector("#quantity");
    const choixQuantite = quantiteElt.value;
        if (( choixQuantite <= 0) || (choixColors ==="")){
            window.alert ("vous devez choisir une quantité  et une couleur");   
        }else{
            let panier = {
            idProduit: monKanap._id,
            quantiteProduit: choixQuantite,
            couleurProduit: choixColors,
            };
            lStorage(panier);
        }
    });
}  


/*------------------ location stockage-------------------------*/

function lStorage(panier){

    let eleInLstorage = JSON.parse(localStorage.getItem("panierLstorage"));
    console.log(eleInLstorage);

    if(eleInLstorage!==null){

        console.log("le panier n'est pas vide");

        let la__condition__est = false;
        eleInLstorage.forEach(function boucle(elem__it){
            if (elem__it.idProduit == panier.idProduit && elem__it.couleurProduit == panier.couleurProduit){
                elem__it.quantiteProduit = parseInt(panier.quantiteProduit) + parseInt(elem__it.quantiteProduit);
                window.alert ("Votre produit est ajouté au panier");
                console.log(typeof elem__it.quantiteProduit);
                la__condition__est =true;
                console.log(`Des element identique dans le panier : ` + la__condition__est );
            }
        });
            if (!la__condition__est) {
                eleInLstorage.push(panier);
                console.log(eleInLstorage);
                window.alert ("Votre produit est ajouté au panier");
            }
        localStorage.setItem("panierLstorage",JSON.stringify(eleInLstorage));

    }else{
        console.log("le panier est vide");
        eleInLstorage = [];
        eleInLstorage.push(panier);
        localStorage.setItem("panierLstorage",JSON.stringify(eleInLstorage));
        console.log(eleInLstorage);
        window.alert ("Votre produit est ajouté au panier");
    }  
} 
