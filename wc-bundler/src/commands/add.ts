import { Command, flags } from "@oclif/command";
import { definitionFileExists } from "./../lib/definitionFile";

export default class AddComponent extends Command {
  static description = "Add Web component wc-bundle.json";

  static examples = [
    `wc-bundler add <web-component-package> -m preload
`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    path: flags.string({
      char: "p",
      default: "",
      description: "Import path, inferred if not provided"
    }),
    mode: flags.string({
      char: "m",
      options: ["default", "preload"], // only allow the value to be from a discrete set
      default: "default",
      description:
        "Webpack loading mode, if set to preload it'll add the component as chunk"
    })
  };

  static args = [{ name: "component-name", required: true }];

  async run() {
    const { args, flags } = this.parse(AddComponent);
    this.log(definitionFileExists());
    this.log(args, flags);
  }
}
