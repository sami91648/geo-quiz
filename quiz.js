// ============================================================
// 🌍 GEO QUIZ — QUIZ.JS
// ============================================================

// ============================================================
// ✦ DOODLES — 50 partout sur l'écran
// ============================================================

function creerDoodles() {
    const ancien = document.querySelector(".doodles");

    if (ancien) {
        ancien.remove();
    }

    const doodles = document.createElement("div");
    doodles.className = "doodles";

    const symboles = [
        "✦", "✧", "◇", "★", "☆",
        "✷", "✺", "△", "◆", "✹",
        "⬦", "○", "✿", "❖", "✸"
    ];

    for (let i = 0; i < 50; i++) {
        const span = document.createElement("span");

        span.textContent =
            symboles[Math.floor(Math.random() * symboles.length)];

        span.style.left = `${Math.random() * 100}%`;
        span.style.fontSize = `${14 + Math.random() * 30}px`;
        span.style.animationDuration = `${12 + Math.random() * 14}s`;
        span.style.animationDelay = `${-Math.random() * 25}s`;
        span.style.opacity = `${0.12 + Math.random() * 0.25}`;

        doodles.appendChild(span);
    }

    document.body.prepend(doodles);

    document.querySelectorAll(".contenu, .interfaceQuiz").forEach(element => {
        element.style.position = "relative";
        element.style.zIndex = "2";
    });
}


// ============================================================
// 🔊 SONS
// ============================================================

function jouerSonBonneReponse() {
    try {
        const audio = new (window.AudioContext || window.webkitAudioContext)();

        const oscillateur = audio.createOscillator();
        const gain = audio.createGain();

        oscillateur.type = "sine";

        oscillateur.frequency.setValueAtTime(
            520,
            audio.currentTime
        );

        oscillateur.frequency.exponentialRampToValueAtTime(
            850,
            audio.currentTime + 0.15
        );

        gain.gain.setValueAtTime(
            0.001,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.15,
            audio.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.2
        );

        oscillateur.connect(gain);
        gain.connect(audio.destination);

        oscillateur.start();
        oscillateur.stop(audio.currentTime + 0.2);

    } catch (erreur) {}
}


function jouerSonMauvaiseReponse() {
    try {
        const audio = new (window.AudioContext || window.webkitAudioContext)();

        const oscillateur = audio.createOscillator();
        const gain = audio.createGain();

        oscillateur.type = "sawtooth";

        oscillateur.frequency.setValueAtTime(
            240,
            audio.currentTime
        );

        oscillateur.frequency.exponentialRampToValueAtTime(
            80,
            audio.currentTime + 0.3
        );

        gain.gain.setValueAtTime(
            0.001,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.14,
            audio.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.3
        );

        oscillateur.connect(gain);
        gain.connect(audio.destination);

        oscillateur.start();
        oscillateur.stop(audio.currentTime + 0.3);

    } catch (erreur) {}
}


// ============================================================
// 🏆🎵 FANFARE DE FIN
// ============================================================

function jouerSonFinQuiz() {
    try {
        const audio = new (window.AudioContext || window.webkitAudioContext)();

        const maintenant = audio.currentTime;

        // 🎵 Petite mélodie de victoire
        const notes = [
            { freq: 523.25, debut: 0.00, duree: 0.16 },
            { freq: 659.25, debut: 0.17, duree: 0.16 },
            { freq: 783.99, debut: 0.34, duree: 0.20 },
            { freq: 659.25, debut: 0.55, duree: 0.16 },
            { freq: 783.99, debut: 0.73, duree: 0.18 },
            { freq: 1046.50, debut: 0.93, duree: 0.25 },
            { freq: 1318.51, debut: 1.20, duree: 0.45 }
        ];

        notes.forEach(note => {

            const oscillateur = audio.createOscillator();
            const gain = audio.createGain();

            oscillateur.type = "sine";

            oscillateur.frequency.setValueAtTime(
                note.freq,
                maintenant + note.debut
            );

            gain.gain.setValueAtTime(
                0.001,
                maintenant + note.debut
            );

            gain.gain.exponentialRampToValueAtTime(
                0.18,
                maintenant + note.debut + 0.025
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                maintenant + note.debut + note.duree
            );

            oscillateur.connect(gain);
            gain.connect(audio.destination);

            oscillateur.start(
                maintenant + note.debut
            );

            oscillateur.stop(
                maintenant + note.debut + note.duree
            );
        });


        // ✨ Accord final
        const accord = [
            523.25,
            659.25,
            783.99,
            1046.50
        ];

        accord.forEach(freq => {

            const oscillateur = audio.createOscillator();
            const gain = audio.createGain();

            oscillateur.type = "triangle";

            oscillateur.frequency.setValueAtTime(
                freq,
                maintenant + 1.68
            );

            gain.gain.setValueAtTime(
                0.001,
                maintenant + 1.68
            );

            gain.gain.exponentialRampToValueAtTime(
                0.08,
                maintenant + 1.72
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                maintenant + 2.25
            );

            oscillateur.connect(gain);
            gain.connect(audio.destination);

            oscillateur.start(
                maintenant + 1.68
            );

            oscillateur.stop(
                maintenant + 2.25
            );
        });


        setTimeout(() => {
            audio.close();
        }, 2600);

    } catch (erreur) {}
}


// ============================================================
// 💥 TREMBLEMENT
// ============================================================

function faireTrembler() {
    document.body.classList.remove("tremblement");

    void document.body.offsetWidth;

    document.body.classList.add("tremblement");

    setTimeout(() => {
        document.body.classList.remove("tremblement");
    }, 450);
}


// ============================================================
// 💚 FLASH BONNE RÉPONSE
// ============================================================

function flashBonneReponse() {
    const flash = document.createElement("div");

    flash.className = "flashBonne";

    document.body.appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 500);
}


// ============================================================
// ❤️ FLASH MAUVAISE RÉPONSE
// ============================================================

function flashMauvaiseReponse() {
    const flash = document.createElement("div");

    flash.className = "flashMauvaise";

    document.body.appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 500);
}


// ============================================================
// 🎉 CONFETTIS
// ============================================================

function lancerConfettis() {
    const conteneur = document.createElement("div");

    conteneur.className = "victoireAnimation";

    for (let i = 0; i < 90; i++) {
        const confetti = document.createElement("span");

        confetti.className = "confetti";
        confetti.textContent = "●";

        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 1.5}s`;
        confetti.style.animationDuration = `${1.5 + Math.random() * 2}s`;
        confetti.style.fontSize = `${5 + Math.random() * 10}px`;

        conteneur.appendChild(confetti);
    }

    document.body.appendChild(conteneur);

    setTimeout(() => {
        conteneur.remove();
    }, 4000);
}


// ============================================================
// 🌎 CAPITALES
// ============================================================

const capitales = {

    facile: [
        {
            question: "Quelle est la capitale de la France ?",
            reponses: ["Paris", "Lyon", "Marseille"],
            bonne: "Paris"
        },
        {
            question: "Quelle est la capitale de l'Espagne ?",
            reponses: ["Madrid", "Barcelone", "Séville"],
            bonne: "Madrid"
        },
        {
            question: "Quelle est la capitale de l'Italie ?",
            reponses: ["Rome", "Milan", "Naples"],
            bonne: "Rome"
        },
        {
            question: "Quelle est la capitale de l'Allemagne ?",
            reponses: ["Berlin", "Munich", "Hambourg"],
            bonne: "Berlin"
        },
        {
            question: "Quelle est la capitale du Portugal ?",
            reponses: ["Lisbonne", "Porto", "Braga"],
            bonne: "Lisbonne"
        }
    ],

    moyen: [
        {
            question: "Quelle est la capitale du Canada ?",
            reponses: ["Ottawa", "Toronto", "Montréal"],
            bonne: "Ottawa"
        },
        {
            question: "Quelle est la capitale de l'Australie ?",
            reponses: ["Canberra", "Sydney", "Melbourne"],
            bonne: "Canberra"
        },
        {
            question: "Quelle est la capitale du Brésil ?",
            reponses: ["Brasília", "Rio de Janeiro", "São Paulo"],
            bonne: "Brasília"
        },
        {
            question: "Quelle est la capitale de la Turquie ?",
            reponses: ["Ankara", "Istanbul", "Izmir"],
            bonne: "Ankara"
        },
        {
            question: "Quelle est la capitale de la Grèce ?",
            reponses: ["Athènes", "Sparte", "Thessalonique"],
            bonne: "Athènes"
        }
    ],

    difficile: [
        {
            question: "Quelle est la capitale de la Mongolie ?",
            reponses: ["Oulan-Bator", "Astana", "Bichkek"],
            bonne: "Oulan-Bator"
        },
        {
            question: "Quelle est la capitale du Kazakhstan ?",
            reponses: ["Astana", "Almaty", "Tachkent"],
            bonne: "Astana"
        },
        {
            question: "Quelle est la capitale de Madagascar ?",
            reponses: ["Antananarivo", "Maputo", "Nairobi"],
            bonne: "Antananarivo"
        },
        {
            question: "Quelle est la capitale du Bhoutan ?",
            reponses: ["Thimphou", "Katmandou", "Dacca"],
            bonne: "Thimphou"
        },
        {
            question: "Quelle est la capitale de la Namibie ?",
            reponses: ["Windhoek", "Gaborone", "Lusaka"],
            bonne: "Windhoek"
        }
    ],

    impossible: [
        {
            question: "Quelle est la capitale des Palaos ?",
            reponses: ["Ngerulmud", "Majuro", "Koror"],
            bonne: "Ngerulmud"
        },
        {
            question: "Quelle est la capitale des Kiribati ?",
            reponses: ["Tarawa-Sud", "Funafuti", "Apia"],
            bonne: "Tarawa-Sud"
        },
        {
            question: "Quelle est la capitale des Tuvalu ?",
            reponses: ["Funafuti", "Tarawa-Sud", "Suva"],
            bonne: "Funafuti"
        },
        {
            question: "Quelle est la capitale du Vanuatu ?",
            reponses: ["Port-Vila", "Honiara", "Nuku'alofa"],
            bonne: "Port-Vila"
        },
        {
            question: "Quelle est la capitale des États fédérés de Micronésie ?",
            reponses: ["Palikir", "Majuro", "Papeete"],
            bonne: "Palikir"
        }
    ]
};


// ============================================================
// 🚩 DRAPEAUX
// ============================================================

const drapeaux = {

    facile: [
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇫🇷",
            reponses: ["France", "Italie", "Pays-Bas"],
            bonne: "France"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇪🇸",
            reponses: ["Espagne", "Portugal", "Roumanie"],
            bonne: "Espagne"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇩🇪",
            reponses: ["Allemagne", "Belgique", "Autriche"],
            bonne: "Allemagne"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇮🇹",
            reponses: ["Italie", "Irlande", "Mexique"],
            bonne: "Italie"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇯🇵",
            reponses: ["Japon", "Chine", "Corée du Sud"],
            bonne: "Japon"
        }
    ],

    moyen: [
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇬🇷",
            reponses: ["Grèce", "Finlande", "Israël"],
            bonne: "Grèce"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇦🇷",
            reponses: ["Argentine", "Uruguay", "Guatemala"],
            bonne: "Argentine"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇲🇦",
            reponses: ["Maroc", "Tunisie", "Turquie"],
            bonne: "Maroc"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇰🇷",
            reponses: ["Corée du Sud", "Japon", "Singapour"],
            bonne: "Corée du Sud"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇧🇷",
            reponses: ["Brésil", "Colombie", "Bolivie"],
            bonne: "Brésil"
        }
    ],

    difficile: [
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇧🇹",
            reponses: ["Bhoutan", "Népal", "Sri Lanka"],
            bonne: "Bhoutan"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇲🇳",
            reponses: ["Mongolie", "Kazakhstan", "Kirghizistan"],
            bonne: "Mongolie"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇬🇪",
            reponses: ["Géorgie", "Angleterre", "Danemark"],
            bonne: "Géorgie"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇰🇬",
            reponses: ["Kirghizistan", "Macédoine du Nord", "Monténégro"],
            bonne: "Kirghizistan"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇱🇰",
            reponses: ["Sri Lanka", "Myanmar", "Cambodge"],
            bonne: "Sri Lanka"
        }
    ],

    impossible: [
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇵🇼",
            reponses: ["Palaos", "Micronésie", "Marshall"],
            bonne: "Palaos"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇻🇺",
            reponses: ["Vanuatu", "Îles Salomon", "Papouasie-Nouvelle-Guinée"],
            bonne: "Vanuatu"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇰🇮",
            reponses: ["Kiribati", "Tuvalu", "Nauru"],
            bonne: "Kiribati"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇫🇲",
            reponses: ["Micronésie", "Palaos", "Marshall"],
            bonne: "Micronésie"
        },
        {
            question: "🌍 Quel est ce drapeau ?",
            drapeau: "🇲🇭",
            reponses: ["Îles Marshall", "Kiribati", "Micronésie"],
            bonne: "Îles Marshall"
        }
    ]
};


// ============================================================
// 🪐 PLANÈTES
// ============================================================

const planetes = {

    facile: [
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/terre.png",
            reponses: ["Terre", "Mars", "Vénus"],
            bonne: "Terre"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/mars.png",
            reponses: ["Mars", "Terre", "Mercure"],
            bonne: "Mars"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/jupiter.png",
            reponses: ["Jupiter", "Saturne", "Neptune"],
            bonne: "Jupiter"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/venus.png",
            reponses: ["Vénus", "Mercure", "Terre"],
            bonne: "Vénus"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/saturne.png",
            reponses: ["Saturne", "Jupiter", "Uranus"],
            bonne: "Saturne"
        }
    ],

    moyen: [
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/mercure.png",
            reponses: ["Mercure", "Mars", "Vénus"],
            bonne: "Mercure"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/uranus.png",
            reponses: ["Uranus", "Neptune", "Saturne"],
            bonne: "Uranus"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/neptune.png",
            reponses: ["Neptune", "Uranus", "Jupiter"],
            bonne: "Neptune"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/mars.png",
            reponses: ["Mars", "Mercure", "Vénus"],
            bonne: "Mars"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/venus.png",
            reponses: ["Vénus", "Terre", "Mercure"],
            bonne: "Vénus"
        }
    ],

    difficile: [
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/uranus.png",
            reponses: ["Uranus", "Neptune", "Saturne"],
            bonne: "Uranus"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/neptune.png",
            reponses: ["Neptune", "Uranus", "Jupiter"],
            bonne: "Neptune"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/mercure.png",
            reponses: ["Mercure", "Mars", "Vénus"],
            bonne: "Mercure"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/saturne.png",
            reponses: ["Saturne", "Jupiter", "Uranus"],
            bonne: "Saturne"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/jupiter.png",
            reponses: ["Jupiter", "Saturne", "Neptune"],
            bonne: "Jupiter"
        }
    ],

    impossible: [
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/neptune.png",
            reponses: ["Neptune", "Uranus", "Saturne"],
            bonne: "Neptune"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/uranus.png",
            reponses: ["Uranus", "Neptune", "Jupiter"],
            bonne: "Uranus"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/mercure.png",
            reponses: ["Mercure", "Vénus", "Mars"],
            bonne: "Mercure"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/saturne.png",
            reponses: ["Saturne", "Uranus", "Jupiter"],
            bonne: "Saturne"
        },
        {
            question: "🪐 Quelle est cette planète ?",
            image: "image/jupiter.png",
            reponses: ["Jupiter", "Saturne", "Neptune"],
            bonne: "Jupiter"
        }
    ]
};


// ============================================================
// 🎮 VARIABLES
// ============================================================

let categorieChoisie = "";
let difficulteChoisie = "";

let questionsPartie = [];
let questionActuelle = 0;

let score = 0;
let vies = 3;
let combo = 0;
let meilleurCombo = 0;

let timer = null;
let tempsRestant = 20;
let tempsDebutQuestion = 0;

let reponseVerrouillee = false;


// ============================================================
// ⏱️ TEMPS PAR DIFFICULTÉ
// ============================================================

const tempsDifficulte = {
    facile: 20,
    moyen: 15,
    difficile: 10,
    impossible: 7
};


// ============================================================
// 🔀 MÉLANGE
// ============================================================

function melanger(tableau) {
    const copie = [...tableau];

    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copie[i], copie[j]] =
            [copie[j], copie[i]];
    }

    return copie;
}


// ============================================================
// 🏠 ACCUEIL
// ============================================================

function afficherAccueil() {
    clearInterval(timer);

    document.body.innerHTML = `
        <div class="contenu">

            <h1>🌍 GEO QUIZ</h1>

            <p>Teste tes connaissances !</p>

            <button data-action="categorie" data-categorie="capitales">
                🌎 Capitales
            </button>

            <button data-action="categorie" data-categorie="drapeaux">
                🚩 Drapeaux
            </button>

            <button data-action="categorie" data-categorie="planetes">
                🪐 Planètes
            </button>

        </div>
    `;

    creerDoodles();
}


// ============================================================
// 🎯 CHOIX CATÉGORIE
// ============================================================

function choisirCategorie(categorie) {
    categorieChoisie = categorie;

    afficherDifficultes();
}


// ============================================================
// 🎚️ CHOIX DIFFICULTÉ
// ============================================================

function afficherDifficultes() {
    clearInterval(timer);

    document.body.innerHTML = `
        <div class="contenu">

            <h1>🎯 Difficulté</h1>

            <p>Choisis ton niveau</p>

            <button id="facile"
                data-action="difficulte"
                data-difficulte="facile">
                🟢 Facile
            </button>

            <button id="moyen"
                data-action="difficulte"
                data-difficulte="moyen">
                🟠 Moyen
            </button>

            <button id="difficile"
                data-action="difficulte"
                data-difficulte="difficile">
                🔴 Difficile
            </button>

            <button id="impossible"
                data-action="difficulte"
                data-difficulte="impossible">
                ⚫ Impossible
            </button>

            <button id="retour"
                data-action="retour">
                ↩️ Retour
            </button>

        </div>
    `;

    creerDoodles();
}


// ============================================================
// 🧠 BANQUE DE QUESTIONS
// ============================================================

function obtenirBanque() {

    if (categorieChoisie === "capitales") {
        return capitales;
    }

    if (categorieChoisie === "drapeaux") {
        return drapeaux;
    }

    if (categorieChoisie === "planetes") {
        return planetes;
    }

    return null;
}


// ============================================================
// 📈 DIFFICULTÉ PROGRESSIVE
// ============================================================

function construireQuestionsProgressives() {

    const banque = obtenirBanque();

    if (!banque) {
        return [];
    }

    let niveaux = [];

    if (difficulteChoisie === "facile") {
        niveaux = ["facile", "moyen"];
    }

    if (difficulteChoisie === "moyen") {
        niveaux = ["moyen", "difficile"];
    }

    if (difficulteChoisie === "difficile") {
        niveaux = ["difficile", "impossible"];
    }

    if (difficulteChoisie === "impossible") {
        niveaux = ["impossible"];
    }

    let questions = [];

    niveaux.forEach(niveau => {
        questions.push(...melanger(banque[niveau]));
    });

    questions = melanger(questions);

    if (questions.length < 10) {

        const toutes =
            Object.values(banque).flat();

        while (questions.length < 10) {

            questions.push(
                toutes[questions.length % toutes.length]
            );
        }
    }

    return questions.slice(0, 10);
}


// ============================================================
// 🚀 COMMENCER LE QUIZ
// ============================================================

function commencerQuiz(difficulte) {

    clearInterval(timer);

    difficulteChoisie = difficulte;

    score = 0;
    vies = 3;
    combo = 0;
    meilleurCombo = 0;

    questionActuelle = 0;

    reponseVerrouillee = false;

    questionsPartie =
        construireQuestionsProgressives();

    afficherQuestion();
}


// ============================================================
// ❓ AFFICHER UNE QUESTION
// ============================================================

function afficherQuestion() {

    clearInterval(timer);

    if (questionActuelle >= 10) {
        afficherResultat();
        return;
    }

    if (vies <= 0) {
        afficherGameOver();
        return;
    }

    reponseVerrouillee = false;

    const question =
        questionsPartie[questionActuelle];

    tempsRestant =
        tempsDifficulte[difficulteChoisie];

    tempsDebutQuestion = Date.now();

    let contenu = "";


    // 🚩 DRAPEAUX
    if (categorieChoisie === "drapeaux") {

        contenu = `
            <div class="questionPrincipale">
                ${question.question}
            </div>

            <div id="drapeau">
                ${question.drapeau}
            </div>
        `;
    }


    // 🪐 PLANÈTES
    else if (categorieChoisie === "planetes") {

        contenu = `
            <div class="questionPrincipale">
                ${question.question}
            </div>

            <img
                src="${question.image}"
                alt="Planète"
            >
        `;
    }


    // 🌎 CAPITALES
    else {

        contenu = `
            <div class="questionPrincipale">
                ${question.question}
            </div>
        `;
    }


    const reponses =
        melanger(question.reponses);


    document.body.innerHTML = `
        <div class="interfaceQuiz">

            <div class="infosQuiz">

                <div>
                    Question ${questionActuelle + 1}/10
                </div>

                <div class="vies">
                    ❤️ ${vies}
                </div>

                <div class="combo">
                    🔥 Combo : ${combo}
                </div>

                <div>
                    ⭐ ${score}
                </div>

            </div>

            <div id="timer">
                ⏱️ ${tempsRestant}s
            </div>

            <div class="barreTemps">
                <div id="progressionTemps"></div>
            </div>

            ${contenu}

            <div id="reponses">

                ${reponses.map((reponse, index) => `
                    <button
                        class="reponse"
                        data-reponse-index="${index}">
                        ${reponse}
                    </button>
                `).join("")}

            </div>

        </div>
    `;


    document.querySelectorAll(".reponse").forEach((bouton, index) => {

        bouton.dataset.reponse =
            reponses[index];

    });


    creerDoodles();

    lancerTimer();
}


// ============================================================
// ⏱️ TIMER
// ============================================================

function lancerTimer() {

    clearInterval(timer);

    const duree =
        tempsDifficulte[difficulteChoisie];

    const timerElement =
        document.getElementById("timer");

    const barre =
        document.getElementById("progressionTemps");


    timer = setInterval(() => {

        tempsRestant--;


        if (timerElement) {

            timerElement.textContent =
                `⏱️ ${tempsRestant}s`;

        }


        if (barre) {

            const pourcentage =
                Math.max(
                    0,
                    (tempsRestant / duree) * 100
                );

            barre.style.width =
                `${pourcentage}%`;
        }


        if (tempsRestant <= 3 && timerElement) {

            timerElement.classList.add(
                "timerUrgent"
            );
        }


        if (tempsRestant <= 0) {

            clearInterval(timer);

            tempsEcoule();
        }

    }, 1000);
}


// ============================================================
// ⌛ TEMPS ÉCOULÉ
// ============================================================

function tempsEcoule() {

    if (reponseVerrouillee) {
        return;
    }

    reponseVerrouillee = true;

    clearInterval(timer);

    const question =
        questionsPartie[questionActuelle];

    vies--;

    combo = 0;

    jouerSonMauvaiseReponse();

    faireTrembler();

    flashMauvaiseReponse();

    afficherCorrection(
        "timeout",
        question.bonne
    );
}


// ============================================================
// ✅ VÉRIFIER RÉPONSE
// ============================================================

function verifierReponse(reponse) {

    if (reponseVerrouillee) {
        return;
    }

    reponseVerrouillee = true;

    clearInterval(timer);

    const question =
        questionsPartie[questionActuelle];

    const bonne =
        reponse === question.bonne;


    if (bonne) {

        combo++;


        if (combo > meilleurCombo) {
            meilleurCombo = combo;
        }


        const tempsPris =
            (Date.now() - tempsDebutQuestion) / 1000;


        let points = 1;


        // ⚡ Bonus rapidité
        if (tempsPris <= 3) {
            points += 3;
        }

        else if (tempsPris <= 6) {
            points += 2;
        }

        else if (tempsPris <= 9) {
            points += 1;
        }


        // 🔥 Bonus combo
        if (combo >= 5) {
            points += 3;
        }

        else if (combo >= 3) {
            points += 2;
        }

        else if (combo >= 2) {
            points += 1;
        }


        score += points;


        jouerSonBonneReponse();

        flashBonneReponse();


        afficherCorrection(
            "correct",
            question.bonne
        );

    }


    else {

        vies--;

        combo = 0;

        jouerSonMauvaiseReponse();

        faireTrembler();

        flashMauvaiseReponse();


        afficherCorrection(
            "wrong",
            question.bonne
        );
    }
}


// ============================================================
// 📝 PAGE DE CORRECTION
// ============================================================

function afficherCorrection(type, bonneReponse) {

    clearInterval(timer);

    let titre = "";
    let message = "";


    if (type === "correct") {

        titre = "🎉 BRAVO !";

        message = `
            <div>
                ✅ BONNE RÉPONSE
            </div>

            <br>

            <div>
                <strong>${bonneReponse}</strong>
                est la bonne réponse !
            </div>
        `;
    }


    else if (type === "wrong") {

        titre = "😢 DOMMAGE !";

        message = `
            <div>
                ❌ MAUVAISE RÉPONSE
            </div>

            <br>

            <div>
                La bonne réponse était :
                <strong>${bonneReponse}</strong>
            </div>
        `;
    }


    else {

        titre = "⏰ TEMPS ÉCOULÉ !";

        message = `
            <div>
                ⌛ TU AS TROP TARDÉ
            </div>

            <br>

            <div>
                La bonne réponse était :
                <strong>${bonneReponse}</strong>
            </div>
        `;
    }


    let bouton = "";


    if (vies <= 0) {

        bouton = `
            <button data-action="gameover">
                💀 GAME OVER
            </button>
        `;
    }

    else {

        bouton = `
            <button data-action="suivante">
                ➡️ QUESTION SUIVANTE
            </button>
        `;
    }


    document.body.innerHTML = `
        <div class="contenu">

            <h1>${titre}</h1>

            <h2>${message}</h2>

            ${bouton}

        </div>
    `;


    creerDoodles();


    if (type === "correct") {
        lancerConfettis();
    }
}


// ============================================================
// ➡️ QUESTION SUIVANTE
// ============================================================

function questionSuivante() {

    if (vies <= 0) {

        afficherGameOver();

        return;
    }


    questionActuelle++;


    if (questionActuelle >= 10) {

        afficherResultat();

        return;
    }


    afficherQuestion();
}


// ============================================================
// 💀 GAME OVER
// ============================================================

function afficherGameOver() {

    clearInterval(timer);

    document.body.innerHTML = `
        <div class="contenu">

            <h1>💀 GAME OVER</h1>

            <h2>
                Tu n'as plus de vies !
            </h2>

            <div class="scoreFinal">
                ⭐ Score : ${score}
            </div>

            <div class="statsFinales">
                🔥 Meilleur combo : ${meilleurCombo}
            </div>

            <button data-action="accueil">
                🔄 REJOUER
            </button>

        </div>
    `;


    creerDoodles();
}


// ============================================================
// 🏆 FIN DU QUIZ
// ============================================================

function afficherResultat() {

    clearInterval(timer);


    document.body.innerHTML = `
        <div class="contenu">

            <h1>🏆 QUIZ TERMINÉ !</h1>

            <div class="scoreFinal">
                ⭐ ${score} points
            </div>

            <div class="statsFinales">

                ❤️ Vies restantes :
                ${vies}

                <br><br>

                🔥 Meilleur combo :
                ${meilleurCombo}

            </div>

            <button data-action="accueil">
                🔄 REJOUER
            </button>

        </div>
    `;


    creerDoodles();

    // 🎉 CONFETTIS
    lancerConfettis();

    // 🏆🎵 FANFARE DE FIN
    jouerSonFinQuiz();
}


// ============================================================
// 🖱️ GESTION DES CLICS
// ============================================================

document.addEventListener("click", function(event) {

    const bouton =
        event.target.closest("button");

    if (!bouton) {
        return;
    }


    // 🌎 🚩 🪐 CATÉGORIE
    if (bouton.dataset.action === "categorie") {

        choisirCategorie(
            bouton.dataset.categorie
        );

        return;
    }


    // 🎚️ DIFFICULTÉ
    if (bouton.dataset.action === "difficulte") {

        commencerQuiz(
            bouton.dataset.difficulte
        );

        return;
    }


    // ↩️ RETOUR
    if (bouton.dataset.action === "retour") {

        afficherAccueil();

        return;
    }


    // ❓ RÉPONSE
    if (bouton.classList.contains("reponse")) {

        verifierReponse(
            bouton.dataset.reponse
        );

        return;
    }


    // ➡️ QUESTION SUIVANTE
    if (bouton.dataset.action === "suivante") {

        questionSuivante();

        return;
    }


    // 💀 GAME OVER
    if (bouton.dataset.action === "gameover") {

        afficherGameOver();

        return;
    }


    // 🔄 ACCUEIL
    if (bouton.dataset.action === "accueil") {

        afficherAccueil();

        return;
    }

});


// ============================================================
// 🚀 LANCEMENT DU SITE
// ============================================================

afficherAccueil();