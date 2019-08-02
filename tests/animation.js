
let base, john;
let body, face, glasses, hat, hair_1, hair_2, hair_3;

function init(){
    base = new Base(false, 650, 450, 'canvas', 24, false, [118, 65, 178]);
    john = new Timeline(false);
    let tl = new Timeline(true);
    tl.addLayer();
    tl.addToLayer(john, {pos: {x: 221.2, y: 130.45}, scale: {x: 0.8, y: 0.8}}, {pos: {x: 248.5, y: 28.85}, scale: {x: 0.69999695, y: 0.69999695}}, 0, 107, 0, 0);
    base.mainTimeline = tl;
    john.addLayers(7);

    let spritesheet = new SpritesheetLoader('../spritesheet/spritesheet.json', '../spritesheet/', () => {
        let sprites = spritesheet.generateSpritesheets(base);
        
        // body = new Sprite(base, queue.getResult('body'));
        // face = new Sprite(base, queue.getResult('face'));
        // hair_1 = new Sprite(base, queue.getResult('hair_1'));
        // hair_2 = new Sprite(base, queue.getResult('hair_2'));
        // hair_3 = new Sprite(base, queue.getResult('hair_3'));
        body = new Sprite(base, sprites[1], '41');
        face = new Sprite(base, sprites[1], '45');
        hair_1 = new Sprite(base, sprites[1], '43');
        hair_2 = new Sprite(base, sprites[1], '51');
        hair_3 = new Sprite(base, sprites[1], '53');
    
        hat = new Timeline(true);
        hat.addLayer();
        hat.addToLayer(new Sprite(base, sprites[1], '49'), {pos: {x: -135, y: -143.5}}, null, 0, 1, 0, 0);
        glasses = new Timeline(true);
        glasses.addLayer();
        glasses.addToLayer(new Sprite(base, sprites[1], '47'), {pos: {x: -246.5, y: -152.5}}, null, 0, 1, 0, 0);
    
        con();
    });

}

function con(){
    // Layer 1
    john.addToLayer(body, {pos:{x: 4, y: 16}}, null, 0, 170, 0, 0);

    // Layer 2
    john.addToLayer(hair_1, {pos:{x: -72, y: -84.05}}, null, 0, 48, 1, 0);
    john.addToLayer(hair_1, {pos:{x: -72, y: -84.05}}, {pos:{x: -72, y: -84.05}, alpha: 0}, 48, 7, 1, 0);
    
    // Layer 3
    john.addToLayer(hair_2, {pos:{x: -90, y: -100.55}, alpha: 0}, {pos:{x: -90, y: -100.55}}, 44, 4, 2, 0);
    john.addToLayer(hair_2, {pos:{x: -90, y: -100.55}}, null, 45, 51, 2, 0);
    john.addToLayer(hair_2, {pos:{x: -90, y: -100.55}}, {pos:{x: -90, y: -100.55}, alpha: 0}, 100, 5, 2, 0);
    
    // Layer 4
    john.addToLayer(hair_3, {pos:{x: -85.15, y: -101.65}, alpha: 0}, {pos:{x: -85.15, y: -101.65}, alpha: 0}, 97, 5, 3, 0);
    john.addToLayer(hair_3, {pos:{x: -85.15, y: -101.65}}, null, 102, 68, 3, 0);

    // Layer 5
    john.addToLayer(face, {pos:{x: -18.55, y: 247.9}}, {pos:{x: 30.9, y: 224}}, 0, 105, 4, 0);
    john.addToLayer(face, {pos:{x: 30.9, y: 224}}, {pos:{x: 31.2, y: 223.9}}, 106, 5, 4, 0);
    john.addToLayer(face, {pos:{x: 31.2, y: 223.9}}, {pos:{x: 32.8, y: 223.05}}, 112, 3, 4, 0);
    john.addToLayer(face, {pos:{x: 33.85, y: 222.6}}, null, 116, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 33.85, y: 222.6}}, {pos:{x: 34.05, y: 222.45}}, 117, 3, 4, 0);
    john.addToLayer(face, {pos:{x: 34.05, y: 222.45}}, null, 120, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 35, y: 222}}, {pos:{x: 36.4, y: 221.3}}, 121, 8, 4, 0);
    john.addToLayer(face, {pos:{x: 35, y: 222}}, {pos:{x: 36.4, y: 221.3}}, 129, 8, 4, 0);
    john.addToLayer(face, {pos:{x: 38.15, y: 220.45}}, null, 137, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 38.35, y: 220.4}}, null, 138, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 38.5, y: 220.3}}, null, 139, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 38.65, y: 220.25}}, null, 140, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 38.8, y: 220.15}}, {pos:{x: 39.15, y: 220.05}}, 141, 3, 4, 0);
    john.addToLayer(face, {pos:{x: 39.25, y: 219.95}}, null, 144, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 39.4, y: 219.9}}, null, 145, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 39.55, y: 219.8}}, null, 146, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 39.7, y: 219.75}}, null, 147, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 39.8, y: 219.65}}, {pos:{x: 41.15, y: 219.05}}, 148, 13, 4, 0);
    john.addToLayer(face, {pos:{x: 41.2, y: 219}}, null, 161, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 41.3, y: 218.95}}, null, 162, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 41.4, y: 218.95}}, null, 163, 1, 4, 0);
    john.addToLayer(face, {pos:{x: 41.45, y: 218.9}}, null, 164, 6, 4, 0);

    // Layer 6
    john.addToLayer(glasses, {pos:{x: 173, y: 421.4}}, {pos:{x: 106.25, y: 690.7}}, 0, 164, 5, 0);
    john.addToLayer(glasses, {pos:{x: 106.25, y: 690.7}}, {pos:{x: 105.85, y: 692.35}}, 164, 6, 5, 0);

    // Layer 7
    john.addToLayer(hat, {pos:{x: 456.45, y: 468.4}}, {pos:{x: 544.8, y: 712.85}}, 0, 164, 6, 0);
    john.addToLayer(hat, {pos:{x: 544.8, y: 712.85}}, {pos:{x: 545.35, y: 714.35}}, 164, 6, 6, 0);

    base.play();
}