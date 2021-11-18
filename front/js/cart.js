

    
    let panier = document.querySelector("#cart__items");

    let articlePanier = document.createElement("article")
    articlePanier.setAttribute("class",".cart__items")
    articlePanier.setAttribute("id","#id")

    panier.append(articlePanier);

    let divImagePanier = document.createElement("div");
    divImagePanier.setAttribute("class","cart__item__img");

    let imagePanier = document.createElement("img");
   // imagePanier.src = dataItem.imageUrl;

   divImagePanier.append(imagePanier);

    let divImageContent = document.createElement("div");
    divImageContent.setAttribute("class","cart__item__content");

    let divImageContent__Description = document.createElement("div");
    divImageContent__Description.setAttribute("class","cart__item__content__description");
    
        let panierH2 = document.createElement("h2");
        panierH2.textContent = sessionStorage.getItem("name");

        let panierPara1 = document.createElement("p")
        panierPara1.textContent = "sdfgsdf";

        let panierPara2 = document.createElement("p")
        panierPara2.textContent = "sdfgsdf";

    divImageContent__Description.append(panierH2,panierPara1,panierPara2);

    let div__settings = document.createElement("div");
    div__settings.setAttribute("class","cart__item__content__settings");
    
    let div__settingsQuantity=document.createElement("div");
    div__settingsQuantity.setAttribute("class","cart__item__content__settings__quantity");

    div__settings.append(div__settingsQuantity);

        let settingPara = document.createElement("p")
        settingPara.textContent = "sdfgsdf";

        let settingInput = document.createElement("input")
        settingInput.setAttribute("class","itemQuantity")
        settingInput.textContent = "sdfgsdf";

        div__settingsQuantity.append(settingPara,settingInput);

    let div__settings__delete = document.createElement("div");
    div__settings__delete.setAttribute("class","cart__item__content__settings--delete");

        let settingInput__delete = document.createElement("p")
        settingInput__delete.setAttribute("class","itemQuantity")
        settingInput__delete.textContent = "sdfgsdf";

        div__settings__delete.append(settingInput__delete);

        divImageContent.append(divImageContent__Description,div__settings)

        articlePanier.append(divImagePanier,divImageContent);
    
