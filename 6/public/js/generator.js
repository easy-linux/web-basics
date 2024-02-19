const devider = 2.1;

function drawFractal(x, y, width, height, ctx) {
  if (width < 1 || height < 1) return;
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "blue";

  // Рисуем контур прямоугольника
  ctx.strokeRect(x, y, width, height);

  if (width < 5 || height < 5) return;

  const newWidth = width / devider;
  const newHeight = height / devider;

  //left-top x y
  drawFractal(x - newWidth / 2, y - newHeight / 2, newWidth, newHeight, ctx);
  //right-top
  drawFractal(x + width - newWidth / 2, y - newHeight / 2, newWidth, newHeight, ctx);
  //right-bottom
  drawFractal(x + width - newWidth / 2, y + height - newHeight / 2, newWidth, newHeight, ctx);
  //left-bottpm
  drawFractal(x - newWidth / 2, y + height - newHeight / 2, newWidth, newHeight, ctx);
}

export const getFile = (fileName) => {
   return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = '1px solid #ccc';

    // document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    drawFractal(canvas.width/2 - 100, canvas.height/2 - 100, 200, 200, ctx);

    canvas.toBlob((blob)=>{
        const file = new File([blob], fileName);
        resolve(file);
    }, 'image/png', 1)
   })
}
