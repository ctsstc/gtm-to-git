import { AxiosPromise } from 'axios';
import { tagmanager_v2 as gtm } from 'googleapis';

export default class Container {
  private gtmContainers: gtm.Resource$Accounts$Containers;

  constructor(private tagManager: gtm.Tagmanager) {
    this.gtmContainers = new gtm.Resource$Accounts$Containers(this.tagManager);
  }

  public getContainers(): AxiosPromise<gtm.Schema$ListContainersResponse> {
    return this.gtmContainers.list({ parent: 'accounts/91730' });
  }
}
