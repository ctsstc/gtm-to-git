import { tagmanager_v2 as gtm } from 'googleapis';

export default class Container {
  private gtmContainers: gtm.Resource$Accounts$Containers;

  constructor(private tagManager: gtm.Tagmanager) {
    this.gtmContainers = new gtm.Resource$Accounts$Containers(this.tagManager);
  }

  public async all(accountId: string): Promise<gtm.Schema$Container[]> {
    const containersResponse = await this.gtmContainers.list({ parent: `accounts/${accountId}` });

    if (!containersResponse) {
      return Promise.reject('No Containers Response');
    }

    const containers = containersResponse.data.container;
    if (!containers) {
      return Promise.reject('No Containers');
    }

    return Promise.resolve(containers);
  }
}
