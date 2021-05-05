const packageChangedNotLockError = [
  `Changes were made to \`package.json\`, but not to \`package-lock.json\` - Perhaps you need to run \`npm i\``
]

const versionNotBumpedError = [
  `Please ensure the package version has been bumped in accordance with [Semantic Versioning](https://semver.org/)\n`,
  `and run \`npm i\` to update \`package-lock.json\`\n`
]

/**
 * TODO: Improve function to look for version bump vs checking files changed
 */
function checkForVersionUpdate({ modifiedFiles }) {
  if (!versionValidation) return

  const packageChanged = modifiedFiles.includes('package.json')
  const lockfileChanged = modifiedFiles.includes('package-lock.json')

  if (packageChanged && !lockfileChanged) {
    return packageChangedNotLockError.join('')
  }

  if (packageChanged) return

  return versionNotBumpedError.join('')
}

module.exports = {
  checkForVersionUpdate
}
