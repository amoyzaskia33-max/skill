const fs = require('fs');
const path = 'c:/Users/ReedoC/OneDrive/바탕 화면/MyApp/DMS Homepage/app/about/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Make the box bigger and text smaller
content = content.replace(
  /-inset-2 bg-neon-sky\/20 rounded-lg transform -skew-x-6/g,
  '-inset-4 bg-neon-sky/20 rounded-xl transform -skew-x-3'
);
content = content.replace(
  /text-2xl md:text-3xl font-bold text-white">"우리가/g,
  'text-xl md:text-2xl font-bold text-white leading-relaxed">"우리가'
);

fs.writeFileSync(path, content);
console.log('Fixed box styling');
