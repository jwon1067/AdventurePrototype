/**
 * A tiny framework dedicated to tiny adventure games.
 *
 * `AdventureScene` is a Phaser scene that provides:
 *   - an inventory of named string items carried between scenes,
 *   - a transient message box for flavor text,
 *   - faded transitions between scenes,
 *   - a consistent UI layout with fullscreen support.
 *
 * Subclass it and implement {@link AdventureScene#onEnter} to build one
 * location of your adventure. Call the helper methods ({@link AdventureScene#showMessage},
 * {@link AdventureScene#gainItem}, {@link AdventureScene#gotoScene}, etc.) from
 * your interactive objects.
 *
 * @extends {Phaser.Scene}
 */
class AdventureScene extends Phaser.Scene {

    init(data) {
        this.inventory = data.inventory || [];
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h)
            .setOrigin(0, 0)
            .setFillStyle(0);

        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` });

        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(1);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w - 3 * this.s, this.h - 3 * this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();
    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            duration: 4000
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        if (this.inventory.includes(item)) return;
        this.inventory.push(item);
        this.updateInventory();
    }

    loseItem(item) {
        this.inventory = this.inventory.filter(i => i !== item);
        this.updateInventory();
    }

    updateInventory() {
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach(t => t.destroy());
        }
        this.inventoryTexts = [];

        let y = this.h * 0.66 + 3 * this.s;

        this.inventory.forEach(item => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, y, item)
                .setStyle({ fontSize: `${1.5 * this.s}px` });

            y += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    gotoScene(key) {
        this.cameras.main.fade(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {
        console.warn("onEnter not implemented:", this.constructor.name);
    }

    // Additional methods to reduce repetition in game.js scenes:

    //Interactive objects
    createCollectible({ x, y, emoji, item, hoverText, pickupText, size = 10 }) {
        const obj = this.add.text(x, y, emoji)
            .setFontSize(this.s * size)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage(hoverText);
            })
            .on('pointerdown', () => {
                this.showMessage(pickupText);
                this.gainItem(item);

                this.tweens.add({
                    targets: obj,
                    y: `-=${2 * this.s}`,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => obj.destroy()
                });
            });

        return obj;
    }

    //beveal shape
    bevealShape(){
        // Shapes
        let topT = scene.add.triangle(0, 0, 73, 23, 148, 73, 223, 23, 0xADB5BD);
        let leftT = scene.add.triangle(0, 0, 23, 33, 73, 66, 23, 103, 0x495057);
        let rightT = scene.add.triangle(0, 0, 173, 103, 123, 66, 173, 33, 0x343A40);
        let bottomT = scene.add.triangle(0, 0, 73, 98, 148, 38, 223, 98, 0x212529);
        
        let rect = scene.add.graphics();
            rect.fillGradientStyle(0x212529, 0x212529, 0x212529, 0xADB5BD, 1);
            rect.fillRect(13, 8, 119, 48);
        
        // Container of shapes
        this.add([topT, leftT, rightT, bottomT, rect]);

        // Define Hit Area
        this.setSize(223, 103);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 223, 103), Phaser.Geom.Rectangle.Contains);

        // Add the container to the scene's display list
        scene.add.existing(this);
    }

    //button
    button({ x, y, text, callback}) {
        // Interactive button        
        let buttonShape = new Beveal();

        // Add label text: text(x,y,text,size, color).orgin(x, y)
        let label = scene.add.text(29, 17, text, { 
            fontSize: '30px', 
            fill: '#fff' });

        // center text inside button
        label.setPosition(223 / 8, 103 / 6);

        // Add components to the container
        this.add([buttonShape, label]);
        
        // Make the whole container interactive
        this.setSize(223, 103);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 223, 103), Phaser.Geom.Rectangle.Contains);

        // Add events (Hover effects and click)
        buttonShape.on('pointerover', () => this.setScale(1.05));
        buttonShape.on('pointerout', () => this.setScale(1));
        buttonShape.on('pointerdown', () => this.setScale(0.95));
        buttonShape.on('pointerup', () => {
            this.setScale(1.05);
            callback();
        });

        // Add the container to the scene
        scene.add.existing(this);
    }

}


// make class visible to game.js even in non-module script setup
window.AdventureScene = AdventureScene;