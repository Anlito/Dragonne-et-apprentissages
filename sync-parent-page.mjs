import {readFileSync,writeFileSync} from 'node:fs';
const shell=readFileSync(new URL('./index.html',import.meta.url),'utf8');
writeFileSync(new URL('./parents.html',import.meta.url),shell.replace('<body>','<body data-parent-page>').replace('<title>Dragons & découvertes</title>','<title>Le coin des parents · Dragons & découvertes</title>'));
console.log('parents.html synchronisée avec index.html.');
