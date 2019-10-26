const recognizedTypes = [
    'image',
    'audio',
    'spritesheet',
    'json',
    'js',
    'anime'
]

export let fileExt = new RegExp('.*?\\.(png|webp|jpg|jpeg|sp\\.json|json|js|anime|wav|mp3|webm)$', 'miu');

export interface _Item {
    src: string;
    id: string;
    fileFormat?: string;
    type?: string;
    result?: any;
}

export class Item implements _Item {
    src: string;
    id: string;
    result: any;
    type: string;
    fileFormat: string;

    constructor(id: string, src: string, fileFormat?: string, type?: string, transparent?: boolean) {
        this.id = id;
        this.src = src;

        if (!fileFormat) {
            let format: any = src.match(fileExt);
            if (!format) {
                throw new Error('Unsupported file type');
            }
            this.fileFormat = format[1];
        } else {
            if (!recognizedTypes.includes(fileFormat)) {
                throw new Error('Unsupported file type');
            }
            this.fileFormat = fileFormat;
        }

        if (recognizedTypes.includes(type)) {
            this.type = type;
            switch (type) {
                case 'audio':
                    this.result = new Audio();
                    break;
                case 'image':
                    this.result = document.createElement('img');
                    break;
                default:
                    break;
            }
        } else {
            switch (this.fileFormat) {
                case 'png':
                case 'webp':
                case 'jpg':
                case 'jpeg':
                    this.type = 'image';
                    this.result = new Image();
                    break;
                case 'sp.json':
                    this.type = 'spritesheet';
                    break;
                case 'json':
                case 'anime':
                case 'js':
                    this.type = this.fileFormat.toLowerCase();
                    break;
                case 'wav':
                case 'mp3':
                case 'webm':
                    this.type = 'audio';
                    this.result = new Audio();
                    break;
            }
        }
    }
}
