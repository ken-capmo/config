const {
  committedFilesGrep,
  fileAddedLineNumbers,
  fileRemovedLineNumbers,
} = require('danger-plugin-toolbox');
const { getRandomImage, getLabelIssues } = require('./helpers');
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
    const markdownParts = [
      '**Big PR**\n\n',
      'Pull Request size seems relatively large. If the Pull Request contains multiple changes, splitting each of them into a separate PR will foster faster, easier reviews.\n\n',
      `![img](${getRandomImage(imageStore.bigPR)}, 'Oops')\n`
    ]

    issues.push(markdownParts.join(''));
  }
}

function checkTitlePrefix() {
  const prefixes = ['[HOTFIX]', '[BUGFIX]', '[CHORE]', '[SETUP]', '[DEBUG]', '[BACK-PROPAGATION]'];
  const dependabotPrefix = 'Bump';
  const regex = /\[(PD|IES|QA)-\d+\].*/g; // e.g. [PD-1234]

  if (
    ![...prefixes, dependabotPrefix].some(prefix =>
      danger.github.pr.title.includes(prefix)
    ) &&
    !(danger.github.pr.title.match(regex) !== null)
  ) {
    const markdownParts = [
      '**Your PR title has not been prefixed properly**\n\n',
      'Please use on of the following prefixes:\n',
      'Primary:\n',
      '- \`[PD-XXXX]\` for a JIRA-ticket of the Daywalkers squad\n',
      '- \`[IES-XXXX]\` for a JIRA-ticket of the Internet Explorers squad\n',
      '- \`[QA-XXXX]\` for a JIRA-ticket of the QA team\n',
      'Secondary:\n',
      '- \`[HOTFIX]\` for any time critical fixes\n',
      '- \`[CHORE]\` for any other tasks\n',
      '- \`[SETUP]\` for any setup-related\n',
      '- \`[DEBUG]\` for debugging purposes\n',
      'Automatically:\n',
      '- \`[BACK-PROPAGATION]\` for important changes which also required in other branches (do not change this title)\n',
      '- \`Bump ...\` for dependabot (do not change this title)\n\n',
      `![img](${getRandomImage(imageStore.wrongTitle)}, 'Oops')\n`
    ]

    issues.push(markdownParts.join(''));
  }
}

function checkJiraURL() {
  const regex = /(https:\/\/capmo-team.atlassian.net\/browse\/)(PD|pd|IES|ies|QA|qa)-\d+/g;

  if (
    !!danger.github.pr.body.includes(
      'https://capmo-team.atlassian.net/browse/'
    ) &&
    !(danger.github.pr.body.match(regex) !== null)
  ) {
    const markdownParts = [
      '**The JIRA-ticket has not been filled out**\n\n',
      'In case, there is no JIRA-ticket, please replace the example URL by \`n/a\`\n\n',
      `![img](${getRandomImage(imageStore.noJiraTicket)}, 'Oops')\n`
    ]

    issues.push(markdownParts.join(''));
  }
}

function checkSummary() {
  const regex = /.*(\*\*Summary\*\*\r\nTODO).*/g;

  if (danger.github.pr.body.match(regex) !== null) {
    const markdownParts = [
      '**The summary in your PR has not been filled out**\n\n',
      `![img](${getRandomImage(imageStore.noSummary)}, 'Oops')\n`
    ]

    issues.push(markdownParts.join(''));
  }
}

function checkAssignments() {
  if (!danger.github.pr.assignees.length) {
    const markdownParts = [
      '**This PR is not assigned to you and/or someone else**\n\n',
      `![img](${getRandomImage(imageStore.noAssignee)}, 'Oops')\n`
    ]

    issues.push(markdownParts.join(''));
  }
}

// labels are a bit different for every platform so you can pass an argument to set a custom message
function checkLabels(platform) {
  if (!danger.github.issue.labels.length) {
    const markdownParts = [
      '**This PR has no label(s)**\n\n',
      `Please add one (or more) labels to give this PR a better visual context:\n`,
      `${getLabelIssues(platform)}\n\n`,
      `![img](${getRandomImage(imageStore.noLabels)}, 'Oops')\n`
    ]

    issues.push(markdownParts.join(''));
  }
}

async function dangerJs(platform) {
  await checkPRSize();
  checkTitlePrefix();
  checkJiraURL();
  checkSummary();
  checkAssignments();
  checkLabels(platform);

  // Submit report
  issues.reverse().forEach(issue => {
    fail(issue);
  });
}

module.exports = {
  dangerJs
};
