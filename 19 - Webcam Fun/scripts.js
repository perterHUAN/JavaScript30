const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const toggle = document.querySelector('.camera');


let isOpenCamera = false;
let cancel = null;

function openCamera() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true})
            .then(stream => {
                video.srcObject = stream;
                video.play();
                isOpenCamera = true;
                updateToggle();
            }).catch(err => {
                console.log("open camera fail", err);
            })
    }
}

function closeCamera() {
    const stream = video.srcObject;
    if(stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        isOpenCamera = false;
        clearInterval(cancel);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateToggle();
    }
}
function updateToggle() {
    toggle.textContent = isOpenCamera ? "close camera" : "open camera";
}
function toggleCamera() {
    if(isOpenCamera) {
        closeCamera();
    }else {
        openCamera();
    }
}
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }
  
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    
    canvas.width = width;
    canvas.height = height;

    cancel = setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = rgbSplit(pixels);
        ctx.putImageData(pixels, 0, 0);
    },16);
}

function takePhoto() {
    // 播放音乐
    snap.currentTime = 0;
    snap.play();

    
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<image src=${data} alt="handsome man" />`;
    strip.insertBefore(link, strip.firstChild);


}

video.addEventListener('canplay', paintToCanvas);