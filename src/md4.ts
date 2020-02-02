/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 1:32 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 1:32 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
// eslint-disable-next-line spaced-comment
// /<reference path="./index.d.ts" />

// import { toHex } from 'crypto-api/src/encoder/hex.mjs';
// import Md4 from 'crypto-api/src/hasher/md4.mjs';
import md5 from 'md5';

// TODO: using md4??
// const hasher = new Md4();
function md4(message: string): string {
  return md5(message);
}

export default md4;
