"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlForLanguage = exports.getBlogForLanguage = void 0;
var getBlogForLanguage = function (blog, language, defaultLanguage) {
    var _a;
    return (_a = blog[language]) !== null && _a !== void 0 ? _a : blog[defaultLanguage];
};
exports.getBlogForLanguage = getBlogForLanguage;
var getUrlForLanguage = function (blog, language, defaultLanguage) {
    var _a, _b;
    return (_b = (_a = blog[language]) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : blog[defaultLanguage].url;
};
exports.getUrlForLanguage = getUrlForLanguage;
