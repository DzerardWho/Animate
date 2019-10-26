// import {  } from '../dist/Base'

let base, mainTl;
let spriteheets;
let img;
let assets, assetLoader;
let audio;

let assetNumber = 94;

function init() {
    base = new Base(false, 1024, 1024, 'canvas', 5, false, [236, 236, 236, -1]);
    mainTl = new Timeline(true);
    base.mainTimeline = mainTl;
    assets = new AssetMenager(base);
    assetLoader = new AssetLoader(false);
    let manifest = [];

    for(let i = 0; i <= assetNumber; ++i) {
        manifest.push({id: i, src: `./spritesheet/${i}.webp`, type: 'image'})
    }

    assetLoader.pushManifest(manifest);

    assetLoader.download().then(() => {
        assets.loadAssets(assetLoader);
        createAnimation();
    });
}

function createAnimation() {
    for(let i = 0; i <= assetNumber; ++i) {
        mainTl.set({data: {scale:{x:0.5,y:0.5}}, layer: 0}, assets.get(i));
    }
    document.getElementById('play').disabled = false;
}

function play(){
    base.play();
}