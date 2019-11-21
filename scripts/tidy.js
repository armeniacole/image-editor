const photoLab = {};

// get the file input
photoLab.upload = document.getElementById("upload");

// set up canvas
photoLab.canvas = document.getElementById("imageCanvas");
photoLab.context = photoLab.canvas.getContext("2d");

// need to make a copy of the original pixels. attempting to store in browser with hidden img.
photoLab.originalData = document.getElementById("img")

// get elements for brightness slider
photoLab.brightnessSlider = document.getElementById("brightnessSlider");
photoLab.brightnessValue = document.getElementById("brightnessValue");
photoLab.brightnessReset = document.getElementById("resetBrightness");

// Upload the image
photoLab.handleImage = e => {
  const reader = new FileReader();
  const saved = document.getElementById("img")

  reader.onload = event => {
    const img = new Image();

    img.onload = () => {
     // draw to the canvas
      photoLab.canvas.width = img.width;
      photoLab.canvas.height = img.height;
      photoLab.context.drawImage(img, 0, 0);
    // keep a copy to refer to for refresh
      saved.src = event.target.result;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

// Event for upload button.
photoLab.upload.addEventListener("change", photoLab.handleImage, false);

// save the file from the canvas
photoLab.link = document.createElement("a");
photoLab.link.innerHTML = "download image";

photoLab.link.addEventListener(
  "click",
  () => {
    photoLab.link.href = photoLab.canvas.toDataURL();
    photoLab.link.download = "edited.jpeg";
  },
  false
);
document.body.appendChild(photoLab.link);

// reset data for image
photoLab.resetImage = () => {
    photoLab.context.drawImage(originalData, 0, 0)
}


// brightness 
photoLab.applyBrightness = (data, brightness) => {
  for (var i = 0; i < data.length; i += 4) {
    data[i] += 255 * (brightness / 100);
    data[i + 1] += 255 * (brightness / 100);
    data[i + 2] += 255 * (brightness / 100);
  }
};

// event for adjusting brightness

photoLab.brightnessSlider.addEventListener("change", event => {
  
  photoLab.brightnessValue.innerText = event.currentTarget.value;

  const imageData = photoLab.context.getImageData(0, 0, photoLab.canvas.width, photoLab.canvas.height);
  photoLab.applyBrightness(imageData.data, parseInt(photoLab.brightnessSlider.value, 10));

  photoLab.context.putImageData(imageData, 0, 0);

});

photoLab.brightnessReset.addEventListener("click", event => {
  photoLab.brightnessSlider.value = 0;
  photoLab.brightnessValue.innerText = event.currentTarget.value;

  photoLab.context.putImageData(photoLab.originalData, 0, 0);
  
});

