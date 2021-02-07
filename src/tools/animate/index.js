import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com);

export default function createAnimate({
  startX, startY, endX, endY, width, height, src,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        src,
        width,
        height,
      };
    },
  });
  document.body.appendChild(app.$el);
  // width有px
  let calWidth;
  let calHeight;
  if (typeof width === 'string') {
    calWidth = +width.slice(0, width.length - 2);
    calHeight = +height.slice(0, height.length - 2);
  } else {
    calHeight = height;
    calWidth = width;
  }
  // 当购物车在上方时
  if (startY > endY) {
    calHeight *= -1;
    calWidth *= -1;
  }
  setTimeout(() => {
    app.moveX = endX + calWidth / 2;
    app.moveY = endY + calHeight / 2;
    app.sx = 0.01;
    app.sy = 0.01;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 700);
}
