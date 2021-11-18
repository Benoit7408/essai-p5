principaleProduct();


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
            
    }
        
     else{
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
    let nameProduct = document.getElementById("title");
    nameProduct.textContent= monKanap.name;

    let priceProduct = document.getElementById("price");
    priceProduct.textContent= priceConversion(monKanap.price);

    let descriptProduct = document.getElementById("description");
    descriptProduct.textContent= monKanap.description;

    oneProduct.append(imgProduct);
    
}

/*------------------ fonction pour la proposition des options de couleur-------------------------*/

function optionKanap(couleur){
   console.log(couleur);
   let newOptionColors = document.createElement("option");
   newOptionColors.textContent= couleur;
   let selectOption = document.querySelector("select");
   selectOption.append(newOptionColors);
}

/*------------------ fonction pour l'affichage de prix en euros-------------------------*/

function priceConversion(prixCent){

    let price = prixCent / 100 ;
    // faire ajout pour deux chiffre apres virgule

    return price

}


/*------------------ gestion du pannier-------------------------*/

function choixElementForOrder(monKanap){

    const monPanier = document.querySelector("#addToCart");
    monPanier.addEventListener("click",function (){
    
    const optionColors = document.querySelector("#colors");
    const choixColors = optionColors.value;
    const quantiteElt= document.querySelector("#quantity");
    const choixQuantite = quantiteElt.value;
    let panier = {
        nomProduit : monKanap.name,
        quantitéProduit : choixQuantite,
        couleurProduit : choixColors,
        prix:choixQuantite * priceConversion (monKanap.price),
    };

    console.log(panier);

/*------------------ location stockage-------------------------*/

    let eleInLstorage = JSON.parse(localStorage.getItem("panierLstorage"));
    console.log(eleInLstorage);
        if(eleInLstorage){
            eleInLstorage.push(panier);

        } else{
            eleInLstorage = [];
            eleInLstorage.push(panier);
            localStorage.setItem("panierLstorage",JSON.stringify(eleInLstorage));
            console.log(eleInLstorage);
        }
    })  
}