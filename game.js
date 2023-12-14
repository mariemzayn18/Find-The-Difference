let level = 1; // numberOfImagesPerGrid
const maxLevels = 15;

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

// Check overlapping images
// function checkOverlappingImages(randomX, randomY) {
//   const images = document.querySelectorAll("img");
//   let overlapping = false;

//   images.forEach((image) => {
//     const imageRect = image.getBoundingClientRect();
//     const imageLeft = imageRect.left;
//     const imageRight = imageRect.right;
//     const imageTop = imageRect.top;
//     const imageBottom = imageRect.bottom;

//     if (
//       randomX + img.width > imageLeft &&
//       randomX < imageRight &&
//       randomY + img.height > imageTop &&
//       randomY < imageBottom
//     ) {
//       overlapping = true;
//     }
//   });

//   return overlapping;
// }

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

    // const existingImages = new Set();
    // do {
    //   [randomX, randomY] = getRandomPositions(leftGrid);
    //   randomXRight = randomX + leftRect.left + leftRect.width - rightRect.left;
    // } while (
    //   !checkOverlappingImages(randomX, randomY) ||
    //   existingImages.has(randomX + "," + randomY)
    // );

    // existingImages.add(randomX + "," + randomY);

    // For the Left image
    placeImage(leftGrid, randomX, randomY, i);

    // For the Right image
    placeImage(rightGrid, randomXRight, randomY, i + level);
  }

  // Extra Image
  let [randomXExtraImg, randomYExtraImg] = getRandomPositions(leftGrid);
  //   do {
  //     [randomXExtraImg, randomYExtraImg] = getRandomPositions(leftGrid);
  //   } while (!checkOverlappingImages(randomXExtraImg, randomYExtraImg) || existingImages.has(randomXExtraImg + "," + randomYExtraImg));

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
