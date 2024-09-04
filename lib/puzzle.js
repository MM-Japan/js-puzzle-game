const tiles = document.querySelectorAll('td');

const canMove = (tile) => {
  const x1 = tile.cellIndex;
  const y1 = tile.parentElement.rowIndex;

  const empty = document.querySelector(".empty");
  const x2 = empty.cellIndex;
  const y2 = empty.parentElement.rowIndex;

  return ((x2 - x1) ** 2) + ((y2 - y1) ** 2) === 1;
};

const createParticleEffect = (element) => {
  const numParticles = 10;
  const gridContainer = element.closest('table.puzzle-table'); // Find the closest table to align the particles

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    // Position the particle relative to the grid container
    const rect = element.getBoundingClientRect();
    const gridRect = gridContainer.getBoundingClientRect();
    particle.style.left = `${rect.left - gridRect.left + Math.random() * element.clientWidth}px`;
    particle.style.top = `${rect.top - gridRect.top + element.clientHeight / 2}px`;
    gridContainer.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove(); // Remove particle after animation
    });
  }
};

const moveTile = (element) => {
  const emptyTile = document.querySelector(".empty");
  createParticleEffect(element); // Add particle effect
  emptyTile.classList.remove("empty");
  element.classList.add("empty");
  emptyTile.innerText = element.innerText;
  element.innerText = "";
  checkIfPlayerWins();  // Check if the player has won after every move
};

const checkIfPlayerWins = () => {
  const tiles = document.querySelectorAll('td');
  const tileOrder = Array.from(tiles).map(tile => tile.innerText || "0").join(",");
  const winCondition = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0";
  if (tileOrder === winCondition) {
    setTimeout(() => alert("Congratulations, you won!"), 100);
  }
};

// Add event listener on each tile
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (canMove(tile)) {
      tile.classList.add('bubble'); // Apply bubble animation
      moveTile(tile);
    }
  });
});
