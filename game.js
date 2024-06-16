// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const screenWidth = 800;
const screenHeight = 600;
canvas.width = screenWidth;
canvas.height = screenHeight;

// Player variables
let playerX = 50;
let playerY = 50;
const playerSize = 50;

// Coins array
let coins = [];
const numCoins = 10;
for (let i = 0; i < numCoins; i++) {
    coins.push({
        x: Math.random() * (screenWidth - playerSize),
        y: Math.random() * (screenHeight - playerSize)
    });
}

// Load background image
const backgroundImage = new Image();
backgroundImage.src = 'Capture.png';

// Keyboard event listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

function keyDownHandler(event) {
    if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    }
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight);

    // Move player based on keyboard input
    if (leftPressed && playerX > 0) {
        playerX -= 7;
    }
    if (rightPressed && playerX < screenWidth - playerSize) {
        playerX += 7;
    }
    if (upPressed && playerY > 0) {
        playerY -= 7;
    }
    if (downPressed && playerY < screenHeight - playerSize) {
        playerY += 7;
    }

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, playerSize, playerSize);

    // Draw coins
    for (let i = 0; i < coins.length; i++) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(coins[i].x + playerSize / 2, coins[i].y + playerSize / 2, playerSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Check collision with player
        if (playerX < coins[i].x + playerSize &&
            playerX + playerSize > coins[i].x &&
            playerY < coins[i].y + playerSize &&
            playerY + playerSize > coins[i].y) {
                // Remove collected coin
                coins.splice(i, 1);

                // Generate new coin
                coins.push({
                    x: Math.random() * (screenWidth - playerSize),
                    y: Math.random() * (screenHeight - playerSize)
                });
            }
    }

    // Check win condition
    if (coins.length === 0) {
        console.log('Congratulations! You collected all the coins.');
        return;
    }

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
