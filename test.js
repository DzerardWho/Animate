let b, t, t2;
let img, img2;
let body, sprite1, head;
let slider;
let i = 1;

function init() {
    b = new Base(true, 650, 450, 'canvas', 24, false, [0,0,0,0]);
    // rectangle = new Rectangle(b, 50, 50, [30, 170, 49, -1]);
    // tl1 = new Timeline(true);
    // tl1.fromTo({data: {angle: 0}, to: {angle: 360, pivot:{x:25,y:25}}, layer: 0, duration: 500}, rectangle).fromTo({data: {pivot: {x: 25, y: 25}, angle: 0}, to: {pos: {x: 200, y: 200}, pivot:{x:25,y:25}, angle: 360}, duration: 500, start: 0})
    // tl2 = new Timeline(true);
    // tl2.fromTo({data: {pos: {x: 325, y: 225}, angle: 0}, to: {pos: {x: 325, y: 225}, angle: 360}, duration: 500}, tl1);
    // b.mainTimeline = tl2;
    // b.play();
    img = new Image();
    _mainTimeline = new Timeline(true);
    mainTimeline = new Timeline(false);
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
            _mainTimeline.createLayer();
            _mainTimeline.addObjectToLayer(t, {
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
            }, null, 0, 150, 0, 0);
            john.addObjectToLayer(t2, {
                pos: {
                    x: 300,
                    y: 30
                },
            }, null, 0, 150, 0, 0);
            john.addObjectToLayer(head, {
                pos: {
                    x: 0,
                    y: 0
                }
            }, null, 0, 150, 0, 0);
            _mainTimeline.addObjectToLayer(john, {
                pos: {
                    x: 20,
                    y: 100
                },
            }, {
                pos: {
                    x: 100,
                    y: 200
                },
            }, 0, 150, 0, 0);
            // _mainTimeline.duration = 20;
            let col = new TimelineInstance(b, _mainTimeline, new Color([0, 255, 132, -1]));
            mainTimeline.set({data: {}, duration: 150}, col);
            // mainTimeline.set({data: {}, duration: 150}, _mainTimeline);
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