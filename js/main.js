import Slideshow from "./slideshow.js";
import Station from "./station.js";
import Map from "./map.js";
import Signature from "./signature.js";
import Reservation from "./reservation.js";

// Variables
const slides = [ // Liste d'objets contenant les diapositives
    {
        src: "pictures/slide1.png",
        text: "Sélectionnez une station et renseignez votre nom et prénom"
    },
    {
        src: "pictures/slide2.png",
        text: "Signez dans le champ prévu à cette effet et validez"
    },
    {
        src: "pictures/slide3.png",
        text: "Vous disposez de 20 minutes pour récupérer votre vélo"
    }
];
const city = "lyon";
const cityLatitude = 45.75; // Latitude de la ville de Lyon
const cityLongitude = 4.85; // Longitude de la ville de Lyon

// Instanciation des objets
const slideshowObj = new Slideshow(slides);
export const stationObj = new Station(city);
export const mapObj = new Map(cityLatitude, cityLongitude);
export const signatureObj = new Signature();
export const reservationObj = new Reservation();

// Initialisation
slideshowObj.initialize();
mapObj.initialize();
signatureObj.initialize();
reservationObj.initialize();