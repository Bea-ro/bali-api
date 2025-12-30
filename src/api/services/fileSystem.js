const path = require('path')
const fs = require('fs')

function getFilesRecursive(dir, baseDir) {
  let results = []

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursive(fullPath, baseDir))
    } else {
      results.push({
        name: entry.name,
        relativePath: path.relative(baseDir, fullPath).replace(/\\/g, '/'), // para URLs
        absolutePath: fullPath
      })
    }
  }

  return results
}

module.exports = {
  getFilesRecursive
}
