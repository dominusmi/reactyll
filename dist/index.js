export const getBlogForLanguage = (blog, language, defaultLanguage) => {
    var _a;
    return (_a = blog[language]) !== null && _a !== void 0 ? _a : blog[defaultLanguage];
};
export const getUrlForLanguage = (blog, language, defaultLanguage) => {
    var _a, _b;
    return (_b = (_a = blog[language]) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : blog[defaultLanguage].url;
};
