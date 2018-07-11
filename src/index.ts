#!/usr/bin/env node
// import program from 'commander';
import GTM from './gtm/gtm';
import Input from './input';

(async () => {
  const gtm = new GTM();
  const input = new Input(gtm);

  const account = await input.getAccount();
  const container = await input.getContainer(account.id);
  const workspace = await input.getWorkspace(account.id, container.id);

  input.closeInput();
})();
