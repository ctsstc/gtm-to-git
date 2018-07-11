import { tagmanager_v2 as gtm } from 'googleapis';
import GTM from './gtm';
import Tag from './tag';

export default class Workspace implements gtm.Schema$Workspace {
  public accountId: string;
  public containerId: string;
  public id: string;
  public name: string;

  constructor(workspace: gtm.Schema$Workspace, private tagManager: GTM) {
    this.accountId = workspace.accountId || '';
    this.containerId = workspace.containerId || '';

    this.id = workspace.workspaceId || '';
    this.name = workspace.name || '';
  }

  public tags(): Promise<Tag[]> {
    return this.tagManager.tags.all(this.accountId, this.containerId, this.id);
  }
}
