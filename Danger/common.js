const {
  committedFilesGrep,
  fileAddedLineNumbers,
  fileRemovedLineNumbers,
} = require('danger-plugin-toolbox');
const { getLabelIssues, getRandomImage } = require('./helpers');
const { imageStore } = require('./imageStore');
  
const issues = [];

async function checkPRSize() {
  const THRESHOLD = 1000;

  // Exclude test files
  const regex = /^(?!.*\.(spec|test)\.(ts)$).*\.ts$/gm;
  const modifiedFiles = committedFilesGrep(regex);
  let numberOfChangedLines = 0;

  await Promise.all(
    modifiedFiles.map(async filePath => {
      const addedLinesArray = await fileAddedLineNumbers(filePath);
      const removedLinesArray = await fileRemovedLineNumbers(filePath);

      numberOfChangedLines += addedLinesArray.length + removedLinesArray.length;
    })
  );

  // We don't allow PRs with more than 1000 changed lines (additions or deletions)
  if (numberOfChangedLines > THRESHOLD) {
    issues.push(
      `**Big PR**\n\nPull Request size seems relatively large. If the Pull Request contains multiple changes, splitting each of them into a separate PR will foster faster, easier reviews.\n\n![img](${getRandomImage(
        imageStore.bigPR
      )}, 'Oops')\n`
    );
  }
}

function checkTitlePrefix() {
  const prefixes = ['[HOTFIX]', '[BUGFIX]', '[CHORE]', '[SETUP]', '[DEBUG]'];
  const dependabotPrefix = 'Bump';
  const regex = /\[[A-Z]+-\d+\].*/g; // e.g. [PD-1234]

  if (
    ![...prefixes, dependabotPrefix].some(prefix =>
      danger.github.pr.title.includes(prefix)
    ) &&
    !(danger.github.pr.title.match(regex) !== null)
  ) {
    issues.push(
      `**Your PR title has not been prefixed properly**\n\nPlease use on of the following prefixes:\nPrimary:\n- \`[PD-XXXX]\` for a JIRA-ticket of the Daywalkers squad\n- \`[IES-XXXX]\` for a JIRA-ticket of the Internet Explorers squad\nSecondary:\n- \`[HOTFIX]\` for any time critical fixes\n- \`[CHORE]\` for any other tasks\n- \`[SETUP]\` for any setup-related\n- \`[DEBUG]\` for debugging purposes\nAutomatically:\n- \`Bump ...\` for dependabot (do not change this title)\n\n![img](${getRandomImage(
        imageStore.wrongTitle
      )}, 'Oops')\n`
    );
  }
}

function checkJiraURL() {
  const regex = /(https:\/\/capmo-team.atlassian.net\/browse\/)(PD|IES)-.*/g;

  if (
    !!danger.github.pr.body.includes(
      'https://capmo-team.atlassian.net/browse/'
    ) &&
    !(danger.github.pr.body.match(regex) !== null)
  ) {
    issues.push(
      `**The JIRA-ticket has not been filled out**\n\nIn case, there is no JIRA-ticket, please replace the example URL by \`n/a\`\n\n![img](${getRandomImage(
        imageStore.noJiraTicket
      )}, 'Oops')\n`
    );
  }
}

function checkSummary() {
  const regex = /.*(\*\*Summary\*\*\r\nTODO).*/g;

  if (danger.github.pr.body.match(regex) !== null) {
    issues.push(
      `**The summary in your PR has not been filled out**\n\n![img](${getRandomImage(
        imageStore.noSummary
      )}, 'Oops')\n`
    );
  }
}

function checkAssignments() {
  if (!danger.github.pr.assignees.length) {
    issues.push(
      `**This PR is not assigned to you and/or someone else**\n\n![img](${getRandomImage(
        imageStore.noAssignee
      )}, 'Oops')\n`
    );
  }
}

// labels are a bit different for every platform so you can pass an argument to set a custom message
function checkLabels(labelIssues) {
  if (!danger.github.issue.labels.length) {
    issues.push(
      `${labelIssues}\n\n![img](${getRandomImage(
        imageStore.noLabels
      )}, 'Oops')\n`
    );
  }
}

async function dangerJs(labelIssues) {
  await checkPRSize();
  checkTitlePrefix();
  checkJiraURL();
  checkSummary();
  checkAssignments();
  checkLabels(labelIssues);

  // Submit report
  issues.reverse().forEach(issue => {
    fail(issue);
  });
}

module.exports = {
  dangerJsCommon: dangerJs
};
  