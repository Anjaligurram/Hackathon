const canvas = document.getElementById('diceCanvas');
canvas.height = 300;
canvas.width = 300;
const ctx = canvas.getContext('2d');
const xlabel = document.getElementById('xlabel');

function drawDice(number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000';
    const dotSize = 20;
    const dotPositions = {
        1: [[150, 150]],
        2: [[90, 90], [210, 210]],
        3: [[90, 90], [150, 150], [210, 210]],
        4: [[90, 90], [90, 210], [210, 90], [210, 210]],
        5: [[90, 90], [90, 210], [150, 150], [210, 90], [210, 210]],
        6: [[90, 90], [90, 150], [90, 210], [210, 90], [210, 150], [210, 210]]
    };

    dotPositions[number].forEach(position => {
        ctx.beginPath();
        ctx.arc(position[0], position[1], dotSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    });

    xlabel.innerHTML = `Rolled Number: ${number}`;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        const randomNumber = getRandomNumber();
        drawDice(randomNumber);
    }
});

drawDice(3);
