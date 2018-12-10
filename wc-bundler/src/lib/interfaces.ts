export interface Component {
  name: string;
  path: string;
  mode?: string;
}

export interface DefinitionFile {
  components: Component[] | [];
}
