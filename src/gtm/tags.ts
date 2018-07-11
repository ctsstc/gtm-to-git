import { tagmanager_v2 as gtmv2 } from 'googleapis';
import GTM from './gtm';
import Tag from './tag';

type tagResourceType = gtmv2.Resource$Accounts$Containers$Workspaces$Tags;
const tagResource = gtmv2.Resource$Accounts$Containers$Workspaces$Tags;

export default class Tags {
  private gtmTags: tagResourceType;

  constructor(private tagManager: gtmv2.Tagmanager, private gtm: GTM) {
    this.gtmTags = new tagResource(this.tagManager);
  }

  public async all(accountId: string, containerId: string, workspaceId: string): Promise<Tag[]> {
    const tagsResponse = await this.gtmTags.list({
      parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}` 
    });

    if (!tagsResponse) {
      return Promise.reject('No Tags Response');
    }

    const tags = tagsResponse.data.tag;
    if (!tags) {
      return Promise.reject('No Tags');
    }

    return Promise.resolve(tags.map((tag) => new Tag(tag, this.gtm)));
  }
}
