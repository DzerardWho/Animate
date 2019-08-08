import { Sprite } from "../Renderable/Sprite";
import { Spritesheet, _Spritesheet, _Sprite } from "./Spritesheet";
import { Rectangle } from "../Renderable/Rectangle";
import { Timeline } from "../Timeline/Timeline";
import { Base } from "../Base";
import { AssetLoader } from "./AssetLoader";
import { Item, fileExt } from "./Item";

interface Asset {
    [propname: string]: Sprite | Spritesheet | Rectangle | Timeline;
    [propname: number]: Sprite | Spritesheet | Rectangle | Timeline;
}

export class AssetMenager {
    spritesheets: object;
    assets: Asset;
    base: Base;

    constructor(base: Base) {
        this.base = base;
        this.assets = {};
        this.spritesheets = {};
    }

    loadAssets(assetLoader: AssetLoader) {
        let assets = assetLoader.downloaded.splice(0, assetLoader.downloaded.length);

        let img: Item, data;
        for (let spritesheet of assets.filter((v) => { return v.type === 'spritesheet' })) {
            assets.splice(assets.indexOf(spritesheet), 1);
            for (let sheet in spritesheet.result) {
                img = assets.find((value) => {
                    return value.id === sheet;
                });
                if (!img) {
                    throw new Error('Missing spritesheet');
                }

                assets.splice(assets.indexOf(img), 1);
                data = spritesheet.result[sheet];

                sheet.replace(fileExt, '');
                sheet = 'sp_' + sheet;
                this.spritesheets[sheet] = new Spritesheet(this.base, data, img.result);
            }
        }

        for (let asset of assets) {
            switch (asset.type) {
                case 'image':
                    this.loadAssets[asset.id] = new Sprite(this.base, asset.result, asset.transparent);
                    break;
                default:
                    // TODO: reszta zasobów
                    break;
            }
        }
    }

    createSprite(id: string | number) {
        let sp, k: _Sprite;
        for (let i in this.spritesheets) {
            if (k = this.spritesheets[i].get(id)) {
                sp = i;
                break;
            }
        }

        if (!sp) {
            throw new Error(`There is no image named "${id}" in spritesheets.`);
        }

        return (this.assets[id] = new Sprite(this.base, this.spritesheets[sp], k.transparent, id));
    }

    createAllSprites() {
        let s;
        for (let i in this.spritesheets) {
            s = this.spritesheets[i];
            for (let id in this.spritesheets[i].sprites) {
                this.assets[id] = new Sprite(this.base, s, s.sprites[id].transparent, id);
            }
        }
    }

    get(id: string | number) {
        return this.assets[id];
    }
}