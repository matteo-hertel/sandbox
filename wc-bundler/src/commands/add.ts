import { Command, flags } from "@oclif/command";
import cli from "cli-ux";

import { Component } from "../lib/interfaces";

import { addToDefinitionFile } from "./../lib/definitionFile";

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

  static args = [{ name: "name", required: true }];

  async run() {
    const { args, flags } = this.parse(AddComponent);
    const component = this.makeComponent(args.name, flags.path, flags.mode);
    cli.action.start("Adding your component");
    await addToDefinitionFile(component);
    cli.action.stop();
    this.log(`Component ${args.name} added to your bundle`);
  }

  makeComponent(
    name: string,
    path: string | undefined,
    mode: string | undefined
  ): Component {
    if (!path) {
      const [, ...pathArray] = name.split("/");
      path = pathArray.join("/");
    }
    //making TS happy :(
    if (!mode) {
      mode = `${mode}`;
    }
    return {
      name,
      path,
      mode
    };
  }
}
