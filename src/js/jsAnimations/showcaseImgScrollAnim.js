import { chain, delay, tween} from 'popmotion';
import { easeInOut } from "@popmotion/easing";

// const animCase = styler(scrollImages[0]);

const anim = ({duration, delayMs = 40, h = -1000}) => chain(
    tween({
        duration,
        from: {
            top: 0
        },
        to: {
            top: h
        },
        ease: easeInOut
    }),
    delay(delayMs),
    tween({
        duration,
        from: {
            top: h,
        },
        to: {
            top: 0
        },
        ease: easeInOut
    })
)

export default anim;

// .start({
//     update: v => animCase.set(v),
//     complete: () => {
//     }
// });
