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
    {
        let c1 = new Rectangle(base, 650, 450, [185, 92, 0, -1]);
        let c2 = new Rectangle(base, 650, 450, [108, 132, 0, -1]);

        mainTl.set({data:{}, start: 1473, duration: 101, layer: 0}, c1)
            .set({data:{}, duration: 100}, c2)
            .set({data:{}, duration: 100}, c1)
            .set({data:{}, duration: 100}, c2) // Empty 1874-2173
            .set({data:{}, start: 2174, duration: 50}, c2)
            .set({data:{}, duration: 50}, c1)
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
        let shape_148 = new Timeline(true);
        shape_148.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 147'));
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
        let shape_190 = new Timeline(true);
        shape_190.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 189'));
        let shape_192 = new Timeline(true);
        shape_192.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 191'));
        let shape_194 = new Timeline(true);
        shape_194.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 193'));
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
        let shape_248 = new Timeline(true);
        shape_248.set({data: {}}, assets.get('image 247'));
        let shape_256 = new Timeline(true);
        shape_256.set({data: {}}, assets.get('image 255'));
        let shape_262 = new Timeline(true);
        shape_262.set({data: {}}, assets.get('image 261'));
        let shape_268 = new Timeline(true);
        shape_268.set({data: {}}, assets.get('image 267'));
        let shape_282 = new Timeline(true);
        shape_282.set({data: {pos: {x: -400, y: -225}}}, assets.get('image 281'));
        let shape_84 = new Timeline(true);
        shape_84.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 83'));
        let shape_88 = new Timeline(true);
        shape_88.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 87'));
        let shape_46 = new Timeline(true);
        shape_46.set({data: {pos: {x: -325, y: -223}}}, assets.get('image 45'));
        let shape_48 = new Timeline(true);
        shape_48.set({data: {pos: {x: -325, y: -226}}}, assets.get('image 47'));
        
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
    {
        let shape_32 = new Timeline(true);
        shape_32.set({data: {pos: {x: -328, y: -223}}}, assets.get('image 31'));
        let shape_34 = new Timeline(true);
        shape_34.set({data: {pos: {x: -326, y: -224}}}, assets.get('image 33'));
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
        let shape_152 = new Timeline(true);
        shape_152.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 151'));
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
        let shape_272 = new Timeline(true);
        shape_272.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 271'));
        let shape_278 = new Timeline(true);
        shape_278.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 277'));
        let shape_284 = new Timeline(true);
        shape_284.set({data: {pos: {x: -400, y: -225}}}, assets.get('image 283'));
        let shape_94 = new Timeline(true);
        shape_94.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 93'));

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
            .set({data:{pos:{x:325,y:225},scale:{x:1.04916382,y:1.04916382}}}) // Empty 813-822
            .fromTo({data:{pos:{x:325,y:225},scale:{x:1.04109192,y:1.04109192},alpha:0}, to:{pos:{x:325,y:225},scale:{x:1.03947449,y:1.03947449}}, start:823, duration:2})
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
    
    audio = new dummy();

    mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 12, start: 60}, audio);
    mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 12, start: 0}, new dd());
    mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 12, start: 3074}, new dd());
    // mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 0, start: 74}, audio);
    
    audio.audio = document.getElementById('audio');
    audio.audio.playbackRate = 0.993;
    
    // base.play();
}

function play(){
    base.play();
}