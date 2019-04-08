const GeocodingUtility = {

    getDistance(serviceLat, serviceLong, location) {
        if (location) {
            let userLat = location.latitude;
            let userLong = location.longitude;
            if (userLat && userLong && serviceLat && serviceLong) {
                return this.calcHaversine(userLat, userLong, serviceLat, serviceLong);
            }
        }
        return null;
    },

    calcHaversine(lat1, lon1, lat2, lon2)
    {
        let R = 6371;
        let dLat = this.toRadians(lat2-lat1);
        let dLon = this.toRadians(lon2-lon1);
        let lat1rad = this.toRadians(lat1);
        let lat2rad = this.toRadians(lat2);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1rad) * Math.cos(lat2rad);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return d;
    },

    toRadians(value)
    {
        return value * Math.PI / 180;
    },
};

export default GeocodingUtility;