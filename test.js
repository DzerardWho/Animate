let b, t;

function init() {
    b = new Base(true, 650, 450, 'canvas', 24, false, [-1,-1,-1,-1]);
    mainTimeline = new Timeline(false);
    t = new Rectangle(b, 500, 100, [224, 33, 141]);
    mainTimeline.set({data: {pos: {x:100, y: 100}, alpha: 0.5}}, t).set({data: {pos: {x:300, y: 150}, alpha: 0.5}, start: 0})
    b.mainTimeline = mainTimeline;
    b.resume();
}