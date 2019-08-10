
let base, john;
let body, face, glasses, hat, hair_1, hair_2, hair_3;
let assets, assetLoader;

function init(){
    base = new Base(false, 650, 450, 'canvas', 24, false, [118, 65, 178]);
    john = new Timeline(false, 7);
    let tl = new Timeline(true, 1);
    tl.addObjectToLayer(john, {pos: {x: 221.2, y: 130.45}, scale: {x: 0.8, y: 0.8}}, {pos: {x: 248.5, y: 28.85}, scale: {x: 0.69999695, y: 0.69999695}}, 0, 170, 0, 0);
    base.mainTimeline = tl;

    assets = new AssetMenager(base);
    assetLoader = new AssetLoader();

    assetLoader.pushManifest([
        {id: 'sp', src: '../spritesheet/spritesheet.json', type: 'spritesheet'},
        {id: '0.png', src: '../spritesheet/0.png', type: 'image'},
        {id: '1.png', src: '../spritesheet/1.png', type: 'image'},
        {id: '2.png', src: '../spritesheet/2.png', type: 'image'}
    ])

    assetLoader.download().then(() => {
        assets.loadAssets(assetLoader);
        assets.createAllSprites();

        body = assets.get(41);
        face = assets.get(45);
        hair_1 = assets.get(43);
        hair_2 = assets.get(51);
        hair_3 = assets.get(53);

        hat = new Timeline(true, 1);
        hat.addObjectToLayer(assets.get(49), {pos: {x: -135, y: -143.5}}, null, 0, 1, 0, 0);
        glasses = new Timeline(true, 1);
        glasses.addObjectToLayer(assets.get(47), {pos: {x: -246.5, y: -152.5}}, null, 0, 1, 0, 0);
    
        con();
    });
}

function con(){
    // Layer 1
    john.addObjectToLayer(body, {pos:{x: 4, y: 16}}, null, 0, 170, 0, 0);

    // Layer 2
    john.addObjectToLayer(hair_1, {pos:{x: -72, y: -84.05}}, null, 0, 48, 1, 0);
    john.addObjectToLayer(hair_1, {pos:{x: -72, y: -84.05}}, {pos:{x: -72, y: -84.05}, alpha: 0}, 48, 7, 1, 0);
    
    // Layer 3
    john.addObjectToLayer(hair_2, {pos:{x: -90, y: -100.55}, alpha: 0}, {pos:{x: -90, y: -100.55}}, 44, 4, 2, 0);
    john.addObjectToLayer(hair_2, {pos:{x: -90, y: -100.55}, alpha: 1}, null, 45, 55, 2, 0);
    john.addObjectToLayer(hair_2, {pos:{x: -90, y: -100.55}, alpha: 1}, {pos:{x: -90, y: -100.55}, alpha: 0}, 100, 7, 2, 0);
    
    // Layer 4
    john.addObjectToLayer(hair_3, {pos:{x: -85.15, y: -101.65}, alpha: 0}, {pos:{x: -85.15, y: -101.65}, alpha: 1}, 97, 5, 3, 0);
    john.addObjectToLayer(hair_3, {pos:{x: -85.15, y: -101.65}}, null, 102, 68, 3, 0);

    // Layer 5
    john.addObjectToLayer(face, {pos:{x: -18.55, y: 247.9}}, {pos:{x: 30.9, y: 224}}, 0, 106, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 31.2, y: 223.9}}, {pos:{x: 31.2, y: 223.9}}, 106, 6, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 32.8, y: 223.05}}, {pos:{x: 32.8, y: 223.05}}, 112, 4, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 33.85, y: 222.6}}, null, 116, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 34.05, y: 222.45}}, {pos:{x: 34.8, y: 222.15}}, 117, 3, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 34.8, y: 222.15}}, null, 120, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 35, y: 222}}, {pos:{x: 36.4, y: 221.3}}, 121, 7, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 36.4, y: 221.3}}, null, 128, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 36.6, y: 221.25}}, {pos:{x: 38.15, y: 220.45}}, 129, 8, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 38.15, y: 220.45}}, null, 137, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 38.35, y: 220.4}}, null, 138, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 38.5, y: 220.3}}, null, 139, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 38.65, y: 220.25}}, null, 140, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 38.8, y: 220.15}}, {pos:{x: 39.15, y: 220.05}}, 141, 2, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 39.15, y: 220.05}}, null, 143, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 39.25, y: 219.95}}, null, 144, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 39.4, y: 219.9}}, null, 145, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 39.55, y: 219.8}}, null, 146, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 39.7, y: 219.75}}, null, 147, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 39.8, y: 219.65}}, {pos:{x: 41.15, y: 219.05}}, 148, 12, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 41.15, y: 219.05}}, null, 160, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 41.2, y: 219}}, null, 161, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 41.3, y: 218.95}}, null, 162, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 41.4, y: 218.95}}, null, 163, 1, 4, 0);
    john.addObjectToLayer(face, {pos:{x: 41.45, y: 218.9}}, null, 164, 6, 4, 0);

    // Layer 6
    john.addObjectToLayer(glasses, {pos:{x: 173, y: 421.4}}, {pos:{x: 106.25, y: 690.7}}, 0, 164, 5, 0);
    john.addObjectToLayer(glasses, {pos:{x: 106.25, y: 690.7}}, {pos:{x: 105.85, y: 692.35}}, 164, 6, 5, 0);

    // Layer 7
    john.addObjectToLayer(hat, {pos:{x: 456.45, y: 468.4}}, {pos:{x: 544.8, y: 712.85}}, 0, 164, 6, 0);
    john.addObjectToLayer(hat, {pos:{x: 544.8, y: 712.85}}, {pos:{x: 545.35, y: 714.35}}, 164, 6, 6, 0);

    base.play();
}