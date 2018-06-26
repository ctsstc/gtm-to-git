import { tagmanager_v2 as tmv2 } from 'googleapis';
import readLine from 'readline-promise';
import Errors from './errors';
import Formatter from './formatter';
import GTM from './gtm/gtm';

export default class Input {
  private rl: readLine.ReadLine;

  constructor(private gtm: GTM) {
    this.rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public closeInput() {
    this.rl.close();
  }

  public async getAccount(): Promise<tmv2.Schema$Account> {
    const accountsResponse = await this.gtm.accounts.getAccounts().catch(Errors.genericError);
    if (!accountsResponse) {
      return Promise.reject('No Accounts Response');
    }

    const accounts = accountsResponse.data.account;
    if (!accounts) {
      return Promise.reject('No Accounts');
    }

    const accountsString =  Formatter.listCollection(accounts, 'name');
    const chosenAccount = await this.choseFromCollection(`Choose an Account:\n${accountsString}`, accounts);

    return Promise.resolve(chosenAccount);
  }

  public async getContainer(accountId: string): Promise<tmv2.Schema$Container> {
    const containersResponse = await this.gtm.containers.getContainers(accountId).catch(Errors.genericError);

    if (!containersResponse) {
      return Promise.reject('No Containers Response');
    }

    const containers = containersResponse.data.container;
    if (!containers) {
      return Promise.reject('No Containers');
    }

    const containerString = Formatter.listCollection(containers, 'name');
    const chosenContainer = await this.choseFromCollection(`Choose a Container:\n${containerString}`, containers);

    return Promise.resolve(chosenContainer);
  }

  private async choseFromCollection<T>(question: string, collection: T[]): Promise<T> {
    let chosenAccount;
    do {
      const accountAnswer = await this.rl.questionAsync(`${question}\n>> `);
      console.log(''); // Add an extra line after input
      const accountAnswerI = parseInt(accountAnswer, 10);
      chosenAccount = collection[accountAnswerI - 1];
    } while (!chosenAccount);
    return Promise.resolve(chosenAccount);
  }
}
