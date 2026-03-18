const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.5,
    jumpPower: 10,
    velocityY: 0,
    isJumping: false
};

let obstacles = [];
let score = 0;
let gameOver = false;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: 160, width: 20, height: 20 });
    }
    obstacles.forEach(obstacle => {
        obstacle.x -= 5;
    });
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            gameOver = true;
        }
    });
}

function jump() {
    if (!dino.isJumping) {
        dino.velocityY = -dino.jumpPower;
        dino.isJumping = true;
    }
}

function update() {
    if (gameOver) return;

    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;

    if (dino.y + dino.height >= canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.isJumping = false;
    }

    updateObstacles();
    checkCollision();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();

    score++;
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', jump);
gameLoop();