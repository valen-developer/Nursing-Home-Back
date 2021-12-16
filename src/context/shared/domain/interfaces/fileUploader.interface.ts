export abstract class FileUploader {
  public aviableExtensions: string[] = [];

  /**
   *
   * @param request request of petition (use for type like multerjs)
   * @param fileName name of file (uuid preferred)
   * @param destinationPath destination where file will be sa
   */
  public abstract upload(
    file: any,
    fileName: string,
    destinationPath: string
  ): Promise<any>;

  public abstract uploadAll(
    file: any[],
    fileName: string,
    destinationPath: string
  ): Promise<string[]>;

  public abstract extractExtension(fileName: string): string;
}
