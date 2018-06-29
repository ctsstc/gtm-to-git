import { tagmanager_v2 as gtm } from 'googleapis';
import GTM from './gtm';
import Workspaces from './workspaces';

export default class Container implements gtm.Schema$Container {

  public accountId: string;
  public id: string;
  public name: string;

  constructor(container: gtm.Schema$Container, private tagManager: GTM) {
    // ({ accountId: this.id = '', name: this.name = '' } = container);
    this.accountId = container.accountId || '';
    this.id = container.containerId || '';
    this.name = container.name || '';
  }

  public workspaces(): Promise<gtm.Schema$Workspace[]> {
    return this.tagManager.workspaces.all(this.accountId, this.id);
  }
}
