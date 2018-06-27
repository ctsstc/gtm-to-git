#!/usr/bin/env node
// import program from 'commander';
import Errors from './errors';
import GTM from './gtm/gtm';
import Input from './input';

(async () => {
  const gtm = new GTM();
  const input = new Input(gtm);

  const account = await input.getAccount();
  if (!account.accountId) {
    return console.log('No Account ID Found');
  }

  const container = await input.getContainer(account.accountId);
  if (!container.containerId) {
    return console.log('No Container ID Found');
  }

  const workspace = await input.getWorkspace(account.accountId, container.containerId);

  input.closeInput();
})();
