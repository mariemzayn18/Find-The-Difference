let level = 1; // numberOfImagesPerGrid
const maxLevels = 10;

// Define our grids
const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");
const leftRect = leftGrid.getBoundingClientRect();
const rightRect = rightGrid.getBoundingClientRect();

leftGrid.style.height = window.outerHeight + "px";

// Create our images
const buttonImage = document.createElement("button");
const img = document.createElement("img");
img.src = "assets/img.png";

// get Random positions in the grid
function getRandomPositions(grid) {
  const randomX = Math.floor(Math.random() * (grid.clientWidth - img.width));
  const randomY = Math.floor(Math.random() * window.innerHeight);
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

// Choose the different image
function handleImageClick(img) {
  console.log(img.target.id);
  const id = img.target.id;
  if (id == level * 2) {
    alert("You Won, Continue to the Next Level!");
    level++;
    if (level > maxLevels) {
      alert("CONGRATULATIONS!, You Won the Game!");
    } else {
      document.getElementById("level").innerHTML = "Level: " + level;
      generateGrids(level);
    }
  } else {
    alert("You Lost, Try Again!");
  }
}

// Generate the grids
function generateGrids(level) {
  // Clear the grids
  leftGrid.innerHTML = "";
  rightGrid.innerHTML = "";

  for (let i = 0; i < level; i++) {
    // Get random positions
    let [randomX, randomY] = getRandomPositions(leftGrid);
    let randomXRight =
      randomX + leftRect.left + leftRect.width - rightRect.left;

    // For the Left image
    placeImage(leftGrid, randomX, randomY, i);

    // For the Right image
    placeImage(rightGrid, randomXRight, randomY, i + level);
  }

  // Extra Image
  let [randomXExtraImg, randomYExtraImg] = getRandomPositions(rightGrid);
  placeImage(rightGrid, randomXExtraImg, randomYExtraImg, level * 2);

  // Add click event listeners to images
  const images = document.querySelectorAll("button");
  images.forEach((image) => {
    image.addEventListener("click", handleImageClick);
  });
}

// Start the game
document.getElementById("level").innerHTML = "Level: " + level;
generateGrids(level);

