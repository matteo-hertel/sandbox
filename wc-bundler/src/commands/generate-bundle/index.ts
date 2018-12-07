import { Command, flags } from "@oclif/command";
import { BUNDLE_PATH } from "../../constants";
import { loadDefinitionFile } from "../../lib/definitionFile";
import { createReadStream, createWriteStream } from "fs";
import { dirname } from "path";

import { asyncMkdir, Replacer } from "./../../lib/io";
const fileList = [
  "package.json.tpl",
  "webpack.config.js.tpl",
  "public/index.html.tpl",
  "index.js.tpl"
];

export default class GenerateBundle extends Command {
  static description = "Generate bundle from wc-bundle.json";

  static examples = [`wc-bundler generate`];

  static flags = {
    help: flags.help({ char: "h" })
  };

  async run() {
    // tslint:disable-next-line
    const { flags } = this.parse(GenerateBundle);
    let definitionFile;
    try {
      const buffer = await loadDefinitionFile();
      definitionFile = JSON.parse(buffer.toString());
      // tslint:disable-next-line
    } catch (exc) {
      //eiher file doesn't exists or is invalid json
      this.error("Missing or invalid definition file");
    }
    console.log(definitionFile);
    await asyncMkdir(dirname(`${BUNDLE_PATH}${fileList[0]}`), {
      recursive: true
    });
    await createReadStream(`${__dirname}/template/${fileList[0]}`)
      .pipe(new (Replacer as any)("wc-bundler-bundle", "matte is awesome"))
      .pipe(
        createWriteStream(`${BUNDLE_PATH}${fileList[0].replace(".tpl", "")}`)
      );

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
