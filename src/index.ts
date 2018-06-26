#!/usr/bin/env node
// import program from 'commander';
import Errors from './errors';
import GTM from './gtm/gtm';
import Input from './Input';

(async () => {
  const gtm = new GTM();
  const input = new Input(gtm);
  const accounts = await input.getAccount();

  /// CONTAINERS

  const containersResponse = await gtm.containers.getContainers().catch(Errors.genericError);

  if (!containersResponse) {
    console.log('No Containers Response');
    return;
  }

  const containers = containersResponse.data.container;

  /*containers.then((resContainers) => {
    console.log('CONTAINERS', resContainers.data);
  });*/

  // await Promise.all([accounts, containers]);

  input.closeInput();
})();
