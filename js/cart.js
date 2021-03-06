/* ------------------------le navigateur a complètement chargé le HTML et l’arborescence DOM est construite---------------------------------------------------*/

window.addEventListener("DOMContentLoaded", (event) => {
  choixPage();
});

/* ------------------------fonction pour choisir la page cart ou confirmation de commande---------------------------------------------------*/
function choixPage() {
  let params = new URLSearchParams(document.location.search);
  let urlId = params.get("orderId");
  console.log(urlId);
  if (urlId !== null) {
    localStorage.clear();
    const orderConfirmation = document.getElementById("orderId");
    orderConfirmation.textContent = urlId;
    orderConfirmation.style.backgroundColor = "green";
    orderConfirmation.style.color = "black";
    return false;
  } else {
    cartPage();
    gestionFormulaire();
  }
}

function cartPage() {
  let eleInLstorage = getStorage();
  if (eleInLstorage != null) {
    console.log(eleInLstorage);
    eleInLstorage.map((produit) => {
      eleInLstorage__itere(produit);
      console.table(produit);
    });
  } else {
    let panier = document.querySelector("#cart__items");
    let panierVide = document.createElement("p");
    let totalArticles = document.querySelector("#totalQuantity");
    totalArticles.textContent = "0";
    let totalPrice = document.querySelector("#totalPrice");
    totalPrice.textContent = "0";
    panierVide.textContent = "Vous n'avez aucun articles dans le panier.";
    panier.append(panierVide);
  }
}
async function eleInLstorage__itere(eleInLstorage__itere) {
  let apiUrl =
    `http://localhost:3000/api/products/` + eleInLstorage__itere.idProduit;
  const maData = await findElt(apiUrl);
  if ("undefined" === typeof maData.error) {
    delete maData.colors;
    maData["quantite"] = eleInLstorage__itere.quantiteProduit;
    maData["couleur"] = eleInLstorage__itere.couleurProduit;
    console.table(maData);
    afficheCart(maData);
  } else {
    console.log(maData.message);
  }
}

async function findElt(apiUrl) {
  try {
    const maReponse = await fetch(apiUrl);
    if (maReponse.ok) {
      return maReponse.json();
    }
  } catch (e) {
    return { error: true, message: e };
  }
}

/* ------------------------Recupére informations du local storage---------------------------------------------------*/
function getStorage() {
  let getStorage = JSON.parse(localStorage.getItem("panierLstorage"));
  return getStorage;
}

/* ------------------------fonction d'affichage des articles du panier---------------------------------------------------*/
function afficheCart(maData) {
  let panier = document.querySelector("#cart__items");

  let articlePanier = document.createElement("article");
  articlePanier.setAttribute("class", "cart__item");
  articlePanier.setAttribute("data-id", maData._id);
  articlePanier.setAttribute("data-color", maData.couleur);

  let divImagePanier = document.createElement("div");
  divImagePanier.setAttribute("class", "cart__item__img");

  let imagePanier = document.createElement("img");
  imagePanier.src = maData.imageUrl;
  imagePanier.setAttribute("alt", maData.altTxt);

  let divItemContent = document.createElement("div");
  divItemContent.setAttribute("class", "cart__item__content");

  let divItemContent__Description = document.createElement("div");
  divItemContent__Description.setAttribute(
    "class",
    "cart__item__content__description"
  );

  let panierH2 = document.createElement("h2");
  panierH2.textContent = maData.name;

  let panierPara1 = document.createElement("p");
  panierPara1.textContent = maData.couleur;

  let panierPara2 = document.createElement("p");
  panierPara2.textContent = maData.price + ` €`;

  let div__settings = document.createElement("div");
  div__settings.setAttribute("class", "cart__item__content__settings");

  let div__settingsQuantity = document.createElement("div");
  div__settingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  let settingPara = document.createElement("p");

  settingPara.textContent = `Qté : `;

  let settingInput = document.createElement("input");
  settingInput.setAttribute("type", "number");
  settingInput.setAttribute("class", "itemQuantity");
  settingInput.setAttribute("name", "itemQuantity");
  settingInput.setAttribute("min", "1");
  settingInput.setAttribute("max", "100");
  settingInput.setAttribute("value", maData.quantite);
  settingInput.unitPrice = maData.price;
  settingInput.addEventListener("change", function (e) {
    changeQty(e);
  });

  let div__settings__delete = document.createElement("div");
  div__settings__delete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  let settingInput__delete = document.createElement("p");
  settingInput__delete.setAttribute("class", "deleteItem");
  settingInput__delete.textContent = "Supprimer";
  settingInput__delete.addEventListener("click", function (e) {
    del(e);
  });

  panier.append(articlePanier);
  articlePanier.append(divImagePanier, divItemContent);
  divImagePanier.append(imagePanier);
  divItemContent.append(divItemContent__Description, div__settings);
  divItemContent__Description.append(panierH2, panierPara1, panierPara2);
  div__settings.append(div__settingsQuantity, div__settings__delete);
  div__settingsQuantity.append(settingPara, settingInput);
  div__settings__delete.append(settingInput__delete);
  total();
}
/* -------------------Fonction pour changer la quantité d'un article du panier---------------------------------------------------*/
function changeQty(e) {
  let quantite = e.target;
  console.log(quantite);
  let produit = e.target.closest(".cart__item").getAttribute("data-id");
  let couleur = e.target.closest(".cart__item").getAttribute("data-color");
  let tabElmToChange = getStorage();
  console.log(typeof tabElmToChange);

  for (let i in tabElmToChange) {
    if (
      produit === tabElmToChange[i].idProduit &&
      couleur === tabElmToChange[i].couleurProduit
    ) {
      tabElmToChange[i].quantiteProduit = e.target.value;
    }
    if (parseInt(e.target.value) < 0 || isNaN(parseInt(e.target.value))) {
      e.target.value = e.target.min;
    }
    console.log(tabElmToChange);
    quantite.setAttribute("value", e.target.value);
    let eleInLstorage = localStorage.setItem(
      "panierLstorage",
      JSON.stringify(tabElmToChange)
    );
  }
  total();
}

/* ------------------------Calcul du nombre d'article total dans le panier---------------------------------------------------*/
function total() {
  let totPrix = 0;
  let nbArticle = 0;
  let quantity = document.querySelectorAll(".itemQuantity");
  
  let i = 0;

  do {
    console.log(i);
    totPrix += parseInt(quantity[i].value) * quantity[i].unitPrice;
    nbArticle = nbArticle + parseInt(quantity[i].value);
    i++;
  } while (i < quantity.length);

  let totalPrice = document.querySelector("#totalPrice");
  totalPrice.textContent = totPrix;
  let totalArticles = document.querySelector("#totalQuantity");
  totalArticles.textContent = nbArticle;
}
/* ------------------------fonction de supression d'article du panier---------------------------------------------------*/
function del(e) {
  let idProduit = e.target.closest(".cart__item").getAttribute("data-id");
  let couleur = e.target.closest(".cart__item").getAttribute("data-color");
  let produit = e.target.closest(".cart__item");

  let newOne = [];
  let tabElmToChange = getStorage();
  for (let i = 0; i < tabElmToChange.length; i++) {
    if (
      idProduit != tabElmToChange[i].idProduit ||
      couleur != tabElmToChange[i].couleurProduit
    ) {
      newOne.push(tabElmToChange[i]);
    }
    localStorage.setItem("panierLstorage", JSON.stringify(newOne));
  }
  produit.remove();
  console.log(getStorage());
  if (getStorage().length == 0) {
    localStorage.removeItem("panierLstorage");
    let panier = document.querySelector("#cart__items");
    let panierVide = document.createElement("p");
    panier.append(panierVide);
    panierVide.textContent = "Vous n'avez aucun articles dans le panier.";
    document.querySelector("#totalPrice").textContent = "0";
    document.querySelector("#totalQuantity").textContent = "0";
  } else {
    total();
  }
}

/* ------------------------Gestion du formulaire---------------------------------------------------*/
function gestionFormulaire() {
  document.querySelector("form").setAttribute("novalidate", "");
  listenInput();
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    allInputForm();

    if (JSON.parse(localStorage.getItem("panierLstorage")) !== null) {
      if (eleInputSubmit() === true) {
       let eFormulaire = envoiFormulaire(infoInput());
        findOrderId(eFormulaire);
      }
    } else {
      window.confirm(
        "Votre panier est vide, cette commande ne peut pas aboutir."
      );
    }
    return false;
  });
}

/* -----------------------------------------------------------------------------------------------------------------------------------------
                    ---------------------Verification informations formulaire---------------------------------------------------*/

/*---------------Agir uniquement sur les inputs required---------------------------------*/
function allInputForm() {
  let input = document.querySelectorAll("input");
  input.forEach(function (input) {
    if (input.hasAttribute("required")) {
      checkInfo(input);
    }
  });
}
/*---------------input vide ou écoute d'evenement de chaques champs--------------------------------*/
function checkInfo(input) {
  let nameInputE = input.name + "ErrorMsg";
  let errorMsg = document.getElementById(nameInputE);
  let couleurErrorMsg = document.getElementById(input.name);

  if (input.value === "") {
    errorMsg.textContent = "Ce champ est obligatoire";
    errorMsg.style.color = "black";
    couleurErrorMsg.style.backgroundColor = "#B22B0B";
  }
}
/*---------------écoute d'évenement sur le focus et la sortit du focus, validation ou reset de l'input en fonction--------------------------------*/
function listenInput() {
  let input = document.querySelectorAll("input");
  input.forEach(function (input) {
    if (input.hasAttribute("required")) {
      input.addEventListener("focus", function (e) {
        resetInput(e);
      });
      input.addEventListener("blur", function (e) {
        if (validInput(e.target) === true) {
          e.target.style.backgroundColor = "#70E77F";
        } else {
          e.target.style.backgroundColor = "#B22B0B";
        }
      });
    }
  });
}
/*---------------Validation de l'input en sortie de focus(e.target en argumant) -----------Où au submit (input en argument)---------utilisation de regex------------*/
function validInput(element) {
  let nameInputE = element.name + "ErrorMsg";
  let errorMsg = document.getElementById(nameInputE);

  const regex1 =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,40}$/;
  const regexAdresse =
  /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð][a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,60}$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;

  if (element.value) {
    if (
      (element.name === "firstName" ||
        element.name === "lastName" ||
        element.name === "city") &&
      regex1.test(element.value)
    ) {
      console.log(element.name);
      errorMsg.textContent = "";
      console.log(regex1.test(element.value) + " nom");
      console.log("au submit");
      return true;
    }
    if (element.name == "address" && regexAdresse.test(element.value)) {
      errorMsg.textContent = "";
      console.log(element.name);
      console.log(regexAdresse.test(element.value) + " adresse");
      console.log("au submit");
      return true;
    }

    if (element.name === "email" && regexEmail.test(element.value)) {
      errorMsg.textContent = "";
      console.log(element.name);
      console.log(regexEmail.test(element.value) + " email");
      console.log("au submit");
      return true;
    } else {
      errorMsg.textContent = "Votre saisi est incorrect";
      errorMsg.style.color = "black";
    }
  } else {
    errorMsg.textContent = "Ce champ est obligatoire";
    errorMsg.style.color = "black";
  }
}
/*---------------reset du message d'erreur de l'input si il existe, en entrée du focus sur l'input--------------------------------*/
function resetInput(e) {
  let nameInputE = e.target.name + "ErrorMsg";
  let couleurErrorMsg = document.getElementById(e.target.name);
  let errorMsg = document.getElementById(nameInputE);
  couleurErrorMsg.style.backgroundColor = "white";
  errorMsg.textContent = "";
}
/*---------------recupération des valeurs de form --------------------------------*/
function infoInput() {
  let form = document.querySelector("form");
  let contact = new FormData(form);
  let objContact = {};
  console.log(contact);
  for (let key of contact.keys()) {
    console.log(key);
    objContact[key] = contact.get(key);
  }
  console.log(objContact);
  return objContact;
}
/* ------------------------Regroupement information formulaire pour envoie---------------------------------------------------*/
function envoiFormulaire(info) {
  let idProduct = JSON.parse(localStorage.getItem("panierLstorage"));

  let product = [];
  for (let elem of idProduct) {
    product.push(elem.idProduit);
  }
  const eFormulaire = {
    contact: info,
    products: product,
  };
  console.table(eFormulaire);
  return eFormulaire;
}
/* ------------------------envoie info Formulaire vers API, Reponse API---------------------------------------------------*/
function findOrderId(eFormulaire) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(eFormulaire),
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let commandeId = data.orderId;
      let urlPage = document.location.href;
      let confirmationPage =
        urlPage.replace("cart.html", "confirmation.html?orderId=") + commandeId;
      window.location = confirmationPage;
    })
    .catch((err) => {
      console.log(err);
    });
}
/* ------------------------constitution d'un tableau de valeur boolean true pour validation de formulaire---------------------------------------------------*/
function eleInputSubmit() {
  let tabTrue = [];
  let input = document.querySelectorAll("input");
  input.forEach(function (input) {
    if (input.hasAttribute("required")) {
      tabTrue.push(validInput(input));
      return tabTrue;
    }
  });

  let validSubmit = tabTrue.includes(undefined);
  if (validSubmit === true) {
    console.log(tabTrue);
    console.log(validSubmit);
    return false;
  }
  return true;
}
