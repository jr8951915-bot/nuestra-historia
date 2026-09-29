// ==========================================
// CONFIGURACIÓN DE RESPUESTAS
// ==========================================

const answers = {
    0: "fiesta",
    1: "NUNCA IMAGINE",
    2: "MIGAO",
    3: "POKER",
    4: "PIJAMA",
    5: "cama",
    6: "pacho",
    7: "",
    8: "cuatro",
    9: ""
};


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const loginScreen = document.getElementById("login-screen");
const story = document.getElementById("story");

const nameInput = document.getElementById("name-input");
const secretInput = document.getElementById("secret-input");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");

const backgroundMusic = document.getElementById("background-music");
const musicControl =
    document.getElementById("music-control");

let musicFadeInterval = null;


// ==========================================
// LOGIN
// ==========================================

loginButton.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const secret = normalize(secretInput.value);

    // Verificar nombre
    if (name === "") {
        showError(
            loginError,
            "Escribe tu nombre para continuar."
        );
        return;
    }

    // Verificar dato secreto
    if (secret !== normalize(answers[0])) {
        showError(
            loginError,
            "Hmm... parece que ese no es el dato correcto. ❤️"
        );
        return;
    }

    // Guardar nombre
    localStorage.setItem("girlfriendName", name);

    // Ocultar login
    loginScreen.style.animation =
        "fadeOut 1s ease forwards";

    setTimeout(() => {

        loginScreen.classList.add("hidden");
        story.classList.remove("hidden");

        // Iniciar progreso en capítulo 0
        updateProgress(0);

         // Iniciar música suavemente
         startBackgroundMusic();

        

    }, 1000);
});


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function showQuestion(chapter) {

    const chapterElement =
        document.getElementById(`chapter-${chapter}`);

    const questionElement =
        document.getElementById(`question-${chapter}`);

    if (!chapterElement || !questionElement) {

        console.log(
            "No se encontró el capítulo o la pregunta."
        );

        return;
    }

    chapterElement.classList.add("hidden");

    questionElement.classList.remove("hidden");

    questionElement.style.animation =
        "fadeIn 1s ease forwards";
}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function checkAnswer(chapter) {

    const answerInput =
        document.getElementById(`answer-${chapter}`);

    /*
       Algunos capítulos utilizan IDs de error diferentes,
       por eso buscamos primero el normal y luego algunas
       variantes existentes.
    */

    let errorElement =
        document.getElementById(`error-${chapter}`);

    if (!errorElement) {
        errorElement =
            document.getElementById(`question-error-${chapter}`);
    }

    if (!answerInput) {
        return;
    }

    const userAnswer =
        normalize(answerInput.value);

    const correctAnswer =
        normalize(answers[chapter]);

    if (userAnswer === correctAnswer) {

        if (errorElement) {
            errorElement.textContent = "";
        }

        unlockNextChapter(chapter);

    } else {

        if (errorElement) {

            showError(
                errorElement,
                "Mmm... piénsalo un poquito más. ❤️"
            );

        }

    }
}


// ==========================================
// DESBLOQUEAR SIGUIENTE CAPÍTULO
// ==========================================

function unlockNextChapter(currentChapter) {

    const currentQuestion =
        document.getElementById(
            `question-${currentChapter}`
        );

    const nextChapter =
        document.getElementById(
            `chapter-${currentChapter + 1}`
        );

    if (!nextChapter) {

        console.log(
            "No hay siguiente capítulo todavía."
        );

        return;
    }

    // Ocultar pregunta actual
    if (currentQuestion) {
        currentQuestion.classList.add("hidden");
    }

    // Mostrar siguiente capítulo
    nextChapter.classList.remove("hidden");

    // ==========================================
    // ACTUALIZAR BARRA
    // ==========================================

    updateProgress(currentChapter + 1);

    // Animación
    nextChapter.style.animation =
        "fadeIn 1.2s ease forwards";

    // Subir al comienzo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// BARRA DE PROGRESO
// ==========================================

function updateProgress(chapter) {

    const progressText =
        document.getElementById("chapter-counter");

    const progressFill =
        document.getElementById("progress");

    if (!progressText || !progressFill) {

        console.log(
            "No se encontraron los elementos de progreso."
        );

        return;
    }

    // Texto
    progressText.textContent =
        `CAPÍTULO ${chapter} / 10`;

    // Porcentaje
    const percentage =
        (chapter / 10) * 100;

    // Barra
    progressFill.style.width =
        `${percentage}%`;
}


// ==========================================
// NORMALIZAR TEXTO
// ==========================================

function normalize(text) {

    return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ==========================================
// MOSTRAR ERROR
// ==========================================

function showError(element, message) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.style.animation = "none";

    // Reiniciar animación
    void element.offsetWidth;

    element.style.animation =
        "fadeUp 0.4s ease";
}


// ==========================================
// ENTER PARA ENVIAR LOGIN
// ==========================================

secretInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            loginButton.click();
        }

    }
);


// ==========================================
// ANIMACIONES GENERALES
// ==========================================

const animationStyle =
    document.createElement("style");

animationStyle.innerHTML = `

@keyframes fadeOut {

    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }

}

@keyframes fadeIn {

    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }

}

`;

document.head.appendChild(animationStyle);


// ==========================================
// CAPÍTULO 7
// ==========================================

let chapter7NoAttempts = 0;


function answerChapter7(isYes) {

    const response =
        document.getElementById(
            "chapter7-response"
        );

    const noButton =
        document.querySelector(
            ".chapter7-option.no"
        );


    // ==========================================
    // RESPUESTA SÍ
    // ==========================================

    if (isYes) {

        const question =
            document.getElementById(
                "question-7"
            );

        const nextChapter =
            document.getElementById(
                "chapter-8"
            );

        if (!nextChapter) {

            console.log(
                "Todavía no existe el capítulo 8."
            );

            return;
        }

        question.classList.add("hidden");

        nextChapter.classList.remove("hidden");

        // Actualizar barra
        updateProgress(8);

        nextChapter.style.animation =
            "fadeIn 1.2s ease forwards";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    // ==========================================
    // RESPUESTA NO
    // ==========================================

    chapter7NoAttempts++;

    const messages = [

        "¿Segura? 👀",

        "Mmm... creo que te equivocaste de botón.",

        "Ese botón no es el correcto JAJA.",

        "Intenta con el otro... 😌",

        "No te voy a dejar escapar tan fácil.",

        "¿De verdad quieres decir que NO? 😭",

        "Última oportunidad... 👀❤️"

    ];


    const messageIndex =
        Math.min(
            chapter7NoAttempts - 1,
            messages.length - 1
        );


    if (response) {

        response.textContent =
            messages[messageIndex];

    }


    // ==========================================
    // HACER ESCAPAR EL BOTÓN NO
    // ==========================================

    if (noButton) {

        const x =
            Math.random() * 180 - 90;

        const y =
            Math.random() * 100 - 50;

        noButton.style.transform =
            `translate(${x}px, ${y}px)`;
    }

}


// ==========================================
// CAPÍTULO 9
// ==========================================

function answerChapter9(selectedAnswer) {

    const errorElement =
        document.getElementById(
            "error-9"
        );


    // ==========================================
    // RESPUESTA CORRECTA
    // ==========================================

    if (
        normalize(selectedAnswer) ===
        "san andres"
    ) {

        const question =
            document.getElementById(
                "question-9"
            );

        const nextChapter =
            document.getElementById(
                "chapter-10"
            );

        if (!nextChapter) {

            console.log(
                "Todavía no existe el capítulo 10."
            );

            return;
        }

        question.classList.add("hidden");

        nextChapter.classList.remove("hidden");

        // Actualizar barra
        updateProgress(10);

        nextChapter.style.animation =
            "fadeIn 1.2s ease forwards";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    // ==========================================
    // RESPUESTA INCORRECTA
    // ==========================================

    showError(
        errorElement,
        "Mmm... ese no era. Intenta recordar nuestro viaje. ❤️"
    );

}


// ==========================================
// PÁGINA FINAL
// ==========================================

function goToFinalPage() {

    const chapter10 =
        document.getElementById(
            "chapter-10"
        );

    const finalPage =
        document.getElementById(
            "final-page"
        );


    if (!chapter10 || !finalPage) {

        console.log(
            "No se encontró el capítulo 10 o la página final."
        );

        return;
    }


    // Ocultar capítulo 10
    chapter10.classList.add("hidden");


    // Mostrar página final
    finalPage.classList.remove("hidden");


    // Animación
    finalPage.style.animation =
        "fadeIn 2s ease forwards";


    // Subir al comienzo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ==========================================
// SISTEMA DE MÚSICA
// ==========================================

function startBackgroundMusic() {

    if (!backgroundMusic) {
        return;
    }

    // Volumen inicial
    backgroundMusic.volume = 0;

    backgroundMusic
        .play()
        .then(() => {

            // Mostrar botón
            if (musicControl) {
                musicControl.classList.add("visible");
                musicControl.classList.add("playing");
                musicControl.textContent = "♫";
                musicControl.setAttribute(
                    "aria-label",
                    "Pausar música"
                );
            }

            // Fade in
            fadeMusicIn();

        })
        .catch(() => {

            console.log(
                "El navegador no permitió reproducir la música."
            );

            /*
             * Si el navegador bloquea la reproducción,
             * el botón queda disponible para que ella
             * pueda iniciar la música manualmente.
             */

            if (musicControl) {
                musicControl.classList.add("visible");
            }

        });
}


// ==========================================
// FADE IN
// ==========================================

function fadeMusicIn() {

    if (!backgroundMusic) {
        return;
    }

    clearInterval(musicFadeInterval);

    let volume = 0;

    musicFadeInterval = setInterval(() => {

        volume += 0.01;

        if (volume >= 0.35) {

            volume = 0.35;

            clearInterval(musicFadeInterval);
        }

        backgroundMusic.volume = volume;

    }, 80);
}


// ==========================================
// FADE OUT
// ==========================================

function fadeMusicOut(callback) {

    if (!backgroundMusic) {

        if (callback) {
            callback();
        }

        return;
    }

    clearInterval(musicFadeInterval);

    let volume =
        backgroundMusic.volume;

    musicFadeInterval = setInterval(() => {

        volume -= 0.01;

        if (volume <= 0) {

            volume = 0;

            clearInterval(musicFadeInterval);

            if (callback) {
                callback();
            }
        }

        backgroundMusic.volume = volume;

    }, 60);
}


// ==========================================
// BOTÓN PLAY / PAUSA
// ==========================================

if (musicControl) {

    musicControl.addEventListener(
        "click",
        () => {

            if (!backgroundMusic) {
                return;
            }


            // ==================================
            // PAUSAR
            // ==================================

            if (!backgroundMusic.paused) {

                fadeMusicOut(() => {

                    backgroundMusic.pause();

                });

                musicControl.classList.remove(
                    "playing"
                );

                musicControl.textContent = "🔇";

                musicControl.setAttribute(
                    "aria-label",
                    "Reproducir música"
                );

                return;
            }


            // ==================================
            // REPRODUCIR
            // ==================================

            backgroundMusic
                .play()
                .then(() => {

                    fadeMusicIn();

                    musicControl.classList.add(
                        "playing"
                    );

                    musicControl.textContent = "♫";

                    musicControl.setAttribute(
                        "aria-label",
                        "Pausar música"
                    );

                })
                .catch(() => {

                    console.log(
                        "No se pudo reproducir la música."
                    );

                });

        }
    );

}