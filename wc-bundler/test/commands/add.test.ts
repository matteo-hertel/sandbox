import { expect, test } from "@oclif/test";
import { readFileSync, unlinkSync, writeFileSync } from "fs";

const CUSTOM_PATH = "/my/custom/path";

const FILE_SNAPSHOT = `{
  "components": [
    {
      "name": "@component/component-name",
      "path": "component-name",
      "mode": "default"
    }
`;

describe("Add Command", () => {
  test
    .stdout()
    .command(["add", "@component/component-name"])
    .it("adds the given component to the wc-bundle.json", ctx => {
      expect(ctx.stdout).to.contain("added");
      expect(readFileSync(`${process.cwd()}/wc-bundle.json`).toString()).to.not
        .be.empty;
      unlinkSync(`${process.cwd()}/wc-bundle.json`);
    });

  test
    .stdout()
    .command(["add", "@component/component-name", `-m=preload`])
    .it(
      "adds the given component to the wc-bundle.json with the correct mode",
      ctx => {
        expect(ctx.stdout).to.contain("added");
        expect(readFileSync(`${process.cwd()}/wc-bundle.json`).toString()).to
          .not.be.empty;
        unlinkSync(`${process.cwd()}/wc-bundle.json`);
      }
    );

  test
    .stdout()
    .command(["add", "@component/component-name", `-p=${CUSTOM_PATH}`])
    .it(
      "adds the given component to the wc-bundle.json with the correct path",
      ctx => {
        expect(ctx.stdout).to.contain("added");
        expect(readFileSync(`${process.cwd()}/wc-bundle.json`).toString()).to
          .not.be.empty;
        unlinkSync(`${process.cwd()}/wc-bundle.json`);
      }
    );

  test
    .do(() => {
      writeFileSync(`${process.cwd()}/wc-bundle.json`, FILE_SNAPSHOT);
    })
    .stdout()
    .command(["add", "@other/other-component-name"])
    .it(
      "adds the given component to the wc-bundle.json when the file exists",
      ctx => {
        expect(ctx.stdout).to.contain("added");
        expect(
          readFileSync(`${process.cwd()}/wc-bundle.json`).toString()
        ).to.not.equal(FILE_SNAPSHOT);
        unlinkSync(`${process.cwd()}/wc-bundle.json`);
      }
    );

  test
    .do(() => {
      writeFileSync(`${process.cwd()}/wc-bundle.json`, FILE_SNAPSHOT);
    })
    .stdout()
    .command(["add", "@component/component-name"])
    .it(
      "adds the given component to the wc-bundle.json but prevents duplication",
      ctx => {
        expect(ctx.stdout).to.contain("added");
        expect(
          readFileSync(`${process.cwd()}/wc-bundle.json`).toString()
        ).not.to.equal("");
        unlinkSync(`${process.cwd()}/wc-bundle.json`);
      }
    );
});
