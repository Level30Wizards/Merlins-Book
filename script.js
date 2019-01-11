import {TweenMax} from 'gsap'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import './plugins/DrawSVGPlugin'

ScrollToPlugin

const shadow = document.querySelector('#shadow')
const hair = document.querySelector('#hair')
const torso = document.querySelector('#torso')
const hands = document.querySelector('#hands')
const face = document.querySelector('#face')
const beard = document.querySelector('#beard')
const hat = document.querySelector('#hat')
const staff = document.querySelector('#staff')
const leftHand = document.querySelector('#left')
const content = document.querySelectorAll('.card-holder')
const title = document.querySelector('h1')
const merlinSvg = document.querySelectorAll('#Merlin path, #Merlin circle, #Merlin polygon')

const wizardComponents = []
wizardComponents.push( torso, hands, face, hair, beard, staff)

wizardComponents.forEach( comp => {
    comp.setAttribute('data-animate', '')
})

const setTl = new TimelineMax({paused: true})
setTl
    .set('#Merlin', {
        autoAlpha: 0,
        width: window.innerWidth,
        height: window.innerHeight
    }, 0)
    .set(title, {
        transformOrigin: '50% bottom',
        y: '-200%',
        autoAlpha: 0,
        ease:Power2.easeOut,
    })
    .set(content, {
        autoAlpha: 0,
        y: '200%',
        transformOrigin: '50% bottom'
    }, 0)
    .set('#merlin-holder', {
        scale: 0.5,
        transformOrigin: 'bottom'
    }, 0)
    .set('#tap #tap-circle', {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
        stroke: '#111',
        fill: '#111'
    }, 0)
    .set(hat, {
        y: -500,
        autoAlpha:0,
    }, 0)
    .play()
    .eventCallback( 'onComplete', () => {
        TweenMax.to('.loader', .2, {
            autoAlpha: 0,
            onComplete: () => {
                animateWizard()
            }
        })
    })

function animateWizard() {
    const animatable = document.querySelectorAll('[data-animate]')
    const whirlWindPaths = document.querySelectorAll('#whirlwind path')

    TweenMax.globalTimeScale(.75)

    const summonTl = new TimelineMax({paused: true});
    const merlinFlyIn = new TimelineMax({delay: 1.5, paused: true})
    const merlinFlyOut = new TimelineMax({paused: true})
    const whirlWind = new TimelineMax({paused: true});

    merlinFlyIn.set('#Merlin', {
        autoAlpha: 1,
    }, 0)
    merlinFlyIn.to(title, 1,{
        y: '0%',
        autoAlpha: 1,
    }, 0)
    merlinFlyIn.from(animatable, 1, {
        transformOrigin: '50% top',
        y: -(window.innerHeight + 300),
        scale: 0.2,
        ease: Quad.easeOut,
    }, 1);
    merlinFlyIn.fromTo(shadow, 1, {
        transformOrigin: '50% 50%',
        scale: 0,
        opacity: 0,
    },{
        transformOrigin: '50% 50%',
        opacity: 0.3,
        scale: 0.8,
    }, .1)

    summonTl.to([staff, leftHand], 1, {
        y: '-50rem'
    }, .1)
    summonTl.to('#tap #tap-circle', 1, {
        autoAlpha: .5,
        transformOrigin: '50% 50%',
        scale: 1.5
    }, .1)
    summonTl.to([staff, leftHand], .2, {
        y: 0,
        ease: Quad.easeIn
    })
    summonTl.to('#tap #tap-circle', .2, {
        delay: -.1,
        autoAlpha: 0,
        scale: 0
    })
    summonTl.to(title, .2, {
        autoAlpha: 0,
        display: 'none'
    })
    summonTl.to(content, .6, {
        y: '0%',
        autoAlpha: 1,
        ease: Cubic.easeOut
    })
    summonTl.to([staff, leftHand], 0.2, {
        y: '-40rem',
        transformOrigin: '50% 50%',
        rotation: '-3deg',
        rotateX: '10deg',
        ease: Quad.easeInOut
    })
    summonTl.to([staff, leftHand], 0.2, {
        rotation: '3deg',
        rotateX: '0deg',
        ease: Quad.easeInOut
    })
    summonTl.to([staff, leftHand], 0.2, {
        rotation: '-3deg',
        rotateX: '10deg',
        ease: Quad.easeInOut
    })
    summonTl.to([staff, leftHand], 0.2, {
        rotation: '3deg',
        rotateX: '0deg',
        ease: Quad.easeInOut
    })
    summonTl.to([staff, leftHand], 0.2, {
        rotation: '0deg',
        ease: Quad.easeInOut
    })

    const wwDur = .05
    whirlWindPaths.forEach( wwPath => {
        whirlWind.fromTo(wwPath, wwDur, {
            ease: Power1.easeInOut,
            drawSVG: '0% 0%',
        }, {
            drawSVG: '100% 0%',
        })
    })

    whirlWind.to(whirlWindPaths, .3, {
        ease: Power1.easeInOut,
        autoAlpha: 0,
    })

    merlinFlyOut.to(animatable, .75, {
        transformOrigin: '50% top',
        y: -(window.innerHeight + 300),
        scale: 0.2,
        ease: Quad.easeIn,
    }, 0);
    merlinFlyOut.to(hat, .75, {
        transformOrigin: '50% top',
        y: -(window.innerHeight + 400),
        scale: 0.2,
        ease: Quad.easeIn,
    }, 0);
    merlinFlyOut.to(shadow, .75, {
        transformOrigin: '50% 50%',
        scale: 0,
        opacity: 0,
        ease: Quad.easeIn,
    }, 0)


// Start animation
    merlinFlyIn
        .play()
        .eventCallback( 'onComplete', () => {
            TweenMax.to(hat, 0.2, {
                autoAlpha:1,
            })
            TweenMax.to(hat, 0.75, {
                y: 15,
                ease: Power4.easeOut,
                transformOrigin: 'right bottom',
                force3D:true,
            })
            summonTl.play().eventCallback( 'onComplete', () => {
                whirlWind.play()
                TweenMax.delayedCall((wwDur * whirlWindPaths.length), () => {
                    whirlWind.reverse().timeScale(3.5)
                    merlinFlyOut
                        .play()
                        .eventCallback( 'onComplete', () => {
                            document.querySelector('#wizard').style.zIndex = "-1"
                            addHoverPerspectiveAnimation()
                        })
                });
            })
        })
}

let mouseOutTween;// set on mouse-out

function addHoverPerspectiveAnimation() {
    const cards = document.querySelectorAll('.card')
    TweenMax.set(cards, { transformStyle: "preserve-3d", transformPerspective: 800 });

    cards.forEach( card => {
        card.addEventListener('click', function (e) {
            let rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top,
                hit = { x: x, y: y, radius: 1, alpha: 1 };

            TweenMax.to(hit, 0.5, { radius: 200, alpha: 0, ease: Power1.easeOut });

        });

        card.addEventListener('mousemove', function (e) {
            let rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top,
                rx = -(y / rect.height) + 0.5,
                ry = (x / rect.width) - 0.5,
                rMax = 30;

            TweenMax.to(card, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
        });

        card.addEventListener('mouseout', function (e) {
            if (mouseOutTween) mouseOutTween.kill();
            mouseOutTween = TweenMax.to(card, 0.25, { delay: 0.25, rotationX: 0, rotationY: 0 });
        });
    } )
}

let scrollValue = 0
let contentWidth = document.querySelector('.card-container').getBoundingClientRect().width - window.innerWidth

function replaceVerticalScrollByHorizontal(event) {
    if (event.deltaY !== 0) {
        // manually scroll horizonally instead
        if((scrollValue <= 0 && event.deltaY < 0) || (scrollValue >= contentWidth && event.deltaY > 0)){
            return
        }
        else {
            scrollValue += event.deltaY
            TweenMax.to(content[0], 0.15, {
                scrollTo: {
                    x: scrollValue,
                    y: 0,
                },
                ease: Quad.easeInOut
            })
        }

        // prevent vertical scroll
        event.preventDefault();
    }
    return;
}

window.addEventListener('wheel', replaceVerticalScrollByHorizontal);
window.addEventListener('resize', () => {
    contentWidth = document.querySelector('.card-container').getBoundingClientRect().width - window.innerWidth;
})