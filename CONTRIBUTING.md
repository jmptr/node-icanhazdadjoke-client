# Contribution Guidelines

## git hooks

Git hooks are provided by (husky)[https://github.com/typicode/husky#readme].

Please do _not_ bypass these hooks.

### `commit-msg`

Commit messages are linted useing the (Conventional Commits Specification)[https://www.conventionalcommits.org/en/v1.0.0/#specification]. Using this grammar in commits
allows us to automate release activity.

### `pre-push`

`pre-push` is used to verify all the build components still work. This is done
by running all of the code quality lifecycle scripts: `build`, `test`, `lint`,
and `docs`.

## publishing

Using the typescript compiler provides output that has stylistic rules that are
unpopular in published modules (eg: extra spaces consuming network bandwidth).
By following the typescript build with a prettifier fix, we are able to publish
code that is more palatable to consumers of the module.
