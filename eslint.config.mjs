import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...compat.extends('eslint:recommended'), {
		languageOptions: {
			globals: {
				...globals.commonjs,
				...globals.node
			},

			ecmaVersion: 13,
			sourceType: 'commonjs'
		},

		rules: {
			'accessor-pairs': 'error',
			'array-bracket-newline': 'error',
			'array-bracket-spacing': 'error',
			'arrow-parens': ['error', 'as-needed'],

			'arrow-spacing': [
				'error', {
					after: true,
					before: true
				}
			],

			'block-scoped-var': 'error',
			'block-spacing': 'error',
			'brace-style': 'error',
			'comma-dangle': 'error',

			'comma-spacing': [
				'error', {
					after: true,
					before: false
				}
			],

			'comma-style': 'error',
			'computed-property-spacing': 'error',
			'consistent-this': 'error',
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-location': ['error', 'property'],
			'dot-notation': 'error',
			'eol-last': ['error', 'never'],
			eqeqeq: 'error',
			'func-call-spacing': 'error',
			'func-name-matching': 'error',
			'function-paren-newline': 'error',
			'generator-star-spacing': 'error',
			'grouped-accessor-pairs': 'error',
			'id-denylist': 'error',
			'id-match': 'error',
			'implicit-arrow-linebreak': 'error',
			indent: 'off',
			'jsx-quotes': 'error',
			'key-spacing': 'error',
			'keyword-spacing': 'error',
			'linebreak-style': ['error', 'windows'],
			'lines-around-comment': 'error',
			'lines-between-class-members': 'error',
			'max-classes-per-file': 'error',
			'max-depth': 'off',
			'max-nested-callbacks': 'error',
			'max-params': 'error',
			'max-statements-per-line': 'error',
			'new-parens': 'error',
			'no-fallthrough': 'off',
			'no-alert': 'error',
			'no-array-constructor': 'error',
			'no-await-in-loop': 'error',
			'no-bitwise': 'error',
			'no-caller': 'error',
			'no-confusing-arrow': 'error',
			'no-constructor-return': 'error',
			'no-continue': 'error',
			'no-div-regex': 'error',
			'no-duplicate-imports': 'error',
			'no-else-return': 'error',
			'no-eq-null': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-label': 'error',
			'no-extra-parens': 'error',
			'no-floating-decimal': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': 'error',
			'no-loop-func': 'error',
			'no-mixed-operators': 'error',
			'no-multi-assign': 'error',
			'no-multi-spaces': 'error',
			'no-multi-str': 'error',
			'no-multiple-empty-lines': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-object': 'error',
			'no-new-wrappers': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': 'error',
			'no-promise-executor-return': 'error',
			'no-proto': 'error',
			'no-restricted-exports': 'error',
			'no-restricted-globals': 'error',
			'no-restricted-imports': 'error',
			'no-restricted-properties': 'error',
			'no-restricted-syntax': 'error',
			'no-return-await': 'error',
			'no-script-url': 'error',
			'no-self-compare': 'error',
			'no-sequences': 'error',

			'no-tabs': [
				'error', {
					allowIndentationTabs: true
				}
			],

			'no-template-curly-in-string': 'error',
			'no-undef-init': 'error',
			'no-underscore-dangle': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unneeded-ternary': 'error',
			'no-unreachable-loop': 'error',
			'no-unused-private-class-members': 'error',
			'no-use-before-define': 'error',
			'no-useless-call': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-rename': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-warning-comments': 'error',
			'no-whitespace-before-property': 'error',
			'nonblock-statement-body-position': 'error',
			'object-curly-newline': 'error',
			'object-curly-spacing': ['error', 'always'],
			'one-var': 'off',
			'one-var-declaration-per-line': 'error',
			'operator-assignment': 'error',
			'operator-linebreak': 'error',
			'padded-blocks': 'off',
			'padding-line-between-statements': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-exponentiation-operator': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'quote-props': 'off',
			quotes: ['error', 'single'],
			'require-atomic-updates': 'error',
			'rest-spread-spacing': 'error',
			semi: 'error',
			'semi-spacing': 'error',
			'semi-style': ['error', 'last'],
			'sort-imports': 'error',
			'space-before-blocks': 'error',
			'space-before-function-paren': 'error',
			'space-in-parens': ['error', 'never'],
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			'switch-colon-spacing': 'error',
			'symbol-description': 'error',
			'template-curly-spacing': 'error',
			'template-tag-spacing': 'error',
			'unicode-bom': ['error', 'never'],
			'vars-on-top': 'error',
			'wrap-iife': 'error',
			'wrap-regex': 'error',
			'yield-star-spacing': 'error',
			yoda: 'error'
		}
	}
];