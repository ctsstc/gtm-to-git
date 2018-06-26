export default class Errors {
  public static genericError(error: any) {
    console.log('ERROR:', error);
    process.exit();
  }
}
