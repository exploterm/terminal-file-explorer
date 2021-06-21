import { text } from "figlet";
import { dirname } from "path";
import { cwd } from "process";
import { ArgumentParser, ArgumentParserResults } from "./src/arguments";
import { CommandLineException } from "./src/exception";
import { ListFiles } from "./src/list";
import { SetupTermex } from "./src/setup";
import { checkFileExists, File } from "./src/utils";

const createTitle = (titleString: string = "Termex"): void => {
  text(
    "Termex",
    {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    (error: Error, result?: string) => {
      if (error) {
        return null;
      }
      console.log(result);
    }
  );
};

const initializeTermex = (filename: string, parameters: Array<string>) => {
  let file: string = filename;
  if (filename === "..") {
    file = dirname(filename);
  } else if (filename == ".") {
    file = cwd();
  }
  const fileObject: File = {
    path: file,
    exists: checkFileExists(filename, false),
    isDirectory: checkFileExists(filename),
  };
  if (!fileObject.exists) {
    new CommandLineException({
      message: `${file} does not exist`,
    });
  }
  const ls = new ListFiles(fileObject, parameters);
};

const performCommand = (result: ArgumentParserResults): Function => {
  const command = result.command;
  if (!command) {
    return (): void => {
      initializeTermex(cwd(), result.parameters);
    };
  }
  if (command == "help") {
    return (): void => {
      console.log("Showing help");
    };
  }
  return (): void => {
    initializeTermex(command, result.parameters);
  };
};

const setup = SetupTermex.createSetup()
const argumentParser: ArgumentParserResults =
  new ArgumentParser().parseArguments();
const execute: Function = performCommand(argumentParser);

const executeResults: any = execute();
