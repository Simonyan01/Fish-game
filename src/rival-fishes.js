import { ctx, canvas } from "utils";

export class RivalFish {
    #image = new Image();

    x = null
    y = null
    w = null
    h = null
    value = null
    speed = 2.5

    constructor(x, y, w, h, game, imageSrc, value) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = game;
        this.#image.src = imageSrc;
        this.#image.onload = () => this.draw();
        this.value = value;
    }

    draw() {
        ctx.drawImage(this.#image, this.x, this.y, this.w, this.h);
        this.setParams()
    }

    setParams() {
        ctx.font = "2rem Raleway";
        ctx.fillStyle = "orange";
        ctx.textAlign = "center";

        ctx.fillText(this.value, this.x + this.w / 2, this.y - 8);
    }

    move() {
        this.x -= this.speed;

        if (this.x + this.w < 0) {
            this.reset();
        }
        this.draw();
    }

    reset() {
        let newX, newY;

        do {
            newX = canvas.width + Math.random() * canvas.width;
            newY = Math.random() * (canvas.height - this.h);
        } while (this.game.checkOverlap(newX, newY, this.w, this.h));

        this.x = newX;
        this.y = newY;
    }
}
