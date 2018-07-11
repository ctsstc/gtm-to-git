import { tagmanager_v2 as gtmv2 } from 'googleapis';
import GTM from './gtm';
import Workspace from './workspace';

export default class Workspaces {
  private gtmWorkspaces: gtmv2.Resource$Accounts$Containers$Workspaces;

  constructor(private tagManager: gtmv2.Tagmanager, private gtm: GTM) {
    this.gtmWorkspaces = new gtmv2.Resource$Accounts$Containers$Workspaces(this.tagManager);
  }

  public async all(accountId: string, containerId: string): Promise<Workspace[]> {
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

    return Promise.resolve(workspaces.map((workspace) => new Workspace(workspace, this.gtm)));
  }
}
