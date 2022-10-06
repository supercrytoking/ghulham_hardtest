/**
 * Synfo Command Line Interface
 * 
 * (c) Romein van Buren 2021
 * @license MIT
 */

import { getInfo, listInfos } from "./lib";
const pkgJson = require('../package.json');

/**
 * Command Line Interface
 * 
 * This is the class used by the executable located in `bin/synfo`. The useful
 * function here is {@link program}, which actually runs the CLI.
 */
export class CLI {
  /**
   * The command 
   * 
   * @var string
   */
  command: string;

  /**
   * Class constructor
   * 
   * @param command Command to be executed.
   */
  constructor(command: string) {
    this.command = command;
  }

  /**
   * Get help text
   * 
   * @private
   */
  getHelpText(): string {
    return `SYNFO v${pkgJson.version}
A CLI tool to view many types of system metadata.

Usage:
  synfo <info_name>
  synfo help

Where info_name is the name of info you'd like to have returned. Must be one of:
${listInfos(true)}`;
  }

  /**
   * Run the CLI program
   */
  program(): void {
    /**
     * Check if user specified command
     */
    if (!this.command) {
      process.stdout.write(this.getHelpText());
      return;
    }

    /**
     * If command is `help`, show help text
     */
    else if (this.command === 'help') {
      process.stdout.write(this.getHelpText());
      return;
    }

    /**
     * If not, user wants info about the system
     */
    else {
      process.stdout.write(getInfo(this.command));
      return;
    }
  }
}
