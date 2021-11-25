

cartPage();

function cartPage(){

    let eleInLstorage = JSON.parse(localStorage.getItem("panierLstorage"));
    eleInLstorage.map(produit => { 
        eleInLstorage__itere(produit);
        console.table(produit)
    });

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
        
        settingPara.textContent = `Qté : ` + maData.quantite;
    
        let settingInput = document.createElement("input");
        settingInput.setAttribute("type","number");
        settingInput.setAttribute("class","itemQuantity");
        settingInput.setAttribute("name","itemQuantity");
        settingInput.setAttribute("min","1");
        settingInput.setAttribute("max","100");
        settingInput.setAttribute("value",maData.quantite )
        
        






        let div__settings__delete = document.createElement("div");
        div__settings__delete.setAttribute("class","cart__item__content__settings__delete");

        let settingInput__delete = document.createElement("p");
        settingInput__delete.setAttribute("class","deleteItem");
        settingInput__delete.textContent = "Supprimer";

        panier.append(articlePanier);
        
            articlePanier.append(divImagePanier,divItemContent);

                    divImagePanier.append(imagePanier);

            divItemContent.append(divItemContent__Description,div__settings)

                divItemContent__Description.append(panierH2,panierPara1,panierPara2);

                div__settings.append(div__settingsQuantity,div__settings__delete);

                    div__settingsQuantity.append(settingPara,settingInput);

                    div__settings__delete.append(settingInput__delete);
                    


change(settingInput,settingPara, `Qté : `)

function change(elementEcoute,elementDOM__modif,nameValeurAffi ){

    elementEcoute.addEventListener("change", function (e) {

    const target = e.target;
    console.log(target)

    if (target.matches("input")){
        let newValue=this.value;
        elementDOM__modif.textContent = nameValeurAffi  + newValue;
        settingInput.setAttribute("value", newValue )
    }
        
})}

                    

deleteVal (settingInput__delete,settingPara, `Aucun ` + maData.name + ` en commande`);

function deleteVal( elementEcoute,elementDOM__modif,valeurAffi ){

    elementEcoute.addEventListener("click", function(e){

        const target = e.target;
        console.log(target);
    
        if (target.matches("p")){
            elementDOM__modif.textContent = valeurAffi;
            settingInput.setAttribute("value", 0);
        }
        
    })
}

tot()

function tot(){

    let total = document.querySelectorAll(".cart__item__content__description>p:nth-child(3)");
    console.table(total);
    let newtab =Array.from(total) ;
    console.log(newtab)
    let b =0 
    newtab.map(function (somme){
        b = b+newtab.innerText;
        
        console.log(b)
    })
    }

    
}



    

    
  



    /*
function newtab(ele){

    

    let eleInLstorage = JSON.parse(localStorage.getItem("panierLstorage"));
    
    for (let i = 0; i < eleInLstorage.length; i++){
        

        if (ele._id === eleInLstorage[i].idProduit){
            eleInLstorage[i]["name"] = ele.name;
            eleInLstorage[i]["price"] = ele.price;
            eleInLstorage[i]["imageUrl"] = ele.imageUrl;
            eleInLstorage[i]["altTxt"] = ele.altTxt;
            eleInLstorage[i]["description"] = ele.description;
            
            afficheCart(eleInLstorage)
            console.table(eleInLstorage)
        }
*/