# Discussion Rendering

> **Warning**
> 
> This library is **deprecated**. It was previously used by the dotcom-rendering (DCR) and apps-rendering (AR) projects. However, the dependency was removed from AR in https://github.com/guardian/dotcom-rendering/pull/7374 and the code was then merged directly into DCR in https://github.com/guardian/dotcom-rendering/pull/8057.

This codebase started as a hack day project by @gtrufitt and @nicl. The purpose is parity of the existing discussion application on Frontend using the discussion API (search for Private Repo).

### Getting up and running for local development

Once you've cloned the repo, run
`yarn` to install and then
`yarn storybook` to display the components
`yarn dev` will show the full discussion app with query parameter options

### Publishing changes to NPM

Versioning and publishing for this package is managed through [changesets](https://github.com/changesets/changesets).

If you make a change to the repo which merits a version bump, you should add a changeset
to your PR:

1. Run `yarn changeset`. This will run a CLI with prompts you have to complete.
2. Choose the appropriate [semantic version bump](https://semver.org/): `major`, `minor`, or `patch`.
3. Add a description of the change introduced.
4. Merge the follow-up PR raised by the `changesets` bot`

> **Note**
> When a PR with a changeset is merged to `main`, changesets will automatically open a new PR
> which, when merged, will automatically bump the version number (following [semver conventions](https://semver.org/)),
> publish the new version to npm, and update the github changelog for this package.

Changesets is a relatively new addition to this repo, so if you run into any difficulties using it, 
please feel free to [open an issue](https://github.com/guardian/discussion-rendering/issues/new)
in this repo.

### Connection this package to DCR/Frontend to test local changes

If you don't want to publish but still want to see how your changes look when imported, you can use yarn's link command. From this directory, run
`yarn link`
Then, as per the prompts, go to the directory of the project you want to link to and run
`yarn link '@guardian/discussion-rendering'`
This will mean that this project will now read directly from your local copy of discussion-rendering, instead of downloading from npm. To reset and restore normal npm access run
`yarn unlink '@guardian/discussion-rendering'`
As per the prompts, you may need to force reinstall

While you are linked, you will need to run `yarn build` after making changes to discussion-rendering to see them in the linked repo.

### `yarn build`

Builds the app for production to the `build` folder.

## Snyk Code Scanning
There's a Github action set up on the repository to scan for vulnerabilities. This is set to "continue on error" and so will show a green tick regardless. In order to check the vulnerabilities we can use the Github code scanning feature in the security tab and this will list all vulnerabilities for a given branch etc. You should use this if adding/removing/updating packages to see if there are any vulnerabilities.
