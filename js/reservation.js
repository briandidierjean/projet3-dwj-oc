//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// OBJET RESERVATION ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
import {signatureObj} from "./main.js";

export default class Reservation {
    constructor() {
        this.reservation = {}; // Objet contenant les informations d'une réservation
        this.intervalId;
        this.reservationTime = 20; // Délai en minutes d'expiration de la réservation
    }
    
    // Méthode permettant de préremplir le formulaire de réservation
    fillInName() {
        if ((localStorage.getItem("reservationLastName") !== null) && (localStorage.getItem("reservationFirstName") !== null)) { // Si le localStorage contient le nom et le prénom de l'utilisateur
                $("#lastName").val(localStorage.getItem("reservationLastName")); // Préremplit le champs "nom" avec la valeur du localStorage
                $("#firstName").val(localStorage.getItem("reservationFirstName")); // Préremplit le champs "prénom" avec la valeur du localStorage
            }
    }
    
    // Méthode permettant d'afficher les informations de la réservation
    displayReservationInformation() {
        $("#reservationContainer").css("display", "block");
        $("#expirationInformation").css("display", "none");
        $("#reservationInformation").css("display", "block"); // Affiche les informations de réservation
        $("#reservationAddress").text(this.reservation.address); // Affiche l'adresse de la réservation
        $("#reservationName").text(this.reservation.name); // Affiche le nom de l'utilisateur
    }
    
    // Méthode permettant d'afficher l'expiration de la réservation
    displayExpirationInformation() {
        $("#reservationInformation").css("display", "none");
        $("#expirationInformation").css("display", "block"); // Affiche le message d'expiration de la réservation
        setTimeout(() => { // Cache le message d'expiration après 5 secondes
            $("#reservationContainer").css("display", "none");
        }, 5000);
    }
    
    // Méthode permettant de déterminer si une réservation est en cours dans la session de navigation
    showCurrentReservation() {
        const self = this;
        $(window).on("load", () => {
            if (sessionStorage.getItem("reservation") !== null) { // Si le sessionStorage contient une réservation en cours
                self.reservation = JSON.parse(sessionStorage.getItem("reservation")); // Récupère les informations de cette réservation
                self.displayReservationInformation(); // Appelle la méthode pour afficher le message de réservation
                self.counter(); // Appelle la méthode pour lancer le compteur de la réservation
            }
        });
    }

    // Méthode permettant de lancer la réservation
    reserve() {
        const self = this;
        $("#reservationButton").on("click", e => {
            e.preventDefault();
            signatureObj.clear(); // Appelle la méthode pour effacer le canvas
            $(".modal").modal("hide"); // Cache la fenêtre modale contenant le champ pour la signature
            self.reservation.address = $("#stationAddress").text();
            let reservationLastName = $("#lastName").val();
            let reservationFirstName = $("#firstName").val();
            localStorage.setItem("reservationLastName", reservationLastName); // Stocke le nom de famille de l'utilisateur dans le localStorage
            localStorage.setItem("reservationFirstName", reservationFirstName); // Stocke le nom de famille de l'utilisateur dans le localStorage
            self.reservation.name = `${reservationFirstName} ${reservationLastName}`;
            self.displayReservationInformation() // Appelle la méthode permettant d'afficher les informations de réservation
            self.reservation.minutes = self.reservationTime;
            self.reservation.secondes = 0;
            self.counter(); // Appelle la méthode permettant de lancer le compteur de la réservation
        });
    }
    
    // Méthode permettant de lancer le compteur de la réservation
    counter() {
        clearInterval(this.intervalId);
        $("#minuteCounter").text(this.reservation.minutes); // Affiche le compteur des minutes
        $("#secondeCounter").text(this.reservation.secondes); // Affiche le compteur des secondes
        const self = this;
        this.intervalId = setInterval( () => {
            if (self.reservation.secondes === 0) { // Si le compteur des secondes est à 0
                self.reservation.minutes--; // Le compteur des minutes est diminué de 1
                if (self.reservation.minutes < 0) { // Si le compteur des minutes est inférieur à 0
                    clearInterval(self.intervalId);
                    self.reservation = {}; // Efface l'objet réservation
                    self.displayExpirationInformation(); // Appelle la méthode pour afficher le message d'expiration
                } else {
                    self.reservation.secondes = 59; // Met le compteur des secondes à 59
                    $("#minuteCounter").text(self.reservation.minutes); // Affiche le compteur des minutes
                    $("#secondeCounter").text(self.reservation.secondes); // Affiche le compteur des secondes
                }
            } else {
                self.reservation.secondes--; // Le compteur des seconde est diminué de 1
                $("#secondeCounter").text(self.reservation.secondes); // Affiche le compteur des secondes
            }
        }, 1000);
    }
    
    // Méthode permettant de stocker les données de réservation dans le sessionStorage lorsque la page est fermée
    saveReservation() {
        const self = this;
        $(window).on("unload", () => {
            if (self.reservation.minutes >= 0) { // Si la réservation n'a pas expiré
                sessionStorage.setItem("reservation", JSON.stringify(self.reservation)); // Stocke les informations de la réservation dans le sessionStorage
            } else {
                sessionStorage.clear();
            }
        });
    }
    
    // Méthode permettant d'initialiser la réservation
    initialize() {
        this.showCurrentReservation();
        this.reserve();
        this.saveReservation();
    }
}