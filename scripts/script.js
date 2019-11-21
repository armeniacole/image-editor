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

const originalData = context.getImageData(0, 0, canvas.width, canvas.height);
console.log(originalData);

const brightnessSlider = document.getElementById("brightnessSlider");
const brightnessValue = document.getElementById("brightnessValue");
const brightnessReset = document.getElementById("resetBrightness");

const applyBrightness = (data, brightness) => {
  for (var i = 0; i < data.length; i += 4) {
    data[i] += 255 * (brightness / 100);
    data[i + 1] += 255 * (brightness / 100);
    data[i + 2] += 255 * (brightness / 100);
  }
}

brightnessSlider.addEventListener("change", (event) => {
    console.log(originalData);
    // context.putImageData(originalData, 0, 0);

    let imageData;

    brightnessValue.innerText = event.currentTarget.value;

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    applyBrightness(imageData.data, parseInt(brightnessSlider.value, 10));

    context.putImageData(imageData, 0, 0);

    console.log(brightnessSlider.value)
    console.log(imageData)
    console.log("data change")

})

brightnessReset.addEventListener("click", (event) => {
    brightnessSlider.value = 0;
    brightnessValue.innerText = event.currentTarget.value;

    context.putImageData(originalData, 0, 0);
    console.log(brightnessSlider.value);
})

var link = document.createElement("a");
link.innerHTML = "download image";

link.addEventListener("click", () => {
    link.href = canvas.toDataURL();
    link.download = "edited.jpeg";
  },
  false
);
document.body.appendChild(link);



