const mapboxgl = require('mapbox-gl');
window.mapboxgl = mapboxgl;

var renderMap = async function(videoFile, flightLogFile) {
    var mapTemplate = require(__dirname + "/templates/map.hbs");
    $('body').html(mapTemplate());

    // var video = await loadVideo();
    mapboxgl.accessToken = 'pk.eyJ1IjoieWVsZGFyYnkiLCJhIjoiY2w3czRlcG5qMGxvbDNxbnVoOTUzeW9nNCJ9.RKnzgCuuLaaFzcFsuZWdFQ';
    const videoStyle = {
        'version': 8,
        'sources': {
            'satellite': {
                'type': 'raster',
                'url': 'mapbox://mapbox.satellite',
                'tileSize': 256
            },
            'video': {
                'type': 'video',
                'urls': [URL.createObjectURL(videoFile)],
                'coordinates': [
                    [-122.51596391201019, 37.56238816766053],
                    [-122.51467645168304, 37.56410183312965],
                    [-122.51309394836426, 37.563391708549425],
                    [-122.51423120498657, 37.56161849366671]
                ]
            }
        },
        'layers': [
            {
                'id': 'background',
                'type': 'background',
                'paint': {
                    'background-color': 'rgb(4,7,14)'
                }
            },
            {
                'id': 'satellite',
                'type': 'raster',
                'source': 'satellite'
            },
            {
                'id': 'video',
                'type': 'raster',
                'source': 'video'
            }
        ]
    };
        
    const map = new mapboxgl.Map({
        container: 'map',
        minZoom: 14,
        zoom: 17,
        center: [-122.514426, 37.562984],
        bearing: -96,
        style: videoStyle
    });

    window.map = map;
        
    let playingVideo = true;
        
    map.on('click', () => {
        playingVideo = !playingVideo;
            
        if (playingVideo) {
            map.getSource('video').play();
        } else {
            map.getSource('video').pause();
        }
    });
};

module.exports = renderMap;