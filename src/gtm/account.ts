import { tagmanager_v2 as gtm } from 'googleapis';
import Container from './container';
import GTM from './gtm';

/*interface Schema$Account {
  containers: gtm.Resource$Accounts$Containers
}*/

export default class Account {

  public id: string;
  public name: string;

  constructor(account: gtm.Schema$Account, private tagManager: GTM) {
    this.id = account.accountId || '';
    this.name = account.name || '';
  }

  public containers(): Promise<Container[]> {
    return this.tagManager.containers.all(this.id);
  }
}
