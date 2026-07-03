// VARIABLES GLOBALES
let teamName = "";

// CONFIGURATION DU GOOGLE FORM (À remplacer avec tes propres identifiants)
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc90OpdRfbT3H5qOg0n2AFDB3tvR6lYiFBIOnTuGfQoz9Hnjw/formResponse";
const ENTRY_TEAM = "entry.1003729373"; // ID du champ "Equipe"
const ENTRY_STEP = "entry.524045353"; // ID du champ "Etape"
const ENTRY_ANSWER = "entry.1654052452"; // ID du champ "Reponse"

// LES BONNES RÉPONSES AUX ÉNIGMES (En minuscules)
const ANSWER_STEP_1 = "poisson";
const ANSWER_STEP_2 = "3"; // Exemple : s'il y a 3 poissons gravés chez le bijoutier

// FONCTION INTERNE : ENVOI EN DIRECT AU TABLEAU DE BORD (GOOGLE SHEETS)
function sendLiveTracking(stepName, typedAnswer) {
  if (!GOOGLE_FORM_URL.includes("XXXXXXXXX")) {
    const formData = new FormData();
    formData.append(ENTRY_TEAM, teamName);
    formData.append(ENTRY_STEP, stepName);
    formData.append(ENTRY_ANSWER, typedAnswer);

    // Requête invisible en arrière-plan (mode no-cors requis pour Google Forms)
    fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    }).catch((err) => console.log("Erreur de tracking en direct."));
  }
}

// ACTION : BOUTON COMMENCER
function startGame() {
  const inputField = document.getElementById("team-name");
  const nameValue = inputField.value.trim();

  if (nameValue !== "") {
    teamName = nameValue;

    // Tracking du démarrage
    sendLiveTracking("Démarrage Jeu", "Équipe enregistrée");

    // Transition d'écran
    document.getElementById("step-0").classList.add("hidden");
    document.getElementById("step-1").classList.remove("hidden");
  } else {
    inputField.style.borderColor = "#ff6b6b";
  }
}

// ACTION : VALIDATION ÉTAPE 1 (TISSEUR)
function checkStep1() {
  const inputField = document.getElementById("input-step1");
  const answerGiven = inputField.value.trim().toLowerCase();
  const errorMsg = document.getElementById("error-1");

  if (answerGiven === "") return;

  // 1. Envoi IMMÉDIAT de la réponse (bonne ou fausse) vers ton Google Sheets
  sendLiveTracking("Étape 1 : Tisseur", answerGiven);

  // 2. Traitement de la réponse pour le joueur
  if (answerGiven === ANSWER_STEP_1) {
    errorMsg.classList.add("hidden");
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
  } else {
    errorMsg.classList.remove("hidden");
    inputField.style.borderColor = "#ff6b6b";
  }
}

// ACTION : VALIDATION ÉTAPE 2 (BIJOUTIER)
function checkStep2() {
  const inputField = document.getElementById("input-step2");
  const answerGiven = inputField.value.trim().toLowerCase();
  const errorMsg = document.getElementById("error-2");

  if (answerGiven === "") return;

  // 1. Envoi IMMÉDIAT de la réponse (bonne ou fausse) vers ton Google Sheets
  sendLiveTracking("Étape 2 : Bijoutier", answerGiven);

  // 2. Traitement de la réponse pour le joueur
  if (answerGiven === ANSWER_STEP_2) {
    errorMsg.classList.add("hidden");
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-final").classList.remove("hidden");
  } else {
    errorMsg.classList.remove("hidden");
    inputField.style.borderColor = "#ff6b6b";
  }
}
