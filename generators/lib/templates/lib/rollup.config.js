import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		typescript({
			rollupCommonJSResolveHack: true,
			exclude: ['**/__tests__/**', '**/*.stories.tsx'],
			clean: true,
		}),
		commonjs(),
	],
};
