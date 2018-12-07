import { Command, flags } from "@oclif/command";

export default class GenerateBundle extends Command {
  static description = "Generate bundle from wc-bundle.json";

  static examples = [`wc-bundler generate`];

  static flags = {
    help: flags.help({ char: "h" })
  };

  async run() {
    this.log(
      `The bundle has been generated now you can run build it by running:`
    );
    this.log(`cd wc-bundle`);
    this.log(`npm i`);
    this.log(`npm run build`);
    this.log(
      `The output bundle will be ready for you in: wc-bundle/components`
    );
  }
}
