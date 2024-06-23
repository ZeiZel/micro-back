import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nxPlugin from '@nx/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type ConfigArray */
const config = tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	eslintPluginPrettierRecommended,
	{
		files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
		ignores: ['*.config.js'],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.base.json', './apps/*/tsconfig(.*)?.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			'@nx': nxPlugin,
		},
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
					],
				},
			],
		},
	},
	{
		rules: {
			'@typescript-eslint/no-extraneous-class': 'off',
		},
	},
	{
		files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
		env: {
			jest: true,
		},
	},
);

export default config;
