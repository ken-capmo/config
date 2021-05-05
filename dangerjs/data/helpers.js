const { imageStore } = require('./data/images')

function getRandomImage(issueType) {
const images = imageStore[issueType]
  return images[Math.floor(Math.random() * Math.floor(images.length))]
}

const pullRequestLabels = {
  enhancement: 'for new a feature/logic',
  bug: 'for a bug related fix',
  refactoring: 'for a code quality improvement',
  setup: 'for a repo-/code-/test-related setup',
  dependencies: 'for dependency-updates',
  security: 'to indicate that the PR addresses a security vulnerability',
  prototype:
    'to indicate that the PR is there for research/testing, but is not planned to be merged',
  needs_testing:
    'to indicate that the PR can be reviewed, but requires a proper QA (manual testing)',
  needs_rebase: 'to indicate that the PR is out-of-date',
  on_hold:
    'to indicate that the PR can be reviewed, but the merge is scheduled for sometime later',
  wip: 'for work-in-progress',
  infra: 'for AWS-related changes',
  release: 'release candidate',
  back_propagation: 'to indicate that the PR needs to be merged into other branch(es) as it includes important changes',
}

const defaultLabels = [
  'bug',
  'dependencies',
  'enhancement',
  'needs_rebase',
  'needs_testing',
  'on_hold',
  'prototype',
  'refactoring',
  'security',
  'setup',
  'wip',
]

const labelsPerPlatform = {
  default: defaultLabels,
  mobile: [
    ...defaultLabels,
    'release',
    'back_propagation'
  ],
  web: [
    ...defaultLabels,
  ],
  backend: [
    ...defaultLabels,
    'infra',
  ],
}

const getLabelIssues = (platform) => {
  if (labelsPerPlatform[platform]) {
    const labelsText = labelsPerPlatform[platform].reduce((text, label) => {
      text = text + `\n- \`${label}\`: ${pullRequestLabels[label]}`

      return text
    }, '')

    return labelsText
  }
}

module.exports = {
  getRandomImage,
  getLabelIssues,
}
