import { tagmanager_v2 as gtmv2 } from 'googleapis';
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

  public async getAccount(): Promise<gtmv2.Schema$Account> {
    const accounts = await this.gtm.accounts.all().catch(Errors.genericError) as gtmv2.Schema$Account[];
    const accountsString = Formatter.listCollection(accounts, 'name');
    const chosenAccount = await this.choseFromCollection(`Choose an Account:\n${accountsString}`, accounts);

    return Promise.resolve(chosenAccount);
  }

  public async getContainer(accountId: string): Promise<gtmv2.Schema$Container> {
    const containers = await this.gtm.containers.all(accountId).catch(Errors.genericError) as gtmv2.Schema$Container[];
    const containerString = Formatter.listCollection(containers, 'name');
    const chosenContainer = await this.choseFromCollection(`Choose a Container:\n${containerString}`, containers);

    return Promise.resolve(chosenContainer);
  }

  public async getWorkspace(accountId: string, containerId: string) {
    const workspaces = await this.gtm.workspaces
      .all(accountId, containerId)
      .catch(Errors.genericError) as gtmv2.Schema$Workspace[];
    const workspaceString = Formatter.listCollection(workspaces, 'name');
    const chosenWorkspace = await this.choseFromCollection(`Choose a Workspace:\n${workspaceString}`, workspaces);

    return Promise.resolve(chosenWorkspace);
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
