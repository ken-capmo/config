const { dangerJsCommon } = require('./common');
const { getLabelIssues } = require('./helpers');

const dangerJs = () => {
  const labelIssues = getLabelIssues('web')
  dangerJsCommon(labelIssues);
}

dangerJs();