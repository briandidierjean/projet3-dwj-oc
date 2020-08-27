//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// OBJET STATION ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
import {mapObj} from "./main.js";
import {reservationObj} from "./main.js";

export default class Station {
    constructor(city) {
        this.city = city; // Ville des stations
        this.apiKey = "2af2b41aab45ecd15dcae452668c37bf161b03b8"; // Clé de l'API JCDecaux
    }
    
    // Méthode permettant de récupérer les informations des stations d'une ville sous forme d'une liste d'objets
    getAllStations() {
        $.get(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.city}&apiKey=${this.apiKey}`, stations => {
            stations.forEach( station => { // Pour chaque station de la liste,
                mapObj.markers(station); // Appelle la méthode pour créer le marqueur sur la carte
            });
            mapObj.markerCluster(); // Appelle la méthode pour afficher les marqueurs et les clusters de marqueurs sur la carte
        });
    }
    
    // Méthode permettant de récupérer les informations d'une station sous forme d'un objet
    getStation(stationNumber) {
        $.get(`https://api.jcdecaux.com/vls/v1/stations/${stationNumber}?contract=${this.city}&apiKey=${this.apiKey}`, station => {
            if (reservationObj.reservation.address === station.address) { // Si une réservation est en cours à cette station
                station.available_bikes--; // On enlève un vélo disponible de cette station
            }
            mapObj.stationInformation(station); // Appelle la méthode pour afficher les informations de la station
        });
    }
}