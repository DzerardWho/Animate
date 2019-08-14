let b, t, t2;
let img, img2;
let body, sprite1, head;
let slider;
let i = 1;

function init() {
    b = new Base(true, 650, 450, 'canvas', 24);
    img = new Image();
    mainTimeline = new Timeline(true);
    b.mainTimeline = mainTimeline;
    headimg = new Image();
    img.onload = () => {
        headimg.onload = () => {
            t = new Rectangle(b, 500, 100, [50, 160, 99]);
            t2 = new Rectangle(b, 500, 100, [224, 33, 141]);
            body = new Sprite(b, img);
            head = new Sprite(b, headimg);

            john = new Timeline();
            john.createLayer();
            mainTimeline.createLayer();
            mainTimeline.addObjectToLayer(t, {
                pos: {
                    x: 50,
                    y: 100
                },
            }, {
                pos: {
                    x: 50,
                    y: 100
                },
                alpha: 0
            }, 0, 150, 0, 0);
            john.addObjectToLayer(body, {
                pos: {
                    x: 0,
                    y: 0
                },
            }, null, 0, 20, 0, 0);
            // john.addObjectToLayer(t2, {
            //     pos: {
            //         x: 300,
            //         y: 30
            //     },
            // }, null, 0, 20, 0, 0);
            john.addObjectToLayer(head, {
                pos: {
                    x: 0,
                    y: 0
                }
            }, null, 0, 20, 0, 0);
            // mainTimeline.addObjectToLayer(john, {
            //     pos: {
            //         x: 20,
            //         y: 100
            //     },
            // }, {
            //     pos: {
            //         x: 100,
            //         y: 200
            //     },
            // }, 0, 20, 0, 0);
            // mainTimeline.duration = 20;
            b.play();
        }
        headimg.src = 'img/other/John_Egbert4.png'
    }
    img.src = "img/other/John_Egbert3.png";
}

function draw() {
    b.draw();
    // requestAnimationFrame(draw);
}