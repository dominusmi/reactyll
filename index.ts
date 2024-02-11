import React from "react";

type LanguageUrl = [string, string]


export interface BlogPage<T> {
    markdown: string,
    languages: LanguageUrl[]
    properties: BlogProperties & T
}

export interface BlogMapper { 
    Component: React.LazyExoticComponent<React.ComponentType<any>>,
    url: string
}

export interface BlogProperties {
    url: string
    title: string
    language: string
}

export type BlogLanguageWrapper = {[Key: string]: BlogProperties}
export type RouteWrapper = {[Key: string]: BlogLanguageWrapper}

export const getBlogForLanguage = (blog: BlogLanguageWrapper, language: string, defaultLanguage: string): BlogProperties => {
    return blog[language] ?? blog[defaultLanguage];
}

export const getUrlForLanguage = (blog: BlogLanguageWrapper, language: string, defaultLanguage: string): string => {
    return blog[language]?.url ?? blog[defaultLanguage].url;
}




