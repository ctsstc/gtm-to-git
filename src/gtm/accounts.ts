import { tagmanager_v2 as gtmv2 } from 'googleapis';
import Account from './account';
import GTM from './gtm';

export default class Accounts {
  private gtmAccounts: gtmv2.Resource$Accounts;

  constructor(private tagManager: gtmv2.Tagmanager, private gtm: GTM) {
    this.gtmAccounts = new gtmv2.Resource$Accounts(this.tagManager);
  }

  public async all(): Promise<Account[]> {
    const accountsResponse = await this.gtmAccounts.list();

    if (!accountsResponse) {
      return Promise.reject('No Accounts Response');
    }

    const accounts = accountsResponse.data.account;
    if (!accounts) {
      return Promise.reject('No Accounts');
    }

    return Promise.resolve(accounts.map((account) => new Account(account, this.gtm)));
  }
}
