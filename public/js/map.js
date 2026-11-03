
console.log("Map token:", mapToken ? "Available" : "Missing");
console.log("Listing coordinates:", coordinates);

// Validate coordinates before initializing Mapbox
if (
    !Array.isArray(coordinates) ||
    coordinates.length !== 2 ||
    !coordinates.every(Number.isFinite) ||
    coordinates[0] < -180 ||
    coordinates[0] > 180 ||
    coordinates[1] < -90 ||
    coordinates[1] > 90
) {
    document.getElementById("map").innerHTML =
        "Map location is unavailable for this listing.";
} else if (!mapToken) {
    console.error("Mapbox token is missing.");
} else {
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates,
        zoom: 9
    });

    new mapboxgl.Marker({ color: "red" })
        .setLngLat(coordinates)
        .addTo(map);
}
