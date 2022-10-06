/**
 * Synfo Helper Functions
 * 
 * (c) Romein van Buren 2021
 * @license MIT
 */

import { INFOS } from './infos';
const { execSync } = require("child_process");

/**
 * Interface for one system "info"
 * 
 * An "info" is a single metadata string from the hardware, software, system
 * etc. on the current computer. The info is retrieved by executing a
 * {@link command}.
 */
export interface Info {
  /** The command name */
  name: string;
  /** The category to which the command belongs */
  category: string;
  /** Command to execute to retrieve the info */
  command: string;
};

/**
 * Retrieve data of one {@link Info} in `infos.json`
 * 
 * @param name Name of the info
 */
export function getInfoMeta(name: string) {
  // let info: Info = INFOS.find(i => i.name === name);
  let info: Info | undefined = INFOS.find(function(v) { return v.name === name; });

  if (!info) {
    throw new Error("No such info");
  }

  return info;
}

/**
 * Get system metadata from an {@link Info} instance
 * 
 * The info is retrieved by executing an {@link Info.command}.
 * 
 * @param name Name of the info, used to look it up in the {@link INFOS} array
 * @returns Command output
 */
export function getInfo(name: string): string {
  let info: Info = getInfoMeta(name);
  let msg: string;

  msg = execSync(info.command).toString();

  return msg;
  // return;
}

/**
 * Create an human or machine readable array of available infos
 * 
 * @param prettyPrint Whether to pretty-print (make it human redable) the list
 * @returns Array (if `prettyPrint` is truthy) or string (if `prettyPrint` is
 *          falsy) containing the list
 */
export function listInfos(prettyPrint = false): string[] | string {
  let output: any;

  INFOS.sort(
    (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
  ).forEach(i => {
    if (prettyPrint) {
      output += `- ${i["name"]}\n`;
    } else {
      output.push(i["name"]);
    }
  });

  return output;
}
