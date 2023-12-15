let level = 1; // numberOfImagesPerGrid
const maxLevels = 15;

// Define our grids
const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");
const gridsRow = document.getElementById("grids");

// Create our images
const buttonImage = document.createElement("button");
const img = document.createElement("img");
img.src = "assets/img.png";

// get Random positions in the grid
function getRandomPositions(grid = leftGrid) {
  let imgWidth = 100;
  if (window.innerWidth < 650) {
    imgWidth = 50;
  }
  const randomX = Math.floor(Math.random() * (grid.clientWidth - imgWidth));
  const randomY = Math.floor(
    Math.random() * (gridsRow.offsetHeight - imgWidth)
  );
  return [randomX, randomY];
}

// place images in the grid
function placeImage(grid, randomX, randomY, index) {
  const newButtonImage = buttonImage.cloneNode(true);
  const newImg = img.cloneNode(true);
  newImg.style.left = randomX + "px";
  newImg.style.top = randomY + "px";
  newImg.id = index;
  newButtonImage.appendChild(newImg);
  grid.appendChild(newButtonImage);
}

// Game Logic
function handleImageClick(img) {
  const id = img.target.id;
  if (id == level * 2) {
    alert("You Won, Continue to the Next Level!");
    level++;
    if (level > maxLevels) {
      alert("CONGRATULATIONS!, You Won the Game!");
    } else {
      document.getElementById("level").innerHTML = "Level " + level;
      generateGrids(level);
    }
  } else {
    alert("You Lost, Try Again!");
  }
}

// Generate the grids
function generateGrids(level) {
  // Clear the grids for a new level
  leftGrid.innerHTML = "";
  rightGrid.innerHTML = "";

  for (let i = 0; i < level; i++) {
    // Get random positions
    let [randomX, randomY] = getRandomPositions();

    // For the Left grid
    placeImage(leftGrid, randomX, randomY, i);

    // For the Right grid
    placeImage(rightGrid, randomX, randomY, i + level);
  }

  // Extra Image to the Right grid
  let [randomXExtraImg, randomYExtraImg] = getRandomPositions();
  placeImage(rightGrid, randomXExtraImg, randomYExtraImg, level * 2);

  // Add click event listeners to images
  const images = document.querySelectorAll("button");
  images.forEach((image) => {
    image.addEventListener("click", handleImageClick);
  });
}

// Update images' positions on window resize
window.addEventListener("resize", () => {
  generateGrids(level);
});

// Start the game
document.getElementById("level").innerHTML = "Level " + level;
generateGrids(level);
