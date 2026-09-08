import {squareCropFromTransform} from './avatarCrop';

// Cover-fit 200x100 into 100 circle, centered, no pan/zoom.
const crop = squareCropFromTransform({
  imageWidth: 200,
  imageHeight: 100,
  displayWidth: 200,
  displayHeight: 100,
  imageLeft: 0,
  imageTop: 0,
  circleLeft: 50,
  circleTop: 0,
  circleSize: 100,
});

if (crop.originX !== 50 || crop.originY !== 0 || crop.width !== 100 || crop.height !== 100) {
  throw new Error(`avatarCrop check failed: ${JSON.stringify(crop)}`);
}

console.log('avatarCrop.check: ok');
