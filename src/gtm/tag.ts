import { tagmanager_v2 as gtm } from 'googleapis';
import GTM from './gtm';

export default class Tag implements gtm.Schema$Tag {

  public accountId: string;
  public containerId: string;
  public id: string;
  public name: string;

  constructor(public tag: gtm.Schema$Tag, private tagManager: GTM) {
    // ({ accountId: this.id = '', name: this.name = '' } = container);
    this.accountId = tag.accountId || '';
    this.containerId = tag.containerId || '';
    this.id = tag.containerId || '';
    this.name = tag.name || '';
  }
}
