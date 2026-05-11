

class Farm extends window.AdventureScene {
    constructor() {
        super("farm", "Farm");
    }
    onEnter() {

        this.createCollectible({
            x: this.w * 0.3,
            y: this.w * 0.1,
            emoji: "🐖",
            item: "pig",
            hoverText: "It's a pig.",
            pickupText: "You pick up the pig."
        });

        this.createCollectible({
            x: this.w * 0.3,
            y: this.w * 0.3,
            emoji: "🐄",
            item: "cow",
            hoverText: "You found the cow.",
            pickupText: "You pick up the cow."
        });

        this.createCollectible({
            x: this.w * 0.5,
            y: this.w * 0.2,
            emoji: "🐑",
            item: "sheep",
            hoverText: "You found the sheep.",
            pickupText: "You pick up the sheep."
        });

        let barn = this.add.text(this.w * 0.1, this.w * 0.15, "🧑‍🌾")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("pig") && this.hasItem("cow") && this.hasItem("sheep")) {
                    this.showMessage("You've completed your grocery list.");
                } else {
                    this.showMessage("Incomplete list.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("pig") && this.hasItem("cow") && this.hasItem("sheep")) {
                    this.loseItem("pig");
                    this.loseItem("cow");
                    this.loseItem("sheep");
                    this.showMessage("Task complete!");
                    this.gotoScene('shop');
                }
            });
    }
}

class Shop extends AdventureScene {
    constructor() {
        super("shop", "Grocery Store");
    }
    onEnter() {
        this.createCollectible({
            x: this.w * 0.3,
            y: this.w * 0.1,
            emoji: "🧀",
            item: "cheese",
            hoverText: "It's a piece of cheese.",
            pickupText: "You pick up the cheese."
        });

        this.createCollectible({
            x: this.w * 0.3,
            y: this.w * 0.3,
            emoji: "🍅",
            item: "tomato",
            hoverText: "It's a tomato.",
            pickupText: "You pick up the tomato."
        });

        this.createCollectible({
            x: this.w * 0.5,
            y: this.w * 0.2,
            emoji: "🍄",
            item: "mushroom",
            hoverText: "It's a mushroom.",
            pickupText: "You pick up the mushroom."
        });

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("mushroom") && this.hasItem("tomato") && this.hasItem("cheese")) {
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
            });
    }
}

class PizzaParlor extends AdventureScene {
    constructor() {
        super("pizzaParlor", "Pizza Parlor");
    }
    onEnter() {
        this.createCollectible({
            x: this.w * 0.3,
            y: this.w * 0.1,
            emoji: "🧀",
            item: "cheese",
            hoverText: "It's a piece of cheese.",
            pickupText: "You pick up the cheese."
        });

        this.createCollectible({
            x: this.w * 0.3,
            y: this.w * 0.3,
            emoji: "🍅",
            item: "tomato",
            hoverText: "It's a tomato.",
            pickupText: "You pick up the tomato."
        });

        this.createCollectible({
            x: this.w * 0.5,
            y: this.w * 0.2,
            emoji: "🍄",
            item: "mushroom",
            hoverText: "It's a mushroom.",
            pickupText: "You pick up the mushroom."
        });

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
            .setFontSize(this.s * 10)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("mushroom") && this.hasItem("tomato") && this.hasItem("cheese")) {
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
                    this.gotoScene('ending');
                }
            });
    }
}

class Ending extends AdventureScene {
    constructor() {
        super("ending", "Ending");
    }
    onEnter() {
        let finish = this.add.text(this.w * 0.1, this.w * 0.1, 'All daily tasks\n   completed!\nTime to go home.')
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerdown', () => this.gotoScene('outro'));

        new button(this, this.w * 0.1, this.w * 0.1, 'Exit', () => this.gotoScene('outro'));
    }
}

class Loading extends Phaser.Scene{
    constructor(){
        super('loading');
    }
    preload(){}
    create(){      
        let { width, height } = this.scale;

        this.add.rectangle(width/2, height/2, 600, 50)
            .setStrokeStyle(8, 0xffffff);

        this.textObject = this.add.text(width/2, height/2 - 100, "Loading...", {
            font: "50px Press Start 2P",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.cameras.main.fadeIn(3000);

        this.tweens.add({
            targets: this.add.rectangle(width/2 - 290, height/2, 0, 30, 0xffffff).setOrigin(0, 0.5),
            width: 580,
            duration: 2000,
            delay: 200,
            ease: 'Power2',
            onComplete: () => {
                this.cameras.main.fadeOut(300);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start('intro');
                });
            },
        });
    }
    update(){}
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
    scene: [Loading, Intro, Farm, Shop, PizzaParlor, Ending, Outro],
    title: "Adventure Game",
});

