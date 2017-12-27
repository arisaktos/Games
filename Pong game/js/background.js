

particlesJS("bg", {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 350
      }
    },
    "color": {
      "value": "#000"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 1,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 12
      }
    },
    "opacity": {
      "value": 0.1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.3,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 20,
        "duration": 2,
        "opacity": 8,
        "speed": 2
      },
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 22
      },
      "remove": {
        "particles_nb": 22
      }
    }
  },
  "retina_detect": true
});
var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);



/**
  * JS purely used for implementing replay feature
*/
const PROPS = {
  CONTAINER: 'cascading-text',
  LETTER   : 'cascading-text__letter',
  ANIMATED : 'data-animated',
  REPLAY   : 'cascading-text__replay',
}
const texts = document.querySelectorAll(`.${PROPS.CONTAINER}`)
const replays = document.querySelectorAll(`.${PROPS.REPLAY}`)

for (const replay of replays) {
  replay.addEventListener('click', () => {
    const text = replay.parentElement
    const letters = text.querySelectorAll(`.${PROPS.LETTER}`)
    const listeners = []
    for (const letter of letters) {
      const listener = new Promise((resolve, reject) => {
        letter.addEventListener('animationend', () => resolve())
      })
      listeners.push(listener)
    }
    Promise.all(listeners)
      .then(() => {
        text.removeAttribute(PROPS.ANIMATED)    
      })
    text.setAttribute(PROPS.ANIMATED, true)
  })
}

const textListeners = []

for (const text of texts) {
  const letters = text.querySelectorAll(`.${PROPS.LETTER}`)

  const listeners = []

  for (const letter of letters) {
    const listener = new Promise((resolve, reject) => {
      letter.addEventListener('animationend', () => {
        resolve()
      })
    })
    listeners.push(listener)
  }  
  
  const textListener = Promise.all(listeners)
    .then(() => {
      Promise.resolve()
    })
 
  textListeners.push(textListener)
}

Promise.all(textListeners)
  .then(() => {
    for (const text of texts) {
      text.removeAttribute(PROPS.ANIMATED)
    }
  })


