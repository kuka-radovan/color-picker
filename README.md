# \<color-picker>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
## Usage

```html
<script type="module">
  import 'color-picker/color-picker.js';
</script>

<color-picker></color-picker>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

