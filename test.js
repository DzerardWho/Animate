let b, t, t2;
let img, img2;
let sprite, sprite1, head;
let i = 1;
function test(){
    sprite.width += 0.5;
    sprite.height += 0.5;
    head.angle = i;
    i += 5;
    b.draw();
    requestAnimationFrame(test);
}

function initDemo(){
    b = new Base(650, 450, 'canvas');
    // b = new Base(650, 450, 'canvas', [50, 160, 99]);
    b.defaultShapeProgram = b.newProgram();
    // b.backgroundColor.color = [-0.5, 266, 170];
    t = new Rectangle(b, 5, 5, 500, 100, [50, 160, 99]);
    t2 = new Rectangle(b, 5, 5, 500, 100, [-0.5, 266, 170]);
    b.clear();
    img = new Image();
    img2 = new Image();
    headimg = new Image();
    img.onload = () => {
        img2.onload = () => {
            headimg.onload = () => {
                sprite = new Sprite(b, img, 50, 30);
                head = new Sprite(b, headimg, 0, 0);
                sprite1 = new Sprite(b, img2, 0, 0);
                t2.setParent(t);
                t.setParent(b.scene);
                head.setParent(sprite);
                sprite.setParent(b.scene);
                // sprite1.setParent(sprite);
                sprite1.setParent(b.scene);
                // sprite.setParent(t);
                // t.moveTo(45, 45);
                t.x = 45;
                t.y = 45;
                // sprite.pivot.x = 65;
                // sprite.pivot.y = 135;
                head.pivot.x = 76;
                head.pivot.y = 63.5;
                // sprite1.width = 50;
                // t.angle = 45;
                // b.scene.updateWorldMatrix();
                b.draw();
                // test();
                // b.clear();
            }
            headimg.src = 'test/smieci/John_Egbert4.png'
        }
        img2.src = 'test/smieci/captor.png';
    }
    img.src = "test/smieci/John_Egbert3.png";
}