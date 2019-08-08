// import {  } from '../dist/Base'

let base, mainTl;
let spriteheets;
let img;
let assets;

function init() {
    // base = new Base(false, 650, 450, 'canvas', 25, false);
    base = new Base(false, 650, 450, 'canvas', 25, false, [0, 0, 0, -1]);
    mainTl = new Timeline(false);
    mainTl.addLayers(12);
    base.mainTimeline = mainTl;
    assets = new AssetMenager(base);
    let assetLoader = new AssetLoader();
    assetLoader.pushManifest([
        {id: 'sp', src: './spritesheet/spritesheet.json', type: 'spritesheet'},
        {id: '0.png', src: './spritesheet/0.png', type: 'image'},
        {id: '1.png', src: './spritesheet/1.png', type: 'image'},
        {id: '2.png', src: './spritesheet/2.png', type: 'image'},
        {id: '3.png', src: './spritesheet/3.png', type: 'image'},
        {id: '4.png', src: './spritesheet/4.png', type: 'image'},
        {id: '5.png', src: './spritesheet/5.png', type: 'image'},
        {id: '6.png', src: './spritesheet/6.png', type: 'image'},
        {id: '_image 2.png', src: './image 2.png', type: 'image'}
    ])

    assetLoader.download().then(() => {
        assets.loadAssets(assetLoader);
        // assets.createAllSprites();
        assets.createSprite('image 2');
        assets.createSprite('image 7');
        assets.createSprite('image 27');
        img = assets.get('_image 2')
        createAnimation();
    });
}

function createAnimation() {
    // Layer 2
    let s = new Timeline(true);
    s.addLayer();
    mainTl.addToLayer(assets.get('image 2'), {scale: {x: 650/1300, y: 450/900}}, null, 0, 99, 1, 0);

    // Vinyl
    let vinyl = new Timeline(true);
    vinyl.addLayer();
    vinyl.addToLayer(assets.get('image 7'), {pos: {x: -325, y: -225}}, null, 0, 1, 0, 0);
    vinyl.addToLayer(assets.get('image 27'), {pos: {x: -325, y: -225}}, null, 1, 1, 0, 0);
    vinyl.duration = 2;
    mainTl.addToLayer(vinyl, {pos: {x: 338.1, y: 219.45}, scale: {x: 1.09991455, y: 1.09991455}, alpha: 0}, {pos: {x: 334, y: 221.2}, scale: {x: 1.09991455, y: 1.09991455}}, 74, 14, 2, 0);
    mainTl.addToLayer(vinyl, {pos: {x: 334, y: 221.2}, scale: {x: 1.09991455, y: 1.09991455}}, {pos: {x: 310.7, y: 231.35}, scale: {x: 1.09991455, y: 1.09991455}}, 87, 75, 2, 0);
    mainTl.duration = 87 + 75;

    base.play();
}