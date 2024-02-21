//----------------- Code pour la première modal ------------------------------
//  bouton "Modifier"
const modifierBtn = document.getElementById("button-modifer");

//  fenêtre modale
const modal = document.getElementById("myModal");

//  bouton de fermeture
const closeBtn = document.getElementsByClassName("close")[0];

// bouton "Modifier"
modifierBtn.addEventListener("click", function() {
  modal.style.display = "block";
  generateModalPhoto()
});

//  bouton de fermeture
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});


async function generateModalPhoto() {
    const response = await fetch('http://localhost:5678/api/works/');

    
}