import {readFile, access} from 'node:fs/promises';
import {resolve, sep} from 'node:path';
const root = resolve('dist');
const check = async file => {
  if (!resolve(root, file).startsWith(root + sep)) throw new Error('Invalid asset path: ' + file);
  await access(resolve(root, file));
};
for (const file of ['index.html','produto.html','style.css','photographic.css','sliding-rack.css','rack.js','app.js','products.json','assets/logo.webp','assets/font.css']) await check(file);
const products = JSON.parse(await readFile(resolve(root, 'products.json'), 'utf8'));
for (const product of products) {
  for (const file of new Set([product.image, product.mockup, ...(product.gallery || [])])) if (file) await check(file);
}
console.log(`Static site ready: ${products.length} products, all catalog assets present. Output: dist/`);
