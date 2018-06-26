export default class Formatter {
  public static listCollection(collection: object[], key: string): string {
    const stringBuilder: string[] = [];
    if (collection) {
      for (let i = 0; i < collection.length; i++) {
        stringBuilder.push(`${i + 1}: ${collection[i][key as keyof object]}`);
      }
    }
    return stringBuilder.join('\n');
  }
}
