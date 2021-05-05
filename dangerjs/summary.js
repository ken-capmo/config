const { getRandomImage } = require('./data/helpers')

const summaryError = [
  '**The summary in your PR has not been filled out**\n\n',
  `![img](${getRandomImage('noSummary')}, 'Oops')\n`
]

const filledOutSummaryRegex = /.*(\*\*Summary\*\*\r\nTODO).*/g

function checkSummary({ body = '' }) {
  if(!body.length) return summaryError.join('')

  if (body.match(filledOutSummaryRegex) !== null) {
    return summaryError.join('')
  }
}

module.exports = { checkSummary }
