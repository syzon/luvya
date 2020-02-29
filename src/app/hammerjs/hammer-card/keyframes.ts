import { keyframes, style } from '@angular/animations';

export const swing = [
    style({ transform: 'rotate3d(0, 0, 1, 15deg', offset: .2 }),
    style({ transform: 'rotate3d(0, 0, 1, -10deg', offset: .4 }),
    style({ transform: 'rotate3d(0, 0, 1, 5deg', offset: .6 }),
    style({ transform: 'rotate3d(0, 0, 1, -5deg', offset: .8 }),
    style({ transform: 'none', offset: 1 }),
]

export const wobble = [
    style({ transform: 'translate3d(-25%, 0, 0) rotate3d(1, 0, 0, -5deg)', offset: .15 }),
    style({ transform: 'translate3d(20%, 0, 0) rotate3d(1, 0, 0, 3deg)', offset: .30 }),
    style({ transform: 'translate3d(-15%, 0, 0) rotate3d(1, 0, 0, -3deg)', offset: .45 }),
    style({ transform: 'translate3d(10%, 0, 0) rotate3d(1, 0, 0, 2deg)', offset: .6 }),
    style({ transform: 'translate3d(-5%, 0, 0) rotate3d(1, 0, 0, -1deg)', offset: .75 }),
    style({ transform: 'none', offset: 1 }),
]