import { AxiosPromise } from 'axios';
import { tagmanager_v2 as gtm } from 'googleapis';

export default class Account {
  private gtmAccounts: gtm.Resource$Accounts;

  constructor(private tagManager: gtm.Tagmanager) {
    this.gtmAccounts = new gtm.Resource$Accounts(this.tagManager);
  }

  public async all(): Promise<gtm.Schema$Account[]> {
    const accountsResponse = await this.gtmAccounts.list();

    if (!accountsResponse) {
      return Promise.reject('No Accounts Response');
    }

    const accounts = accountsResponse.data.account;
    if (!accounts) {
      return Promise.reject('No Accounts');
    }

    return Promise.resolve(accounts);
  }
}
