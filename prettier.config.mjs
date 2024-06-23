/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig | import("prettier").Config} */
const config = {
	"singleQuote": true,
	"jsxSingleQuote": true,
	"printWidth": 100,
	"arrowParens": "always",
	"useTabs": true,
	"tabWidth": 4,
	"editorconfig": true,
	"semi": true,
	"trailingComma": "all",
	importOrder: [
		"<BUILT_IN_MODULES>",
		"<THIRD_PARTY_MODULES>",
		"^[.]",
		'',
		'@/pages',
		'@/widgets',
		'@/features',
		'',
		'@/shared/types',
		'@/shared/lib',
		'@/shared/ui',
	]
}

export default config;
