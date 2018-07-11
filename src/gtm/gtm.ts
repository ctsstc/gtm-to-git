import { JWT } from 'google-auth-library';
import { tagmanager_v2 as gtm } from 'googleapis';
import config from '../config/config';
import Accounts from './accounts';
import Containers from './containers';
import Workspaces from './workspaces';

export default class GTM {

  public accounts: Accounts;
  public containers: Containers;
  public workspaces: Workspaces;

  private jwtClient: JWT;
  private tagManager: gtm.Tagmanager;

  constructor() {
    this.jwtClient = new JWT(config.JWT.gtm);
    this.tagManager = new gtm.Tagmanager({ auth: this.jwtClient });
    this.accounts = new Accounts(this.tagManager, this);
    this.containers = new Containers(this.tagManager, this);
    this.workspaces = new Workspaces(this.tagManager, this);
  }
}
