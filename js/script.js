var fps = 4;

// Grab elements, create settings, etc.
var video = document.getElementById('videoElement');

document.addEventListener("DOMContentLoaded", function() {
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            // OK, we have access to the camera.
            // Let's initialize everything

            video.src = window.URL.createObjectURL(stream);
            video.play();
            initialize();
        });
    }
});

function initialize(){
    // Prep the document
    video = document.querySelector('#videoElement');
    
    glasses = new Image();
    glasses.src = "img/eyes.png";

    canvas = document.getElementById("buscemiMe");
    ctx = canvas.getContext("2d");

    playing = false;

    if(playing) { clearInterval(playing); }
    playing = setInterval(function() {
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

    // Draw eyes on everyone!
    for (i = 0; i < comp.length; i++) {
        ctx.drawImage(glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
    }
}