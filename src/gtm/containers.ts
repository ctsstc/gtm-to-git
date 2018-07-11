import { tagmanager_v2 as gtmv2 } from 'googleapis';
import Container from './container';
import GTM from './gtm';

export default class Containers {
  private gtmContainers: gtmv2.Resource$Accounts$Containers;

  constructor(private tagManager: gtmv2.Tagmanager, private gtm: GTM) {
    this.gtmContainers = new gtmv2.Resource$Accounts$Containers(this.tagManager);
  }

  public async all(accountId: string): Promise<Container[]> {
    const containersResponse = await this.gtmContainers.list({ parent: `accounts/${accountId}` });

    if (!containersResponse) {
      return Promise.reject('No Containers Response');
    }

    const containers = containersResponse.data.container;
    if (!containers) {
      return Promise.reject('No Containers');
    }

    return Promise.resolve(containers.map((container) => new Container(container, this.gtm)));
  }
}
