
const { getRandomImage } = require('./data/helpers')

const assignmentError = [
  '**This PR is not assigned to you and/or someone else**\n\n',
  `![img](${getRandomImage('noAssignee')}, 'Oops')\n`
]

function checkAssignments ({ assignees }) {
  if (!assignees.length) {
    return assignmentError.join('')
  }
}

module.exports = { checkAssignments }
