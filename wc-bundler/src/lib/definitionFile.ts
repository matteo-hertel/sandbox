import { DEFINITION_FILE_NAME } from "./../constants";
import { Component, DefinitionFile } from "./interfaces";
import { asyncReadFile, asyncWriteFile } from "./io";

export async function addToDefinitionFile(component: Component) {
  let currentDefinitionFile;
  try {
    const buffer = await loadDefinitionFile();
    currentDefinitionFile = JSON.parse(buffer.toString());
    // tslint:disable-next-line
  } catch (exc) {
    //eiher file doesn't exists or is invalid json
    currentDefinitionFile = makeDefinitionFile();
  }
  if (
    !currentDefinitionFile.components.filter(componentExists(component.name))
      .length
  ) {
    currentDefinitionFile.components = [
      ...currentDefinitionFile.components,
      component
    ];
  }
  return writeDefinitionFile(currentDefinitionFile);
}

export function getDefinitionFilePath(): string {
  return `${process.cwd()}/${DEFINITION_FILE_NAME}`;
}

function componentExists(name: string): (component: Component) => boolean {
  return (component: Component): boolean => {
    return component.name === name;
  };
}

function writeDefinitionFile(data: DefinitionFile) {
  return asyncWriteFile(
    getDefinitionFilePath(),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export function loadDefinitionFile(): Promise<Buffer> {
  return asyncReadFile(getDefinitionFilePath());
}

function makeDefinitionFile(): DefinitionFile {
  return { components: [] };
}
