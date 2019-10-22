"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var docEndnotesRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-describedat': null
  },
  relatedConcepts: [{
    module: 'EPUB',
    concept: {
      name: 'rearnotes [EPUB-SSV]'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['doc-endnote']],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section', 'landmark']]
};
var _default = docEndnotesRole;
exports.default = _default;