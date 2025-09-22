import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const mainPackage = JSON.parse(readFileSync('package.json', 'utf8'));

const distPackage = {
  name: mainPackage.name,
  version: mainPackage.version,
  description: mainPackage.description,
  bin: {
    "dts-bundler": "bin/dts-bundler"
  },
  type: 'module',
  files: [
    'bin/'
  ],
  keywords: mainPackage.keywords || [],
  author: mainPackage.author,
  license: mainPackage.license,
  dependencies: mainPackage.dependencies || {},
  peerDependencies: mainPackage.peerDependencies || {}
};

writeFileSync(
  join('dist/dts-bundler/', 'package.json'),
  JSON.stringify(distPackage, null, 2)
);