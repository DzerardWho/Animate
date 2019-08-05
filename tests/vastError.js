// import {  } from '../dist/Base'

let base, mainTl;
let spriteheets;
let img;

function init() {
    // base = new Base(false, 650, 450, 'canvas', 25, false);
    base = new Base(false, 650, 450, 'canvas', 25, false, [0, 0, 0, -1]);
    mainTl = new Timeline(false);
    mainTl.addLayers(12);
    // mainTl.addLayer();
    // mainTl.addLayer();
    base.mainTimeline = mainTl;
    let spriteheet = new SpritesheetLoader('./spritesheet/spritesheet.json', './spritesheet/', () => {
        spriteheets = spriteheet.generateSpritesheets(base);
        img = new Image();
        img.onload = () => {
            createAnimation();
        };
        img.src = './image 2.png';
    });
}

function createAnimation() {
    // Layer 2
    let s = new Timeline(true);
    s.addLayer();
    mainTl.addToLayer(new Sprite(base, spriteheets[0], true, 'image 2'), {scale: {x: 650/1300, y: 450/900}}, null, 0, 99, 1, 0);
    // mainTl.addToLayer(new Sprite(base, img, false), {scale: {x: 650/1300, y: 450/900}}, null, 0, 99, 1, 0);
    // mainTl.addToLayer(new Sprite(base, spriteheets[5], true, 'image 177'), null, null, 0, 99, 1, 0);

    // Vinyl
    let vinyl = new Timeline(true);
    vinyl.addLayer();
    vinyl.addToLayer(new Sprite(base, spriteheets[3], false, 'image 7'), {pos: {x: -325, y: -225}}, null, 0, 1, 0, 0);
    vinyl.addToLayer(new Sprite(base, spriteheets[3], false, 'image 27'), {pos: {x: -325, y: -225}}, null, 1, 1, 0, 0);
    vinyl.duration = 2;
    mainTl.addToLayer(vinyl, {pos: {x: 338.1, y: 219.45}, scale: {x: 1.09991455, y: 1.09991455}, alpha: 0}, {pos: {x: 334, y: 221.2}, scale: {x: 1.09991455, y: 1.09991455}}, 74, 14, 2, 0);
    mainTl.addToLayer(vinyl, {pos: {x: 334, y: 221.2}, scale: {x: 1.09991455, y: 1.09991455}}, {pos: {x: 310.7, y: 231.35}, scale: {x: 1.09991455, y: 1.09991455}}, 87, 75, 2, 0);
    // mainTl.duration = 1;
    mainTl.duration = 87 + 75;
    // mainTl.duration = 70;

    base.play();
}