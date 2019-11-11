import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as root from 'app-root-dir';
import * as path from 'path';

export class AppConfig {
  private readonly envDirectory: string = '';

  constructor() {
    dotenv.config();
    const envDeployDir: string = path.join(root.get(), 'deploy', 'env');
    const file: string = 'application.env';

    if (fs.existsSync(envDeployDir)) {
      this.envDirectory = envDeployDir;
    } else {
      this.envDirectory = path.join(root.get(), 'env');
    }
    this.configure(file);
  }

  private configure(filePath: string) {
    const configPath: string = path.join(this.envDirectory, filePath);

    if (fs.existsSync(configPath)) {
      dotenv.config({path: configPath});
    }
  }

  static getEnv(key: string): string {
    return process.env[key] || process.env[key] || '';
  }
}
