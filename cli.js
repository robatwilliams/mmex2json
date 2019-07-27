#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const qif2json = require('qif2json');

const readFile = util.promisify(fs.readFile);

(async () => {
  const filename = process.argv.slice(2)[0];
  const fileData = await readFile(filename);
  const lines = fileData.toString('utf8').split('\r\n');  // TODO handle LF

  // Split; qif2json only supports one account at a time
  const accountsLines = arraySplit(lines, '!Account').slice(1);
  const accounts = accountsLines.map(parseAccount);

  console.log(JSON.stringify(accounts, undefined, 2));
})();

function parseAccount(lines) {
  // Split again; quif2json doesn't support account info - only transactions. See https://github.com/spmason/qif2json/issues/10
  const [infoLines, recordsLines] = arraySplit(lines, '!Type:', { matchMode: 'startsWith', keepSeparator: true });

  const info = parseAccountInfo(infoLines);
  const { transactions } = qif2json.parse(recordsLines.join('\n'));

  return { info, transactions };
}

function parseAccountInfo(lines) {
  const extract = lineCode => lines.find(line => line[0] === lineCode).slice(1);

  // Currency appears in the description field (e.g. [GBP]), actual description is not exported (as of 1.3.3)
  const description = extract('D');
  const currency = description.substring(1, description.length - 1);

  return {
    currency,
    name: extract('N'),
    type: extract('T'),
  };
}

function arraySplit(array, separator, { matchMode, keepSeparator } = {}) {
  return array.reduce((accumulator, element) => {
    const match = matchMode === 'startsWith' ? element.startsWith(separator) : element === separator;

    if (match) {
      accumulator.push(keepSeparator ? [element] : []);
    } else {
      accumulator[accumulator.length - 1].push(element);
    }

    return accumulator;
  }, [[]]);
}
