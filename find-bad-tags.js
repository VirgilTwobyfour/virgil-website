const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Look for lines like: tags: { tags: [ or tags: {tags:
  const regex = /tags\s*:\s*\{\s*tags\s*:/m;
  if (regex.test(content)) {
    console.log(`Possible bad tags structure in: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.yml') || file.endsWith('.yaml')) {
      checkFile(fullPath);
    }
  });
}

walkDir('.');
