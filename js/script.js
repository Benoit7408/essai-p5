/* ------------------------le navigateur a complètement chargé le HTML et l’arborescence DOM est construite---------------------------------------------------*/

window.addEventListener("DOMContentLoaded", (event) => {
  principale();
});

/* ------------------------fonction asynchrone pour la réception des données suite au fetch et la résolution des promesses---------------------------------------------------*/

async function principale() {
  let apiUrl = "http://localhost:3000/api/products";
  const maData = await findElt(apiUrl);
  if ("undefined" === typeof maData.error) {
    console.table(typeof maData);
    maData.map((produit) => {
      afficheElt(produit);
      console.table(produit);
    });
  } else {
    console.log(maData.message);
  }
  console.log(maData);
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

/* ------------------------construction du DOM suite au map---------------------------------------------------*/

function afficheElt(dataItem) {
  let getIdItems = document.getElementById("items");
  let newAncre = document.createElement("a");
  newAncre.href = "./product.html?id=" + dataItem._id;
  let newArticle = document.createElement("article");

  let newImage = document.createElement("img");
  newImage.src = dataItem.imageUrl;
  newImage.setAttribute("alt", dataItem.altTxt);

  let newPetitTitre = document.createElement("h3");
  newPetitTitre.classList.add(".productName");
  newPetitTitre.textContent = dataItem.name;

  let newPara = document.createElement("p");
  newPara.classList.add(".productDescription");
  newPara.textContent = dataItem.description;
  newArticle.append(newImage, newPetitTitre, newPara);
  newAncre.append(newArticle);

  getIdItems.append(newAncre);
}
