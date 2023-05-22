import { Behaviour, showBalloonMessage } from "@needle-tools/engine";

export class WhereAmI extends Behaviour {
    start() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("Navigator response:", position);
            const latlong = position.coords.latitude + ", " + position.coords.longitude;
            showBalloonMessage("You are at\nLatLong " + latlong);
        });
    }
}