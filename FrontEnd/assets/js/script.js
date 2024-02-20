// ************ Apparition des images ***********

// Envoie une requête GET à l'URL spécifiée (l'API des works) pour récupérer les données
fetch('http://localhost:5678/api/works/')
  // Gère la réponse de la requête en la convertissant en JSON
  .then(response => response.json()) 
  // Traite les données récupérées
  .then(works => {
    // Sélectionne l'élément HTML avec la classe 'gallery' où les images seront affichées
    const gallery = document.querySelector('.gallery');

    // Parcourt chaque work (travail) dans les données récupérées
    works.forEach(work => {
      // Crée un élément <figure> pour chaque work
      const figure = document.createElement('figure');
      // Définit l'attribut 'data-category' de la figure pour filtrage futur (si nécessaire)
      figure.setAttribute('data-category', work.category.name.toLowerCase());
     
      // Crée un élément <img> pour afficher l'image du work
      const img = document.createElement('img');
      img.src = work.imageUrl; // URL de l'image
      img.alt = work.title; // Texte alternatif de l'image (pour l'accessibilité)

      // Crée un élément <figcaption> pour afficher le titre du work
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title; // Titre du work

      // Ajoute l'image et le titre au <figure>
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Ajoute la <figure> à la galerie
      gallery.appendChild(figure);
    });
  })
  // Gère les erreurs qui pourraient survenir lors de la récupération des données
  .catch(error => console.error('Erreur lors de la récupération des works :', error));


// Récupère l'élément HTML avec l'ID 'portfolio' où les boutons seront ajoutés
const portfolioSection = document.getElementById('portfolio');

// Crée les boutons de filtrage pour les catégories spécifiées
const categories = ['tous', 'objets', 'appartements', 'hotels & restaurants'];
const buttonsContainer = document.createElement('div'); // Crée un conteneur pour les boutons
buttonsContainer.id = 'buttons'; // Définit l'ID du conteneur
buttonsContainer.classList.add('button-container'); // Ajoute une classe pour personnaliser les styles CSS

// Parcourt chaque catégorie et crée un bouton pour chaque catégorie
categories.forEach(category => {
    const button = document.createElement('button'); // Crée un bouton
    button.textContent = category; // Définit le texte du bouton
    button.classList.add('filter-button'); // Ajoute une classe pour personnaliser les styles CSS
    button.addEventListener('click', () => filtrerElements(category)); // Ajoute un écouteur d'événements pour filtrer les éléments lors du clic sur le bouton
    buttonsContainer.appendChild(button); // Ajoute le bouton au conteneur
});

// Ajoute le conteneur de boutons à la section du portfolio dans le HTML
portfolioSection.appendChild(buttonsContainer);

// Récupère l'élément HTML avec la classe 'gallery' où les éléments seront filtrés
const gallery = document.querySelector('.gallery');

// Fonction pour filtrer les éléments en fonction de la catégorie sélectionnée
function filtrerElements(categorie) {
    const elements = gallery.querySelectorAll('figure'); // Sélectionne tous les éléments <figure> dans la galerie
    elements.forEach(element => {
        if (categorie === 'tous' || element.dataset.category === categorie) {
            element.style.display = 'block'; // Affiche l'élément s'il correspond à la catégorie sélectionnée ou si la catégorie est 'Tous'
        } else {
            element.style.display = 'none'; // Masque l'élément s'il ne correspond pas à la catégorie sélectionnée
        }
    });
}

/* Farouk */
const buttonFiltre = document.querySelectorAll('.filter-button');
buttonFiltre.forEach(function(button) {
  button.addEventListener('click', function(e) {
    categories.forEach(function(category) {
      if (category === e.target.textContent) {
        filtrerElements(e.target.textContent);
      }
    })
  });
});



























