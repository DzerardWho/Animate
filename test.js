let b, t, t2;
let img, img2;
let sprite, sprite1, head;
let slider;
let i = 1;
function test(){
    sprite.width += 0.5;
    sprite.height += 0.5;
    head.angle = i;
    i += 5;
    b.draw();
    requestAnimationFrame(test);
}

function createSymblos(){
    return new Promise((resolve, reject) => {
        sprite = new Sprite(b, img, 50, 30);
        head = new Sprite(b, headimg, 0, 0);
        sprite1 = new Sprite(b, img2, 0, 0);

        t.addChild(t2);
        sprite.addChild(head);
        // head.scale.x = -1;
        head.x = 0;
        head.y = 0;
        
        b.scene.addChild(t);
        b.scene.addChild(sprite);
        b.scene.addChild(sprite1);
        
        t.x = 45;
        t.y = 45;
        head.transformationPoint.x = 76;
        head.transformationPoint.y = 63.5;

        resolve();
    });
}

function initDemo(){
    b = new Base(650, 450, 'canvas');
    // b = new Base(650, 450, 'canvas', [50, 160, 99]);
    // b.defaultShapeProgram = b.newProgram();
    // b.backgroundColor.color = [-0.5, 266, 170];
    t = new Rectangle(b, 5, 5, 500, 100, [50, 160, 99]);
    tl = new Timeline();
    tl.addLayer();
    tl.addToLayer(t, {
        pos: {
            x: 50,
            y: 100
        },
        angle: 0
    }, null, 0, 5, 0, 0);
    b.mainScene = tl;
    b.play();
    // b.mainScene.addLayer();
    // t2 = new Rectangle(b, 5, 5, 500, 100, [-0.5, 266, 170]);
    // b.clear();
    // img = new Image();
    // img2 = new Image();
    // headimg = new Image();
    // img.onload = () => {
    //     img2.onload = () => {
    //         headimg.onload = () => {
    //             createSymblos().then(() => {
    //                 b.createSceneInstance();
    //                 // let s = new Instance(sprite);
    //                 // s.x = 0;
    //                 // s.y = 0;
    //                 // s.scale.x = -1;
                
    //                 // b.sceneInstance.children.push(s);
    //                 // b.draw();
    //                 draw();
    //                 slider = document.getElementById('range');
    //                 slider.oninput = () => {
    //                     sprite.instances[0].scale.x = Number(slider.value);
    //                     // sprite.instances[0].scale.y = Number(slider.value);
    //                     draw();
    //                     // head.instances[0].scale.x = -Number(slider.value);
    //                 }
    //             });
    //         }
    //         headimg.src = 'test/smieci/John_Egbert4.png'
    //     }
    //     img2.src = 'test/smieci/captor.png';
    // }
    // img.src = "test/smieci/John_Egbert3.png";
}

function draw(){
    b.draw();
    // requestAnimationFrame(draw);
}