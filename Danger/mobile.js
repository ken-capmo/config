const { dangerJsCommon } = require('./common');
const { getLabelIssues } = require('./helpers');

const dangerJs = () => {
  const labelIssues = getLabelIssues('mobile')
  dangerJsCommon(labelIssues);
}

dangerJs();