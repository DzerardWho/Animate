let loader = new createjs.LoadQueue();

loader.on("complete", loadFinished, this);

let files = [
    // {id: "39", src: "test/39.png"},
    {id: "41", src: "test/41.png"},
    {id: "43", src: "test/43.png"},
    {id: "45", src: "test/45.png"},
    {id: "47", src: "test/47.png"},
    {id: "49", src: "test/49.png"},
    // {id: "51", src: "test/51.png"},
    // {id: "53", src: "test/53.png"},
    // {id: "59", src: "test/59.png"},
    // {id: "61", src: "test/61.png"},
    // {id: "64", src: "test/64.png"},
    // {id: "70", src: "test/70.png"},
    // {id: "72", src: "test/72.png"},
    // {id: "75", src: "test/75.png"},
    // {id: "77", src: "test/77.png"},
    // {id: "79", src: "test/79.png"},
    // {id: "81", src: "test/81.png"},
];

TweenMax.ticker.fps(24);
TweenMax.ticker.useRAF(false);
TweenMax.defaultEase = Linear.easeNone;
TweenMax.lagSmoothing(0);

let johnTl = new TimelineMax({
    useFramse: true,
    paused: true
})

let base;
loader.loadManifest(files);

function loadFinished(){
    let t;
    let file;
    base = new Base(650, 450, 'canvas');
    base.clear();
    let container = new Container(base, 0, 0, 1, 1);
    container.setParent(base.scene);
    files.forEach(_file => {
        file = loader.getResult(_file.id);
        t = new Sprite(base, file, 0, 0);
        t.setParent(container);
        // t.setParent(base.scene);
        // t.scale.x = 0.5;
        // t.scale.y = 0.5;
        _file.sprite = t;
    });
    f41 = files[0].sprite;
    f43 = files[1].sprite;
    f45 = files[2].sprite;
    f47 = files[3].sprite;
    f49 = files[4].sprite;

    f43.x = -72;
    f43.y = -84.5;
    f41.x = 4;
    f41.y = 16;
    f47.x = -73.5;
    f47.y = 268.9;
    f45.x = -18.55;
    f45.y = 247.9;
    f49.x = 321.45;
    f49.y = 324.9;

    container.scale.x = 0.5;
    container.scale.y = 0.5;

    container.x = 100;
    container.y = 100;

    base.draw();
}