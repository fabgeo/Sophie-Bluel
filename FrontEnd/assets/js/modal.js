//----------------- Code pour la première modal ------------------------------
//  bouton "Modifier"
const modifierBtn = document.getElementById("button-modifer");

//  fenêtre modale
const modal = document.getElementById("myModal");

//  bouton de fermeture modale 1
const closeBtn = document.getElementsByClassName("close")[0];

//  bouton de fermeture modale 2
const closeBtn2 = document.getElementsByClassName("close2")[0];

// bouton "Modifier"
modifierBtn.addEventListener("click", function() {
  modal.style.display = "flex";
  generateModalGallery()
});

//  bouton de fermeture modale 1
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

//  bouton de fermeture modale 2
closeBtn2.addEventListener("click", function() {
  modal.style.display = "none";
});


// Fonction asynchrone pour générer la galerie modale
async function generateModalGallery() {
  try {
    console.log('Début de la galerie');

    // Effectue une requête pour récupérer les données des œuvres depuis l'API
    const response = await fetch('http://localhost:5678/api/works/');
    
    // Extrait les données JSON de la réponse
    const works = await response.json();
    
    // Sélectionne le conteneur où seront ajoutées les figures d'œuvres
    const workContainer = document.querySelector('.work-container');
    
    // Vide le conteneur avant de générer les nouvelles figures
    workContainer.innerHTML = '';

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
        // Mettez à jour la galerie après suppression
        deleteWork(workId, true);
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
    console.log('galerie générée')
    updateHomePage();
  
  } catch (error) {
    // Gère les erreurs survenues lors de la génération de la galerie
    console.error('Erreur', error);
  }
}

// Appelle la fonction pour générer la galerie modale
generateModalGallery();

// -----------------Fonction pour mettre à jour la page d'accueil--------------------------------------
async function updateHomePage() {
  try {
      // Envoi d'une requête GET à l'API pour récupérer les données sur les travaux
      const response = await fetch('http://localhost:5678/api/works/');
      
      // Conversion de la réponse en format JSON
      const works = await response.json();

      // Sélection de la galerie sur la page d'accueil et effacement de son contenu précédent
      const homeGallery = document.querySelector('.gallery');
      homeGallery.innerHTML = '';

      // Parcours de chaque travail récupéré
      works.forEach(work => {
          // Création d'un nouvel élément <figure>
          const figure = document.createElement('figure');
          
          // Attribution de l'attribut 'data-category' avec la catégorie du travail en minuscules
          figure.setAttribute('data-category', work.category.name.toLowerCase());

          // Création d'un élément <img> pour afficher l'image du travail
          const img = document.createElement('img');
          img.src = work.imageUrl;
          img.alt = work.title;

          // Création d'un élément <figcaption> pour afficher le titre du travail
          const figcaption = document.createElement('figcaption');
          figcaption.textContent = work.title;

          // Ajout de l'image et du titre à la figure
          figure.appendChild(img);
          figure.appendChild(figcaption);

          // Ajout de la figure à la galerie sur la page d'accueil
          homeGallery.appendChild(figure);
      });

      // Affichage d'un message de succès dans la console
      console.log('Page d\'accueil mise à jour');

  } catch (error) {
      // Gestion des erreurs : Affichage d'un message d'erreur dans la console
      console.error('Erreur lors de la mise à jour de la page d\'accueil :', error);
  }
}




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
// Fonction pour supprimer un travail (work) avec l'identifiant (workId)
function deleteWork(workId, updateGallery) {
  // Récupère le jeton d'authentification depuis le stockage local
  const token = localStorage.getItem('token');
  
  // Envoie une requête DELETE à l'API pour supprimer le travail avec l'identifiant spécifié
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE', // Utilise la méthode DELETE
    headers: {
      'Authorization': `Bearer ${token}`, // Ajoute le jeton d'authentification dans les en-têtes
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Gère la réponse HTTP de la requête
    if (!response.ok) {
      // Si la réponse n'est pas OK (code de statut différent de 200)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); // Retourne le texte de la réponse
  })
  .then(() => {
    // Gère la résolution de la promesse après la suppression réussie du travail
    const modalWorkFigure = modal.querySelector(`figure[data-work-id="${workId}"]`);
    const modalDeleteIcons = modal.querySelectorAll('.delete-icon-modal1');
    
    // Supprime la figure du travail de la modal si elle existe
    if (modalWorkFigure) {
      modalWorkFigure.remove();
    } else {
      console.log('Aucune figure trouvée', workId);
    }
    
    // Met à jour la galerie modale si nécessaire
    if (updateGallery) {
      generateModalGallery();
    }
  })
  .catch(error => {
    // Gère les erreurs lors de la suppression du travail
    console.error('Erreur lors de la suppression', error);
  });
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

// Sélectionne l'élément input de type file avec l'ID "photo-file"
const file = document.getElementById("photo-file");

// Ajoute un écouteur d'événements pour détecter les changements dans le champ de fichier
file.addEventListener("change", () => {
  // Sélectionne l'élément contenant l'image à afficher
  const imgContent = document.querySelector(".image-content");

  // Crée un élément img pour afficher l'image sélectionnée
  const img = document.createElement("img");

  // Vérifie si un fichier a été sélectionné
  if (!file) {
    alert("Veuillez sélectionner un fichier");
    return;
  }

  // Vérifie si la taille du fichier est supérieure à 10 Mo (10 000 000 octets)
  if (file.files[0].size >= 10000000) {
    alert("Fichier trop lourd");
    return;
  }

  // Vérifie si le type de fichier n'est pas une image JPEG, JPG, PNG ou WEBP
  if (
    file.files[0].type !== "image/jpeg" &&
    file.files[0].type !== "image/jpg" &&
    file.files[0].type !== "image/png" &&
    file.files[0].type !== "image/webp"
  ) {
    alert("Format de fichier invalide");
    return;
  }

  // Définit la source de l'image à partir de l'URL locale du fichier sélectionné
  img.src = URL.createObjectURL(file.files[0]);

  // Ajoute l'image à l'élément contenant l'image à afficher
  imgContent.appendChild(img);
});



document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-ajout");
  const validerButton = document.getElementById("valider");

  // Fonction pour vérifier si tous les champs sont remplis
  function verifierChamps() {
    const title = document.getElementById("photo-title").value;
    const category = document.getElementById("photo-category").value;
    const file = document.getElementById("photo-file").files[0];

    // Vérifier si tous les champs sont remplis et si un fichier a été sélectionné
    if (title && category && file && file.name) {
      validerButton.style.backgroundColor = '#1D6154'; // Mettre le bouton en vert
      validerButton.disabled = false; // Activer le bouton de validation
    } else {
      validerButton.style.backgroundColor = ''; // Remettre la couleur par défaut
      validerButton.disabled = true; // Désactiver le bouton de validation
    } 
  }

  // Ajouter un écouteur d'événements sur les champs pour vérifier à chaque changement
  form.addEventListener("change", verifierChamps);
  form.addEventListener("input", verifierChamps); // Utiliser input en plus de change pour certains navigateurs

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
  const file = image.files[0];
  const container = document.querySelector('.image-content');
  
  const faImage = document.querySelector('.fa-image');
  const photoLabel = document.querySelector('.photo');
  const descr = document.querySelector('.discr');
  
  image.style.display="none";
  faImage.style.display = 'none';
  photoLabel.style.display = 'none';
  descr.style.display = 'none';
});


//-----------------------------------------------------------------------

// Fonction asynchrone qui récupère l'ID d'une catégorie en fonction de son nom
async function getIdCategory(category) {
  try {
    // Effectue une requête GET vers l'API pour obtenir la liste des catégories
    const response = await fetch('http://localhost:5678/api/categories');

    // Récupère les données de la réponse au format JSON
    const data = await response.json();

    // Recherche la catégorie correspondant au nom fourni dans les données
    const foundCategory = data.find(cat => cat.name.toLowerCase() === category.toLowerCase());

    // Si la catégorie est trouvée, retourne son ID
    if (foundCategory) {
      console.log('Catégorie trouvée. ID:', foundCategory.id);
      return foundCategory.id;
    } else {
      // Sinon, lance une erreur indiquant que la catégorie n'a pas été trouvée
      throw new Error('Catégorie non trouvée');
    }
  } catch (error) {
    // En cas d'erreur lors de la récupération des catégories, affiche l'erreur dans la console
    console.error('Erreur lors de la récupération des catégories :', error);
    throw error; // Lance à nouveau l'erreur pour la gérer à un niveau supérieur si nécessaire
  }
}

  //--------------------------envoie du formulaire-----------------------------------------
 
  submit.addEventListener('click', async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du bouton submit qui est de recharger la page
  
    // Validation des champs
    if (!image.files[0]) { // Vérifie si aucun fichier image n'a été sélectionné
      alert('Veuillez sélectionner une image.'); // Affiche une alerte si aucun fichier image n'est sélectionné
      return; // Arrête l'exécution de la fonction
    }
    if (!title.value) { // Vérifie si le champ titre est vide
      alert('Veuillez entrer un titre.'); // Affiche une alerte si le champ titre est vide
      return; // Arrête l'exécution de la fonction
    }
    if (!category.value) { // Vérifie si aucune catégorie n'est sélectionnée
      alert('Veuillez sélectionner une catégorie.'); // Affiche une alerte si aucune catégorie n'est sélectionnée
      return; // Arrête l'exécution de la fonction
    }
  
    // Construction du formulaire FormData
    const formData = new FormData(); // Crée un nouvel objet FormData pour stocker les données du formulaire
    formData.append('image', image.files[0]); // Ajoute le fichier image sélectionné au FormData
    formData.append('title', title.value); // Ajoute la valeur du champ titre au FormData
    

  
    try {
      const categoryID = await getIdCategory(category.value); // Récupère l'ID de la catégorie sélectionnée
      formData.append('category', categoryID); // Ajoute l'ID de la catégorie au FormData
  
      // Envoi du formulaire
      const token = localStorage.getItem('token'); // Récupère le token d'authentification stocké localement
      const response = await fetch('http://localhost:5678/api/works', { // Envoie une requête POST à l'API avec les données du formulaire
        method: 'POST', // Utilise la méthode POST pour envoyer les données
        body: formData, // Utilise le FormData comme corps de la requête pour envoyer les données du formulaire
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token d'authentification dans les en-têtes de la requête
        },
      });
  
      if (response.status === 201) { // Vérifie si la requête a abouti avec succès (code 201 : Créé avec succès)
        const workContainer = document.querySelector('.work-container');
        workContainer.innerHTML = ''; // Efface le contenu du conteneur de travaux
        title.value = ''; // Réinitialise la valeur du champ titre à une chaîne vide
        category.value = ''; // Réinitialise la valeur du champ catégorie à une chaîne vide
  
        // Réinitialise la classe .image-content pour restaurer l'apparence par défaut
        const container = document.querySelector('.image-content');
        container.style.background = '';
        const faImage = document.querySelector('.fa-image');
        const photoLabel = document.querySelector('.photo');
        const descr = document.querySelector('.discr');


        
        faImage.style.display = 'flex';
        photoLabel.style.display = 'flex';
        descr.style.display = 'flex';
  
        generateModalGallery(); // Génère à nouveau la galerie modale avec les données mises à jour
  
        // Cache la modal d'ajout et affiche le contenu principal
        document.querySelector(".modalAjout").style.display = 'none';
        document.querySelector('.modal-content').style.display = 'flex';

        const img = document.querySelectorAll("#form-ajout > div.image-content > img");
        img.forEach(img => img.remove());
        
      } else {
        alert('Erreur ajout du projet'); // Affiche une alerte en cas d'erreur lors de l'ajout du projet
      }
    } catch (error) { // Gère les erreurs potentielles lors de l'envoi du formulaire
      console.error('Erreur envoi formulaire :', error); // Affiche l'erreur dans la console
    }
  });