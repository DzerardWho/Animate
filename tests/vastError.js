// import {  } from '../dist/Base'

let base, mainTl;
let spriteheets;
let img;
let assets;
let audio;

function init() {
    // base = new Base(false, 650, 450, 'canvas', 25, false);
    base = new Base(false, 650, 450, 'canvas', 25, false, [0, 0, 0, -1]);
    mainTl = new Timeline(false, 12);
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

let ds = 1.09999084;
// let ds2 = 1;
let ds2 = 1.09996033;
function createAnimation() {
    // Layer 2
    {
        let shape_30 = new Timeline(true);
        shape_30.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 29'));
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
        let shape_160 = new Timeline(true);
        shape_160.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 159'));
        let shape_162 = new Timeline(true);
        shape_162.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 161'));
        let shape_164 = new Timeline(true);
        shape_164.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 163'));
        let shape_166 = new Timeline(true);
        shape_166.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 165'));
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
        let shape_92 = new Timeline(true);
        shape_92.set({data: {pos: {x: -325, y: -225}}}, assets.get('image 91'));
        let shape_46 = new Timeline(true);
        shape_46.set({data: {pos: {x: -325, y: -223}}}, assets.get('image 45'));
        let shape_48 = new Timeline(true);
        shape_48.set({data: {pos: {x: -325, y: -226}}}, assets.get('image 47'));
        
        let noise = new Timeline(true);
        noise.set({data:{}}, assets.get('image 277')).set({data:{}}, assets.get('image 271'))
        let dance_1 = new Timeline(true);
        dance_1.set({data:{pos:{x:147.6,y:225}}}, shape_84)
            .set({data:{pos:{x:150,y:225}}, duration:10})
            .set({data:{pos:{x:152.4,y:225}}})
            .set({data:{pos:{x:151.6,y:225}}}, shape_88)
            .set({data:{pos:{x:150,y:225}}, duration:11})
            .set({data:{pos:{x:147.6,y:225}}})

        mainTl.set({data: {scale: {x: 650/1300, y: 450/900}}, duration: 99, layer: 1}, assets.get('image 2')) // Empty 99-161
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
            .fromTo({data:{pos:{x:325,y:225}, scale:{x:ds,y:ds}}, to:{pos:{x:325,y:225}, scale:{x:1.00401306,y:1.00401306}}, start:624, duration:62}, shape_90)
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
            .set({data:{}, start:0, duration: 137}, dance_1)
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

    
    audio = new dummy();

    mainTl.set({data:{pos:{x: 0, y: 0}}, layer: 0, start: 74}, audio);
    
    audio.audio = document.getElementById('audio');
    
    base.play();
}