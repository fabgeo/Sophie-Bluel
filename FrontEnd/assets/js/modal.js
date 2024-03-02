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
  generateModalGallery()
});

//  bouton de fermeture
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});


// Fonction asynchrone pour générer la galerie modale
async function generateModalGallery() {
  try {
    console.log('Début de la génération de la galerie');

    // Effectue une requête pour récupérer les données des œuvres depuis l'API
    const response = await fetch('http://localhost:5678/api/works/');
    
    // Extrait les données JSON de la réponse
    const works = await response.json();
    
    // Sélectionne le conteneur où seront ajoutées les figures d'œuvres
    const workContainer = document.querySelector('.work-container');
    
    // Vide le conteneur avant de générer les nouvelles figures
    workContainer.innerHTML = '';
    
    // Vérifie s'il y a des œuvres à afficher
    if (works.length === 0) {
      console.log('Aucune œuvre trouvée.');
    }

    // Parcourt chaque œuvre pour créer une figure correspondante dans la galerie
    works.forEach(work => {
      console.log('Création d\'une figure pour l\'œuvre :', work.title);
      
      // Crée un élément figure pour chaque œuvre
      const figure = document.createElement('figure');
      
      // Attribue des attributs personnalisés pour l'ID de l'œuvre et sa catégorie
      figure.setAttribute('data-work-id', work.id);
      figure.setAttribute('data-category', work.category.name.toLowerCase());
  
      // Crée une balise img pour afficher l'image de l'œuvre
      const img = document.createElement('img');
      img.src = work.imageUrl;
      img.alt = work.title;
      
      // Crée une balise figcaption pour afficher le titre de l'œuvre
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title;
      
      // Crée un conteneur pour les icônes de modification/suppression
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      
      // Crée un conteneur pour l'icône de suppression
      const iconContainer = document.createElement('div');
      iconContainer.classList.add('icon-container');
      
      // Crée une icône pour la suppression de l'œuvre
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.classList.add('fa-solid');
      deleteIcon.classList.add('fa-trash-can');
      deleteIcon.classList.add('delete-icon-modal1'); 

      // Ajoute un événement de clic pour supprimer l'œuvre lorsque l'icône est cliquée
      deleteIcon.addEventListener('click', function() {
        let workId = work.id;
        console.log('Avant deleteWork');
        // Mettez à jour la galerie après suppression
        deleteWork(workId, true);
        console.log('Après deleteWork');
      });
      
      // Ajoute l'icône de suppression dans son conteneur
      iconContainer.appendChild(deleteIcon);
      
      // Ajoute le conteneur d'icônes dans le conteneur d'images
      imageContainer.appendChild(iconContainer);
    
      // Ajoute l'image et le titre dans la figure
      figure.appendChild(imageContainer);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      
      // Ajoute la figure dans le conteneur d'œuvres
      workContainer.appendChild(figure);
    });

    // Met à jour la page d'accueil après la génération de la galerie
    // updateHomePage();
  
  } catch (error) {
    // Gère les erreurs survenues lors de la génération de la galerie
    console.error('Erreur', error);
  }
}

// Appelle la fonction pour générer la galerie modale
generateModalGallery();









// Sélectionne le bouton "Ajouter une photo" dans le document
const ajoutPhotoBtn = document.querySelector("#ajouter-photo");

// Ajoute un écouteur d'événements au clic sur le bouton "Ajouter une photo"
ajoutPhotoBtn.addEventListener("click", function(event) {
  // Empêche la propagation de l'événement de clic jusqu'au document
  event.stopPropagation();

  // Cache la modal existante qui affiche la galerie de photos
  document.querySelector(".modal-content").style.display = "none";

  // Affiche la modal de l'ajout de photo en changeant son style d'affichage à "flex"
  document.querySelector(".modalAjout").style.display = "flex";

  // Sélectionne le bouton de retour dans la modal d'ajout de photo
  const boutonRetour = document.querySelector(".fa-arrow-left-long");

  // Ajoute un écouteur d'événements au clic sur le bouton de retour
  boutonRetour.addEventListener("click", function(event) {
    // Empêche le comportement par défaut du bouton (qui serait de recharger la page)
    event.preventDefault();

    // Cache la modal d'ajout de photo
    document.querySelector(".modalAjout").style.display = "none";

    // Affiche à nouveau la modal de la galerie de photos en changeant son style d'affichage à "flex"
    document.querySelector(".modal-content").style.display = "flex";
  });
});
