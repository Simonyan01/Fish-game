import { ctx, canvas } from "utils";

export class Fish {
    #image = new Image()

    x = 130
    y = 350
    w = 60
    h = 60
    value = 7;

    constructor() {
        this.#image.src = "/images/main-fish.png";
        this.#image.onload = () => this.draw();
    }

    draw() {
        ctx.drawImage(this.#image, this.x, this.y, this.w, this.h);
        this.setParams();
    }

    setParams() {
        ctx.font = "3.5rem Raleway";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";

        ctx.fillText(this.value, this.x + this.w / 2, this.y - 8);
    }

    move() {
        this.draw();
    }

    moveUp() {
        this.y = Math.max(this.y - 60, 0);
    }

    moveDown() {
        this.y = Math.min(this.y + 60, canvas.height - this.h);
    }

    moveLeft() {
        this.x = Math.max(this.x - 60, 0);
    }

    moveRight() {
        this.x = Math.min(this.x + 60, canvas.width - this.w);
    }

    grow(sizeIncrease) {
        this.w += sizeIncrease;
        this.h += sizeIncrease;
    }
}
