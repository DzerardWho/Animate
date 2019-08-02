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
            john.addLayer();
            mainTimeline.addLayer();
            mainTimeline.addToLayer(t, {
                pos: {
                    x: 50,
                    y: 100
                },
                angle: 0
            }, null, 0, 20, 0, 0);
            john.addToLayer(body, {
                pos: {
                    x: 0,
                    y: 0
                },
                angle: 0
            }, null, 0, 20, 0, 0);
            // john.addToLayer(t2, {
            //     pos: {
            //         x: 300,
            //         y: 30
            //     },
            //     angle: 0
            // }, null, 0, 20, 0, 0);
            // john.addToLayer(head, {
            //     pos: {
            //         x: 0,
            //         y: 0
            //     },
            //     angle: 0
            // }, null, 0, 20, 0, 0);

            // mainTimeline.addToLayer(john, {
            //     pos: {
            //         x: 20,
            //         y: 100
            //     },
            //     angle: 0
            // }, {
            //     pos: {
            //         x: 100,
            //         y: 200
            //     },
            //     angle: 0
            // }, 0, 20, 0, 0);
            mainTimeline.duration = 20;
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