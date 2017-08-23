var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

var container = new PIXI.Container();
app.stage.addChild(container);

var graphics = new PIXI.Graphics();

graphics.lineStyle(0);
graphics.beginFill(0xFFF0B, 1);
graphics.drawCircle(0, 0, 50);
graphics.endFill();

container.addChild(graphics);

container.x = (app.renderer.width - container.width) / 2;
container.y = (app.renderer.height - container.height) / 2;
