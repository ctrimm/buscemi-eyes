var fps = 4;

// grab the video element (currently hidden via inline css...)
var video = document.getElementById('videoElement');

document.addEventListener("DOMContentLoaded", function() {
    // Get access to the camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            // Access to the camera was OK'd
            video.src = window.URL.createObjectURL(stream);
            // Time to initialize everything
            initialize();
        });
    }
});

//Preps the document
function initialize(){
    video = document.querySelector('#videoElement');
    
    glasses = new Image();
    glasses.src = "img/eyes.png";

    canvas = document.getElementById("buscemiMe");
    ctx = canvas.getContext("2d");

    setInterval(function() {
        drawToCanvas(video, canvas, ctx, glasses);
    }, 5);
}

function drawToCanvas(video, canvas, ctx, glasses) {
    var video = video,
    ctx = ctx,
    canvas = canvas,
    i;

    ctx.drawImage(video, 0, 0, 600,600);

    pixels = ctx.getImageData(0,0,canvas.width,canvas.height);

    var comp = ccv.detect_objects({ "canvas" : (canvas),
                                    "cascade" : cascade,
                                    "interval" : 5,
                                    "min_neighbors" : 1 });

    // Draw eyes on every face match
    for (i = 0; i < comp.length; i++) {
        ctx.drawImage(glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
    }
}