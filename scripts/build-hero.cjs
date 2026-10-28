const fs = require('fs')
const path = require('path')

const root = process.cwd()
const partsDir = path.join(root, 'hero-parts')
const outputDir = path.join(root, 'public', 'assets')
const output = path.join(outputDir, 'la-escoba-hero.webp')

fs.mkdirSync(outputDir, { recursive: true })
const parts = fs.readdirSync(partsDir).filter((name) => name.endsWith('.b64')).sort()
const base64 = parts.map((name) => fs.readFileSync(path.join(partsDir, name), 'utf8').trim()).join('')
fs.writeFileSync(output, Buffer.from(base64, 'base64'))
console.log(`Hero generado: ${output} (${fs.statSync(output).size} bytes)`)
