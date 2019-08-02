import { Matrix } from './Matrix'
import { TimeframeLayer } from './TimeframeLayer';
import { timeElement } from './Element'
import { _Data } from './Data'
import { Timeframe } from './Timeframe';

export class Timeline {
    loop: boolean;
    layers: Array<TimeframeLayer>;
    duration: number;

    constructor(loop: boolean = false) {
        this.loop = loop;
        this.layers = [];
        this.duration = 0;
    }

    addLayer() {
        this.layers.push(new TimeframeLayer);
    }

    addLayers(count: number) {
        for (let i = 0; i < count; ++i) {
            this.addLayer();
        }
    }

    addToLayer(obj: timeElement, from: _Data, to: _Data, start: number, duration: number, layer: number, continueFrom: number = 0) {
        if (layer > this.layers.length - 1) {
            throw "Layer out of range";
        }

        this.duration += this.layers[layer].addElement(obj, from, to, start, duration, continueFrom);
        return this;
    }

    draw(matrix: Matrix, frame: number) {
        let timeFrame: Timeframe | null, _frame;
        this.layers.forEach((layer) => {
            if (this.loop) {
                frame %= this.duration;
            }
            timeFrame = layer.findByFrame(frame);
            if (!timeFrame) {
                return;
            }
            _frame = frame - timeFrame.start;
            // if (this.loop){
            //     _frame %= this.duration;
            // }
            // console.log(this, _frame);
            timeFrame.elements.forEach((element) => {
                element.draw(matrix, _frame, timeFrame.duration);
            });
        });
    }
}