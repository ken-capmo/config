const {
  committedFilesGrep,
  fileAddedLineNumbers,
  fileRemovedLineNumbers
} = require('danger-plugin-toolbox')
const { getRandomImage } = require('./data/helpers')

const sizeError = [
  '**Big PR**\n\n',
  'Pull Request size seems relatively large. If the Pull Request contains multiple changes, splitting each of them into a separate PR will foster faster, easier reviews.\n\n',
  `![img](${getRandomImage('bigPR')}, 'Oops')\n`
]

const testFilesRegex = /^(?!.*\.(spec|test)\.(ts)$).*\.ts$/gm

async function checkPRSize ({ sizeLimit }) {
  const modifiedFilesWithoutTests = committedFilesGrep(testFilesRegex)

  let numberOfChangedLines = 0
  await Promise.all(
    modifiedFilesWithoutTests.map(async filePath => {
      const addedLinesArray = await fileAddedLineNumbers(filePath)
      const removedLinesArray = await fileRemovedLineNumbers(filePath)

      numberOfChangedLines += addedLinesArray.length + removedLinesArray.length
    })
  )

  if (numberOfChangedLines > sizeLimit) {
    return sizeError.join('')
  }
}

module.exports = {
  checkPRSize
}
