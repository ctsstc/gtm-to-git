import { tagmanager_v2 as gtm } from 'googleapis';
import GTM from './gtm';

export default class Workspace implements gtm.Schema$Workspace {
  public id: string;
  public name: string;

  constructor(workspace: gtm.Schema$Workspace, private tagManager: GTM) {
    this.id = workspace.accountId || '';
    this.name = workspace.name || '';
  }

  /*public async all(accountId: string, containerId: string): Promise<gtm.Schema$Workspace[]> {
    const workspaceResponse = await this.gtmWorkspaces.list(
      { parent: `accounts/${accountId}/containers/${containerId}` }
    );

    if (!workspaceResponse) {
      return Promise.reject('No Workspace Response');
    }

    const workspaces = workspaceResponse.data.workspace;
    if (!workspaces) {
      return Promise.reject('No Workspaces');
    }

    return Promise.resolve(workspaces);
  }*/
}
