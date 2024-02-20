// Attente du chargement du contenu de la page pour s'assurer que le script s'exécute après le chargement du contenu HTML de la page
document.addEventListener("DOMContentLoaded", function () {
    
  // Partie pour gérer le formulaire de connexion
  
  // Récupération des éléments du formulaire de connexion
  const loginForm = document.getElementById("user-login-form"); // Formulaire de connexion
  const loginURL = "http://localhost:5678/api/users/login"; // URL de l'API de connexion
  const emailInput = document.getElementById("email"); // Champ d'e-mail
  const passwordInput = document.getElementById("password"); // Champ de mot de passe
  const errorContainer = document.getElementById("error-message"); // Conteneur pour les messages d'erreur

  // Vérification de l'existence du formulaire de connexion
  if (loginForm) {
      // Ajout d'un écouteur d'événements pour la soumission du formulaire
      loginForm.addEventListener("submit", async function (event) {
          event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

          // Récupération de l'e-mail et du mot de passe saisis par l'utilisateur
          const email = emailInput.value;
          const password = passwordInput.value;

          try {
              // Envoi de la requête de connexion au serveur au format JSON
              const response = await fetch(loginURL, {
                  method: "POST",
                  headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json;charset=utf-8",
                  },
                  body: JSON.stringify({ email, password })
              });

              // Gestion des réponses du serveur en fonction de leur statut
              if (response.ok) {
                  // Si la réponse est OK, l'utilisateur est connecté avec succès
                  const userData = await response.json();
                  localStorage.setItem("token", userData.token); // Enregistrement du jeton d'authentification dans le stockage local
                  window.location.href = "./index.html"; // Redirection vers la page d'accueil
              
              } else if (response.status === 401) {
                  // Si le statut de la réponse est 401, le mot de passe saisi est invalide
                  errorContainer.textContent = "Le mot de passe saisi est invalide.";
              } else if (response.status === 404) {
                  // Si le statut de la réponse est 404, l'e-mail saisi est invalide
                  errorContainer.textContent = "L'e-mail saisi est invalide.";
              } else {
                  // Si le statut de la réponse n'est ni 200 ni 401 ni 404, une erreur générale s'est produite
                  errorContainer.textContent = "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
                  console.error('Erreur lors de la connexion:', response.statusText);
              }
          } catch (error) {
              // Gestion des erreurs inattendues survenues lors de la connexion
              errorContainer.textContent = "Une erreur inattendue s'est produite lors de la connexion. Veuillez réessayer.";
              console.error('Erreur inattendue lors de la connexion:', error.message);
          }
      });
  }
});

//  ************Fin du code de gestion du formulaire de connexion******



// **********code Gestion de l'interface utilisateur******
// Attend que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {

  // Récupération des éléments HTML nécessaires pour la gestion de l'interface utilisateur
  const baliseLogin = document.querySelector('.login-logout'); // Le bouton de connexion/déconnexion
  const header = document.querySelector('header'); // L'en-tête de la page
  const modeEdition = document.querySelector('.mode-edition'); // Élément de mode d'édition
  const buttonModifer = document.querySelector('#button-modifer'); // Bouton de modification
  const buttonFiltr = document.querySelector('.filter'); // Bouton de filtrage

  // Met à jour l'interface utilisateur une fois que le DOM est chargé
  updateUI();

  // Ajoute un écouteur d'événements au bouton de connexion/déconnexion
  if (baliseLogin) {
      baliseLogin.addEventListener('click', EtatConnexion);
  }

  // Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
  function updateUI() {
      
      // Récupère le jeton d'authentification depuis le stockage local
      const token = localStorage.getItem('token');
      // Vérifie si l'utilisateur est connecté en vérifiant si le jeton est présent
      const isLoggedIn = token !== null;

      // Change le texte du bouton de connexion/déconnexion en fonction de l'état de connexion
      baliseLogin.innerHTML = isLoggedIn ? 'logout' : 'login';
     
      // Affiche ou masque le bouton de modification en fonction de l'état de connexion
      buttonModifer.style.display = isLoggedIn ? 'inline-flex' : 'none';
      // Affiche ou masque le bouton de filtrage en fonction de l'état de connexion
      buttonFiltr.style.display = isLoggedIn ? 'none' : 'inline-flex';
      
      // Modifie la marge de l'en-tête en fonction de l'état de connexion
      header.style.margin = isLoggedIn ? '110px 0px 50px 0px' : '50px 0px 50px 0px';
     
      // Affiche ou masque l'élément de mode d'édition en fonction de l'état de connexion
      modeEdition.style.display = isLoggedIn ? 'flex' : 'none';
  }

  // Fonction pour gérer la connexion/déconnexion de l'utilisateur
  function EtatConnexion() {
      // Récupère le jeton d'authentification depuis le stockage local
      const token = localStorage.getItem('token');
      
      // Si l'utilisateur est connecté, le déconnecte en supprimant le jeton
      if (token) {
          localStorage.removeItem('token');
           
          // Met à jour l'interface utilisateur
          updateUI();
      } else {
          // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
          window.location.href= "login.html"
      }
  }
});







