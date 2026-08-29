# Decision sources and GitHub Issues

Internal product decisions live with the repository they govern. GitHub Issues
at `gezilinll/wispwork` are a coordination and feedback surface, not a mandatory
duplicate of every accepted specification. Use the `gh` CLI for issue
operations and infer the repository from `git remote -v`.

## Accepted decision sources

Every pull request cites one primary accepted source:

- a maintainer-confirmed `grill-with-docs` outcome when the pull request records
  a new or materially revised specification;
- an accepted specification or plan under `docs/` for internally shaped
  product and implementation work;
- a GitHub Issue for an external report, defect, backlog item, or approved
  ticket whose coordination benefits from the tracker;
- an explicit maintainer instruction for a repository-governance documentation
  change.

An implementation MR may cite one exact task in an accepted focused plan. It
does not need an Issue that repeats the same requirements. When an Issue and a
repository specification both exist, the Issue links the specification instead
of redefining it.

## Conventions

- Create: `gh issue create --title "..." --body "..."`
- Read with comments: `gh issue view <number> --comments`
- List: `gh issue list --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --body "..."`
- Close: `gh issue close <number> --comment "..."`

**Pull requests remain a delivery surface, not the place where unresolved
requirements are discovered.** Internal requirements are accepted through the
documented grill/specification flow before implementation. Non-sensitive
external reports and unshaped requests begin in Issues. Security reports follow
`.github/SECURITY.md` and must never be disclosed in public Issues or pull
requests.

When a skill says “publish to the issue tracker,” create a GitHub issue. When a
skill says “fetch the relevant ticket,” use `gh issue view <number> --comments`.

Use Issues when their durable discussion, backlog, assignment, or blocking-edge
tracking creates value. Do not create one only to satisfy a branch-name pattern
or copy an already accepted local specification.

Git and GitHub CLI authentication are separate. If `gh` is unauthenticated,
continue local repository work and request `gh auth login` only when an issue
operation is actually required.
