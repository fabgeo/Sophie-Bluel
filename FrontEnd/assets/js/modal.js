//----------------- Code pour la première modal ------------------------------
//  bouton "Modifier"
const modifierBtn = document.getElementById("button-modifer");

//  fenêtre modale
const modal = document.getElementById("myModal");

//  bouton de fermeture
const closeBtn = document.getElementsByClassName("close")[0];

//  bouton de fermeture
const closeBtn2 = document.getElementsByClassName("close2")[0];

// bouton "Modifier"
modifierBtn.addEventListener("click", function() {
  modal.style.display = "flex";
  generateModalGallery()
});

//  bouton de fermeture
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

//  bouton de fermeture
closeBtn2.addEventListener("click", function() {
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
    updateHomePage();
  
  } catch (error) {
    // Gère les erreurs survenues lors de la génération de la galerie
    console.error('Erreur', error);
  }
}

// Appelle la fonction pour générer la galerie modale
generateModalGallery();






//----------------- Code pour la deuxième modal ----------------------------------


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


//----------------- Code pour la fonction de suppression -------------------------
// Fonction pour supprimer un work avec l'ID 
function deleteWork(workId, updateGallery) {
  // Récupère le jeton 
  const token = localStorage.getItem('token');
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); 
  })
  .then(() => {
    const modalWorkFigure = modal.querySelector(`figure[data-work-id="${workId}"]`);
    const modalDeleteIcons = modal.querySelectorAll('.delete-icon-modal1');
    
    if (modalWorkFigure) {
      modalWorkFigure.remove();
    } else {
      console.log('Aucune figure trouvée dans la modal1 pour le work ID:', workId);
    }
    if (updateGallery) {
      generateModalGallery();
    }
  })
  
  .catch(error => console.error('Erreur lors de la suppression du work :', error));
}


//---------------------------pour fermer la 2 modal--------------------------------

// Récupérer la deuxième modal
const modalAjout = document.querySelector(".modalAjout");
document.addEventListener("click", function(event) {
  if (event.target !== modalAjout && !modalAjout.contains(event.target)) {
    
    modalAjout.style.display = "none";
    document.querySelector(".modal-content").style.display = "flex";
  }
});


// ********** code pour afficher la photo **********************//

const file = document.getElementById("photo-file");
file.addEventListener("change", () => {
  const imgContent = document.querySelector(".image-content");
  const img = document.createElement("img");
  if (!file) {
    alert("Veuillez sélectionner un fichier");
    return;
  }
  if (file.files[0].size >= 10000000) {
    alert("Fichier trop lourd");
    return;
  }
  if (
    file.files[0].type !== "image/jpeg" &&
    file.files[0].type !== "image/jpg" &&
    file.files[0].type !== "image/png" &&
    file.files[0].type !== "image/webp"
  ) {
    alert("Format de fichier invalide");
    return;
  }
  img.src = URL.createObjectURL(file.files[0]);
  imgContent.appendChild(img);
});

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-ajout");
  const validerButton = document.getElementById("valider");

  // Fonction pour vérifier si tous les champs sont remplis
  function verifierChamps() {
    const champsRemplis = document.querySelectorAll('#photo-file:valid, #photo-title:valid, #photo-category:valid');
    if (champsRemplis.length === 3) {
      validerButton.style.backgroundColor = '#1D6154'; // Mettre le bouton en vert
    } else {
      validerButton.style.backgroundColor = ''; // Remettre la couleur par défaut
    } 
  }

  // Ajouter un écouteur d'événements sur le formulaire pour vérifier les champs à chaque changement
  form.addEventListener("change", verifierChamps);
  
  // Au chargement initial de la page
  verifierChamps();
});

//------code formulaire(ajout photo)-------------------------------------------
//Aperçu photo avant upload
const image = document.getElementById('photo-file');
const title = document.getElementById('photo-title');
const category = document.getElementById('photo-category');
const submit = document.getElementById('valider');

// Événement lorsque l'utilisateur sélectionne une image
image.addEventListener('change', function(event) {
  // const file = image.files[0];
  // const container = document.querySelector('.image-content');
  // container.style.background = 'center / contain no-repeat url(' + URL.createObjectURL(file) + ')';
  
  const faImage = document.querySelector('.fa-image');
  const photoLabel = document.querySelector('.photo');
  const descr = document.querySelector('.discr');
  
  image.style.display="none";
  faImage.style.display = 'none';
  photoLabel.style.display = 'none';
  descr.style.display = 'none';
});




  //--------------------------envoie du formulaire-----------------------------------------
 
  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Formulaire soumis avec succès');
  
    // Validation des champs
    if (!image.files[0]) {
      alert('Veuillez sélectionner une image.');
      return;
    }
    if (!title.value) { 
      alert('Veuillez entrer un titre.');
      return;
    }
    if (!category.value) { 
      alert('Veuillez sélectionner une catégorie.');
      return;
    }
  // Construction du formulaire FormData
    const formData = new FormData();
    formData.append('image', image.files[0]);
    formData.append('title', title.value);
    formData.append('category', category.value);
  
    try {
      const categoryID = await getIdCategory(category.value);
      formData.append('category', categoryID);
  
      // Envoi du formulaire 
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      
  
      if (response.status === 201) {
        const workContainer = document.querySelector('.work-container');
        workContainer.innerHTML = '';
        title.value = '';
        category.value = '';
  
        // Restaurer la classe .image-content
        const container = document.querySelector('.image-content');
        container.style.background = '';
        const faImage = document.querySelector('.fa-image');
        const photoLabel = document.querySelector('.photo');
        const descr = document.querySelector('.discr');
        const photofile = document.getElementById('photo-file');
        
        photofile.style.display = "block";
        faImage.style.display = 'block';
        photoLabel.style.display = 'block';
        descr.style.display = 'block';
        
      
        generateModalGallery();
  
        document.querySelector(".modalAjout").style.display = 'none';
        document.querySelector('.modal-content').style.display = 'flex';
      } else {
        alert('Erreur ajout du projet');
      }
    } catch (error) {
      console.error('Erreur envoi du formulaire :', error);
    }
  });