import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { version } from './package.json';

const banner = `/*!
 * vue-split-view v${version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`;

function createEntry(config) {
  const c = {
    input: config.input,
    plugins: [],
    output: {
      banner,
      file: config.file,
      format: config.format
    },
    external: ['vue'],
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  };

  if (config.format === 'umd') {
    c.output.name = c.output.name || 'VueSplitView';
  }

  c.plugins.push(replace({
    __VERSION__: version,
    __DEV__: config.format !== 'umd' && !config.browser
      ? `(process.env.NODE_ENV !== 'production')`
      : config.env !== 'production'
  }));

  if (config.transpile !== false) {
    c.plugins.push(buble());
  }

  c.plugins.push(resolve());
  c.plugins.push(commonjs());
  c.plugins.push(typescript());

  if (config.minify) {
    c.plugins.push(terser({ module: config.format === 'es' }));
  }

  return c;
}

export default createEntry({
  input: './src/SplitView.tsx',
  file: './dist/vue-split-view.common.js',
});
