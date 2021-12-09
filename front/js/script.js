window.addEventListener("DOMContentLoaded", (event) => {
    principale();
  });



 async function principale(){
    let apiUrl = "http://localhost:3000/api/products";
    const maData = await findElt(apiUrl);
    if("undefined"===typeof(maData.error)){
        console.table(maData);
        maData.map(produit => { 
            afficheElt(produit);
        });
        
    } else{
        console.log(maData.message);
    }
    console.log(maData);

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

function afficheElt(dataItem){

    let getIdItems = document.getElementById("items");
    let newAncre = document.createElement("a");
    newAncre.href = "./product.html?id=" + dataItem._id;
    let newArticle = document.createElement("article");

    let newImage = document.createElement("img");
    newImage.src = dataItem.imageUrl;

    let newPetitTitre = document.createElement("h3");
    newPetitTitre.classList.add(".productName");
    newPetitTitre.textContent = dataItem.name;

    let newPara = document.createElement("p");
    newPara.classList.add(".productDescription");
    newPara.textContent=dataItem.description;

    
    

    newArticle.append(newImage, newPetitTitre, newPara);
    newAncre.append(newArticle);
    
    getIdItems.append(newAncre);
}






/*AfficheElt()
 
  
function AfficheElt(){


maData.forEach(function(dataItem){
    console.log(dataItem.imageUrl)

let getIdItems = document.getElementById("items");
let newAncre = document.createElement("a");
let newArticle = document.createElement("article");

let newImage = document.createElement("img");
newImage.src = dataItem.imageUrl;

let newPetitTitre = document.createElement("h3");
newPetitTitre.classList.add(".productName");
newPetitTitre.innerHTML = dataItem.name;

let newPara = document.createElement("p");
newPara.classList.add(".productDescription");
newPara.innerHTML=dataItem.description;

getIdItems.appendChild(newAncre);
newAncre.appendChild(newArticle);
newArticle.appendChild(newImage);
newArticle.appendChild(newPetitTitre);
newArticle.appendChild(newPara);

})

}
*/