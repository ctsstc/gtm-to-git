#!/usr/bin/env node
// import program from 'commander';
import Errors from './errors';
import GTM from './gtm/gtm';
import Input from './Input';

(async () => {
  const gtm = new GTM();
  const input = new Input(gtm);
  const account = await input.getAccount().catch(Errors.genericError);

  if (!account || !account.accountId) {
    return console.log('No Account or Account ID Found');
  }

  const container = await input.getContainer(account.accountId).catch(Errors.genericError);

  // await Promise.all([accounts, containers]);

  input.closeInput();
})();
