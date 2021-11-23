
function change(){
    let changement=document.querySelector("input");
    changement.addEventListener("change", function(e){
        e.preventDefault()
        let settingPara = document.createElement("p");
        settingPara.textContent = `Qté : ` + this.value;
        console.log(this.value);
        console.log(settingPara);

    });    
}
cartPage();

async function cartPage(){
    let apiUrl = "http://localhost:3000/api/products";
    const maData = await findElt(apiUrl);
    if("undefined"===typeof(maData.error)){
        console.table(maData);
        
        maData.map(produit => { 
            newtab(produit);
        });
    } else{
        console.log(maData.message);
    }

    change();

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

        function afficheCart (affichePanier){
            
        
            let panier = document.querySelector("#cart__items");

            let articlePanier = document.createElement("article");
            articlePanier.setAttribute("class",".cart__items");
            articlePanier.setAttribute("data-id",eleInLstorage[i].idProduit);
            articlePanier.setAttribute("data-color",eleInLstorage[i].couleurProduit);

            let divImagePanier = document.createElement("div");
            divImagePanier.setAttribute("class","cart__item__img");

            let imagePanier = document.createElement("img");
            imagePanier.src = eleInLstorage[i].imageUrl;
            imagePanier.setAttribute("alt",eleInLstorage[i].altTxt);

            let divItemContent = document.createElement("div");
            divItemContent.setAttribute("class","cart__item__content");

            let divItemContent__Description = document.createElement("div");
            divItemContent__Description.setAttribute("class","cart__item__content__description");
            
            let panierH2 = document.createElement("h2");
            panierH2.textContent = eleInLstorage[i].name;

            let panierPara1 = document.createElement("p");
            panierPara1.textContent = eleInLstorage[i].couleurProduit;

            let panierPara2 = document.createElement("p");
            panierPara2.textContent = eleInLstorage[i].price + ` €`;

            let div__settings = document.createElement("div");
            div__settings.setAttribute("class","cart__item__content__settings");
            
            let div__settingsQuantity=document.createElement("div");
            div__settingsQuantity.setAttribute("class","cart__item__content__settings__quantity");

            let settingPara = document.createElement("p");
            settingPara.textContent = `Qté : ` + eleInLstorage[i].quantiteProduit;

            let settingInput = document.createElement("input");
            settingInput.setAttribute("type","number");
            settingInput.setAttribute("class","itemQuantity");
            settingInput.setAttribute("name","itemQuantity");
            settingInput.setAttribute("min","1");
            settingInput.setAttribute("max","100");
            settingInput.setAttribute("value",eleInLstorage[i].quantiteProduit )
            

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
                        
                      
        }
        

        }
    }   



