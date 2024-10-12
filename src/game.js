import { ctx, canvas, smallFishImages, bigFishImages } from "utils"
import { RivalFish } from "rival-fishes"
import { Fish } from "fish"

export class Game {
    fish = new Fish()

    rivalFishes = []
    totalRivalFishes = 23

    constructor() {
        this.initRivalFishes()
    }

    initRivalFishes() {
        const allFishImages = [...smallFishImages, ...bigFishImages]
        this.shuffleImages(allFishImages)

        for (let i = 0; i < Math.min(this.totalRivalFishes, allFishImages.length); ++i) {
            const imageSrc = allFishImages[i]
            const { w, h, value } = this.getFishSize(imageSrc)
            console.log(value);

            const x = canvas.width + Math.random() * canvas.width
            const y = Math.random() * (canvas.height - h)

            if (!this.checkOverlap(x, y, w, h)) {
                this.rivalFishes.push(new RivalFish(x, y, w, h, this, imageSrc, value))
            }
        }
    }

    getFishSize(imageSrc) {
        if (smallFishImages.includes(imageSrc)) {
            return { w: 70, h: 70, value: Math.floor(5 + Math.random() * 11) }
        } else {
            return { w: 150, h: 150, value: Math.floor(15 + Math.random() * 11) }
        }
    }

    checkOverlap(x, y, w, h) {
        for (let rivalFish of this.rivalFishes) {
            if (
                x < rivalFish.x + rivalFish.w &&
                x + w > rivalFish.x &&
                y < rivalFish.y + rivalFish.h &&
                y + h > rivalFish.y
            ) {
                return true
            }
        }
        return false
    }

    shuffleImages(arr) {
        for (let i = arr.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }

    start() {
        this.id = requestAnimationFrame(() => this.run())
        this.bindEvent()
    }

    bindEvent() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(e) {
        switch (e.key) {
            case "ArrowUp":
                this.fish.moveUp();
                break;
            case "ArrowDown":
                this.fish.moveDown();
                break;
            case "ArrowLeft":
                this.fish.moveLeft();
                break;
            case "ArrowRight":
                this.fish.moveRight();
                break;
        }
    }

    run() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.fish.move();
        this.rivalFishes.forEach(rivalFish => {
            rivalFish.move();

            if (this.checkCollision(this.fish, rivalFish)) {
                if (this.fish.value >= rivalFish.value) {
                    this.fish.value += rivalFish.value;
                    if (this.fish.value < 150) {
                        this.fish.grow(rivalFish.h * 0.3);
                    }
                    rivalFish.reset();
                } else {
                    this.over();
                }
            }
        });

        this.id = requestAnimationFrame(() => this.run());
    }

    checkCollision(fish, rivalFish) {
        return (
            fish.x < rivalFish.x + rivalFish.w &&
            fish.x + fish.w > rivalFish.x &&
            fish.y < rivalFish.y + rivalFish.h &&
            fish.y + fish.h > rivalFish.y
        );
    }

    over() {
        alert('Game Over!!! Your fish was eaten.');
        cancelAnimationFrame(this.id);
        this.resetGame()
    }

    resetGame() {
        this.rivalFishes = [];
        this.fish = new Fish();
        this.initRivalFishes();
    }
}