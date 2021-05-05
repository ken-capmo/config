const { getRandomImage, getLabelIssues } = require('./data/helpers')

const labelError = platform => ([
  '**This PR has no label(s)**\n\n',
  'Please add one (or more) labels to give this PR a better visual context:\n',
  `${getLabelIssues(platform)}\n\n`,
  `![img](${getRandomImage('noLabels')}, 'Oops')\n`
])

function checkLabels ({ platform, prLabels }) {
  if (!prLabels.length) {
    return labelError(platform).join('')
  }
}

module.exports = { checkLabels }
