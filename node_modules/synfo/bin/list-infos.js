#!/usr/bin/env node

// require('../dist/infos')
//   .INFOS.sort(
//     (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
//   ).forEach(i => {
//     process.stdout.write(`- ${i["name"]}\n`);
//   });

process.stdout.write(require('../dist/lib').listInfos(true));
