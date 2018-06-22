import { JWT } from 'google-auth-library';
import { tagmanager_v2 as gtm } from 'googleapis';
import config from '../config/config';
import Account from './account';
import Container from './container';

export default class GTM {

  public accounts: Account;
  public containers: Container;

  private jwtClient: JWT;
  private tagManager: gtm.Tagmanager;

  constructor() {
    this.jwtClient = new JWT(config.JWT.gtm);
    this.tagManager = new gtm.Tagmanager({ auth: this.jwtClient });
    this.accounts = new Account(this.tagManager);
    this.containers = new Container(this.tagManager);
  }
}
