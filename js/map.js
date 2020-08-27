//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// OBJET CARTE /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
import {stationObj} from "./main.js";
import {reservationObj} from "./main.js";

export default class Map {
    constructor(latitude, longitude) {
        this.leafletMapObj;
        this.leafletMarkersObj;
        this.latitude = latitude;
        this.longitude = longitude;
        this.mapZoom = 13; // Zoom par défaut
    }
    
    // Méthode permettant d'initialiser la carte
    initialize() {
        this.leafletMapObj = L.map("map").setView([this.latitude, this.longitude], this.mapZoom);
        this.leafletMarkersObj = new L.MarkerClusterGroup(); // Création d'un objet Leaflet.MarkerCluster
        
        // Ajout du layer OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.leafletMapObj);
        
        stationObj.getAllStations(); // Appelle la méthode pour récupèrer les stations
    }
    
    // Méthode permettant de créer et de gérer les marqueurs des stations
    markers(station) {
        const marker = L.marker([station.position.lat, station.position.lng]); // Création du marqueur de la station
        this.leafletMarkersObj.addLayer(marker); // Ajout du marqueur à l'objet markersObj
        
        // Gestion de l'événement d'un clic sur un marqueur
        marker.on("click", e => { // Si un marqueur est cliqué,
            $("#stationInformation").css("display", "block");
            stationObj.getStation(station.number); // Appelle la méthode pour récupérer les infos de la station associée au marqueur
        });
    }
    
    // Méthode permettant d'afficher les marqueurs et les clusters sur la carte
    markerCluster() {
        this.leafletMapObj.addLayer(this.leafletMarkersObj);
    }
    
    // Méthode permettant d'afficher les informations d'une station
    stationInformation(station) {
        $("#reservationTutorial").css("display", "none");
        $("#stationInformation").css("display", "block");
        $("#stationAddress").text(station.address);
        $("#stationAvailableStands").text(station.available_bike_stands);
        $("#stationAvailableBikes").text(station.available_bikes);
        $("#reservationButton").on("click", e => { // Si le bouton de réservation est cliqué
            e.preventDefault();
            $("#stationAvailableBikes").text(station.available_bikes - 1); // Retire le vélo réservé des vélos disponibles des informations de la station sélectionnée
        });
        if (station.available_bikes > 0) { // Si au moins un vélo est disponible
            $("#reservationForm").css("display", "block"); // Affiche le formulaire de réservation
            reservationObj.fillInName(); // Appelle la méthode pour remplir le nom et le prénom de l'utilisateur dans le localStorage
        } else { // Sinon
            $("#reservationForm").css("display", "none"); // Cache le formulaire de réservation
        }
    }
}