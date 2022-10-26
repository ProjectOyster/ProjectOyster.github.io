(() => {

    var step = (a, x) => x >= a ? 1 : 0,
    lerp = (a, b, t) => (1 - t) * a + t * b,
    clamp = (a, b, x) => Math.max(a, Math.min(b, x)),
    map = (a, b, c, d, x) => (x - a) / (b - a) * (d - c) + c,
    norm = (a, b, x) => clamp(a, b, x) / (b - a),
    // this function is used to remap the Julia value to a height on the polyline
    remapHeight = x => lerp(x, Math.log2(x) * 10, norm(0, 1, x));
  
    class Julia {
      constructor(a, b, max) {
        this.a = a;
        this.b = b;
        this.max = max;
      }
      getValueAt(x, y) {
        let n = 0,d = x * x + y * y,a = x,b = y,c;
        while (d < 4 && n < this.max) {
          c = a;
          a = c * c - b * b + this.a;
          b = 2 * c * b + this.b;
          d = a * a + b * b;
          n++;
        }
        return n - Math.log2(Math.log2(d));
      }}
  
  
    class Point {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }}
  
  
    class Polyline {
      constructor(points) {this.points = points || [];}
      transform(bounds, display) {
        return this.points.map(point => {
          return new Point(
          map(bounds.left, bounds.right, display.left, display.right, point.x),
          map(bounds.top, bounds.bottom, display.top, display.bottom, point.y),
          point.z);
  
        });
      }
      add(point) {this.points.push(point);}}
  
  
    class Renderer {
      constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        // assume this is the view we want to keep centered and visible
        this.bounds = {
          left: -2,
          right: 2,
          top: 2,
          bottom: -2 };
  
      }
      clear() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      draw(polyline) {
        let points = polyline.transform(this.bounds, { left: 0, right: this.canvas.width, top: 0, bottom: this.canvas.height });
        this.context.save();
        this.context.lineWidth = 3;
        this.context.strokeStyle = '#032539';
        this.context.beginPath();
        points.forEach((point, idx) => {
          if (idx == 0) this.context.moveTo(point.x, point.y - remapHeight(point.z));else
          this.context.lineTo(point.x, point.y - remapHeight(point.z));
        });
        this.context.stroke();
        this.context.restore();
      }}
  
  
    let container = document.createElement('canvas');
    container.style.cssText = 'position:absolute;align:center;padding: 10px 20px;top:170px;width:100%;height:70%;opacity: 30%;';
    document.body.appendChild(container);
  
    let renderer = new Renderer(container),
    julia = new Julia(0, -1, 200);
  
    let tick = () => {
  
      renderer.clear();
  
      for (let y = -2; y <= 2; y += 0.1) {
        let p = new Polyline();
        for (let x = -2; x <= 2; x += 0.02) {
          p.add(new Point(x, y, julia.getValueAt(x, y)));
        }
        renderer.draw(p);
      }
  
      requestAnimationFrame(tick);
    };
  
    // set up the mouse tracker
    container.addEventListener('mousemove', ev => {
      julia.a = map(0, renderer.canvas.offsetWidth, renderer.bounds.left, renderer.bounds.right, ev.pageX),
      julia.b = map(0, renderer.canvas.offsetHeight, renderer.bounds.top, renderer.bounds.bottom, ev.pageY);
    });
  
    // fire off the animation
    tick();
  
})();

//Hover image link
/*
const linkText = document.querySelector('.link-text');
const linkImage = document.querySelector('.link-image');

function showImgContent(e) {
  x = e.clientX;
  y = e.clientY;
  linkImage.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  linkText.style.setProperty('--x',(x)+'px');
  linkText.style.setProperty('--y',(y)+'px');
}

document.addEventListener('mousemove', showImgContent);
*/


