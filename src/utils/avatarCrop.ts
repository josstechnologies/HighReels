/** Map move-and-scale transform to a square crop in source-image pixels. */
export function squareCropFromTransform(input: {
  imageWidth: number;
  imageHeight: number;
  displayWidth: number;
  displayHeight: number;
  imageLeft: number;
  imageTop: number;
  circleLeft: number;
  circleTop: number;
  circleSize: number;
}) {
  const {
    imageWidth,
    imageHeight,
    displayWidth,
    displayHeight,
    imageLeft,
    imageTop,
    circleLeft,
    circleTop,
    circleSize,
  } = input;

  const originX = Math.max(0, ((circleLeft - imageLeft) / displayWidth) * imageWidth);
  const originY = Math.max(0, ((circleTop - imageTop) / displayHeight) * imageHeight);
  const mapped = (circleSize / displayWidth) * imageWidth;
  const maxW = imageWidth - originX;
  const maxH = imageHeight - originY;
  const cropSize = Math.min(mapped, maxW, maxH);
  if (cropSize <= 0) {
    return {originX: 0, originY: 0, width: 1, height: 1};
  }

  const size = Math.max(1, Math.round(cropSize));
  const x = Math.min(Math.round(originX), Math.max(0, imageWidth - size));
  const y = Math.min(Math.round(originY), Math.max(0, imageHeight - size));
  const width = Math.min(size, imageWidth - x);
  const height = Math.min(size, imageHeight - y);

  return {
    originX: x,
    originY: y,
    width,
    height,
  };
}
