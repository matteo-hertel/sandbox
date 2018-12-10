import { Command, flags } from "@oclif/command";
import { createReadStream, createWriteStream } from "fs";
import { dirname } from "path";

import { BUNDLE_PATH } from "../../constants";
import { loadDefinitionFile } from "../../lib/definitionFile";
import { Component, DefinitionFile } from "../../lib/interfaces";
import { asyncMkdir } from "./../../lib/io";

const fileList = [
  "package.json.tpl",
  "webpack.config.js.tpl",
  "public/index.html.tpl",
  "src/index.js.tpl"
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
    await Promise.all(copyTemplate(fileList));

    appendToFile(
      `${BUNDLE_PATH}src/index.js`,
      processDefinitionFile(definitionFile)
    );
    this.log(
      `The bundle has been generated now you can run build it by running:`
    );
    this.log(`cd wc-bundle`);
    this.log(
      `npm i && npm i -D ${definitionFile.components
        .map((c: Component) => c.name)
        .join(" ")}`
    );
    this.log(`npm run build`);
    this.log(
      `The output bundle will be ready for you in: wc-bundle/components`
    );
  }
}
async function ensurePath(path: string): Promise<string> {
  await asyncMkdir(dirname(`${BUNDLE_PATH}${path}`), {
    recursive: true
  });
  return path;
}

function appendToFile(file: string, content: string[]): void {
  const stream = createWriteStream(file, { flags: "a" });
  stream.write("");
  content.map(async c => stream.write(Buffer.from(`${c}\n`, "utf-8")));
  stream.end();
}

function processDefinitionFile(definitionFile: DefinitionFile): string[] {
  return definitionFile.components.map(makeComponentImport);
}

function makeComponentImport(component: Component): string {
  const importStatement = "import(";
  if (component.mode === "default") {
    return `${importStatement}'${component.name}/${component.path}');`;
  }
  return `${importStatement}/* webpackPreload: true */ '${component.name}/${
    component.path
  }');`;
}
async function copyFile(path: string): Promise<void> {
  await createReadStream(`${__dirname}/template/${path}`)
    //.pipe(new (Replacer as any)("wc-bundler-bundle", "matte is awesome"))
    .pipe(createWriteStream(`${BUNDLE_PATH}${path.replace(".tpl", "")}`));
}
function copyTemplate(fileList: string[]): Promise<any>[] {
  return fileList.map(ensurePath).map(p => p.then(copyFile));
}
