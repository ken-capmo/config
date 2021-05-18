const errors = {
  versionNotBumped: 'Please ensure the package version has been bumped in accordance with [Semantic Versioning](https://semver.org/)',
  versionNotUpdatedInLockFile: 'Run `npm i` to update `package-lock.json`',
  versionMissmatch: 'There is a missmatch between versions in the `package.json` and `package-lock.json` files. Run `npm i` to update `package-lock.json`',
}

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const REGEX_VERSION_QUERY = /"version": "(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?"/

function checkForVersionUpdate ({ versionValidation, packageJsonDiff, packageLockJsonDiff }) {
  if (!versionValidation) return

  const isPackageJsonChanged = packageJsonDiff && packageJsonDiff.added
  const isPackageLockJsonChanged = packageLockJsonDiff && packageLockJsonDiff.added

  const isNewVersionSet = isPackageJsonChanged && packageJsonDiff.added.match(REGEX_VERSION_QUERY)

  if(!isNewVersionSet) return errors.versionNotBumped
 
  if(!isPackageLockJsonChanged) return errors.versionNotUpdatedInLockFile

  const packageJsonNewVersion = packageJsonDiff.added.match(REGEX_VERSION_QUERY)[0]
  const packageLockJsonNewVersion = packageLockJsonDiff.added.match(REGEX_VERSION_QUERY)[0]

  if(packageJsonNewVersion !== packageLockJsonNewVersion) return errors.versionMissmatch
}

module.exports = {
  checkForVersionUpdate
}
