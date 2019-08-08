import { _Spritesheet, _Sprite } from "./Spritesheet";
import { Item, _Item } from './Item'

export class AssetLoader {
    downloadQueue: Array<Item>;
    downloaded: Array<Item>;
    errors: Array<any>;
    toDownload: number;
    maxRetries: number;

    constructor(maxRetries: number = 3) {
        this.maxRetries = maxRetries;
        this.downloadQueue = [];
        this.downloaded = [];
        this.errors = [];
    }

    download(mode: number = 0) {
        return new Promise((resolve, reject) => {
            let downloadQueue = mode === 0 ? this.downloadQueue : this.errors;
            this.toDownload = downloadQueue.length;

            if (downloadQueue.length === 0) {
                resolve(this.downloaded);
            }

            for (let element of downloadQueue) {
                let request = new XMLHttpRequest();

                if (element.type === 'image') {
                    request.responseType = 'blob';
                }

                request.onload = async () => {
                    if (request.status !== 200) {
                        this.errors.push(element);
                        if (this.isDone()) {
                            resolve(this.downloaded);
                        }
                    }

                    switch (element.type) {
                        case 'image':
                            await new Promise((resolve) => {
                                element.result.src = URL.createObjectURL(new Blob([request.response], { type: `image/${element.fileFormat}` }));
                                element.result.onload = () => {
                                    URL.revokeObjectURL(element.result.src)
                                    resolve();
                                };
                            })
                            break;
                        case 'audio':
                            await new Promise((resolve) => {
                                element.result.src = URL.createObjectURL(new Blob([request.response], { type: `audio/${element.fileFormat}` }));
                                element.result.onload = () => {
                                    URL.revokeObjectURL(element.result.src)
                                    resolve();
                                };
                            })
                            break;
                        case 'json':
                        case 'spritesheet':
                            element.result = JSON.parse(request.responseText);
                            break;
                        case 'js':
                            element.result = request.responseText;
                            break;
                        case 'anime':
                            let t = new DOMParser();
                            element.result = t.parseFromString(request.responseText, 'text/xml');
                    }

                    this.downloaded.push(element);
                    downloadQueue.splice(downloadQueue.indexOf(element), 1);

                    if (this.isDone()) {
                        resolve(this.downloaded);
                    }
                }

                request.onerror = () => {
                    reject(new Error(`Error while downloading file: ${request.statusText}`));
                }

                request.open('GET', element.src, true);
                request.send();
            }
        });
    }

    async retryErrors() {
        if (this.errors.length) {
            for (let i = 0; i < this.maxRetries; ++i) {
                await this.download(1);

                if (this.isDone()) {
                    return this.downloaded;
                }
            }
            throw new Error('Exceeded max number of retries.');
        }
    }

    pushFile(id: string, src: string, fileFormat?: string, type?: string, transparent?: boolean) {
        this.downloadQueue.push(new Item(id, src, fileFormat, type, transparent));
    }

    pushManifest(manifest: Array<_Item>) {
        for (let i of manifest) {
            this.pushFile(i.id, i.src, i.fileFormat, i.type, i.transparent);
        }
    }

    isDone() {
        return (this.downloaded.length + this.errors.length === this.toDownload);
    }

    clear() {
        this.downloadQueue.slice(0, this.downloadQueue.length);
        this.downloaded.slice(0, this.downloaded.length);
        this.errors.slice(0, this.errors.length);
    }
}