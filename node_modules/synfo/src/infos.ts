/**
 * Synfo Infos File
 * 
 * (c) Romein van Buren 2021
 * @license MIT
 */

import { Info } from './lib'

/**
 * An array of all {@link Info}s this program can return.
 */
export const INFOS: Info[] = [
  { category: "uname", name: "sysname", command: "uname" },
  { category: "uname", name: "hostname", command: "uname -n" },
  { category: "uname", name: "kernelversion", command: "uname -v" },
  { category: "uname", name: "kernelrelease", command: "uname -r" },
  { category: "uname", name: "hardware", command: "uname -m" },
  { category: "uname", name: "uname", command: "uname -a" }
];
