import mapboxgl from "mapbox-gl";

let showMap = () => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Brussels.json?access_token=pk.eyJ1IjoiZ2VvcmdpYW5hbTIyIiwiYSI6ImNrenFycXQ3bjN1MzAydm55cDBoNDk3aHUifQ.80Tl5qxyL8PzPUwxkSXW5w`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        mapboxgl.accessToken =
          "pk.eyJ1IjoiZ2VvcmdpYW5hbTIyIiwiYSI6ImNrenFycXQ3bjN1MzAydm55cDBoNDk3aHUifQ.80Tl5qxyL8PzPUwxkSXW5w";
        const map = new mapboxgl.Map({
          container: "map", // container ID
          style: "mapbox://styles/georgianam22/ckzs7n3k9000315mrwfzo4y7m", // style URL
          center: data.features[0].center, // starting position [lng, lat]
          zoom: 2, // starting zoom
        });
      });
  };

  export default showMap