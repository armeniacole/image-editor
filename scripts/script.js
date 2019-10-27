// 1. Upload an Image file
// 2. Get Image onto canvas
// 3. Alter the image on the canvas
// 4. Save the altered image


// get the file input
const upload = document.getElementById('upload');

// set up canvas
const canvas = document.getElementById('imageCanvas');
const context = canvas.getContext('2d');

const handleImage = (e) => {
    
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

upload.addEventListener("change", handleImage, false);

const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessValue = document.getElementById("brightnessValue");

const applyBrightness = (data, brightness) => {
  for (var i = 0; i < data.length; i += 4) {
    data[i] += 255 * (brightness / 100);
    data[i + 1] += 255 * (brightness / 100);
    data[i + 2] += 255 * (brightness / 100);
  }
}

brightnessSlider.addEventListener("change", (event) => {
    let imageData;

    brightnessValue.innerText = event.currentTarget.value;

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    applyBrightness(imageData.data, parseInt(brightnessSlider.value, 10));

    context.putImageData(imageData, 0, 0);

})

var link = document.createElement("a");
link.innerHTML = "download image";
link.addEventListener(
  "click",
  function(ev) {
    link.href = canvas.toDataURL();
    link.download = "edited.jpeg";
  },
  false
);
document.body.appendChild(link);



