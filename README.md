# Discussion Rendering

This codebase started as a hack day project by @gtrufitt and @nicl. The purpose is parity of the existing discussion application on Frontend using the discussion API (search for Private Repo).

### Getting up and running for local development

Once you've cloned the repo, run
`yarn` to install and then
`yarn storybook` to display the components

### Publishing changes to NPM

You need a @guardian scoped NPM user account to be able to publish changes. You then will need to login to this NPM account locally on your maching. Once authenticated, run:
`yarn build && yarn publish --access public` updating the version number as required

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
