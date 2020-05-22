# nimblenote

## Building

```sh
iconutil --convert icns build/nimblenote.iconset -o build/icon.icns
yarn dist
```

## Development

```sh
yarn
yarn dev
```

Uses commitizen for commit message standards. To commit, use the command:

```
yarn cm
```

## Releasing

### macOS via GitHub releases and `electron-updater`

For macOS releases, we need to build locally so that the package is signed. This will also handle the creation of a draft release on GitHub, that when published as live, will handle auto-updates.

```
env GH_TOKEN=XYZ123 yarn release
```

Ensure any local changes have been `git stash` before running this command, or they will be included in the release.

### Linux via snap packages and the snap store

For Linux releases, we use Snap, and this can be handled via the CI pipeline when the version has been bumped in `package.json` and pushed through.

On Linux, Snap will check for updates at four intervals during the day and automatically update the snap packages.

### Windows

Not currently supported, but will be soon hopefully.
