import { DEFINITION_FILE_NAME } from "./../constants";

export function definitionFileExists(): string {
  return `${process.cwd()}/${DEFINITION_FILE_NAME}`;
}
