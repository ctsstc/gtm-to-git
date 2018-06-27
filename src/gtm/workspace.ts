import { AxiosPromise } from 'axios';
import { tagmanager_v2 as gtm } from 'googleapis';

export default class Workspace {
  private gtmWorkspaces: gtm.Resource$Accounts$Containers$Workspaces;

  constructor(private tagManager: gtm.Tagmanager) {
    this.gtmWorkspaces = new gtm.Resource$Accounts$Containers$Workspaces(this.tagManager);
  }

  public async all(accountId: string, containerId: string): Promise<gtm.Schema$Workspace[]> {
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
  }
}
