# mmex2json
> Converts [QIF](https://en.wikipedia.org/wiki/Quicken_Interchange_Format) data exported from [Money Manager EX](https://github.com/moneymanagerex/moneymanagerex) to JSON format.

A thin wrapper around [qif2json](https://github.com/spmason/qif2json) to handle multiple accounts, account metadata, and some MMEX-specific attributes.


## Usage
This is a command line utility. It reads from a specified file, and outputs to standard output - which you can pipe to a file.

With `npx` (most convenient):

```
npx mmex2json <qif-file> > <output-file>

e.g.
npx mmex2json exported.qif > converted.json
```

By installing globally:
```
npm install -g mmex2json

mmex2json <qif-file> > <output-file>
```


## Exporting a QIF file from Money Manager EX
1. File > Export > QIF Files
1. Categories - leave unticked
1. Accounts - choose one or many
1. Date Format - leave as DD/MM/YY

Note that unselected accounts are included in the export if there are transfers between them and an account that is selected. Only the transactions for those transfers are included.

Tested with Money Manager EX version 1.3.3.
