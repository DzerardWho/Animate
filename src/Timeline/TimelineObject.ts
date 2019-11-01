import { vec2 } from '../types'

export class TimelineObject {
    width: number;
    height: number;
    padding: vec2;
    loop: boolean;
    duration: number;
    name: string;

    draw(...a) {}

    update(...a) {}
}