const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 400;
const HEIGHT = 300;
const outputDir = path.join(__dirname, 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const filenames = [
  "textured_wooden_background.png",
  "old_rustic_potting_shed.png",
  "mossy_brick_wall.png",
  "garden_tools_arrangement.png",
  "compost_pile_texture.png",
  "handmade_pottery_pots.png",
  "worn_gardening_gloves.png",
  "weathered_garden_fence.png",
  "dry_leaves_pattern.png",
  "rain_dappled_wood.png"
];

async function createImage(text, filename) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background color (light brown, rustic)
  ctx.fillStyle = '#8B6D5C';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Text style
  ctx.font = '20px Georgia';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw the text in the middle
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Created ${filename}`);
}

(async () => {
  for (let i = 0; i < filenames.length; i++) {
    const name = filenames[i].replace(/_/g, ' ').replace('.png', '').toUpperCase();
    await createImage(name, filenames[i]);
  }
  console.log('All images created!');
})();
