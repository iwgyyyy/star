interface StarProps {
  ctx: CanvasRenderingContext2D
  boundary: [number, number]
  dark: boolean
}

/**
 * 生成一个随机亮色
 */
function generateBrightColor() {
  const red = Math.floor(Math.random() * 128) + 127;
  const green = Math.floor(Math.random() * 128) + 127;
  const blue = Math.floor(Math.random() * 128) + 127;
  return `rgb(${red},${green},${blue})`;
}

/**
 * 生成一个随机的大小系数
 */
function generateScale() {
  return Math.floor(Math.random() * 5) + 5;
}

/**
 * 生成一个随机的速度系数
 */
function generateSpeed(): number {
  return parseInt((Math.random() * 3).toFixed(2), 10) + 1;
}

/**
 * 生成一个随机位置
 */
function generateSign(width: number, height: number): [number, number] {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  return [x, y];
}

class Star {
  opacity: number;

  ctx: CanvasRenderingContext2D;

  sign: [number, number];

  scale: number;

  color: string;

  type: "increase" | "reduce";

  speed: number;

  boundary: [number, number];

  dark: boolean;

  constructor(props: StarProps) {
    const { ctx, boundary, dark } = props;
    const [width, height] = boundary;
    this.opacity = 0;
    this.boundary = [...boundary];
    this.scale = dark ? 1 : generateScale();
    this.color = dark ? "#fff" : generateBrightColor();
    this.sign = generateSign(width, height);
    this.speed = generateSpeed();
    this.ctx = ctx;
    this.dark = dark;
    this.type = "increase";
  }

  reset(): void {
    if (!this.dark) {
      this.scale = generateScale();
      this.color = generateBrightColor();
    }
    this.speed = generateSpeed();
    this.sign = generateSign(this.boundary[0], this.boundary[1]);
  }

  draw(): void {
    const {
      sign,
      ctx,
      opacity,
      color,
      scale,
      speed,
      type,
    } = this;

    const [x, y] = sign;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 4 * scale, y + scale * 1);
    ctx.lineTo(x + 5 * scale, y + scale * 5);
    ctx.lineTo(x + 6 * scale, y + scale * 1);
    ctx.lineTo(x + 10 * scale, y);
    ctx.lineTo(x + 6 * scale, y - scale * 1);
    ctx.lineTo(x + 5 * scale, y - scale * 5);
    ctx.lineTo(x + 4 * scale, y - scale * 1);

    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;

    ctx.fill();
    ctx.restore();

    if (type === "increase") {
      this.opacity += 0.02 * speed;
      if (this.opacity >= 1) {
        this.opacity = 1;
        this.type = "reduce";
      }
    }
    else {
      this.opacity -= 0.02 * speed;
      if (this.opacity <= 0) {
        this.type = "increase";
        this.opacity = 0;
        this.reset();
      }
    }
  }
}

export { Star };
