import React from "react";
type LanguageUrl = [string, string];
export interface BlogPage<T> {
    markdown: string;
    languages: LanguageUrl[];
    properties: BlogProperties & T;
}
export interface BlogMapper {
    Component: React.LazyExoticComponent<React.ComponentType<any>>;
    url: string;
}
export interface BlogProperties {
    url: string;
    title: string;
    language: string;
}
export type BlogLanguageWrapper<T> = {
    [Key: string]: BlogProperties & T;
};
export type RouteWrapper<T> = {
    [Key: string]: BlogLanguageWrapper<T>;
};
export declare const getBlogForLanguage: (blog: BlogLanguageWrapper<any>, language: string, defaultLanguage: string) => BlogProperties;
export declare const getUrlForLanguage: (blog: BlogLanguageWrapper<any>, language: string, defaultLanguage: string) => string;
export {};
