import { tagmanager_v2 } from 'googleapis';
import readLine from 'readline-promise';
import Errors from './errors';
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

  public async getAccount(): Promise<tagmanager_v2.Schema$Account> {
    const accountsResponse = await this.gtm.accounts.getAccounts().catch(Errors.genericError);

    if (!accountsResponse) {
      return Promise.reject('No Accounts Response');
    }

    const accounts = accountsResponse.data.account;
    if (!accounts) {
      return Promise.reject('No Accounts');
    }

    const stringBuilder: string[] = [];
    if (accounts) {
      for (let i = 0; i < accounts.length; i++) {
        stringBuilder.push(`${i + 1}: ${accounts[i].name}`);
      }
    }

    const accountsString = this.listAccounts(accounts);
    let chosenAccount;
    do {
      const accountAnswer = await this.rl.questionAsync(`Choose an Account:\n${accountsString}\n>> `);
      console.log(''); // Add an extra line after input
      const accountAnswerI = parseInt(accountAnswer, 10);
      chosenAccount = accounts[accountAnswerI - 1];
    } while (!chosenAccount);

    return Promise.resolve(chosenAccount);
  }

  private listAccounts(accounts: tagmanager_v2.Schema$Account[]): string {
    const stringBuilder: string[] = [];
    if (accounts) {
      for (let i = 0; i < accounts.length; i++) {
        stringBuilder.push(`${i + 1}: ${accounts[i].name}`);
      }
    }

    return stringBuilder.join('\n');
  }
}
