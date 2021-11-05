import fs from 'fs';
import path from 'path';

export class FileDeleter {
  /**
   * @param name name looking for
   * @returns how many found
   */
  public byNameMatch(folder: string, name: string): number {
    console.log('🚀 -> FileDeleter -> byNameMatch -> name', name);
    const files = fs
      .readdirSync(folder)
      .map((entityName) => path.join(folder, entityName))
      .filter(this.isNotdirectory);

    const fileToUnlink = files.filter((f) => f.includes(name));
    console.log(
      '🚀 -> FileDeleter -> byNameMatch -> fileToUnlink',
      fileToUnlink
    );

    fileToUnlink.forEach((f) => fs.unlinkSync(f));

    return 0;
  }

  public delete(path: string): boolean {
    const exist = fs.existsSync(path);
    if (!exist) return false;

    fs.unlinkSync(path);

    return true;
  }

  private isNotdirectory(source: string): boolean {
    return !fs.lstatSync(source).isDirectory();
  }

  private isDirectory(source: string): boolean {
    return fs.lstatSync(source).isDirectory();
  }
}
