//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// OBJET DIAPORAMA /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default class Slideshow {
    constructor(slides) {
        this.slides = slides;
        this.slidesIndex = 0;
        
        // Par défaut, la première diapositive de la liste est affichée
        $("#slidePicture").attr("src", this.slides[this.slidesIndex].src);
        $("#slideText").text(this.slides[this.slidesIndex].text);
    }
    
    // Méthode permettant de passer à la diapositive suivante
    goNextSlide() {
        this.slidesIndex++;
        if(this.slidesIndex > this.slides.length - 1) { // Si l'index arrive à la fin de la liste des diapositive,
            this.slidesIndex = 0; // Retourne à la première diapositive de la liste
        }
        // On affiche la nouvelle diapositive
        $("#slidePicture").attr("src", this.slides[this.slidesIndex].src);
        $("#slideText").text(this.slides[this.slidesIndex].text);
    }
    
    // Méthode permettant de passer à la diapositive précédente
    goPreviousSlide() {
        this.slidesIndex--;
        if(this.slidesIndex < 0) { // Si l'index arrive au début de la liste des diapositive,
            this.slidesIndex = this.slides.length - 1; // Passe à la dernière diapositive de la liste
        }
        // On affiche la nouvelle diapositive
        $("#slidePicture").attr("src", this.slides[this.slidesIndex].src);
        $("#slideText").text(this.slides[this.slidesIndex].text);
    }
    
    // Méthode permettant de gérer l'événement d'un clic sur le bouton "Suivant"
    goNextSlideClickEvent() {
        const self = this;
        $("#nextSlideButton").on("click", () => {
            self.goNextSlide();
        });
    }
    
    // Méthode permettant de gérer l'événement d'un clic sur le bouton "Précédent"
    goPreviousSlideClickEvent() {
        const self = this;
        $("#previousSlideButton").on("click", () => {
            self.goPreviousSlide();
        });
    }
    
    // Méthode permettant de gérer les événements clavier des touches "<--" et "-->"
    goPreviousNextSlideKeyboardEvents() {
        const self = this;
        $("body").on("keydown", e => {
            switch (e.keyCode) {
                case 39: // Si la touche "-->" est pressée,
                    self.goNextSlide(); // Passe à la diapositive suivante
                    break;
                case 37: // Si la touche "<--" est pressée,
                    self.goPreviousSlide(); // Passe à la diapositive précédente
                    break;
            }
        });
    }
    
    // Méthode permettant de gérer l'animation du diaporama
    animate() {
        const self = this;
        let intervalId = setInterval( () => { // Toutes les 2 secondes, la diapositive suivante est affichée
        self.goNextSlide();
        }, 2000);
        
        // Gestion de l'événement d'un clic sur le bouton "Stop/Start"
        let animationStarted = true; // Par défaut, l'animation est lancée
        $("#stopSlideshowButton").on("click", () => {
            if (animationStarted === true) { // Si l'animation est lancée,
                animationStarted = false; // Arrêter l'animation
                clearInterval(intervalId);
                $("#stopSlideshowButton").removeClass("btn-danger").addClass("btn-success"); // Le bouton change de couleur
                $("#stopSlideshowButton span").removeClass("glyphicon-pause").addClass("glyphicon-play"); // Le bouton affiche l'icône "play"
            } else { // Si l'animation est arrêtée,
                animationStarted = true; // Lancer l'animation
                intervalId = setInterval( () => {
                    self.goNextSlide();
                }, 2000);
                $("#stopSlideshowButton").removeClass("btn-success").addClass("btn-danger"); // Le bouton change de couleur
                $("#stopSlideshowButton span").removeClass("glyphicon-play").addClass("glyphicon-pause"); // Le bouton affiche l'icône "pause"
            }
        });
    }
    
    // Méthode permettant d'initialiser le diaporama
    initialize() {
        this.goNextSlideClickEvent();
        this.goPreviousSlideClickEvent();
        this.goPreviousNextSlideKeyboardEvents();
        this.animate();
    }
}