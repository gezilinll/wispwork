# Issue tracker: GitHub

Issues and specifications for this repository live in GitHub Issues at
`gezilinll/wispwork`. Use the `gh` CLI for issue operations and infer the
repository from `git remote -v`.

## Conventions

- Create: `gh issue create --title "..." --body "..."`
- Read with comments: `gh issue view <number> --comments`
- List: `gh issue list --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --body "..."`
- Close: `gh issue close <number> --comment "..."`

**Pull requests as a request surface: no.** Requirements and defects begin as
issues; pull requests deliver accepted work.

When a skill says “publish to the issue tracker,” create a GitHub issue. When a
skill says “fetch the relevant ticket,” use `gh issue view <number> --comments`.

Git and GitHub CLI authentication are separate. If `gh` is unauthenticated,
continue local repository work and request `gh auth login` only when an issue
operation is actually required.
