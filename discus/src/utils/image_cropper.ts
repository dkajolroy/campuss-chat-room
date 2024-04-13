const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
interface ImageCrop {
  width: number;
  height: number;
  x: number;
  y: number;
}
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: ImageCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  return croppedCanvas.toDataURL("base64");

  // // As a blob
  // return new Promise((resolve, _) => {
  //   console.log();
  //   croppedCanvas.toBlob((file) => {
  //     resolve(URL.createObjectURL(file as Blob));
  //   }, "image/jpeg");
  // });
}

export function base64ImageToBlob(str: string) {
  // extract content type and base64 payload from original string
  var pos = str.indexOf(";base64,");
  var type = str.substring(5, pos);
  var b64 = str.substr(pos + 8);

  // decode base64
  var imageContent = atob(b64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;
}
