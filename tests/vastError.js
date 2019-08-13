// import {  } from '../dist/Base'

let base, mainTl;
let spriteheets;
let img;
let assets;
let audio;

function init() {
    // base = new Base(false, 650, 450, 'canvas', 25, false);
    base = new Base(false, 650, 450, 'canvas', 25, false, [0, 0, 0, -1]);
    mainTl = new Timeline(false, 13);
    base.mainTimeline = mainTl;
    assets = new AssetMenager(base);
    let assetLoader = new AssetLoader();
    assetLoader.pushManifest([
        {id: 'sp', src: './spritesheet/spritesheet.json', type: 'spritesheet'},
        {id: '0.png', src: './spritesheet/0.png', type: 'image'},
        {id: '1.png', src: './spritesheet/1.png', type: 'image'},
        {id: '2.png', src: './spritesheet/2.png', type: 'image'},
        {id: '3.png', src: './spritesheet/3.png', type: 'image'},
        {id: '4.png', src: './spritesheet/4.png', type: 'image'},
        {id: '5.png', src: './spritesheet/5.png', type: 'image'},
        {id: '6.png', src: './spritesheet/6.png', type: 'image'},
        {id: '_image 2.png', src: './image 2.png', type: 'image'}
    ])

    assetLoader.download().then(() => {
        assets.loadAssets(assetLoader);
        assets.createAllSprites();
        createAnimation();
    });
}

class dummy {
    draw() {
        try {
            this.audio.currentTime = 0
            this.audio.play();
        } catch (error) {
            console.error(error);
        }
    }
}

class dd {
    draw(){
        console.log(performance.now());
    }
}

let ds = 1.09999084;
// let ds2 = 1;
let ds2 = 1.09996033;
function createAnimation() {
    // Layer 1
    let brown = new Rectangle(base, 650, 450, [185, 92, 0, -1]);
    let green = new Rectangle(base, 650, 450, [108, 132, 0, -1]);
    {

        mainTl.set({data:{}, start: 1473, duration: 101, layer: 0}, brown)
            .set({data:{}, duration: 100}, green)
            .set({data:{}, duration: 100}, brown)
            .set({data:{}, duration: 100}, green) // Empty 1874-2173
            .set({data:{}, start: 2174, duration: 50}, green)
            .set({data:{}, duration: 50}, brown)
            // TODO Color animation
    }

    // Layer 2
    let shape_30 = new Timeline(true);
    shape_30.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 29'));
    let shape_160 = new Timeline(true);
    shape_160.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 159'));
    let shape_162 = new Timeline(true);
    shape_162.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 161'));
    let shape_164 = new Timeline(true);
    shape_164.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 163'));
    let shape_166 = new Timeline(true);
    shape_166.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 165'));
    let shape_92 = new Timeline(true);
    shape_92.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 91'));
    let shape_138 = new Timeline(true);
    shape_138.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 137'));
    let shape_142 = new Timeline(true);
    shape_142.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 141'));
    let shape_144 = new Timeline(true);
    shape_144.set({data: {pos: {x: 325, y: -225}, scale:{x:-1}}}, assets.get('image 137'));
    let shape_146 = new Timeline(true);
    shape_146.set({data: {pos: {x: 325, y: -225}, scale:{x:-1}}}, assets.get('image 141'));
    let shape_148 = new Timeline(true);
    shape_148.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 147'));
    let shape_190 = new Timeline(true);
    shape_190.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 189'));
    let shape_192 = new Timeline(true);
    shape_192.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 191'));
    let shape_194 = new Timeline(true);
    shape_194.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 193'));
    let shape_248 = new Timeline(true);
    shape_248.set({data: {}}, assets.get('image 247'));
    let shape_256 = new Timeline(true);
    shape_256.set({data: {}}, assets.get('image 255'));
    let shape_46 = new Timeline(true);
    shape_46.set({data: {pos: {x: -325, y: -223}}}, assets.get('image 45'));
    let shape_48 = new Timeline(true);
    shape_48.set({data: {pos: {x: -325, y: -226}}}, assets.get('image 47'));
    let shape_84 = new Timeline(true);
    shape_84.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 83'));
    let shape_88 = new Timeline(true);
    shape_88.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 87'));
    {
        let shape_38 = new Timeline(true);
        shape_38.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 37'));
        let shape_50 = new Timeline(true);
        shape_50.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 49'));
        let shape_62 = new Timeline(true);
        shape_62.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 61'));
        let shape_74 = new Timeline(true);
        shape_74.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 73'));
        let shape_90 = new Timeline(true);
        shape_90.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 89'));
        let shape_96 = new Timeline(true);
        shape_96.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 95'));
        let shape_126 = new Timeline(true);
        shape_126.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 125'));
        let shape_134 = new Timeline(true);
        shape_134.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 133'));
        let shape_154 = new Timeline(true);
        shape_154.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 153'));
        let shape_168 = new Timeline(true);
        shape_168.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 167'));
        let shape_170 = new Timeline(true);
        shape_170.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 169'));
        let shape_172 = new Timeline(true);
        shape_172.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 171'));
        let shape_174 = new Timeline(true);
        shape_174.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 173'));
        let shape_175 = new Timeline(true);
        shape_175.set({data: {pos: {x: -341, y: -236}, scale:{x:1.04995727539, y:1.04995727539}}}, assets.get('image 173'));
        let shape_176 = new Timeline(true);
        shape_176.set({data: {pos: {x: -308, y: -213}, scale:{x:0.94998168945, y:0.94998168945}}}, assets.get('image 173'));
        let shape_178 = new Timeline(true);
        shape_178.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 177'));
        let shape_179 = new Timeline(true);
        shape_179.set({data: {pos: {x: -341, y: -236}, scale:{x:1.04995727539, y:1.04995727539}}}, assets.get('image 177'));
        let shape_180 = new Timeline(true);
        shape_180.set({data: {pos: {x: -308, y: -213}, scale:{x:0.94998168945, y:0.94998168945}}}, assets.get('image 177'));
        let shape_182 = new Timeline(true);
        shape_182.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 181'));
        let shape_183 = new Timeline(true);
        shape_183.set({data: {pos: {x: -341, y: -236}, scale:{x:1.04995727539, y:1.04995727539}}}, assets.get('image 181'));
        let shape_184 = new Timeline(true);
        shape_184.set({data: {pos: {x: -308, y: -213}, scale:{x:0.94998168945, y:0.94998168945}}}, assets.get('image 181'));
        let shape_186 = new Timeline(true);
        shape_186.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 185'));
        let shape_187 = new Timeline(true);
        shape_187.set({data: {pos: {x: -341, y: -236}, scale:{x:1.04995727539, y:1.04995727539}}}, assets.get('image 185'));
        let shape_188 = new Timeline(true);
        shape_188.set({data: {pos: {x: -308, y: -213}, scale:{x:0.94998168945, y:0.94998168945}}}, assets.get('image 185'));
        let shape_196 = new Timeline(true);
        shape_196.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 195'));
        let shape_198 = new Timeline(true);
        shape_198.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 197'));
        let shape_200 = new Timeline(true);
        shape_200.set({data: {pos: {x: -375, y: -259.5}}}, assets.get('image 199'));
        let shape_202 = new Timeline(true);
        shape_202.set({data: {pos: {x: -375, y: -259.5}}}, assets.get('image 201'));
        let shape_204 = new Timeline(true);
        shape_204.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 203'));
        let shape_206 = new Timeline(true);
        shape_206.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 205'));
        let shape_208 = new Timeline(true);
        shape_208.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 207'));
        let shape_210 = new Timeline(true);
        shape_210.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 209'));
        let shape_212 = new Timeline(true);
        shape_212.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 211'));
        let shape_214 = new Timeline(true);
        shape_214.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 213'));
        let shape_216 = new Timeline(true);
        shape_216.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 215'));
        let shape_218 = new Timeline(true);
        shape_218.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 217'));
        let shape_220 = new Timeline(true);
        shape_220.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 219'));
        let shape_222 = new Timeline(true);
        shape_222.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 221'));
        let shape_224 = new Timeline(true);
        shape_224.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 223'));
        let shape_226 = new Timeline(true);
        shape_226.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 225'));
        let shape_228 = new Timeline(true);
        shape_228.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 227'));
        let shape_230 = new Timeline(true);
        shape_230.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 229'));
        let shape_236 = new Timeline(true);
        shape_236.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 235'));
        let shape_244 = new Timeline(true);
        shape_244.set({data: {pos: {x: -1444, y: -225}}}, assets.get('image 243'));
        let shape_246 = new Timeline(true);
        shape_246.set({data: {pos: {x: -1457, y: -225}}}, assets.get('image 245'));
        let shape_262 = new Timeline(true);
        shape_262.set({data: {}}, assets.get('image 261'));
        let shape_268 = new Timeline(true);
        shape_268.set({data: {}}, assets.get('image 267'));
        let shape_282 = new Timeline(true);
        shape_282.set({data: {pos: {x: -400, y: -225}}}, assets.get('image 281'));

        let noise = new Timeline(true);
        noise.set({data:{}}, assets.get('image 277')).set({data:{}}, assets.get('image 271'))
        let dance_1 = new Timeline(true);
        dance_1.set({data:{pos:{x:147.6,y:225}}, layer: 0}, shape_84)
            .set({data:{pos:{x:150,y:225}}, duration:10})
            .set({data:{pos:{x:152.4,y:225}}})
            .set({data:{pos:{x:151.6,y:225}}}, shape_88)
            .set({data:{pos:{x:150,y:225}}, duration:11})
            .set({data:{pos:{x:147.6,y:225}}})

        mainTl.set({data: {scale: {x: 650/1300, y: 450/900}}, start: 0, duration: 99, layer: 1}, assets.get('image 2')) // Empty 99-161
            .fromTo({data: {pos:{x:302.15, y:211.85}, scale:{x:1.09994507,y:1.09994507}}, to:{pos:{x:325.4, y:226.45}, scale:{x:1.09994507,y:1.09994507}}, start: 162, duration: 49}, shape_30)
            .set({data: {pos:{x:325.4, y:226.45}, scale:{x:1.09994507,y:1.09994507}}}) // index 211
            .fromTo({data: {pos:{x:340.65,y:218.2}, scale:{x:ds,y:ds}}, to: {pos:{x:333.75,y:220.45}, scale:{x:ds,y:ds}}, duration: 19}, shape_38)
            .to({data:{pos:{x:330.5,y:221.45}, scale:{x:ds,y:ds}}, duration: 9})
            .set({data:{pos:{x:330.5,y:221.45}, scale:{x:ds,y:ds}}})
            .to({data:{pos:{x:330.2,y:221.6}, scale:{x:ds,y:ds}}})
            .to({data:{pos:{x:328.7,y:222}, scale:{x:ds,y:ds}}, duration: 4})
            .set({data:{pos:{x:328.7,y:222}, scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:328.35,y:222.2}, scale:{x:ds,y:ds}}, to:{pos:{x:326.15,y:222.85}, scale:{x:ds,y:ds}}, duration:6})
            .set({data:{pos:{x:326.15,y:222.85}, scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:325.85,y:223}, scale:{x:ds,y:ds}}, to:{pos:{x:318.55,y:225.3}, scale:{x:ds,y:ds}}, duration:20})
            .to({data:{pos:{x:315.35,y:226.35}, scale:{x:ds,y:ds}}, duration:9})
            .set({data:{pos:{x:315.35,y:226.35}, scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:315,y:226.55}, scale:{x:ds,y:ds}}, to:{pos:{x:313.9,y:226.9}, scale:{x:ds,y:ds}}, duration:3})
            .set({data:{pos:{x:313.9,y:226.9}, scale:{x:ds,y:ds}}}) // Empty 287-373
            .fromTo({data:{pos:{x:304.05,y:224.95}, scale:{x:ds,y:ds}}, to:{pos:{x:327.75,y:224.95}, scale:{x:ds,y:ds}}, start:374, duration:113}, shape_50)
            .set({data:{pos:{x:327.75,y:224.95}, scale:{x:ds,y:ds}}}) // Empty 488-535
            .fromTo({data:{pos:{x:324.95,y:241.3}, scale:{x:ds,y:ds}}, to:{pos:{x:324.95,y:232.95}, scale:{x:ds,y:ds}}, start:536, duration:24}, shape_62)
            .set({data:{pos:{x:324.95,y:232.95}, scale:{x:ds,y:ds}}})
            .set({data:{pos:{x:324.95,y:232.5}, scale:{x:ds,y:ds}}, duration:27}) // Empty 588-623
            .fromTo({data:{pos:{x:341.4,y:224.95}, scale:{x:ds,y:ds}}, to:{pos:{x:327.55,y:224.95}, scale:{x:ds,y:ds}}, start:624, duration:62}, shape_74)
            .set({data:{pos:{x:327.55,y:224.95}, scale:{x:ds,y:ds}}}) // Empty 687-748
            .fromTo({data:{pos:{x:325,y:225}, scale:{x:ds,y:ds}}, to:{pos:{x:325,y:225}, scale:{x:1.00401306,y:1.00401306}}, start:749, duration:119}, shape_90)
            .set({data:{pos:{x:325,y:225}, scale:{x:1.00401306,y:1.00401306}}})
            .fromTo({data:{pos:{x:311.95,y:224.95}, scale:{x:ds,y:ds}}, to:{pos:{x:333.85,y:224.95}, scale:{x:ds,y:ds}}, duration:124}, shape_96)
            .set({data:{pos:{x:333.85,y:224.95}, scale:{x:ds,y:ds}}}) // Empty 994-1017
            .fromTo({data:{pos:{x:311.95,y:224.95}, scale:{x:ds,y:ds}}, to:{pos:{x:333.85,y:224.95}, scale:{x:ds,y:ds}}, start:1018, duration:124}, shape_96)
            .set({data:{pos:{x:333.85,y:224.95}, scale:{x:ds,y:ds}}}) // Empty 1143-1167
            .fromTo({data:{pos:{x:311.95,y:224.95}, scale:{x:ds,y:ds}}, to:{pos:{x:323.9,y:224.95}, scale:{x:ds,y:ds}}, start:1168, duration:68}, shape_96)
            .set({data:{pos:{x:323.9,y:224.95}, scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:325,y:225}, scale:{x:ds,y:ds}}, to:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}, duration:37}, shape_126)
            .set({data:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}, duration: 113}, shape_134) // Empty 1387-1418
            .set({data:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}, start:1419}, shape_154)
            .set({data:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}}, shape_148)
            .set({data:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}}, shape_154)
            .set({data:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}}, shape_148)
            .set({data:{pos:{x:324.95,y:224.95}, scale:{x:ds,y:ds}}, duration: 51}, shape_154)
            .set({data:{pos:{x:323,y:225}}}, shape_160)
            .set({data:{pos:{x:325,y:225}}, duration:11})
            .set({data:{pos:{x:325,y:227}}}, shape_162)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:327,y:225}}}, shape_164)
            .set({data:{pos:{x:325,y:225}}, duration:11})
            .set({data:{pos:{x:325,y:227}}}, shape_166)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:323,y:225}}}, shape_160)
            .set({data:{pos:{x:325,y:225}}, duration:11})
            .set({data:{pos:{x:325,y:227}}}, shape_162)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:327,y:225}}}, shape_164)
            .set({data:{pos:{x:325,y:225}}, duration:11})
            .set({data:{pos:{x:325,y:227}}}, shape_166)
            .set({data:{pos:{x:325,y:225}}, duration: 12}) // Character switch
            .set({data:{pos:{x:326,y:225}}}, shape_168)
            .set({data:{pos:{x:325,y:225}}, duration:12})
            .set({data:{pos:{x:327,y:225}}}, shape_170)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:326,y:225}}}, shape_168)
            .set({data:{pos:{x:325,y:225}}, duration:12})
            .set({data:{pos:{x:327,y:225}}}, shape_170)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:326,y:225}}}, shape_168)
            .set({data:{pos:{x:325,y:225}}, duration:12})
            .set({data:{pos:{x:327,y:225}}}, shape_170)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .fromTo({data:{pos:{x:325,y:225}}, to:{pos:{x:349,y:225}}, duration:2}, shape_172)
            .to({data:{pos:{x:377,y:225}}, duration:7})
            .set({data:{pos:{x:377,y:225}}})
            .set({data:{pos:{x:381,y:225}}, duration: 3}) // Speeen
            .set({data:{pos:{x:507,y:225}}}, shape_174)
            .set({data:{pos:{x:481.75,y:225}}}, shape_175)
            .set({data:{pos:{x:456.45,y:225}}}, shape_176)
            .set({data:{pos:{x:431.2,y:225}}}, shape_178)
            .set({data:{pos:{x:405.9,y:225}}}, shape_179)
            .set({data:{pos:{x:380.65,y:225}}}, shape_180)
            .set({data:{pos:{x:355.35,y:225}}}, shape_182)
            .set({data:{pos:{x:330.1,y:225}}}, shape_183)
            .set({data:{pos:{x:304.8,y:225}}}, shape_184)
            .set({data:{pos:{x:279.55,y:225}}}, shape_186)
            .set({data:{pos:{x:254.25,y:225}}}, shape_187)
            .set({data:{pos:{x:229,y:225}}}, shape_188)
            .set({data:{pos:{x:334,y:225}}}, shape_190)
            .set({data:{pos:{x:329.5,y:225}}}, shape_190)
            .set({data:{pos:{x:325,y:225}}, duration: 10}, shape_190) // **********
            .set({data:{pos:{x:325,y:225}}, duration: 13}, shape_192)
            .set({data:{pos:{x:325,y:225}}, duration: 12}, shape_194)
            .set({data:{pos:{x:325,y:225}}, duration: 13}, shape_192)
            .set({data:{pos:{x:325,y:225}}, duration: 12}, shape_190)
            .set({data:{pos:{x:325,y:225}}, duration: 13}, shape_192)
            .set({data:{pos:{x:325,y:225}}, duration: 12}, shape_194)
            .set({data:{pos:{x:325,y:225}}, duration: 13}, shape_192)
            .set({data:{pos:{x:325,y:227}}}, shape_196) // Character switch
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:325,y:227}}}, shape_198)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:325,y:227}}}, shape_196)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:325,y:227}}}, shape_198)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:325,y:227}}}, shape_196)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:325,y:227}}}, shape_198)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:325,y:227}}}, shape_196)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:325,y:227}}}, shape_198)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .fromTo({data:{pos:{x:324.95,y:224.45}, scale:{x:1.2099762,y:1.2099762}}, to:{pos:{x:324.95,y:224.45}, scale:{x:0.99035645,y:0.99035645}}, duration:99}, shape_200)
            .set({data:{pos:{x:324.95,y:224.45}, scale:{x:0.99035645,y:0.99035645}}})
            .fromTo({data:{pos:{x:324.95,y:224.45}, scale:{x:1.2099762,y:1.2099762}}, to:{pos:{x:324.95,y:224.45}, scale:{x:0.99035645,y:0.99035645}}, duration:99}, shape_202)
            .set({data:{pos:{x:324.95,y:224.45}, scale:{x:0.99035645,y:0.99035645}}})
            .fromTo({data:{pos:{x:325,y:225}, scale:{x:1.09999084,y:1.09999084}}, to:{pos:{x:325,y:225}, scale:{x:0.99984741,y:0.99984741}}, duration:49}, shape_204)
            .set({data:{pos:{x:325,y:225}, scale:{x:0.99984741,y:0.99984741}}})
            .set({data:{pos:{x:325,y:225}}, duration: 13}, shape_206)
            .set({data:{pos:{x:325,y:225}}, duration: 12}, shape_208)
            .set({data:{pos:{x:325,y:225}}, duration: 13}, shape_210)
            .set({data:{pos:{x:325,y:225}}, duration: 12}, shape_212)
            .set({data:{pos:{x:323,y:225}}}, shape_214)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:323,y:225}}}, shape_216)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:323,y:225}}}, shape_218)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:323,y:225}}}, shape_220)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:327,y:225}}}, shape_222)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:327,y:225}}}, shape_224)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .set({data:{pos:{x:327,y:225}}}, shape_226)
            .set({data:{pos:{x:325,y:225}}, duration: 11})
            .set({data:{pos:{x:327,y:225}}}, shape_228)
            .set({data:{pos:{x:325,y:225}}, duration: 12})
            .fromTo({data:{pos:{x:305.9,y:224.95},scale:{x:ds,y:ds}}, to:{pos:{x:340.25,y:224.95},scale:{x:ds,y:ds}}, duration:99}, shape_230)
            .set({data:{pos:{x:340.25,y:224.95},scale:{x:ds,y:ds}}}) // Empty 2374-2411
            .fromTo({data:{pos:{x:308.9,y:224.95},scale:{x:ds,y:ds}}, to:{pos:{x:321.1,y:224.95},scale:{x:ds,y:ds}},start: 2412, duration:49}, shape_236)
            .set({data:{pos:{x:321.1,y:224.95},scale:{x:ds,y:ds}}})
            .set({data:{x:1517.3,y:224.95},scale:{x:ds,y:ds}}, shape_244)
            .set({data:{x:840.8,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:324.95,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:1517.3,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:840.8,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:324.95,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:1453.5,y:224.95},scale:{x:ds,y:ds}}, shape_246)
            .set({data:{x:855.1,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:324.95,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:1453.5,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:855.1,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:324.95,y:224.95},scale:{x:ds,y:ds}})
            .set({data:{x:310.0,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:310.2,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:310.4,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:310.6,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:310.8,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:311.0,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:311.2,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:311.4,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:311.6,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:311.8,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:312.0,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:312.2,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:312.4,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:312.6,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:312.8,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:313.0,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:313.2,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:313.4,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:313.6,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:313.8,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:314.0,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:314.25,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:314.45,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:314.65,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:314.85,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:315.05,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:315.25,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:315.45,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:315.65,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:315.85,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:316.05,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:316.25,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:316.45,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:316.65,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:316.85,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:317.05,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:317.25,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:317.45,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:317.65,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:317.85,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:318.05,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:318.25,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:318.45,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:318.65,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:318.85,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:319.05,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:319.25,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:319.45,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:319.65,y:225},scale:{x:ds2,y:ds2}}, shape_248)
            .set({data:{x:319.85,y:225},scale:{x:ds2,y:ds2}}, shape_256)
            .set({data:{x:305.9,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:306.5,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:306.25,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:306.45,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:306.6,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:306.8,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:307,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:307.2,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:307.35,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:307.5,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:307.75,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:307.9,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:308.05,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:308.3,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:308.45,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:308.7,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:308.8,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:309,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:309.25,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:309.4,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:309.55,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:309.8,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:309.95,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:310.15,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:310.35,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:310.5,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:310.7,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:310.9,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:311.05,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:311.25,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:311.45,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:311.65,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:311.8,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:312,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:312.2,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:312.35,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:312.55,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:312.75,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:312.9,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:313.1,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:313.3,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:313.45,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:313.7,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:313.85,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:314,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:314.25,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:314.4,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:314.55,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:314.8,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:314.95,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:315.15,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:315.35,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:315.5,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:315.7,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:315.9,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:316.05,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:316.25,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:316.45,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:316.65,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:316.8,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:317,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{x:317.2,y:224.95},scale:{x:ds,y:ds}}, shape_268)
            .set({data:{x:317.35,y:224.95},scale:{x:ds,y:ds}}, shape_262)
            .set({data:{}, duration:87}, noise)
            .fromTo({data:{pos:{x:279.95,y:224.95},scale:{x:0.99998474,y:0.99998474}}, to:{pos:{x:324.9,y:224.95},scale:{x:0.99998474,y:0.99998474}}, duration: 62}, shape_282)
            .set({data:{pos:{x:324.9,y:224.95},scale:{x:0.99998474,y:0.99998474}}}) // Empty 2737-2773

            .set({data:{pos:{x:147.6,y:225}}, start: 2774}, shape_84)
            .set({data:{pos:{x:150,y:225}}, duration:10})
            .set({data:{pos:{x:152.4,y:225}}})
            .set({data:{pos:{x:151.6,y:225}}}, shape_88)
            .set({data:{pos:{x:150,y:225}}, duration:11})
            .set({data:{pos:{x:147.6,y:225}}})

            .set({data:{pos:{x:147.6,y:225}}}, shape_84)
            .set({data:{pos:{x:150,y:225}}, duration:10})
            .set({data:{pos:{x:152.4,y:225}}})
            .set({data:{pos:{x:151.6,y:225}}}, shape_88)
            .set({data:{pos:{x:150,y:225}}, duration:11})
            .set({data:{pos:{x:147.6,y:225}}})

            .set({data:{pos:{x:147.6,y:225}}}, shape_84)
            .set({data:{pos:{x:150,y:225}}, duration:10})
            .set({data:{pos:{x:152.4,y:225}}})
            .set({data:{pos:{x:151.6,y:225}}}, shape_88)
            .set({data:{pos:{x:150,y:225}}, duration:11})
            .set({data:{pos:{x:147.6,y:225}}})

            .set({data:{pos:{x:147.6,y:225}}}, shape_84)
            .set({data:{pos:{x:150,y:225}}, duration:10})
            .set({data:{pos:{x:152.4,y:225}}})
            .set({data:{pos:{x:151.6,y:225}}}, shape_88)
            .set({data:{pos:{x:150,y:225}}, duration:11})
            .set({data:{pos:{x:147.6,y:225}}})

            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}}, duration:14}, shape_92) // Empty 2888-2896
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0}, start:2897})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0.5}})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}}, duration:14}) // Empty 2913-2921
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0}, start:2922})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0.5}})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}}, duration:14}) // Empty 2938-2946
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0}, start:2947})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0.5}})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}}, duration:14}) // Empty 2963-2971
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0}, start:2972})
            .set({data:{pos:{x:158.2,y:228.05}, scale:{x:0.99998474,y:0.99998474}, alpha: 0.5}})
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:8}, shape_46)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:9})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:8})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:9})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:8})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:9})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:8})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
            .set({data:{pos:{x:209.05,y:175.9}, scale:{x:0.79998779,y:0.79998779}}, duration:9})
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}, duration:3}, shape_48)
            .set({data:{pos:{x:209.05,y:178.3}, scale:{x:0.79998779,y:0.79998779}}}, shape_46)
    }

    // Layer 2.5
    {
        let vinyl = new Timeline(true, 1);
        vinyl.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 7'))
            .set({data: {pos: {x: -325, y: -225}}}, assets.get('image 27'));
        mainTl.fromTo({data: {pos: {x: 338.1, y: 219.45}, scale: {x: 1.09991455, y: 1.09991455}, alpha: 0}, to: {pos: {x: 334, y: 221.2}, scale: {x: 1.09991455, y: 1.09991455}}, layer: 2, start: 74, duration: 13}, vinyl)
            .to({data: {pos: {x: 310.7, y: 231.35}, scale: {x: 1.09991455, y: 1.09991455}}, duration: 74})
            .set({data: {pos: {x:310.7, y:231.35}, scale:{x:1.09991455,y:1.09991455}}})
    }

    // Layer 3
    let shape_32 = new Timeline(true);
    shape_32.set({data: {pos: {x: -328, y: -223}}}, assets.get('image 31'));
    let shape_34 = new Timeline(true);
    shape_34.set({data: {pos: {x: -326, y: -224}}}, assets.get('image 33'));
    let shape_94 = new Timeline(true);
    shape_94.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 93'));
    let shape_152 = new Timeline(true);
    shape_152.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 151'));
    let shape_272 = new Timeline(true);
    shape_272.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 271'));
    let shape_278 = new Timeline(true);
    shape_278.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 277'));
    {
        let shape_40 = new Timeline(true);
        shape_40.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 39'));
        let shape_52 = new Timeline(true);
        shape_52.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 51'));
        let shape_64 = new Timeline(true);
        shape_64.set({data: {pos: {x: -325, y: -221}}}, assets.get('image 63'));
        let shape_66 = new Timeline(true);
        shape_66.set({data: {pos: {x: -325, y: -221}}}, assets.get('image 65'));
        let shape_76 = new Timeline(true);
        shape_76.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 75'));
        let shape_98 = new Timeline(true);
        shape_98.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 97'));
        let shape_114 = new Timeline(true);
        shape_114.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 113'));
        let shape_123 = new Timeline(true);
        shape_123.set({data: {pos: {x: -325.5, y: -225}}}, assets.get('image 122'));
        let shape_128 = new Timeline(true);
        shape_128.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 127'));
        let shape_130 = new Timeline(true);
        shape_130.set({data: {pos: {x: -325, y: -226}}}, assets.get('image 129'));
        let shape_132 = new Timeline(true);
        shape_132.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 131'));
        let shape_136 = new Timeline(true);
        shape_136.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 135'));
        let shape_140 = new Timeline(true);
        shape_140.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 139'));
        let shape_143 = new Timeline(true);
        shape_143.set({data: {pos: {x: 325, y: -225}, scale:{x:-1}}}, assets.get('image 135'));
        let shape_145 = new Timeline(true);
        shape_145.set({data: {pos: {x: 325, y: -225}, scale:{x:-1}}}, assets.get('image 139'));
        let shape_156 = new Timeline(true);
        shape_156.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 155'));
        let shape_158 = new Timeline(true);
        shape_158.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 157'));
        let shape_238 = new Timeline(true);
        shape_238.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 237'));
        let shape_242 = new Timeline(true);
        shape_242.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 241'));
        let shape_264 = new Timeline(true);
        shape_264.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 263'));
        let shape_270 = new Timeline(true);
        shape_270.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 269'));
        let shape_284 = new Timeline(true);
        shape_284.set({data: {pos: {x: -400, y: -225}}}, assets.get('image 283'));

        let black = new Rectangle(base, 650, 450, [0, 0, 0, -1]);

        mainTl.fromTo({data:{pos:{x:296,y:208},scale:{x:ds,y:ds}, alpha:0}, to:{pos:{x:301.65,y:211.55},scale:{x:1.09994507,y:1.09994507},alpha:0.921875}, start:149, duration: 12, layer: 3}, shape_30)
            .set({data:{pos:{x:301.65,y:211.55},scale:{x:1.09994507,y:1.09994507}, alpha:0.921875}})
            .fromTo({data:{pos:{x:302.15,y:211.85},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:303.1,y:212.45},scale:{x:1.09994507,y:1.09994507}}, duration:2}, shape_34)
            .set({data:{pos:{x:303.1,y:212.45},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:303.45,y:212.7},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:307.85,y:215.4},scale:{x:1.09994507,y:1.09994507}}, duration:9}, shape_32)
            .set({data:{pos:{x:307.85,y:215.4},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:308.3,y:215.7},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:309.25,y:216.3},scale:{x:1.09994507,y:1.09994507}}, duration:2}, shape_34)
            .set({data:{pos:{x:309.25,y:216.3},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:309.75,y:216.6},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:313.55,y:219},scale:{x:1.09994507,y:1.09994507}}, duration:8}, shape_32)
            .set({data:{pos:{x:313.55,y:219},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:314,y:219.3},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:314.95,y:219.9},scale:{x:1.09994507,y:1.09994507}}, duration:2}, shape_34)
            .set({data:{pos:{x:314.95,y:219.9},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:315.45,y:220.2},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:319.7,y:222.85},scale:{x:1.09994507,y:1.09994507}}, duration:9}, shape_32)
            .set({data:{pos:{x:319.7,y:222.85},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:320.2,y:223.15},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:321.15,y:223.75},scale:{x:1.09994507,y:1.09994507}}, duration:2}, shape_34)
            .set({data:{pos:{x:321.15,y:223.75},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:321.6,y:224.05},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:325.4,y:226.45},scale:{x:1.09994507,y:1.09994507}}, duration:8}, shape_32)
            .set({data:{pos:{x:325.4,y:226.45},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:340.65,y:218.2},scale:{x:ds,y:ds}},to:{pos:{x:333.75,y:220.45},scale:{x:ds,y:ds}}, duration:19}, shape_40)
            .to({data:{pos:{x:330.5,y:221.45},scale:{x:ds,y:ds}},duration:9})
            .set({data:{pos:{x:330.5,y:221.45},scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:330.3,y:221.6},scale:{x:ds,y:ds}},to:{pos:{x:328.7,y:222},scale:{x:ds,y:ds},alpha:0.91015625}, duration:4})
            .set({data:{pos:{x:328.7,y:222},scale:{x:ds,y:ds},alpha:0.91015625}})
            .fromTo({data:{pos:{x:328.35,y:222.2},scale:{x:ds,y:ds},alpha:0.8203125},to:{pos:{x:326.15,y:222.85},scale:{x:ds,y:ds},alpha:0.26953125}, duration:6})
            .set({data:{pos:{x:326.15,y:222.85},scale:{x:ds,y:ds},alpha:0.26953125}})
            .fromTo({data:{pos:{x:325.85,y:223},scale:{x:ds,y:ds},alpha:0.1796875},to:{pos:{x:325.1,y:223.25},scale:{x:ds,y:ds},alpha:0}, duration:2})
            .set({data:{pos:{x:325.1,y:223.25},scale:{x:ds,y:ds},alpha:0}}) // Empty 256-373
            .fromTo({data:{pos:{x:296.9,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:346.1,y:224.95},scale:{x:ds,y:ds}},start:374,duration:113},shape_52)
            .set({data:{pos:{x:346.1,y:224.95},scale:{x:ds,y:ds}}}) // Empty 488-535
            .fromTo({data:{pos:{x:324.95,y:226.55},scale:{x:ds,y:ds}},to:{pos:{x:324.95,y:239.55},scale:{x:ds,y:ds}}, start:536, duration:25}, shape_64)
            .set({data:{pos:{x:324.95,y:239.55},scale:{x:ds,y:ds}}})
            .set({data:{pos:{x:324.95,y:231.95},scale:{x:ds,y:ds}}}, shape_66)
            .set({data:{pos:{x:324.95,y:231.85},scale:{x:ds,y:ds}}})
            .set({data:{pos:{x:324.95,y:239.55},scale:{x:ds,y:ds}}, duration:24}) // Empty 588-623
            .fromTo({data:{pos:{x:352.4,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:329.75,y:224.95},scale:{x:ds,y:ds}}, start:624, duration:62}, shape_76)
            .set({data:{pos:{x:329.75,y:224.95},scale:{x:ds,y:ds}}}) // Empty 687-748
            .fromTo({data:{pos:{x:325,y:225},scale:{x:ds,y:ds}}, to:{pos:{x:325,y:225}, scale:{x:1.08947754,y:1.08947754}},start:749,duration:13}, shape_92)
            .set({data:{pos:{x:325,y:225}, scale:{x:1.08947754,y:1.08947754}}}) // Empty 763-771
            .fromTo({data:{pos:{x:325,y:225},scale:{x:1.0814209,y:1.0814209},alpha:0}, to:{pos:{x:325,y:225},scale:{x:1.07980347,y:1.07980347}}, start:772, duration:2})
            .to({data:{pos:{x:325,y:225},scale:{x:1.06932068,y:1.06932068}}, duration: 13})
            .set({data:{pos:{x:325,y:225},scale:{x:1.06932068,y:1.06932068}}}) // Empty 788-796
            .fromTo({data:{pos:{x:325,y:225},scale:{x:1.06124878,y:1.06124878},alpha:0}, to:{pos:{x:325,y:225},scale:{x:1.05964661,y:1.05964661}}, start:797, duration:2})
            .to({data:{pos:{x:325,y:225},scale:{x:1.04916382,y:1.04916382}}, duration: 13})
            .set({data:{pos:{x:325,y:225},scale:{x:1.04916382,y:1.04916382}}}) // Empty 813-821
            .fromTo({data:{pos:{x:325,y:225},scale:{x:1.04109192,y:1.04109192},alpha:0}, to:{pos:{x:325,y:225},scale:{x:1.03947449,y:1.03947449}}, start:822, duration:2})
            .to({data:{pos:{x:325,y:225},scale:{x:1.02900696,y:1.02900696}}, duration: 13})
            .set({data:{pos:{x:325,y:225},scale:{x:1.02900696,y:1.02900696}}}) // Empty 838-846
            .fromTo({data:{pos:{x:325,y:225},scale:{x:1.02095032,y:1.02095032},alpha:0}, to:{pos:{x:325,y:225},scale:{x:1.01931763,y:1.01931763}}, start:847, duration:2})
            .to({data:{pos:{x:325,y:225},scale:{x:1.0088501,y:1.0088501}}, duration: 13})
            .set({data:{pos:{x:325,y:225},scale:{x:1.0088501,y:1.0088501}}}) // Empty 863-868
            .fromTo({data:{pos:{x:310.95,y:224.95},scale:{x:ds,y:ds}}, to:{pos:{x:325.8,y:224.95},scale:{x:ds,y:ds}}, start:869, duration:124}, shape_98)
            .set({data:{pos:{x:325.8,y:224.95},scale:{x:ds,y:ds}}}) // Empty 994-1017
            .fromTo({data:{pos:{x:310.95,y:224.95},scale:{x:ds,y:ds}}, to:{pos:{x:356.8,y:224.95},scale:{x:ds,y:ds}}, start:1018, duration:124}, shape_114)
            .set({data:{pos:{x:356.8,y:224.95},scale:{x:ds,y:ds}}}) // Empty 1143-1168
            .fromTo({data:{pos:{x:310.95,y:224.95},scale:{x:ds,y:ds}}, to:{pos:{x:336.05,y:224.95},scale:{x:ds,y:ds}}, start:1168, duration:68}, shape_123)
            .set({data:{pos:{x:336.05,y:224.95},scale:{x:ds,y:ds}}})
            .set({data:{pos:{x:325,y:225}}, duration:11}, shape_128)
            .set({data:{pos:{x:323,y:226}}}, shape_130)
            .set({data:{pos:{x:325,y:226}}, duration:11})
            .set({data:{pos:{x:323,y:225}}})
            .set({data:{pos:{x:323,y:227}}}, shape_132)
            .set({data:{pos:{x:323,y:225}}, duration: 12})
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:11}, shape_136)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_140)
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:13}, shape_143)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_145)
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:11}, shape_136)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_140)
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:13}, shape_143)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_145)
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:11}, shape_136)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_140)
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}}}) // Empty 1384-1418
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}, start:1419},shape_152) // Color switch start
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}})
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}},shape_156)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}) // Color switch end
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}, duration: 13})
            .set({data:{pos:{x:324.95,y:229.25},scale:{x:ds,y:ds}}}, shape_158)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}, duration: 12})
            .set({data:{pos:{x:324.95,y:229.25},scale:{x:ds,y:ds}}}, shape_156)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}, duration: 11})
            .set({data:{pos:{x:324.95,y:229.25},scale:{x:ds,y:ds}}}, shape_158)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}, duration: 12}) // Empty 1474-1923
            .set({data:{}, start:1924},black) // Empty 1925-1936
            .set({data:{}, start:1937}) // Empty 1938-1948
            .set({data:{}, start:1949}) // Empty 1950-1961
            .set({data:{}, start:1962, duration:12}) // Empty 1974-2023
            .set({data:{}, start:2024}) // Empty 2025-2036
            .set({data:{}, start:2037}) // Empty 2038-2048
            .set({data:{}, start:2049}) // Empty 2050-2061
            .set({data:{}, start:2062, duration:12}) // Empty 2074-2123
            .set({data:{}, start:2124}) // Empty 2125-2136
            .set({data:{}, start:2137}) // Empty 2138-2148
            .set({data:{}, start:2149}) // Empty 2150-2161
            .set({data:{}, start:2162}) // Empty 2163-2412
            .fromTo({data:{pos:{x:302.85,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:308.75,y:224.95},scale:{x:ds,y:ds}},start:2412,duration:11}, shape_238)
            .set({data:{pos:{x:308.75,y:224.95},scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:309.3,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:315.8,y:224.95},scale:{x:ds,y:ds}},duration:12}, shape_242)
            .set({data:{pos:{x:315.8,y:224.95},scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:316.35,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:322.3,y:224.95},scale:{x:ds,y:ds}},duration:11}, shape_238)
            .set({data:{pos:{x:322.3,y:224.95},scale:{x:ds,y:ds}}})
            .fromTo({data:{pos:{x:322.85,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:329.35,y:224.95},scale:{x:ds,y:ds}},duration:12}, shape_242)
            .set({data:{pos:{x:329.35,y:224.95},scale:{x:ds,y:ds}}}) // Empty 2462-2523
            .set({data:{pos:{x:305.9,y:224.95},scale:{x:ds,y:ds}},start:2524}, shape_264)
            .set({data:{pos:{x:306.05,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:306.2,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:306.3,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:306.5,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:306.65,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:306.8,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:307,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:307.1,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:307.25,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:307.4,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:307.6,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:307.7,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:307.85,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:308,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:308.2,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:308.35,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:308.45,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:308.6,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:308.8,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:308.95,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:309.1,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:309.25,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:309.4,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:309.55,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:309.7,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:309.9,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:310,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:310.15,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:310.35,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:310.5,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:310.65,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:310.75,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:310.95,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:311.1,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:311.25,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:311.35,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:311.55,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:311.7,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:311.85,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:312.05,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:312.15,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:312.3,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:312.45,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:312.65,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:312.8,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:312.9,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:313.1,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:313.25,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:313.4,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:313.55,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:313.7,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:313.85,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:314,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:314.2,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:314.3,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:314.45,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:314.6,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:314.8,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:314.95,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:315.05,y:224.95},scale:{x:ds,y:ds}}}, shape_264)
            .set({data:{pos:{x:315.2,y:224.95},scale:{x:ds,y:ds}}}, shape_270)
            .set({data:{pos:{x:315.4,y:224.95},scale:{x:ds,y:ds}}}, shape_264) // Empty 2587-2673
            .set({data:{pos:{x:325,y:225}}, start:2674}, shape_272)
            .set({data:{pos:{x:325,y:225}, alpha:0.921875}}, shape_278)
            .set({data:{pos:{x:325,y:225}, alpha:0.828125}}, shape_272)
            .set({data:{pos:{x:325,y:225}, alpha:0.75}}, shape_278)
            .set({data:{pos:{x:325,y:225}, alpha:0.671875}}, shape_272)
            .set({data:{pos:{x:325,y:225}, alpha:0.578125}}, shape_278)
            .set({data:{pos:{x:325,y:225}, alpha:0.5}}, shape_272)
            .set({data:{pos:{x:325,y:225}, alpha:0.421875}}, shape_278)
            .set({data:{pos:{x:325,y:225}, alpha:0.328125}}, shape_272)
            .set({data:{pos:{x:325,y:225}, alpha:0.25}}, shape_278)
            .set({data:{pos:{x:325,y:225}, alpha:0.171875}}, shape_272)
            .set({data:{pos:{x:325,y:225}, alpha:0.078125}}, shape_278)
            .set({data:{pos:{x:325,y:225}, alpha:0}}, shape_272) // Empty 2687-2723
            .fromTo({data:{pos:{x:370,y:225},alpha:0}, to:{pos:{x:360.55,y:225}}, start:2724, duration:13}, shape_284)
            .to({data:{pos:{x:334.45,y:225}}, duration:36})
            .set({data:{pos:{x:334.45,y:225}}})
            .set({data:{pos:{x:648,y:225}}}, shape_160) // Color shape
            .set({data:{pos:{x:650,y:225}}, duration:11})
            .set({data:{pos:{x:650,y:227}}}, shape_162)
            .set({data:{pos:{x:650,y:225}}, duration:12})
            .set({data:{pos:{x:652,y:225}}}, shape_164)
            .set({data:{pos:{x:650,y:225}}, duration:11})
            .set({data:{pos:{x:650,y:227}}}, shape_166)
            .set({data:{pos:{x:650,y:225}}, duration:12})
            .set({data:{pos:{x:648,y:225}}}, shape_160)
            .set({data:{pos:{x:650,y:225}}, duration:11})
            .set({data:{pos:{x:650,y:227}}}, shape_162)
            .set({data:{pos:{x:650,y:225}}, duration:12})
            .set({data:{pos:{x:652,y:225}}}, shape_164)
            .set({data:{pos:{x:650,y:225}}, duration:11})
            .set({data:{pos:{x:650,y:227}}}, shape_166)
            .set({data:{pos:{x:650,y:225}}, duration:12}) // Empty 2874-2884
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0}, start:2885}, shape_94)
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0.5}})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}}, duration:12}) // Empty 2899-2909
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0}, start:2910})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0.5}})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}}, duration:12}) // Empty 2924-2934
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0}, start:2935})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0.5}})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}}, duration:12}) // Empty 2949-2959
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0}, start:2960})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}, alpha:0.5}})
            .set({data:{pos:{x:158.2,y:228.05},scale:{x:0.99998474,y:0.99998474}}, duration:12})
            .set({data:{pos:{x:525,y:222.5}}, duration:11}, shape_138)
            .set({data:{pos:{x:525,y:224.5}}}, shape_142)
            .set({data:{pos:{x:525,y:222.5}}, duration:12})
            .set({data:{pos:{x:525,y:222.5}}, duration:13}, shape_144)
            .set({data:{pos:{x:525,y:224.5}}}, shape_146)
            .set({data:{pos:{x:525,y:222.5}}, duration:12})
            .set({data:{pos:{x:525,y:222.5}}, duration:11}, shape_138)
            .set({data:{pos:{x:525,y:224.5}}}, shape_142)
            .set({data:{pos:{x:525,y:222.5}}, duration:12})
            .set({data:{pos:{x:525,y:222.5}}, duration:13}, shape_144)
            .set({data:{pos:{x:525,y:224.5}}}, shape_146)
            .set({data:{pos:{x:525,y:222.5}}, duration:12})
    }

    // Layer 4
    let shape_36 = new Timeline(true);
    shape_36.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 35'));
    {
        let shape_42 = new Timeline(true);
        shape_42.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 41'));
        let shape_54 = new Timeline(true);
        shape_54.set({data: {pos: {x: -322, y: -225}}}, assets.get('image 53'));
        let shape_56 = new Timeline(true);
        shape_56.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 55'));
        let shape_78 = new Timeline(true);
        shape_78.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 77'));
        let shape_100 = new Timeline(true);
        shape_100.set({data: {pos: {x: -310, y: -31.5}, scale:{y:0.14999389648}}}, assets.get('image 99'));
        let shape_104 = new Timeline(true);
        shape_104.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 103'));
        let shape_240 = new Timeline(true);
        shape_240.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 239'));
        let shape_266 = new Timeline(true);
        shape_266.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 265'));
        let shape_286 = new Timeline(true);
        shape_286.set({data: {pos: {x: -325, y: -325}}}, assets.get('image 285'));

        mainTl.set({data:{pos:{x:296,y:208},scale:{x:ds,y:ds},alpha:0}, start: 149, layer:4}, shape_34)
        .fromTo({data:{pos:{x: 296.45,y:208.25},scale:{x:1.09994507,y:1.09994507},alpha:0.078125}, to:{pos:{x:297.4,y:208.85},scale:{x:1.09994507,y:1.09994507}, alpha:0.23046875}, duration:2}, shape_34)
        .set({data:{pos:{x:297.4,y:208.85},scale:{x:1.09994507,y:1.09994507},alpha:0.23046875}})
        .fromTo({data:{pos:{x: 297.85,y:209.15},scale:{x:1.09994507,y:1.09994507},alpha:0.30859375}, to:{pos:{x:301.65,y:211.55},scale:{x:1.09994507,y:1.09994507}, alpha:0.921875}, duration:8}, shape_32)
        .set({data:{pos:{x:297.4,y:208.85},scale:{x:1.09994507,y:1.09994507},alpha:0.921875}}) // Empty 162-174

        .fromTo({data:{pos:{x:308.3,y:215.7},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:309.75,y:216.6},scale:{x:1.37486267,y:1.37486267},alpha:0},start:175,duration:3}, shape_36)
        .set({data:{pos:{x:309.75,y:216.6},scale:{x:1.37486267,y:1.37486267},alpha:0}, duration:8})
        .set({data:{pos:{x:313.55,y:219},scale:{x:1.37486267,y:1.37486267},alpha:0}})
        .fromTo({data:{pos:{x:314,y:219.3},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:315.45,y:220.2},scale:{x:1.37486267,y:1.37486267},alpha:0},duration:3}) // Empty 191-211

        .fromTo({data:{pos:{x:325.9,y:226.75},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:331.6,y:230.35},scale:{x:1.09994507,y:1.09994507},alpha:0}, start:212, duration:12}, shape_30)
        .set({data:{pos:{x:331.6,y:230.35},scale:{x:1.09994507,y:1.09994507},alpha:0}}) // Empty 225-243

        .set({data:{pos:{x:329.1,y:221.9},scale:{x:ds,y:ds},alpha:0}, start:244}, shape_42)
        .set({data:{pos:{x:328.7,y:222},scale:{x:ds,y:ds},alpha:0.08984375}})
        .fromTo({data:{pos:{x:328.35,y:222.2},scale:{x:ds,y:ds},alpha:0.1796875},to:{pos:{x:326.15,y:222.85},scale:{x:ds,y:ds},alpha:0.73046875},duration:6})
        .set({data:{pos:{x:326.15,y:222.85},scale:{x:ds,y:ds},alpha:0.73046875}})
        .fromTo({data:{pos:{x:325.85,y:223},scale:{x:ds,y:ds},alpha:0.8203125},to:{pos:{x:325.1,y:223.25},scale:{x:ds,y:ds}},duration:2})
        .to({data:{pos:{x:318.55,y:225.3},scale:{x:ds,y:ds}},duration:18})
        .to({data:{pos:{x:315.35,y:226.35},scale:{x:ds,y:ds}},duration:9})
        .set({data:{pos:{x:315.35,y:226.35},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:315,y:226.55},scale:{x:ds,y:ds}},to:{pos:{x:313.9,y:226.9},scale:{x:ds,y:ds}},duration:3})
        .set({data:{pos:{x:313.9,y:226.9},scale:{x:ds,y:ds}}}) // Empty 287-373

        .fromTo({data:{pos:{x:293.6,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:296.2,y:224.95},scale:{x:ds,y:ds}},start:374,duration:6}, shape_54)
        .set({data:{pos:{x:296.2,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:299.9,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:301.2,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:301.2,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:301.65,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:298.8,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:301.8,y:224.95},scale:{x:ds,y:ds}},duration:7})
        .set({data:{pos:{x:301.8,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:305.55,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:306.9,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:306.9,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:307.3,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:304.45,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:307.05,y:224.95},scale:{x:ds,y:ds}},duration:6})
        .set({data:{pos:{x:307.05,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:310.8,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:312.1,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:312.1,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:312.55,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:309.7,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:312.7,y:224.95},scale:{x:ds,y:ds}},duration:7})
        .set({data:{pos:{x:312.7,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:316.45,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:317.45,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:317.45,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:318.2,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:315.35,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:317.95,y:224.95},scale:{x:ds,y:ds}},duration:6})
        .set({data:{pos:{x:317.95,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:321.7,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:323,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:323,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:323.45,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:320.6,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:323.6,y:224.95},scale:{x:ds,y:ds}},duration:7})
        .set({data:{pos:{x:323.6,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:327.35,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:328.65,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:328.65,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:329.1,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:326.25,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:328.85,y:224.95},scale:{x:ds,y:ds}},duration:6})
        .set({data:{pos:{x:328.85,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:322.55,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:333.9,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:333.9,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:334.35,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:331.45,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:334.5,y:224.95},scale:{x:ds,y:ds}},duration:7})
        .set({data:{pos:{x:334.5,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:338.25,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:339.55,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:339.55,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:340,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .fromTo({data:{pos:{x:337.15,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:339.7,y:224.95},scale:{x:ds,y:ds}},duration:6})
        .set({data:{pos:{x:339.7,y:224.95},scale:{x:ds,y:ds}}})
        .fromTo({data:{pos:{x:343.45,y:224.95},scale:{x:ds,y:ds}},to:{pos:{x:344.8,y:224.95},scale:{x:ds,y:ds}},duration:3}, shape_56)
        .set({data:{pos:{x:344.8,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:345.2,y:224.95},scale:{x:ds,y:ds}}}, shape_54)
        .set({data:{pos:{x:342.35,y:224.95},scale:{x:ds,y:ds}}})
        .set({data:{pos:{x:342.8,y:224.95},scale:{x:ds,y:ds}}}) // Empty 488-623

        .set({data:{pos:{x:306.55,y:293.3},scale:{x:1.09996467,y:1.09996467},angle:19.99974313},start:624}, shape_78)
        .fromTo({data:{pos:{x:307.1,y:291.75},scale:{x:1.09879393,y:1.09879393},angle:19.57884015},to:{pos:{x:314.8,y:273.6},scale:{x:1.09910876,y:1.09910876},angle:13.76981989},duration:22})
        .set({data:{pos:{x:314.8,y:273.6},scale:{x:1.09910876,y:1.09910876},angle:13.76981989}})
        .fromTo({data:{pos:{x:315,y:272.75},scale:{x:1.09913126,y:1.09913126},angle:13.51497695},to:{pos:{x:316.05,y:270.5},scale:{x:1.09916102,y:1.09916102},angle:12.81618233},duration:2})
        .to({data:{pos:{x:318.1,y:263.6},scale:{x:1.09927223,y:1.09927223},angle:10.77384367}, duration:8})
        .set({data:{pos:{x:318.1,y:263.6},scale:{x:1.09927223,y:1.09927223},angle:10.77384367}})
        .fromTo({data:{pos:{x:318.2,y:262.7},scale:{x:1.09929345,y:1.09929345},angle:10.51710941},to:{pos:{x:319.2,y:260.3},scale:{x:1.09932411,y:1.09932411},angle:9.81872783},duration:2})
        .to({data:{pos:{x:323.65,y:237.8},scale:{x:1.09968275,y:1.09968275},angle:3.50502130}, duration:24})
        .set({data:{pos:{x:323.65,y:237.8},scale:{x:1.09968275,y:1.09968275},angle:3.50502130}})
        .set({data:{pos:{x:324.1,y:236.2},scale:{x:1.09971476,y:1.09971476},angle:3.06217612}}) // Empty 687-759

        .fromTo({data:{pos:{x:325,y:225},scale:{x:1.09111023,y:1.09111023},alpha:0},to:{pos:{x:325,y:225},scale:{x:1.08947754,y:1.08947754}},start:760, duration:2}, shape_94)
        .to({data:{pos:{x:325,y:225},scale:{x:1.08061218,y:1.08061218}},duration:11})
        .set({data:{pos:{x:325,y:225},scale:{x:1.08061218,y:1.08061218}}}) // Empty 774-784

        .fromTo({data:{pos:{x:325,y:225},scale:{x:1.07092285,y:1.07092285},alpha:0},to:{pos:{x:325,y:225},scale:{x:1.06932068,y:1.06932068}},start:785, duration:2})
        .to({data:{pos:{x:325,y:225},scale:{x:1.06045532,y:1.06045532}},duration:11})
        .set({data:{pos:{x:325,y:225},scale:{x:1.06045532,y:1.06045532}}}) // Empty 799-809

        .fromTo({data:{pos:{x:325,y:225},scale:{x:1.05076599,y:1.05076599},alpha:0},to:{pos:{x:325,y:225},scale:{x:1.04916382,y:1.04916382}},start:810, duration:2})
        .to({data:{pos:{x:325,y:225},scale:{x:1.0402832,y:1.0402832}},duration:11})
        .set({data:{pos:{x:325,y:225},scale:{x:1.0402832,y:1.0402832}}}) // Empty 824-834

        .fromTo({data:{pos:{x:325,y:225},scale:{x:1.03060913,y:1.03060913},alpha:0},to:{pos:{x:325,y:225},scale:{x:1.02900696,y:1.02900696}},start:835, duration:2})
        .to({data:{pos:{x:325,y:225},scale:{x:1.02012634,y:1.02012634}},duration:11})
        .set({data:{pos:{x:325,y:225},scale:{x:1.02012634,y:1.02012634}}}) // Empty 849-859

        .fromTo({data:{pos:{x:325,y:225},scale:{x:1.01045227,y:1.01045227},alpha:0},to:{pos:{x:325,y:225},scale:{x:1.0088501,y:1.0088501}},start:860, duration:2})
        .to({data:{pos:{x:325,y:225},scale:{x:1.00401306,y:1.00401306}},duration:6})
        .set({data:{pos:{x:325,y:225},scale:{x:1.00401306,y:1.00401306}}}) // Empty 869-923

        .fromTo({data:{pos:{x:325,y:501.5}},to:{pos:{x:325,y:398.5}},start:924, duration:2}, shape_100)
        .set({data:{pos:{x:325,y:398.5}}})
        .set({data:{pos:{x:325,y:401.5}}, duration: 33})
        .fromTo({data:{pos:{x:325,y:398.5}}, to:{pos:{x:325,y:501.5}}, duration:2})
        .set({data:{pos:{x:325,y:501.5}}}) // Empty 963-973

        .fromTo({data:{pos:{x:353.75,y:224.95},scale:{x:1.09999084,y:1.09999084}, alpha:0},to:{pos:{x:349.8,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:974, duration:13}, shape_104)
        .to({data:{pos:{x:338.8,y:224.95},scale:{x:1.09999084,y:1.09999084}}, duration:37})
        .to({data:{pos:{x:334.9,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}, duration:13})
        .set({data:{pos:{x:334.9,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}})
        .fromTo({data:{pos:{x:325,y:501.5}}, to:{pos:{x:325,y:398.5}}, duration:2}, shape_100)
        .set({data:{pos:{x:325,y:398.5}}})
        .set({data:{pos:{x:325,y:401.5}}, duration: 33})
        .fromTo({data:{pos:{x:325,y:398.5}}, to:{pos:{x:325,y:501.5}}, duration:2})
        .set({data:{pos:{x:325,y:501.5}}}) // Empty 1177-1186

        .fromTo({data:{pos:{x:325,y:501.5}}, to:{pos:{x:325,y:398.5}},start:1187, duration:2}, shape_100)
        .set({data:{pos:{x:325,y:398.5}}})
        .set({data:{pos:{x:325,y:401.5}}, duration: 33})
        .fromTo({data:{pos:{x:325,y:398.5}}, to:{pos:{x:325,y:501.5}}, duration:2})
        .set({data:{pos:{x:325,y:501.5}}}) // Empty 1226-1273

        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},start:1274,duration:11}, shape_138)
        .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_142)
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:13}, shape_144)
        .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_146)
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:11}, shape_138)
        .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_142)
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:13}, shape_144)
        .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_146)
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:12})
        .set({data:{pos:{x:324.95,y:224.95},scale:{x:ds,y:ds}},duration:11}, shape_138)
        .set({data:{pos:{x:324.95,y:227.1},scale:{x:ds,y:ds}}}, shape_142) // Empty 1387-2411

        .fromTo({data:{pos:{x:302.85,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:329.35,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:2412,duration:49}, shape_240)
        .set({data:{pos:{x:329.35,y:224.95},scale:{x:1.09999084,y:1.09999084}}}) // Empty 2462-2523

        .fromTo({data:{pos:{x:306.25,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:326.25,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:2524,duration:62}, shape_266)
        .set({data:{pos:{x:326.25,y:224.95},scale:{x:1.09999084,y:1.09999084}}}) // Empty 2587-2873

        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, start:2874, duration:12}, shape_190) // Colored shapes
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:13}, shape_192)
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:12}, shape_194)
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:13}, shape_192)
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:12}, shape_190)
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:13}, shape_192)
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:12}, shape_194)
        .set({data:{pos:{x:343.05,y:268},scale:{x:-1.24998474,y:1.24998474}}, duration:13}, shape_192) // Empty 2974-3071

        .fromTo({data:{pos:{x:325,y:225},scale:{x:3,y:3},alpha:0}, to:{pos:{x:325,y:225}}, start:3072, duration:2}, shape_286)
        .to({data:{pos:{x:325,y:225},scale:{x:0.60269165,y:0.60269165}}, duration:146})
        .set({data:{pos:{x:325,y:225},scale:{x:0.60269165,y:0.60269165}}})
        .set({data:{pos:{x:325,y:225},scale:{x:0.59997559,y:0.59997559}}, duration:3});
    }

    // Layer 5
    {
        let shape_44 = new Timeline(true);
        shape_44.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 43'));
        let shape_58 = new Timeline(true);
        shape_58.set({data: {pos: {x: -375, y: -250}}}, assets.get('image 57'));
        let shape_68 = new Timeline(true);
        shape_68.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 67'));
        let shape_80 = new Timeline(true);
        shape_80.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 79'));
        let shape_106 = new Timeline(true);
        shape_106.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 105'));
        let shape_117 = new Timeline(true);
        shape_117.set({data: {pos: {x: -350, y: -250}}}, assets.get('image 116'));
        let shape_232 = new Timeline(true);
        shape_232.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 231'));
        let shape_288 = new Timeline(true);
        shape_288.set({data: {pos: {x: -325, y: -325}}}, assets.get('image 287'));
        let shape_289 = new Timeline(true);
        shape_289.set({data: {pos:{x:443.95,y:-118.95},scale:{x:-1,y:-1},angle:300}}, assets.get('image 287'));
        let shape_293 = new Timeline(true);
        shape_293.set({data: {pos:{x:-118.95,y:443.9},scale:{x:-0.999967655,y:-0.999967655},angle:59.9999903}}, assets.get('image 287'));

        let record = new Timeline(true);
        record.set({data:{}},shape_288).set({data:{}},shape_289).set({data:{}},shape_293)


        mainTl.set({data:{pos:{x:296.45,y:208.25},scale:{x:1.09994507,y:1.09994507}, alpha:0.078125},start:150,layer:5}, shape_36)
            .set({data:{pos:{x:296.9,y:208.55},scale:{x:1.1915741,y:1.1915741}, alpha:0.1015625}})
            .set({data:{pos:{x:297.4,y:208.85},scale:{x:1.28321838,y:1.28321838}, alpha:0.0703125}})
            .fromTo({data:{pos:{x:297.85,y:209.15},scale:{x:1.37486267,y:1.37486267},alpha:0},to:{pos:{x:301.65,y:211.55},scale:{x:1.37486267,y:1.37486267},alpha:0},duration:8})
            .set({data:{pos:{x:301.65,y:211.55},scale:{x:1.37486267,y:1.37486267},alpha:0}})
            .fromTo({data:{pos:{x:302.15,y:211.85},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:303.55,y:212.7},scale:{x:1.37486267,y:1.37486267},alpha:0}, duration:3})
            .set({data:{pos:{x:303.55,y:212.7},scale:{x:1.37486267,y:1.37486267},alpha:0}}) // Empty 166-211

            .fromTo({data:{pos:{x:325.9,y:226.75},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:326.85,y:227.35},scale:{x:1.09994507,y:1.09994507},alpha:0.828125},start:212,duration:2},shape_34)
            .set({data:{pos:{x:326.85,y:227.35},scale:{x:1.09994507,y:1.09994507},alpha:0.828125}})
            .fromTo({data:{pos:{x:327.35,y:227.65},scale:{x:1.09994507,y:1.09994507},alpha:0.75},to:{pos:{x:331.6,y:230.35},scale:{x:1.09994507,y:1.09994507},alpha:0}})
            .set({data:{pos:{x:331.6,y:230.35},scale:{x:1.09994507,y:1.09994507},alpha:0}}) // Empty 225-273

            .fromTo({data:{pos:{x:346.9,y:223.85},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:341.8,y:223.85},scale:{x:1.09999084,y:1.09999084}},start:274, duration:13}, shape_44)
            .to({data:{pos:{x:308.1,y:223.85},scale:{x:1.09999084,y:1.09999084}}, duration:87})
            .to({data:{pos:{x:303.1,y:223.85},scale:{x:1.09999084,y:1.09999084},alpha:0}, duration:13})
            .set({data:{pos:{x:303.1,y:223.85},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 388-473

            .fromTo({data:{pos:{x:368,y:211},alpha:0},to:{pos:{x:358.15,y:213.9}}, start:474, duration:13}, shape_58)
            .to({data:{pos:{x:321.05,y:224.8}}, duration:49})
            .to({data:{pos:{x:311.2,y:227.65}}, duration:13})
            .set({data:{pos:{x:311.2,y:227.65}}}) // Empty 550-573

            .set({data:{pos:{x:308.45,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},start:574},shape_68)
            .fromTo({data:{pos:{x:308.65,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.078125},to:{pos:{x:311.1,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.921875},duration:11})
            .set({data:{pos:{x:311.1,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.921875}})
            .fromTo({data:{pos:{x:311.35,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:319.6,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:37})
            .set({data:{pos:{x:319.6,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:319.8,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.921875},to:{pos:{x:322.25,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.078125},duration:11})
            .set({data:{pos:{x:322.25,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.078125}})
            .set({data:{pos:{x:322.45,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 638-673

            .fromTo({data:{pos:{x:326.35,y:225},alpha:0},to:{pos:{x:326.35,y:223.3},scale:{x:1.01048279,y:1.01048279}}, start:674, duration:13}, shape_80)
            .to({data:{pos:{x:326.35,y:221},scale:{x:1.0249939,y:1.0249939}},duration:18})
            .set({data:{pos:{x:326.35,y:221},scale:{x:1.0249939,y:1.0249939}}})
            .fromTo({data:{pos:{x:326.4,y:220.85},scale:{x:1.02580261,y:1.02580261}},to:{pos:{x:326.4,y:215.3},scale:{x:1.06048584,y:1.06048584}},duration:43})
            .to({data:{pos:{x:326.4,y:213.75},scale:{x:1.07015991,y:1.07015991},alpha:0},duration:12})
            .set({data:{pos:{x:326.4,y:213.75},scale:{x:1.07015991,y:1.07015991},alpha:0}}) // Empty 762-926

            // Text
            // Empty 960-973

            .fromTo({data:{pos:{x:353.5,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:347.25,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:974,duration:13}, shape_106)
            .to({data:{pos:{x:329.55,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:37})
            .to({data:{pos:{x:323.3,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},duration:13})
            .set({data:{pos:{x:323.3,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 1038-1040

            // Text
            .fromTo({data:{pos:{x:343.05,y:225},alpha:0},to:{pos:{x:339.25,y:225}},start:1074,duration:13}, shape_117)
            .to({data:{pos:{x:314,y:225}},duration:87})
            .to({data:{pos:{x:310.2,y:225},alpha:0},duration:13})
            .set({data:{pos:{x:310.2,y:225},alpha:0}}) // Empty 1188-1189

            // Text
            // Empty 1223-1373
            .set({data:{pos:{x:324.95,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:1374,duration:45},shape_148) // Empty 1419-2361

            .set({data:{pos:{x:338.95,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}, start:2362}, shape_232)
            .fromTo({data:{pos:{x:338.7,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.078125},to:{pos:{x:336,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:11})
            .to({data:{pos:{x:326.85,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:38})
            .to({data:{pos:{x:324.4,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.08984375},duration:10})
            .set({data:{pos:{x:324.4,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.08984375}})
            .set({data:{pos:{x:324.15,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 2424-2523

            .set({data:{pos:{x:-4.95},scale:{x:1.09996033,y:1.09996033}}, start:2524},shape_248)
            .set({data:{pos:{x:-4.75},scale:{x:1.09996033,y:1.09996033},alpha:0.921875}},shape_256)
            .set({data:{pos:{x:-4.55},scale:{x:1.09996033,y:1.09996033},alpha:0.828125}},shape_248)
            .set({data:{pos:{x:-4.35},scale:{x:1.09996033,y:1.09996033},alpha:0.75}},shape_256)
            .set({data:{pos:{x:-4.15},scale:{x:1.09996033,y:1.09996033},alpha:0.671875}},shape_248)
            .set({data:{pos:{x:-3.95},scale:{x:1.09996033,y:1.09996033},alpha:0.578125}},shape_256)
            .set({data:{pos:{x:-3.75},scale:{x:1.09996033,y:1.09996033},alpha:0.5}},shape_248)
            .set({data:{pos:{x:-3.55},scale:{x:1.09996033,y:1.09996033},alpha:0.421875}},shape_256)
            .set({data:{pos:{x:-3.35},scale:{x:1.09996033,y:1.09996033},alpha:0.328125}},shape_248)
            .set({data:{pos:{x:-3.15},scale:{x:1.09996033,y:1.09996033},alpha:0.25}},shape_256)
            .set({data:{pos:{x:-3.35},scale:{x:1.09996033,y:1.09996033},alpha:0.328125}},shape_248)
            .set({data:{pos:{x:-3.15},scale:{x:1.09996033,y:1.09996033},alpha:0.25}},shape_256)
            .set({data:{pos:{x:-2.95},scale:{x:1.09996033,y:1.09996033},alpha:0.171875}},shape_248)
            .set({data:{pos:{x:-2.75},scale:{x:1.09996033,y:1.09996033},alpha:0.078125}},shape_256)
            .set({data:{pos:{x:-2.5},scale:{x:1.09996033,y:1.09996033},alpha:0}},shape_248) // Empty 2537-2573

            .set({data:{pos:{x:325,y:225},alpha:0}, start:2574},shape_272)
            .set({data:{pos:{x:325,y:225},alpha:0.078125}},shape_278)
            .set({data:{pos:{x:325,y:225},alpha:0.1484375}},shape_272)
            .set({data:{pos:{x:325,y:225},alpha:0.23046875}},shape_278)
            .set({data:{pos:{x:325,y:225},alpha:0.30859375}},shape_272)
            .set({data:{pos:{x:325,y:225},alpha:0.37890625}},shape_278)
            .set({data:{pos:{x:325,y:225},alpha:0.4609375}},shape_272)
            .set({data:{pos:{x:325,y:225},alpha:0.5390625}},shape_278)
            .set({data:{pos:{x:325,y:225},alpha:0.62109375}},shape_272)
            .set({data:{pos:{x:325,y:225},alpha:0.69140625}},shape_278)
            .set({data:{pos:{x:325,y:225},alpha:0.76953125}},shape_272)
            .set({data:{pos:{x:325,y:225},alpha:0.8515625}},shape_278)
            .set({data:{pos:{x:325,y:225},alpha:0.921875}},shape_272) // Empty 2587-3071

            .set({data:{pos:{x:325,y:225},scale:{x:3,y:3},alpha:0},start:3072}, shape_288)
            .set({data:{pos:{x:325,y:225},scale:{x:1.99996948,y:1.99996948},alpha:0.5}}, shape_289)
            .fromTo({data:{pos:{x:325,y:225},scale:{x:0.99998474,y:0.99998474}},to:{pos:{x:325,y:225},scale:{x:0.59994507,y:0.59994507},alpha:0}, duration:148}, record)
            .set({data:{pos:{x:325,y:225},scale:{x:0.99452209,y:0.99452209},alpha:0}});
    }

    // Layer 6
    let shape_150 = new Timeline(true);
    shape_150.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 149'));
    {
        let shape_70 = new Timeline(true);
        shape_70.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 69'));
        let shape_82 = new Timeline(true);
        shape_82.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 81'));
        let shape_86 = new Timeline(true);
        shape_86.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 85'));
        let shape_108 = new Timeline(true);
        shape_108.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 107'));
        let shape_112 = new Timeline(true);
        shape_112.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 111'));
        let shape_119 = new Timeline(true);
        shape_119.set({data: {pos: {x: -350, y: -248}}}, assets.get('image 118'));
        let shape_121 = new Timeline(true);
        shape_121.set({data: {pos: {x: -336, y: -250}}}, assets.get('image 120'));
        let shape_234 = new Timeline(true);
        shape_234.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 233'));
        let shape_250 = new Timeline(true);
        shape_250.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 249'));
        let shape_274 = new Timeline(true);
        shape_274.set({data: {pos: {x: -375, y: -225}}}, assets.get('image 273'));
        let sprite_292 = new Timeline(true);
        // sprite_292.set({data: {pos: {x: -375, y: -225}}}, assets.get('image 291'));

        let white = new Rectangle(base, 650, 450, [-1,-1,-1,-1]);
        let light = new Timeline(true);
        light.set({data:{}},shape_82).set({data:{}},shape_86);

        mainTl.fromTo({data:{pos:{x:320.2,y:223.15},scale:{x:1.09994507,y:1.09994507}},to:{pos:{x:321.6,y:224.05},scale:{x:1.37486267,y:1.37486267},alpha:0},start:200,duration:3, layer:6},shape_36)
            .to({data:{pos:{x:325.4,y:226.45},scale:{x:1.37486267,y:1.37486267},alpha:0},duration:8})
            .set({data:{pos:{x:325.4,y:226.45},scale:{x:1.37486267,y:1.37486267},alpha:0}})
            .set({data:{pos:{x:325.9,y:226.75},scale:{x:1.09994507,y:1.09994507}}})
            .fromTo({data:{pos:{x:326.4,y:227.05},scale:{x:1.1915741,y:1.1915741},alpha:0.609375},to:{pos:{x:327.35,y:227.65},scale:{x:1.37486267,y:1.37486267},alpha:0},duration:2})
            .set({data:{pos:{x:327.35,y:227.65},scale:{x:1.37486267,y:1.37486267},alpha:0}}) // Empty 216-273

            .fromTo({data:{pos:{x:346.9,y:221.65},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:344.2,y:221.6},scale:{x:1.09994507,y:1.09994507},alpha:0.5390625},start:274,duration:7},shape_46)
            .set({data:{pos:{x:344.2,y:221.6},scale:{x:1.09994507,y:1.09994507},alpha:0.5390625}})
            .fromTo({data:{pos:{x:343.8,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.62109375},to:{pos:{x:343.05,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.76953125},duration:2},shape_48)
            .set({data:{pos:{x:343.05,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.76953125}})
            .set({data:{pos:{x:342.6,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.8515625}},shape_46)
            .set({data:{pos:{x:342.2,y:221.6},scale:{x:1.09994507,y:1.09994507},alpha:0.921875}})
            .fromTo({data:{pos:{x:341.8,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:339.1,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:7})
            .set({data:{pos:{x:339.1,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:338.75,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:337.95,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:337.95,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:337.6,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:337.2,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:334.45,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:7})
            .set({data:{pos:{x:334.45,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:334.05,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:333.3,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:333.3,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:332.9,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:332.5,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:329.45,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:8})
            .set({data:{pos:{x:329.45,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:329.05,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:328.3,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:328.3,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:327.9,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:327.5,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:324.75,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:7})
            .set({data:{pos:{x:324.75,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:324.4,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:323.6,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:323.6,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:323.25,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:322.85,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:319.75,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:8})
            .set({data:{pos:{x:319.75,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:319.4,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:318.55,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:318.55,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:318.15,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:317.8,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:315.1,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:7})
            .set({data:{pos:{x:315.1,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:314.7,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:313.95,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:313.95,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:313.55,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:313.15,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:310.05,y:221.65},scale:{x:1.09999084,y:1.09999084}},duration:8})
            .set({data:{pos:{x:310.05,y:221.65},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:309.65,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:308.85,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_48)
            .set({data:{pos:{x:308.85,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .set({data:{pos:{x:308.5,y:224.95},scale:{x:1.09999084,y:1.09999084}}},shape_46)
            .fromTo({data:{pos:{x:308.1,y:221.65},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:305.4,y:221.6},scale:{x:1.09994507,y:1.09994507},alpha:0.4609375},duration:7})
            .set({data:{pos:{x:305.4,y:221.6},scale:{x:1.09994507,y:1.09994507},alpha:0.4609375}})
            .fromTo({data:{pos:{x:305,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.37890625},to:{pos:{x:304.25,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.23046875},duration:2},shape_48)
            .set({data:{pos:{x:304.25,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.23046875}})
            .set({data:{pos:{x:303.85,y:224.9},scale:{x:1.09994507,y:1.09994507},alpha:0.1484375}},shape_46)
            .set({data:{pos:{x:303.5,y:221.6},scale:{x:1.09994507,y:1.09994507},alpha:0.078125}})
            .set({data:{pos:{x:303.1,y:221.65},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 388-473

            .fromTo({data:{alpha:0},to:{alpha:0},start:474,duration:2},white)
            .to({data:{alpha:0},duration:2})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0},duration:2})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.03125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0.01953125}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0.01171875}})
            .set({data:{alpha:0}})
            .set({data:{alpha:0}}) // Empty 550-573
            .fromTo({data:{pos:{x:297.45,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:302.25,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:574,duration:13},shape_70)
            .to({data:{pos:{x:316,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:37})
            .to({data:{pos:{x:320.85,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},duration:13})
            .set({data:{pos:{x:320.85,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 638-673

            .fromTo({data:{pos:{x:326.35,y:225},alpha:0},to:{pos:{x:326.35,y:223.3},scale:{x:1.01048279,y:1.01048279}}, start:674, duration:13}, light)
            .to({data:{pos:{x:326.35,y:221},scale:{x:1.0249939,y:1.0249939}},duration:18,continueFrom:1})
            .set({data:{pos:{x:326.35,y:221},scale:{x:1.0249939,y:1.0249939},continueFrom:1}})
            .fromTo({data:{pos:{x:326.4,y:220.85},scale:{x:1.02580261,y:1.02580261}},to:{pos:{x:326.4,y:215.3},scale:{x:1.06048584,y:1.06048584}},duration:43})
            .to({data:{pos:{x:326.4,y:213.75},scale:{x:1.07015991,y:1.07015991},alpha:0},duration:12})
            .set({data:{pos:{x:326.4,y:213.75},scale:{x:1.07015991,y:1.07015991},alpha:0}}) // Empty 762-973

            .fromTo({data:{pos:{x:353.75,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:348.95,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.76953125},start:974,duration:10},shape_108)
            .set({data:{pos:{x:348.95,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.76953125}})
            .fromTo({data:{pos:{x:348.5,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.8515625},to:{pos:{x:347.55,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:2},shape_112)
            .to({data:{pos:{x:342.3,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:11})
            .set({data:{pos:{x:342.3,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:341.85,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:337.05,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:10},shape_108)
            .set({data:{pos:{x:337.05,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:336.55,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:330.4,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:13},shape_112)
            .set({data:{pos:{x:330.4,y:224.95},scale:{x:1.09999084,y:1.09999084}}})
            .fromTo({data:{pos:{x:329.9,y:224.95},scale:{x:1.09999084,y:1.09999084}},to:{pos:{x:325.2,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.23046875},duration:10},shape_108)
            .set({data:{pos:{x:325.2,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.23046875}})
            .fromTo({data:{pos:{x:324.7,y:224.9},scale:{x:1.09996033,y:1.09996033},alpha:0.1484375},to:{pos:{x:323.75,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},duration:2},shape_112)
            .set({data:{pos:{x:323.75,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 1038-1073
            
            .set({data:{pos:{x:343.05,y:225},alpha:0},start:1074},shape_119)
            .fromTo({data:{pos:{x:342.75,y:223},alpha:0.078125},to:{pos:{x:341.3,y:223},alpha:0.4609375},duration:5})
            .set({data:{pos:{x:341.3,y:223},alpha:0.4609375}})
            .fromTo({data:{pos:{x:341,y:225},alpha:0.5390625},to:{pos:{x:339.85,y:225},alpha:0.8515625},duration:4},shape_121)
            .set({data:{pos:{x:339.85,y:225},alpha:0.8515625}})
            .set({data:{pos:{x:339.55,y:225},alpha:0.921875}},shape_119)
            .fromTo({data:{pos:{x:339.25,y:223}},to:{pos:{x:337.8,y:223}},duration:5})
            .set({data:{pos:{x:337.8,y:223}}})
            .fromTo({data:{pos:{x:337.55,y:225}},to:{pos:{x:336.35,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:336.35,y:225}}})
            .set({data:{pos:{x:336.05,y:225}}},shape_119)
            .set({data:{pos:{x:335.8,y:225}}})
            .fromTo({data:{pos:{x:335.5,y:223}},to:{pos:{x:334.05,y:223}},duration:5})
            .set({data:{pos:{x:334.05,y:223}}})
            .fromTo({data:{pos:{x:333.75,y:225}},to:{pos:{x:332.6,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:332.6,y:225}}})
            .set({data:{pos:{x:332.3,y:225}}},shape_119)
            .fromTo({data:{pos:{x:332,y:223}},to:{pos:{x:330.55,y:223}},duration:5})
            .set({data:{pos:{x:330.55,y:223}}})
            .fromTo({data:{pos:{x:330.25,y:225}},to:{pos:{x:329.1,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:329.1,y:225}}})
            .set({data:{pos:{x:328.8,y:225}}},shape_119)
            .set({data:{pos:{x:328.5,y:225}}})
            .fromTo({data:{pos:{x:328.2,y:223}},to:{pos:{x:326.75,y:223}},duration:5})
            .set({data:{pos:{x:326.75,y:223}}})
            .fromTo({data:{pos:{x:326.5,y:225}},to:{pos:{x:325.3,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:325.3,y:225}}})
            .set({data:{pos:{x:325.05,y:225}}},shape_119)
            .fromTo({data:{pos:{x:324.75,y:223}},to:{pos:{x:323.3,y:223}},duration:5})
            .set({data:{pos:{x:323.3,y:223}}})
            .fromTo({data:{pos:{x:323,y:225}},to:{pos:{x:321.85,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:321.85,y:225}}})
            .set({data:{pos:{x:321.55,y:225}}},shape_119)
            .set({data:{pos:{x:321.25,y:225}}})
            .fromTo({data:{pos:{x:320.95,y:223}},to:{pos:{x:319.5,y:223}},duration:5})
            .set({data:{pos:{x:319.5,y:223}}})
            .fromTo({data:{pos:{x:319.2,y:225}},to:{pos:{x:318.05,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:318.05,y:225}}})
            .set({data:{pos:{x:317.75,y:225}}},shape_119)
            .fromTo({data:{pos:{x:317.45,y:223}},to:{pos:{x:316,y:223}},duration:5})
            .set({data:{pos:{x:316,y:223}}})
            .fromTo({data:{pos:{x:315.7,y:225}},to:{pos:{x:314.55,y:225}},duration:4},shape_121)
            .set({data:{pos:{x:314.55,y:225}}})
            .set({data:{pos:{x:314.25,y:225}}},shape_119)
            .set({data:{pos:{x:314,y:225}}})
            .fromTo({data:{pos:{x:313.7,y:223},alpha:0.921875},to:{pos:{x:312.25,y:223},alpha:0.5390625},duration:5})
            .set({data:{pos:{x:312.25,y:223},alpha:0.5390625}})
            .fromTo({data:{pos:{x:311.95,y:225},alpha:0.4609375},to:{pos:{x:310.8,y:225},alpha:0.1484375},duration:4},shape_121)
            .set({data:{pos:{x:310.8,y:225},alpha:0.1484375}})
            .set({data:{pos:{x:310.5,y:225},alpha:0.078125}},shape_119)
            .set({data:{pos:{x:310.2,y:223},alpha:0}}) // Empty 1188-1373

            .set({data:{pos:{x:324.95,y:229.25},scale:{x:1.09999084,y:1.09999084}},start:1374},shape_150)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:1.09999084,y:1.09999084}},duration:11})
            .set({data:{pos:{x:324.95,y:229.25},scale:{x:1.09999084,y:1.09999084}}},shape_152)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:1.09999084,y:1.09999084}},duration:12})
            .set({data:{pos:{x:324.95,y:229.25},scale:{x:1.09999084,y:1.09999084}}},shape_150)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:1.09999084,y:1.09999084}},duration:11})
            .set({data:{pos:{x:324.95,y:229.25},scale:{x:1.09999084,y:1.09999084}}},shape_152)
            .set({data:{pos:{x:324.95,y:227.1},scale:{x:1.09999084,y:1.09999084}},duration:7}) // Empty 1419-2361

            .fromTo({data:{pos:{x:352.95,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:348.1,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:2362,duration:12},shape_234)
            .to({data:{pos:{x:332.75,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:38})
            .to({data:{pos:{x:328.3,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},duration:11})
            .set({data:{pos:{x:328.3,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0}}) // Empty 2424-2473

            .fromTo({data:{pos:{x:288,y:225}},to:{pos:{x:302.9,y:225}},start:2474,duration:50},shape_250)
            .to({data:{pos:{x:306.5,y:225},alpha:0},duration:12})
            .set({data:{pos:{x:306.5,y:225},alpha:0}}) // Empty 2537-2573

            .fromTo({data:{pos:{x:371.95,y:225},alpha:0},to:{pos:{x:366.95,y:225}},start:2574,duration:13},shape_274)
            .to({data:{pos:{x:333.45,y:225}},duration:87})
            .to({data:{pos:{x:328.85,y:225},alpha:0},duration:12})
            .set({data:{pos:{x:328.85,y:225},alpha:0}}) // Empty 2687-3073

            .set({data:{pos:{x:325,y:225},scale:{x:0.999905512,y:0.999905512},angle:29.9990872,alpha:0},start:3074},sprite_292)
            .set({data:{pos:{x:325,y:225},scale:{x:0.995735771,y:0.995735771},angle:29.8589034,alpha:0.01171875}})
            .fromTo({data:{pos:{x:325,y:225},scale:{x:0.993008509,y:0.993008509},angle:29.858889,alpha:0.01171875},to:{pos:{x:325,y:225},scale:{x:0.601767256,y:0.601767256},angle:29.8596694,alpha:0.98828125},duration:144})
            .set({data:{pos:{x:325,y:225},scale:{x:0.601767256,y:0.601767256},angle:29.8596694,alpha:0.98828125}})
            .set({data:{pos:{x:325,y:225},scale:{x:0.59995317,y:0.59995317},angle:29.9995527},duration:3})
    }

    // Layer 7
    {
        let shape_60 = new Timeline(true);
        shape_60.set({data: {pos: {x: -375, y: -250}}}, assets.get('image 59'));
        let shape_72 = new Timeline(true);
        shape_72.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 71'));
        let shape_110 = new Timeline(true);
        shape_110.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 109'));
        let shape_260 = new Timeline(true);
        shape_260.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 259'));
        let shape_276 = new Timeline(true);
        shape_276.set({data: {pos: {x: -375, y: -225}}}, assets.get('image 275'));
        let shape_280 = new Timeline(true);
        shape_280.set({data: {pos: {x: -375, y: -225}}}, assets.get('image 279'));


        mainTl.set({data:{pos:{x:368,y:211},alpha:0},start:474,layer:7},shape_60)
            .set({data:{pos:{x:367.25,y:211.2},alpha:0.0390625}})
            .set({data:{pos:{x:366.5,y:211.45},alpha:0.12109375}})
            .set({data:{pos:{x:365.75,y:211.65},alpha:0.0703125}})
            .set({data:{pos:{x:364.95,y:211.9},alpha:0.30859375}})
            .set({data:{pos:{x:364.2,y:212.1},alpha:0.19140625}})
            .set({data:{pos:{x:363.45,y:212.35},alpha:0.37109375}})
            .set({data:{pos:{x:362.7,y:212.55},alpha:0.16015625}})
            .set({data:{pos:{x:360.4,y:213.2},alpha:0.609375}})
            .set({data:{pos:{x:359.65,y:213.45},alpha:0.25}})
            .set({data:{pos:{x:358.9,y:213.65},alpha:0.921875}})
            .set({data:{pos:{x:358.15,y:213.9},alpha:0.5}})
            .set({data:{pos:{x:357.4,y:214.1},alpha:0.80078125}})
            .set({data:{pos:{x:356.65,y:214.35},alpha:0.30078125}})
            .set({data:{pos:{x:355.9,y:214.55}}})
            .set({data:{pos:{x:355.1,y:214.8},alpha:0.5}})
            .set({data:{pos:{x:354.35,y:215},alpha:0.80078125}})
            .set({data:{pos:{x:353.6,y:215.2},alpha:0.30078125}})
            .set({data:{pos:{x:352.85,y:215.45}}})
            .set({data:{pos:{x:352.1,y:215.65},alpha:0.5}})
            .set({data:{pos:{x:351.35,y:215.9},alpha:0.80078125}})
            .set({data:{pos:{x:350.6,y:216.1},alpha:0.30078125}})
            .set({data:{pos:{x:349.8,y:216.35}}})
            .set({data:{pos:{x:349.05,y:216.55},alpha:0.5}})
            .set({data:{pos:{x:348.3,y:216.8},alpha:0.80078125}})
            .set({data:{pos:{x:347.55,y:217},alpha:0.30078125}})
            .set({data:{pos:{x:346.8,y:217.2}}})
            .set({data:{pos:{x:346.05,y:217.45},alpha:0.5}})
            .set({data:{pos:{x:345.25,y:217.65},alpha:0.80078125}})
            .set({data:{pos:{x:344.5,y:217.9},alpha:0.30078125}})
            .set({data:{pos:{x:343.75,y:218.1}}})
            .set({data:{pos:{x:343,y:218.35},alpha:0.5}})
            .set({data:{pos:{x:342.25,y:218.55},alpha:0.80078125}})
            .set({data:{pos:{x:341.5,y:218.8},alpha:0.30078125}})
            .set({data:{pos:{x:340.75,y:219}}})
            .set({data:{pos:{x:339.95,y:219.2},alpha:0.5}})
            .set({data:{pos:{x:339.2,y:219.45},alpha:0.80078125}})
            .set({data:{pos:{x:338.45,y:219.65},alpha:0.30078125}})
            .set({data:{pos:{x:337.7,y:219.9}}})
            .set({data:{pos:{x:336.95,y:220.1},alpha:0.5}})
            .set({data:{pos:{x:336.2,y:220.35},alpha:0.80078125}})
            .set({data:{pos:{x:335.4,y:220.55},alpha:0.30078125}})
            .set({data:{pos:{x:334.65,y:220.8}}})
            .set({data:{pos:{x:333.9,y:221},alpha:0.5}})
            .set({data:{pos:{x:333.15,y:221.2},alpha:0.80078125}})
            .set({data:{pos:{x:332.4,y:221.45},alpha:0.30078125}})
            .set({data:{pos:{x:331.65,y:221.65}}})
            .set({data:{pos:{x:330.9,y:221.9},alpha:0.5}})
            .set({data:{pos:{x:330.1,y:222.1},alpha:0.80078125}})
            .set({data:{pos:{x:329.35,y:222.35},alpha:0.30078125}})
            .set({data:{pos:{x:328.6,y:222.55}}})
            .set({data:{pos:{x:327.85,y:222.8},alpha:0.5}})
            .set({data:{pos:{x:327.1,y:223},alpha:0.80078125}})
            .set({data:{pos:{x:326.35,y:223.2},alpha:0.30078125}})
            .set({data:{pos:{x:325.6,y:223.45}}})
            .set({data:{pos:{x:324.8,y:223.65},alpha:0.5}})
            .set({data:{pos:{x:324.05,y:223.9},alpha:0.80078125}})
            .set({data:{pos:{x:323.3,y:224.1},alpha:0.30078125}})
            .set({data:{pos:{x:322.55,y:224.35}}})
            .set({data:{pos:{x:321.8,y:224.55},alpha:0.5}})
            .set({data:{pos:{x:321.05,y:224.8},alpha:0.80078125}})
            .set({data:{pos:{x:320.25,y:225},alpha:0.26953125}})
            .set({data:{pos:{x:319.5,y:225.2},alpha:0.8515625}})
            .set({data:{pos:{x:318.75,y:225.45},alpha:0.37890625}})
            .set({data:{pos:{x:318,y:225.65},alpha:0.55078125}})
            .set({data:{pos:{x:317.25,y:225.9},alpha:0.1796875}})
            .set({data:{pos:{x:316.5,y:226.1},alpha:0.5390625}})
            .set({data:{pos:{x:315.75,y:226.35},alpha:0.23046875}})
            .set({data:{pos:{x:314.95,y:226.55},alpha:0.30078125}})
            .set({data:{pos:{x:314.2,y:226.8},alpha:0.08984375}})
            .set({data:{pos:{x:313.45,y:227},alpha:0.23046875}})
            .set({data:{pos:{x:312.7,y:227.2},alpha:0.0703125}})
            .set({data:{pos:{x:311.2,y:227.65},alpha:0}}) // Empty 550-573

            // Chyba zły kąt
            .set({data:{pos:{x:341.35,y:293.45},scale:{x:1.09989688,y:1.09989688},angle:199.999337,alpha:0},start:574},shape_72)
            .fromTo({data:{pos:{x:340.8,y:291.85},scale:{x:1.09872204,y:1.09872204},angle:199.580173,alpha:0.078125},to:{pos:{x:339.35,y:287.9},scale:{x:1.09876608,y:1.09876608},angle:198.302348,alpha:0.4609375},duration:5})
            .set({data:{pos:{x:339.35,y:287.9},scale:{x:1.09876608,y:1.09876608},angle:198.302348,alpha:0.4609375}})
            .fromTo({data:{pos:{x:338.9,y:287.2},scale:{x:1.09878344,y:1.09878344},angle:198.047464,alpha:0.5390625},to:{pos:{x:337.5,y:283.15},scale:{x:1.09885569,y:1.09885569},angle:196.769659,alpha:0.921875},duration:5})
            .set({data:{pos:{x:337.5,y:283.15},scale:{x:1.09885569,y:1.09885569},angle:196.769659,alpha:0.921875}})
            .fromTo({data:{pos:{x:336.75,y:281.8},scale:{x:1.09888989,y:1.09888989},angle:196.325921},to:{pos:{x:333.2,y:271.25},scale:{x:1.0990858,y:1.0990858},angle:193.072542},duration:12})
            .to({data:{pos:{x:331.65,y:265.25},scale:{x:1.0991913,y:1.0991913},angle:191.284351},duration:7})
            .set({data:{pos:{x:331.65,y:265.25},scale:{x:1.0991913,y:1.0991913},angle:191.284351}})
            .fromTo({data:{pos:{x:331.55,y:264.35},scale:{x:1.09917739,y:1.09917739},angle:191.029935},to:{pos:{x:330.95,y:261.75},scale:{x:1.09923434,y:1.09923434},angle:190.262164},duration:3})
            .set({data:{pos:{x:330.95,y:261.75},scale:{x:1.09923434,y:1.09923434},angle:190.262164}})
            .fromTo({data:{pos:{x:330.3,y:260.25},scale:{x:1.09926657,y:1.09926657},angle:189.820054},to:{pos:{x:330.05,y:258.45},scale:{x:1.09930174,y:1.09930174},angle:189.30922},duration:2})
            .to({data:{pos:{x:329.4,y:254.9},scale:{x:1.09935581,y:1.09935581},angle:188.287554},duration:4})
            .to({data:{pos:{x:328.5,y:249.5},scale:{x:1.09946266,y:1.09946266},angle:186.756338},duration:6})
            .set({data:{pos:{x:328.5,y:249.5},scale:{x:1.09946266,y:1.09946266},angle:186.756338}})
            .fromTo({data:{pos:{x:327.95,y:248},scale:{x:1.09947087,y:1.09947087},angle:186.312883},to:{pos:{x:327.45,y:243.3},scale:{x:1.09950593,y:1.09950593},angle:185.036557,alpha:0.62109375},duration:5})
            .to({data:{pos:{x:326.85,y:237.75},scale:{x:1.09962183,y:1.09962183},angle:183.505216,alpha:0.1484375},duration:6})
            .set({data:{pos:{x:326.85,y:237.75},scale:{x:1.09962183,y:1.09962183},angle:183.505216,alpha:0.1484375}})
            .set({data:{pos:{x:326.4,y:236.1},scale:{x:1.09963858,y:1.09963858},angle:183.062388,alpha:0.078125}})
            .set({data:{pos:{x:326.35,y:235.2},scale:{x:1.09970857,y:1.09970857},angle:182.80746,alpha:0}}) // Empty 638-674

            .set({data:{pos:{x:323.95,y:225},alpha:0},start:674},shape_84)
            .fromTo({data:{pos:{x:326.35,y:224.85},scale:{x:1.00080872,y:1.00080872},alpha:0.078125},to:{pos:{x:326.35,y:223.7},scale:{x:1.00805664,y:1.00805664},alpha:0.76953125},duration:9})
            .set({data:{pos:{x:326.35,y:223.7},scale:{x:1.00805664,y:1.00805664},alpha:0.76953125}})
            .set({data:{pos:{x:328.75,y:223.6},scale:{x:1.00886536,y:1.00886536},alpha:0.8515625}})
            .set({data:{pos:{x:327.95,y:223.45},scale:{x:1.00967407,y:1.00967407},alpha:0.921875}},shape_88)
            .fromTo({data:{pos:{x:326.35,y:223.3},scale:{x:1.01048279,y:1.01048279}},to:{pos:{x:326.35,y:222.05},scale:{x:1.01853943,y:1.01853943}},duration:10})
            .set({data:{pos:{x:326.35,y:222.05},scale:{x:1.01853943,y:1.01853943}}})
            .set({data:{pos:{x:323.9,y:221.9},scale:{x:1.01934814,y:1.01934814}}})
            .set({data:{pos:{x:323.9,y:221.75},scale:{x:1.02015686,y:1.02015686}}},shape_84)
            .fromTo({data:{pos:{x:326.35,y:221.65},scale:{x:1.02096558,y:1.02096558}},to:{pos:{x:326.35,y:221},scale:{x:1.0249939,y:1.0249939}},duration:5})
            .set({data:{pos:{x:326.35,y:221},scale:{x:1.0249939,y:1.0249939}}})
            .fromTo({data:{pos:{x:326.4,y:220.85},scale:{x:1.02580261,y:1.02580261}},to:{pos:{x:326.4,y:220.5},scale:{x:1.02822876,y:1.02822876}},duration:3})
            .set({data:{pos:{x:326.4,y:220.5},scale:{x:1.02822876,y:1.02822876}}})
            .set({data:{pos:{x:328.85,y:220.35},scale:{x:1.02903748,y:1.02903748}}})
            .set({data:{pos:{x:328,y:220.25},scale:{x:1.02983093,y:1.02983093}}},shape_88)
            .fromTo({data:{pos:{x:326.4,y:220.1},scale:{x:1.03063965,y:1.03063965}},to:{pos:{x:326.4,y:218.8},scale:{x:1.03871155,y:1.03871155}},duration:10})
            .set({data:{pos:{x:326.4,y:218.8},scale:{x:1.03871155,y:1.03871155}}})
            .set({data:{pos:{x:323.9,y:218.7},scale:{x:1.039505,y:1.039505}}})
            .set({data:{pos:{x:323.9,y:218.55},scale:{x:1.04031372,y:1.04031372}}},shape_84)
            .fromTo({data:{pos:{x:326.4,y:218.4},scale:{x:1.04112244,y:1.04112244}},to:{pos:{x:326.4,y:217.25},scale:{x:1.04838562,y:1.04838562}},duration:9})
            .set({data:{pos:{x:326.4,y:217.25},scale:{x:1.04838562,y:1.04838562}}})
            .set({data:{pos:{x:328.9,y:217.15},scale:{x:1.04919434,y:1.04919434}}})
            .set({data:{pos:{x:328.05,y:217},scale:{x:1.05000305,y:1.05000305}}},shape_88)
            .fromTo({data:{pos:{x:326.4,y:216.85},scale:{x:1.05079651,y:1.05079651}},to:{pos:{x:326.4,y:215.6},scale:{x:1.05886841,y:1.05886841}},duration:10})
            .set({data:{pos:{x:326.4,y:215.6},scale:{x:1.05886841,y:1.05886841}}})
            .set({data:{pos:{x:323.85,y:215.45},scale:{x:1.05967712,y:1.05967712}}})
            .set({data:{pos:{x:323.85,y:215.3},scale:{x:1.06048584,y:1.06048584}}},shape_84)
            .fromTo({data:{pos:{x:326.4,y:215.2},scale:{x:1.0612793,y:1.0612793},alpha:0.921875},to:{pos:{x:326.4,y:214.05},scale:{x:1.06854248,y:1.06854248},alpha:0.171875},duration:9})
            .set({data:{pos:{x:326.4,y:214.05},scale:{x:1.06854248,y:1.06854248},alpha:0.171875}})
            .set({data:{pos:{x:328.95,y:213.9},scale:{x:1.0693512,y:1.0693512},alpha:0.078125}})
            .set({data:{pos:{x:328.1,y:213.75},scale:{x:1.07015991,y:1.07015991},alpha:0}},shape_88) // Empty 762-973

            .fromTo({data:{pos:{x:355.95,y:224.95},scale:{x:1.09999084,y:1.09999084},alpha:0},to:{pos:{x:349.75,y:224.95},scale:{x:1.09999084,y:1.09999084}},start:974,duration:13},shape_110)
            .to({data:{pos:{x:332.1,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:37})
            .to({data:{pos:{x:325.95,y:224.95},scale:{x:1.09999084,y:1.09999084}},duration:13})
            .set({data:{pos:{x:325.95,y:224.95},scale:{x:1.09999084,y:1.09999084}}}) // Empty 1038-2492

            .fromTo({data:{pos:{x:293.65,y:225},alpha:0},to:{pos:{x:295.45,y:225}},start:2493,duration:6},shape_260)
            .to({data:{pos:{x:295.45,y:225}},duration:6})
            .to({data:{pos:{x:297.25,y:225}},duration:6})
            .to({data:{pos:{x:298.75,y:225},alpha:0},duration:5})
            .set({data:{pos:{x:298.75,y:225},alpha:0}}) // Empty 2511-2529

            .set({data:{pos:{x:304.7,y:225},alpha:0}})
            .set({data:{pos:{x:305,y:225},alpha:0.0703125}})
            .set({data:{pos:{x:305.3,y:225},alpha:0.109375}})
            .set({data:{pos:{x:305.6,y:225},alpha:0.12890625}})
            .fromTo({data:{pos:{x:305.9,y:225},alpha:0.109375},to:{pos:{x:306.5,y:225},alpha:0},start:2493,duration:2})
            .set({data:{pos:{x:306.5,y:225},alpha:0}}) // Empty 2537-2573
            
            .set({data:{pos:{x:371.95,y:227},alpha:0},start:2574}, shape_276)
            .fromTo({data:{pos:{x:371.55,y:225},alpha:0.078125},to:{pos:{x:369.65,y:225},alpha:0.4609375},duration:5})
            .set({data:{pos:{x:369.65,y:225},alpha:0.4609375}})
            .fromTo({data:{pos:{x:369.25,y:225},alpha:0.5390625},to:{pos:{x:367.7,y:225},alpha:0.8515625},duration:4},shape_280)
            .set({data:{pos:{x:367.7,y:225},alpha:0.8515625}})
            .set({data:{pos:{x:367.35,y:227},alpha:0.921875}},shape_276)
            .fromTo({data:{pos:{x:366.95,y:225}},to:{pos:{x:364.65,y:225}},duration:6})
            .set({data:{pos:{x:364.65,y:225}}})
            .fromTo({data:{pos:{x:364.25,y:225}},to:{pos:{x:362.7,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:362.7,y:225}}})
            .set({data:{pos:{x:362.35,y:227}}},shape_276)
            .fromTo({data:{pos:{x:361.95,y:225}},to:{pos:{x:360,y:225}},duration:5})
            .set({data:{pos:{x:360,y:225}}})
            .fromTo({data:{pos:{x:359.65,y:225}},to:{pos:{x:358.1,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:358.1,y:225}}})
            .set({data:{pos:{x:357.7,y:227}}},shape_276)
            .fromTo({data:{pos:{x:357.35,y:225}},to:{pos:{x:355,y:225}},duration:6})
            .set({data:{pos:{x:355,y:225}}})
            .fromTo({data:{pos:{x:354.65,y:225}},to:{pos:{x:353.1,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:353.1,y:225}}})
            .set({data:{pos:{x:352.7,y:227}}},shape_276)
            .fromTo({data:{pos:{x:352.35,y:225}},to:{pos:{x:350.4,y:225}},duration:5})
            .set({data:{pos:{x:350.4,y:225}}})
            .fromTo({data:{pos:{x:350,y:225}},to:{pos:{x:348.5,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:348.5,y:225}}})
            .set({data:{pos:{x:348.1,y:227}}},shape_276)
            .fromTo({data:{pos:{x:347.7,y:225}},to:{pos:{x:345.4,y:225}},duration:6})
            .set({data:{pos:{x:345.4,y:225}}})
            .fromTo({data:{pos:{x:345,y:225}},to:{pos:{x:343.5,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:343.5,y:225}}})
            .set({data:{pos:{x:343.1,y:227}}},shape_276)
            .fromTo({data:{pos:{x:342.7,y:225}},to:{pos:{x:340.8,y:225}},duration:5})
            .set({data:{pos:{x:340.8,y:225}}})
            .fromTo({data:{pos:{x:340.4,y:225}},to:{pos:{x:338.85,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:338.85,y:225}}})
            .set({data:{pos:{x:338.5,y:227}}},shape_276)
            .fromTo({data:{pos:{x:338.1,y:225}},to:{pos:{x:335.8,y:225}},duration:6})
            .set({data:{pos:{x:335.8,y:225}}})
            .fromTo({data:{pos:{x:335.4,y:225}},to:{pos:{x:333.85,y:225}},duration:4},shape_280)
            .set({data:{pos:{x:333.85,y:225}}})
            .set({data:{pos:{x:333.45,y:227}}},shape_276)
            .fromTo({data:{pos:{x:333.1,y:225},alpha:0.921875},to:{pos:{x:331.15,y:225},alpha:0.5},duration:5})
            .set({data:{pos:{x:331.15,y:225},alpha:0.5}})
            .fromTo({data:{pos:{x:330.8,y:225},alpha:0.421875},to:{pos:{x:329.25,y:225},alpha:0.078125},duration:4},shape_280)
            .set({data:{pos:{x:329.25,y:225},alpha:0.078125}})
            .set({data:{pos:{x:328.85,y:227},alpha:0}},shape_276)
    }

    // Layer 8
    {
        let shape_258 = new Timeline(true);
        shape_258.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 57'));    

        mainTl.fromTo({data:{pos:{x:289.8,y:225},alpha:0},to:{pos:{x:291.9,y:225}},start:2480,duration:7,layer:8},shape_258)
            .to({data:{pos:{x:293.65,y:225}},duration:6})
            .to({data:{pos:{x:295.45,y:225},alpha:0},duration:6})
            .set({data:{pos:{x:295.45,y:225},alpha:0}}) // Empty 2500-2516

            .fromTo({data:{pos:{x:300.85,y:225},alpha:0},to:{pos:{x:302.9,y:225}},start:2517,duration:7})
            .to({data:{pos:{x:304.7,y:225},alpha:0.5},duration:6})
            .set({data:{pos:{x:304.7,y:225},alpha:0.5}})
            .set({data:{pos:{x:305,y:225},alpha:0.3515625}})
            .set({data:{pos:{x:305.3,y:225},alpha:0.21875}})
            .set({data:{pos:{x:305.6,y:225},alpha:0.12890625}})
            .fromTo({data:{pos:{x:305.9,y:225},alpha:0.05078125},to:{pos:{x:306.5,y:225},alpha:0},duration:2})
            .set({data:{pos:{x:306.5,y:225},alpha:0}})
    }

    // Layer 9
    {
        let shape_252 = new Timeline(true);
        shape_252.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 251'));    

        mainTl.fromTo({data:{pos:{x:288,y:225}},to:{pos:{x:289.8,y:225}},start:2474,duration:6,layer:9}, shape_252)
            .to({data:{pos:{x:291.9,y:225},alpha:0},duration:7})
            .set({data:{pos:{x:291.9,y:225},alpha:0}}) // Empty 2488-2504
        
            .fromTo({data:{pos:{x:297.25,y:225},alpha:0},to:{pos:{x:298.75,y:225}},start:2505,duration:5})
            .to({data:{pos:{x:300.85,y:225}},duration:7})
            .to({data:{pos:{x:302.9,y:225},alpha:0},duration:7})
            .set({data:{pos:{x:302.9,y:225},alpha:0}})
    }

    // Layer 10
    {
        let shape_254 = new Timeline(true);
        shape_254.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 253'));
    
        mainTl.fromTo({data:{pos:{x:288,y:225}},to:{pos:{x:302.9,y:225}},start:2474,duration:50,layer:10},shape_254)
            .to({data:{pos:{x:306.5,y:225},alpha:0},duration:12})
            .set({data:{pos:{x:306.5,y:225},alpha:0}})
    }

    audio = new dummy();

    mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 12, start: 60}, audio);
    // mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 12, start: 0}, new dd());
    // mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 12, start: 3074}, new dd());
    // mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 0, start: 74}, audio);

    audio.audio = document.getElementById('audio');
    audio.audio.playbackRate = 0.993;

    // base.play();
}

function play(){
    base.play();
}