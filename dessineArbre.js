const fs = require('fs')

let contenu ="", ligne = "";
for (let i = 1; i <= 7; i += 1) {
    ligne += "#";
    contenu += ligne + "\n";
}

fs.writeFile('arbre.txt', contenu, err => {
  if (err) {
    console.error(err)
    return
  }
})