const { getRandomImage } = require('./data/helpers')

const titleError = [
  '**Your PR title has not been prefixed properly**\n\n',
  'Please use on of the following prefixes:\n',
  'Primary:\n',
  '- `[PD-XXXX]` for a JIRA-ticket of the Daywalkers squad\n',
  '- `[IES-XXXX]` for a JIRA-ticket of the Internet Explorers squad\n',
  '- `[QA-XXXX]` for a JIRA-ticket of the QA team\n',
  '- `[SI-XXXX]` for a JIRA-ticket related to Security and Infrastructure tasks\n',
  '- `[MOB-XXXX]` for a JIRA-ticket of the Mobile squad\n',
  'Secondary:\n',
  '- `[HOTFIX]` for any time critical fixes\n',
  '- `[CHORE]` for any other tasks\n',
  '- `[SETUP]` for any setup-related\n',
  '- `[DEBUG]` for debugging purposes\n',
  '- `[RELEASE]` for mobile-app release PRs\n',
  'Automatically:\n',
  '- `[BACK-PROPAGATION]` for important changes which also required in other branches (do not change this title)\n',
  '- `Bump ...` for dependabot (do not change this title)\n\n',
  `![img](${getRandomImage('wrongTitle')}, 'Oops')\n`
]

const genericPrefixes = ['[HOTFIX]', '[BUGFIX]', '[CHORE]', '[SETUP]', '[DEBUG]', '[BACK-PROPAGATION]', '[RELEASE]']
const dependabotPrefix = 'Bump'
const teamSpecificPrefixes = /\[(PD|IES|QA|SI|MOB)-\d+\].*/g // e.g. [PD-1234], [IES-1234], [QA-1234]

function checkTitlePrefix ({ prTitle = '' }) {
  if (!prTitle.length) return titleError.join('')

  const includesGenericPrefix = [...genericPrefixes, dependabotPrefix].some(prefix => prTitle.includes(prefix))
  const includesTeamPrefix = prTitle.match(teamSpecificPrefixes) !== null

  if (!includesGenericPrefix && !includesTeamPrefix) {
    return titleError.join('')
  }
}

module.exports = {
  checkTitlePrefix
}
