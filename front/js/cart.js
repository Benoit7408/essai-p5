window.addEventListener("DOMContentLoaded", (event) => {
    cartPage();
  });


function cartPage(){
    
    let eleInLstorage = getStorage();
    if (eleInLstorage != null){
        console.log(eleInLstorage)
        eleInLstorage.map(produit => { 
            eleInLstorage__itere(produit);
            console.table(produit)   
        });
    } else {
        let panier = document.querySelector("#cart__items");
        let panierVide = document.createElement("p");
        let totalArticles = document.querySelector("#totalQuantity");
        totalArticles.textContent= "0";
        let totalPrice = document.querySelector("#totalPrice");
        totalPrice.textContent="0";
        panierVide.textContent= "Vous n'avez aucun articles dans le panier.";
        panier.append(panierVide);
    }

    async function eleInLstorage__itere(eleInLstorage__itere){
        
        let apiUrl = `http://localhost:3000/api/products/`+ eleInLstorage__itere.idProduit ;
        const maData = await findElt(apiUrl);
        if("undefined"===typeof(maData.error)){
            delete maData.colors;
            maData["quantite"] = eleInLstorage__itere.quantiteProduit;
            maData["couleur"] = eleInLstorage__itere.couleurProduit;
            console.table(maData);
            afficheCart(maData);
            
            
        } else{
            console.log(maData.message);
        }

    }

 async function findElt(apiUrl){
    
    try { 
 
     const maReponse = await fetch(apiUrl);
     if(maReponse.ok){
      return maReponse.json();   
     }
 
    } catch(e) {
        return {error: true, message: e};  
    } 
  }

}

function getStorage(){

    let getStorage = JSON.parse(localStorage.getItem("panierLstorage"));
        
        return getStorage;
}

function afficheCart (maData){

    let panier = document.querySelector("#cart__items");

    let articlePanier = document.createElement("article");
    articlePanier.setAttribute("class","cart__item");
    articlePanier.setAttribute("data-id",maData._id);
    articlePanier.setAttribute("data-color",maData.couleur);

    let divImagePanier = document.createElement("div");
    divImagePanier.setAttribute("class","cart__item__img");

    let imagePanier = document.createElement("img");
    imagePanier.src = maData.imageUrl;
    imagePanier.setAttribute("alt",maData.altTxt);

    let divItemContent = document.createElement("div");
    divItemContent.setAttribute("class","cart__item__content");

    let divItemContent__Description = document.createElement("div");
    divItemContent__Description.setAttribute("class","cart__item__content__description");
    
    let panierH2 = document.createElement("h2");
    panierH2.textContent = maData.name;

    let panierPara1 = document.createElement("p");
    panierPara1.textContent = maData.couleur;

    let panierPara2 = document.createElement("p");
    panierPara2.textContent = maData.price + ` €`;

    let div__settings = document.createElement("div");
    div__settings.setAttribute("class","cart__item__content__settings");
    
    let div__settingsQuantity=document.createElement("div");
    div__settingsQuantity.setAttribute("class","cart__item__content__settings__quantity");
    let settingPara = document.createElement("p");
    
    settingPara.textContent = `Qté : `;
    
    let settingInput = document.createElement("input");
    settingInput.setAttribute("type","number");
    settingInput.setAttribute("class","itemQuantity");
    settingInput.setAttribute("name","itemQuantity");
    settingInput.setAttribute("min","1");
    settingInput.setAttribute("max","100");
    settingInput.setAttribute("value",maData.quantite);
    settingInput.unitPrice= maData.price;
    settingInput.quantite= maData.quantite;
    settingInput.addEventListener("change", function(e){
        changeQty(e,settingInput,maData._id,maData.couleur);
        });

        
     
        
    let div__settings__delete = document.createElement("div");
    div__settings__delete.setAttribute("class","cart__item__content__settings__delete");

    let settingInput__delete = document.createElement("p");
    settingInput__delete.setAttribute("class","deleteItem");
    settingInput__delete.textContent = "Supprimer";
    settingInput__delete.addEventListener("click", function(e){
       
        let produit = maData._id;
        let couleur = maData.couleur;
        del(produit,couleur)
      // location.reload()
    });

    panier.append(articlePanier);
    articlePanier.append(divImagePanier,divItemContent);
    divImagePanier.append(imagePanier);
    divItemContent.append(divItemContent__Description,div__settings)
    divItemContent__Description.append(panierH2,panierPara1,panierPara2);
    div__settings.append(div__settingsQuantity,div__settings__delete);
    div__settingsQuantity.append(settingPara,settingInput);
    div__settings__delete.append(settingInput__delete);
    nombreArticle()
   // prixTotal(settingInput.unitPrice,settingInput.quantite)
}

function changeQty( e ,itemQuantity,idProduct,couleurProduct){
    
    if (isNaN(itemQuantity.value) || itemQuantity.value <= 0){
        itemQuantity.value = 1
    }
    let tabElmToChange = getStorage()
    let produit = idProduct;
    let couleur = couleurProduct;

    for (let i = 0; i < tabElmToChange.length; i++){
        if (produit === tabElmToChange[i].idProduit && couleur === tabElmToChange[i].couleurProduit){
            
                tabElmToChange[i].quantiteProduit= itemQuantity.value;
                console.log(itemQuantity.value);
                console.log(tabElmToChange[i].quantiteProduit);
                console.table(tabElmToChange); 
        }
        console.log(tabElmToChange)
        let eleInLstorage = localStorage.setItem("panierLstorage",JSON.stringify(tabElmToChange));
    }

    nombreArticle();
   // prixTotal();
   
}

function del(produit,couleur){
        
    let newOne = []
    let tabElmToChange = getStorage()
    for (let i = 0; i < tabElmToChange.length; i++){
        if (produit != tabElmToChange[i].idProduit || couleur != tabElmToChange[i].couleurProduit){
            
            newOne.push(tabElmToChange[i])
            
        }
    localStorage.setItem("panierLstorage",JSON.stringify(newOne)); 
    if(getStorage() == []) {
        console.log(essai)
       localStorage.removeItem(panierLstorage);
    } 
    
    }
}

function nombreArticle(){
    
    let articles = document.querySelectorAll(".itemQuantity");
    console.log(articles);
    let NbArticles = 0;
    for (let i = 0; i< articles.length; i++){
        NbArticles = NbArticles +articles[i].valueAsNumber ;
        console.log(NbArticles);
    }
    let totalArticles = document.querySelector("#totalQuantity") 
    totalArticles.textContent = NbArticles;
}
   
/*function prixTotal(prixUnitaire,quantite){
    let prix = 0
    let quantity = document.querySelectorAll(".itemQuantity");
  
    for (let i = 0; i<quantity.length; i++){
        prix +=
        console.log(prix);
        console.log(parseInt(quantity[i].value));
        console.log(prixUnitaire);
        prix = parseInt(quantity[i].value) * prixUnitaire;
        console.log(prix);
        
    }
    
    let totalPrice = document.querySelector("#totalPrice"); 
    totalPrice.textContent = autre;
 
}*/

/* ------------------------formulaire---------------------------------------------------*/
document.getElementById("order").addEventListener("click", function(e){
    e.preventDefault();
    let contact = formulaire()
    envoiFormulaire(contact);

});

function formulaire(){

    let inputs = document.querySelectorAll( "form input");
    console.log(inputs);

    let formInfo = {};
    const regex = /^[-a-zéèîç'ï]{2,20}$|^[-A-ZÉÈÎÏ']{2,20}$|^[A-ZÉÈÏ'][-a-zéèîï]*$/;
    const regexAdresse = /^[-a-z0-9éèçàî'"]{5,20}$|^[-A-Z0-9ZÉÈÏ''"]{5,20}$|^[A-Z0-9ZÉÈÏ''"][-a-zéèîï]*$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
    var allData = true;
    for (let i = 0; i<5; i++){
        
        if(inputs[i].value){
            let nom = inputs[i].name +"ErrorMsg";
            let noError = inputs[i].name +"ErrorMsg";
            
            if((!regex.test(inputs[i].value)) && ((inputs[i].name === "firstName") || (inputs[i].name === "lastName") || (inputs[i].name === "city")) ){
                document.getElementById(`${nom}`).textContent = "une erreur de sasie";
                allData = false;
                break;
            }else{
                document.getElementById(`${noError}`).textContent = " ";
            } 
            if((!regexAdresse.test(inputs[i].value)) && inputs[i].name === "address"){
                document.getElementById(`${nom}`).textContent = "une erreur de sasie";
                allData = false;
                break;
            }else{
                document.getElementById(`${noError}`).textContent = " ";
            }
            
            if((!regexEmail.test(inputs[i].value)) && inputs[i].name === "email"){
                document.getElementById(`${nom}`).textContent = "une erreur de sasie";
                allData = false;
                break;
            }else{
                document.getElementById(`${noError}`).textContent = " ";
            }
            
        }else{
            let nom = inputs[i].name +"ErrorMsg";
            document.getElementById(`${nom}`).textContent = "remplir les element";
            break;
        }
        let nom = inputs[i].name;
        formInfo[`${nom}`]= inputs[i].value;
    }  
        
    console.log(allData);
    if (allData === true){
        return formInfo
    }      
        
   
    
    
   }
    
    function envoiFormulaire(info){
        
        localStorage.setItem("contact", JSON.stringify(info));
        let idProduct=JSON.parse(localStorage.getItem("panierLstorage"));
       
        let product=[]
        for (let i=0; i<idProduct.length; i++){
           product.push(idProduct[i].idProduit);
        }
        console.log (product)
   
        const envoiFormulaire = {
        contact : info,
        products : product
    }
    console.log(envoiFormulaire);
    }