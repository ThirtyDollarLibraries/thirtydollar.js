const fs = require('fs')

fetch('https://thirtydollar.website/sounds.json').then(res => {
    fs.writeFileSync('sounds.json', res.json())
})

fs.writeFile('data/soundIDs.json', 
    "// auto-generated file\n" + 
    JSON.stringify(
        JSON.parse(
            fs.readFileSync('data/sounds.json', 'utf8')
            ).map(e => e.id)
            ), () => {})