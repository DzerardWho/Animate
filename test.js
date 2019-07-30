let b, t, t2;
let img, img2;
let body, sprite1, head;
let slider;
let i = 1;

function initDemo() {
    b = new Base(650, 450, 'canvas', false);
    img = new Image();
    mainTimeline = new Timeline();
    b.mainScene = mainTimeline;
    headimg = new Image();
    img.onload = () => {
        headimg.onload = () => {
            t = new Rectangle(b, 500, 100, [50, 160, 99]);
            body = new Sprite(b, img);
            head = new Sprite(b, headimg);

            john = new Timeline();
            john.addLayer();
            mainTimeline.addLayer();
            mainTimeline.addToLayer(t, {
                pos: {
                    x: 50,
                    y: 100
                },
                angle: 0
            }, null, 0, 1, 0, 0);
            john.addToLayer(body, {
                pos: {
                    x: 0,
                    y: 0
                },
                angle: 0
            }, null, 0, 5, 0, 0);
            john.addToLayer(head, {
                pos: {
                    x: 0,
                    y: 0
                },
                angle: 0
            }, null, 0, 5, 0, 0);
            mainTimeline.addToLayer(john, {
                pos: {
                    x: 20,
                    y: 100
                },
                angle: 0
            }, null, 1, 5, 0, 0);
            b.play();
        }
        slider = document.getElementById('range');
        slider.oninput = () => {
            b.mainScene.layers[0].frames[0].elements[0].from.pos.x = Number(slider.value) * 10;
            b.play();
        }
        headimg.src = 'test/smieci/John_Egbert4.png'
    }
    img.src = "test/smieci/John_Egbert3.png";
}

function draw() {
    b.draw();
    // requestAnimationFrame(draw);
}