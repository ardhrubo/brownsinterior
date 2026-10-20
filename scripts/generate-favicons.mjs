import fs from 'node:fs';

const canvasSize = 512;
const targetSpan = 430;
const scale = targetSpan / 83.141;

function tx(x) {
  return ((x - 284.9962) * scale + (canvasSize / 2)).toFixed(2);
}
function ty(y) {
  return (-(y - 363.929) * scale + (canvasSize / 2)).toFixed(2);
}

// Outer diamond
const cx = 322.1382, cy = 363.7555;
const pOuter = [
  'M ' + tx(cx) + ' ' + ty(cy),
  'L ' + tx(cx - 36.969) + ' ' + ty(cy - 36.969),
  'L ' + tx(cx - 74.284) + ' ' + ty(cy + 0.347),
  'L ' + tx(cx - 37.315) + ' ' + ty(cy + 37.315),
  'Z',
  'M ' + tx(cx - 37.315) + ' ' + ty(cy + 41.744),
  'L ' + tx(cx - 78.712) + ' ' + ty(cy + 0.347),
  'L ' + tx(cx - 36.969) + ' ' + ty(cy - 41.397),
  'L ' + tx(cx + 4.428) + ' ' + ty(cy),
  'Z'
].join(' ');

// Top-right bronze bar
const c1x = 310.1816, c1y = 357.92;
const pBar1 = [
  'M ' + tx(c1x) + ' ' + ty(c1y),
  'L ' + tx(c1x + 6.325) + ' ' + ty(c1y + 6.516),
  'L ' + tx(c1x - 16.053) + ' ' + ty(c1y + 28.185),
  'L ' + tx(c1x - 22.303) + ' ' + ty(c1y + 21.787),
  'Z'
].join(' ');

// Top-left dark block
const c2x = 275.4917, c2y = 386.1183;
const pBlockDark = [
  'M ' + tx(c2x) + ' ' + ty(c2y),
  'L ' + tx(c2x - 10.537) + ' ' + ty(c2y - 11.07),
  'L ' + tx(c2x - 4.046) + ' ' + ty(c2y - 17.41),
  'L ' + tx(c2x + 6.632) + ' ' + ty(c2y - 6.479),
  'Z'
].join(' ');

// Top diamond dot
const c3x = 291.1924, c3y = 388.9229;
const pDot = [
  'M ' + tx(c3x) + ' ' + ty(c3y),
  'L ' + tx(c3x - 6.704) + ' ' + ty(c3y + 6.516),
  'L ' + tx(c3x - 12.892) + ' ' + ty(c3y + 0.141),
  'L ' + tx(c3x - 6.225) + ' ' + ty(c3y - 6.372),
  'Z'
].join(' ');

// Main G/i bronze shape
const c4x = 274.3564, c4y = 365.8648;
const pG = [
  'M ' + tx(c4x) + ' ' + ty(c4y),
  'L ' + tx(c4x + 0.848) + ' ' + ty(c4y - 0.829),
  'L ' + tx(c4x + 6.723) + ' ' + ty(c4y - 6.568),
  'L ' + tx(c4x + 10.503) + ' ' + ty(c4y - 2.665),
  'L ' + tx(c4x + 17.258) + ' ' + ty(c4y - 9.207),
  'L ' + tx(c4x + 10.717) + ' ' + ty(c4y - 15.961),
  'L ' + tx(c4x + 4.389) + ' ' + ty(c4y - 9.833),
  'L ' + tx(c4x + 3.962) + ' ' + ty(c4y - 9.42),
  'L ' + tx(c4x - 3.125) + ' ' + ty(c4y - 2.558),
  'L ' + tx(c4x - 4.998) + ' ' + ty(c4y - 0.745),
  'L ' + tx(c4x - 6.455) + ' ' + ty(c4y + 0.666),
  'L ' + tx(c4x - 12.34) + ' ' + ty(c4y + 6.366),
  'L ' + tx(c4x - 20.871) + ' ' + ty(c4y - 2.444),
  'L ' + tx(c4x - 14.984) + ' ' + ty(c4y - 8.143),
  'L ' + tx(c4x - 13.528) + ' ' + ty(c4y - 9.553),
  'L ' + tx(c4x - 12.279) + ' ' + ty(c4y - 10.762),
  'L ' + tx(c4x + 11.147) + ' ' + ty(c4y - 33.447),
  'L ' + tx(c4x + 33.002) + ' ' + ty(c4y - 10.876),
  'L ' + tx(c4x + 10.678) + ' ' + ty(c4y + 10.931),
  'Z'
].join(' ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Brown's Interior Official Brand Emblem -->
  <!-- Outer Diamond Border (Charcoal) -->
  <path fill="#1a1a1a" fill-rule="evenodd" d="${pOuter}" />
  <!-- Top Right Bar (Warm Bronze) -->
  <path fill="#673e0f" d="${pBar1}" />
  <!-- Top Left Block (Charcoal) -->
  <path fill="#1a1a1a" d="${pBlockDark}" />
  <!-- Top Diamond Dot (Warm Bronze) -->
  <path fill="#673e0f" d="${pDot}" />
  <!-- Lower Monogram (Warm Bronze) -->
  <path fill="#673e0f" d="${pG}" />
</svg>
`;

fs.writeFileSync('public/favicon.svg', svg);
console.log('Successfully generated public/favicon.svg (512x512 vector)');
