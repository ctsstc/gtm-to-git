#!/usr/bin/env node
// import program from 'commander';

import GTM from './gtm/gtm';

(async () => {
  const gtm = new GTM();
  const accounts = gtm.accounts.getAccounts();
  const containers = gtm.containers.getContainers();

  accounts.then((resAccounts) => {
    console.log('ACCOUNTS', resAccounts.data);
  });

  containers.then((resContainers) => {
    console.log('CONTAINERS', resContainers.data);
  });

  await Promise.all([accounts, containers]);
})();
