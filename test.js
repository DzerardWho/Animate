let b, t;

function init() {
    b = new Base(false, 650, 450, 'canvas', 24, false, [-1,-1,-1,-1]);
    mainTimeline = new Timeline(true);
    // t = new Rectangle(b, 500, 100, [224, 33, 141]);
    // tekst = new TextObject(b, 200, 60, '30px Arial');
    tekst = new TextObject(b, 200, 60, {font: "courier-std, monospace", size: 36, weight: 'bold', color: '#B95C00'});
    tekst.text = "Hello World!";
    // tekst.renderText();
    mainTimeline.fromTo({data: {pos: {x: 0, y: 0}}, to: {pos: {x: 325, y: 390}}, duration: 90}, tekst)
                .to({data: {pos: {x: 550, y: 0}}, duration: 90});
    // mainTimeline.set({data: {pos: {x:100, y: 100}, alpha: 0.5}}, t).set({data: {pos: {x:300, y: 150}, alpha: 0.5}, start: 0})
    b.mainTimeline = mainTimeline;
    b.resume();
    document.getElementById('tekst').oninput = (event) => {
        tekst.text = document.getElementById('tekst').value;
        // tekst.renderText();
    }
}