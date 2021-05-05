const { fail, danger } = require('danger')

const { checkPRSize } = require('./size')
const { checkTitlePrefix } = require('./title')
const { checkTaskURL } = require('./taskUrl')
const { checkSummary } = require('./summary')
const { checkAssignments } = require('./assignment')
const { checkLabels } = require('./labels')
const { checkForVersionUpdate } = require('./version')

/**
 * @param {object} options
 * @param {string} options.platform The platform being used (webapp | mobile | backend)
 * @param {boolean} options.versionValidation Indicate whether or not package version should be checked
 * @param {number} options.sizeLimit Change length for PRs Including additions and deletions
 */
async function dangerJs ({ platform = 'default', versionValidation = true, sizeLimit = 1000 }) {
  const { title: prTitle, body, assignees } = danger.github.pr
  const { labels: prLabels } = danger.github.issue
  const modifiedFiles = danger.git.modified_files

  const size = await checkPRSize({ sizeLimit })
  const title = checkTitlePrefix({ prTitle })
  const url = checkTaskURL({ body })
  const summary = checkSummary({ body })
  const assignments = checkAssignments({ assignees })
  const labels = checkLabels({ platform, prLabels })
  const checkVersion = checkForVersionUpdate({ modifiedFiles, versionValidation })

  const issues = [size, title, url, summary, assignments, labels, checkVersion]

  issues.forEach(issue => {
    if (issue) {
      fail(issue)
    }
  })
}

module.exports = {
  dangerJs
}
