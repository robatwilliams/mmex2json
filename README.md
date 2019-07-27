# mmex2json
> Converts [QIF](https://en.wikipedia.org/wiki/Quicken_Interchange_Format) data exported from [Money Manager EX](https://github.com/moneymanagerex/moneymanagerex) to JSON format.


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
