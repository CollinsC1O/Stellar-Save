// ESLint 9 resolves eslint.config.* from the cwd (repo root, which has none),
// so look it up per file and only lint workspaces that define a config.
const eslint = 'eslint --flag v10_config_lookup_from_file --max-warnings 0';

module.exports = {
  // TypeScript and JavaScript files: lint (workspaces with an ESLint config) + format check
  '{frontend,backend,mobile}/**/*.{ts,tsx,js,jsx,mjs,cjs}': [eslint],
  '*.{ts,tsx,js,jsx,mjs,cjs}': ['prettier --check'],

  // CSS files (frontend): stylelint
  'frontend/**/*.css': ['stylelint'],

  // JSON and YAML: format check
  '*.{json,yaml,yml}': ['prettier --check'],

  // Markdown: format check
  '*.md': ['prettier --check'],
};
