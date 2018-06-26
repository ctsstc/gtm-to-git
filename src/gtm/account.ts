import { AxiosPromise } from 'axios';
import { tagmanager_v2 as gtm } from 'googleapis';
// node_modules/googleapis/build/src/apis/tagmanager/v2.d.ts
// node_modules/googleapis/build/src/apis/tagmanager/v2.d.ts

export default class Account {
  private gtmAccounts: gtm.Resource$Accounts;

  constructor(private tagManager: gtm.Tagmanager) {
    this.gtmAccounts = new gtm.Resource$Accounts(this.tagManager);
  }

  public getAccounts(): AxiosPromise<gtm.Schema$ListAccountsResponse> {
    return this.gtmAccounts.list(); // 91730 3466834650
  }
}
