const generateBtn = document.getElementById("generate-btn");
const palettecontainer = document.querySelector(".palette-container");

// Handle Generate Button
generateBtn.addEventListener("click", generatePalette);

// Handle Copy Clicks
palettecontainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));
  } else if (e.target.classList.contains("color")) {
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
    const copyIcon = e.target.nextElementSibling.querySelector(".copy-btn");

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(copyIcon))
      .catch((err) => console.log(err));
  }
});

function showCopySuccess(copyBtn) {
  copyBtn.classList.remove("far", "fa-copy");
  copyBtn.classList.add("fas", "fa-check");
  copyBtn.style.color = "#49bb78";

  setTimeout(() => {
    copyBtn.classList.remove("fas", "fa-check");
    copyBtn.classList.add("far", "fa-copy");
    copyBtn.style.color = "";
  }, 1500);
}

// Generate Random Palette
function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  updatePaletteDisplay(colors);
}

// Random Hex Generator
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Update UI with new palette
function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

// Initial load
generatePalette();
