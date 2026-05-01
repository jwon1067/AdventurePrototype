
class Farm extends AdventureScene {
    constructor() {
        super("farm", "Farm");
    }

    onEnter() {

       let pig = this.add.text(this.w * 0.3, this.w * 0.1, "🐖")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a pig.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the pig.");
                this.gainItem('pig');
                this.tweens.add({
                    targets: pig,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => pig.destroy()
                });
            })
            
        let cow = this.add.text(this.w * 0.3, this.w * 0.3, "🐄")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You found the cow.")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked uo the cow.");
                this.gainItem('cow');
                this.tweens.add({
                    targets: cow,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => cow.destroy()
                });
            })

        let sheep = this.add.text(this.w * 0.5, this.w * 0.2, "🐑")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You found the sheep.")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked up the sheep.");
                this.gainItem('sheep');
                this.tweens.add({
                    targets: sheep,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => sheep.destroy()
                });
            })

        let barn = this.add.text(this.w * 0.1, this.w * 0.15, "🧑‍🌾")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("pig") && this.hasItem("cow")  && this.hasItem("sheep")) {
                    this.showMessage("You've completed your grocery list for this supply run.");
                } else {
                    this.showMessage("Oops, you have an incomplete grocery list, double check your list.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("pig") && this.hasItem("cow") && this.hasItem("sheep")) {
                    this.loseItem("pig");
                    this.loseItem("cow");
                    this.loseItem("sheep");
                    this.showMessage("*squeak*");
                    this.showMessage("Task complete!");
                    this.gotoScene('shop');
                }
            })

    }
}

class Shop extends AdventureScene {
    constructor() {
        super("shop", "Grocery Store");
    }

    onEnter() {

        let cheese = this.add.text(this.w * 0.3, this.w * 0.1, "🧀")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a piece of cheese.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the cheese.");
                this.gainItem('cheese');
                this.tweens.add({
                    targets: cheese,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => cheese.destroy()
                });
            })

        let tomato = this.add.text(this.w * 0.3, this.w * 0.3, "🍅")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a tomato.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the tomato.");
                this.gainItem('tomato');
                this.tweens.add({
                    targets: tomato,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => tomato.destroy()
                });
            })

        let mushroom = this.add.text(this.w * 0.5, this.w * 0.2, "🍄")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a mushroom.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the mushroom.");
                this.gainItem('mushroom');
                this.tweens.add({
                    targets: mushroom,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => mushroom.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("mushroom") && this.hasItem("tomato")  && this.hasItem("cheese")) {
                    this.showMessage("You've completed your grocery list for this supply run.");
                } else {
                    this.showMessage("Oops, you have an incomplete grocery list, double check your list.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("mushroom") && this.hasItem("tomato") && this.hasItem("cheese")) {
                    this.loseItem("mushroom");
                    this.loseItem("tomato");
                    this.loseItem("cheese");
                    this.showMessage("*squeak*");
                    this.showMessage("Task complete!");
                    this.gotoScene('pizzaParlor');
                }
            })

    }
}

class PizzaParlor extends AdventureScene {
    constructor() {
        super("pizzaParlor", "Pizza Parlor");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('shop');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('farm'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Farm, Shop, PizzaParlor, Outro],
    title: "Adventure Game",
});

