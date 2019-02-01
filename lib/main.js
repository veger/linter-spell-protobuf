'use babel';

import { CompositeDisposable } from 'atom';

const grammarScopes = [
  'source.protobuf' // language-protobuf
];

export default {
  disposables: null,

  provideGrammar () {
    return [{
      grammarScopes: grammarScopes,
      checkedScopes: {
        'source.protobuf': false,
        'comment.line.double-slash.protobuf': true
      }
    }];
  },

  provideDictionary () {
    let wordList = require('linter-spell-word-list');
    let a = new wordList.ConfigWordList({
      name: 'Protobuf',
      keyPath: 'linter-spell-protobuf.words',
      grammarScopes: grammarScopes
    });
    this.disposables.add(a);
    return a.provideDictionary();
  },

  activate () {
    this.disposables = new CompositeDisposable();
    require('atom-package-deps').install('linter-spell-protobuf')
      .then(() => {
        console.log('All linter-spell-protobuf dependencies installed, good to go');
      });
  },

  deactivate () {
    this.disposables.dispose();
  }
};
