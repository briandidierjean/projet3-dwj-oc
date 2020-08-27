//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// OBJET SIGNATURE /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default class Signature {
    constructor() {
        this.$canvasElt = $("#canvas");
        this.ctx = this.$canvasElt[0].getContext('2d');
        this.signature = false; // Par défaut, il n'y a pas de signature
        this.drawing = false; // Par défaut, il n'y a pas de dessin en cours
    }
    
    // Méthode permettant d'afficher la pop-up pour signer
    displaySignature() {
        $("#reservationForm").on("submit", (e) => {
            e.preventDefault();
            $(".modal").modal("show"); // Affiche la fenêtre modale contenant le champ de la signature
        });
    }
    
    // Méthode permettant de gérer le début d'un dessin
    startDrawing(positionX, positionY) {
        this.drawing = true; // Un dessin est en cours
        this.ctx.beginPath();
        this.ctx.moveTo(positionX, positionY);
    }
    
    // Méthode permettant de dessiner
    draw(positionX, positionY) {
        if (this.drawing) { // Si un dessin est en cours
            this.signature = true; // Une signature est créée
            this.ctx.lineWidth = 3; // Largeur du trait
            this.ctx.lineTo(positionX, positionY);
            this.ctx.stroke();
        }
    }
    
    // Méthode permettant de gérer la fin d'un dessin
    stopDrawing() {
        this.drawing = false; // Pas de dessin en cours
        this.ctx.closePath();
        if (this.signature) { // Si une signature à été créée
            $("#reservationButton").css("display", "inline"); // Affiche le bouton de permettant de lancer la réservation
        }
    }
    
    // Méthode permettant de gérer l'événement lorsque le bouton de la souris est enfoncé sur le canvas
    startDrawingClickEvent() {
        const self = this;
        this.$canvasElt.on("mousedown", e => {
            let positionX = e.offsetX; // Récupère la position horizontale de la souris à l'intérieur du canvas
            let positionY = e.offsetY; // Récupère la position verticale de la souris à l'intérieur du canvas
            self.startDrawing(positionX, positionY);
        });
    }
    
    // Méthode permettant de gérer l'événement lorsque la souris bouge sur le canvas
    drawClickEvent() {
        const self = this;
        this.$canvasElt.on("mousemove", e => {
            let positionX = e.offsetX; // Récupère la position horizontale de la souris à l'intérieur du canvas
            let positionY = e.offsetY; // Récupère la position verticale de la souris à l'intérieur du canvas
            self.draw(positionX, positionY);
        });
    }
    
    // Méthode permettant de gérer l'événement lorsque le bouton de la souris est relâché du canvas
    stopDrawingClickEvent() {
        const self = this;
        this.$canvasElt.on("mouseup", e => {
            self.stopDrawing();
        });
    }
    
    // Méthode permettant de gérer l'événement lorsqu'un doigt est posé sur le canvas
    startDrawingTouchEvent() {
        const self = this;
        this.$canvasElt.on("touchstart", e => {
            e.preventDefault();
            let positionX = e.touches[0].pageX - $("#canvas").offset().left; // Récupère la position horizontale du doigt à l'intérieur du canvas
            let positionY = e.touches[0].pageY - $("#canvas").offset().top; // Récupère la position verticale du doigt à l'intérieur du canvas
            self.startDrawing(positionX, positionY);
        });
    }
    
    // Méthode permettant de gérer l'événement lorsqu'un doigt bouge sur le canvas
    drawTouchEvent() {
        const self = this;
        this.$canvasElt.on("touchmove", e => {
            e.preventDefault();
            let positionX = e.touches[0].pageX - $("#canvas").offset().left; // Récupère la position horizontale du doigt à l'intérieur du canvas
            let positionY = e.touches[0].pageY - $("#canvas").offset().top; // Récupère la position verticale du doigt à l'intérieur du canvas
            self.draw(positionX, positionY);
        });
    }
    
    // Méthode permettant de gérer l'événement lorsqu'un doigt est relâché du canvas
    stopDrawingTouchEvent() {
        const self = this;
        this.$canvasElt.on("touchend", e => {
            self.stopDrawing();
        });
    }
    
    // Méthode permettant d'effacer le canvas
    clear() {
        this.ctx.clearRect(0, 0, this.$canvasElt[0].width, this.$canvasElt[0].height);
        this.signature = false; // La signature est effacée
        $("#reservationButton").css("display", "none"); // Cache le bouton de permettant de lancer la réservation
    }
    
    // Méthode permettant de gérer l'événement d'un clic sur le bouton "Effacer"
    clearClickEvent() {
        const self = this;
        $("#clearSignatureButton").on("click", () => {
            self.clear();
        });
    }
    
    // Méthode permettant d'initialiser le champ pour la signature
    initialize() {
        this.displaySignature();
        this.startDrawingClickEvent()
        this.drawClickEvent();
        this.drawClickEvent();
        this.stopDrawingClickEvent();
        this.startDrawingTouchEvent();
        this.drawTouchEvent();
        this.stopDrawingTouchEvent();
        this.clearClickEvent()
    }
}