var c = document.createElement('canvas');
// var c = document.getElementById("cc");
var context = c.getContext("2d");

let clockR = 128 / 2.2;
c.width = c.height = clockR * 2.2;
context.translate(c.width / 2, c.height / 2);

function drawClock(h, m, s) {
//bg
    context.fillStyle = '#c29a38';
    context.save();
    context.translate(-clockR * 1.1, -clockR * 1.1);
    context.clearRect(0, 0, c.width, c.height);
    context.fillRect(0, 0, clockR * 2.2, clockR * 2.2);
    context.restore();

//时钟框和底
    context.beginPath();
    context.strokeStyle = '#000';
    context.fillStyle = '#fff';
    context.lineWidth = 3;
    context.arc(0, 0, clockR, 0, Math.PI * 2);
    context.stroke();
    context.fill();

//刻度
    context.fillStyle = '#4d3627';
    for (let i = 0; i < 12; i++) {
        context.save();
        context.rotate(Math.PI / 6 * i);
        context.fillRect(-1, -clockR * 0.9, 2, 10);
        context.restore();
    }

//分针
    function fenChange(d) {
        context.save();
        context.rotate((d - 180) * Math.PI / 180);
        context.fillRect(-clockR * 0.025, -clockR * 0.1, clockR * 0.05, clockR * 0.8);
        context.restore();
    }

//时针
    function shiChange(d) {
        context.save();
        context.rotate((d - 180) * Math.PI / 180);
        context.fillRect(-clockR * 0.025, -clockR * 0.1, clockR * 0.05, clockR * 0.6);
        context.restore();
    }

//秒针
    function mChange(d) {
        context.save();
        context.rotate((d - 180) * Math.PI / 180);
        context.fillStyle = '#930009';
        context.fillRect(-clockR * 0.01, -clockR * 0.2, clockR * 0.02, clockR * 0.9);
        context.restore();
    }

    shiChange(h * 360 / 12);
    fenChange(m * 360 / 60);
    mChange(s * 360 / 60);

    context.beginPath();
    context.fillStyle = '#2d0c09';
    context.arc(0, 0, clockR * 0.05, 0, Math.PI * 2);
    context.fill();
}

// setInterval(() => {
//     let time = new Date();
//     let hour = time.getHours();
//     let min = time.getMinutes();
//     let second = time.getSeconds();
//     drawClock(hour, min, second);
//     console.log(hour,min,second);
//     // clock.getContext('2d').drawImage(c, 200, 200);
// }, 1000);
//     drawClock(11,52,26);
