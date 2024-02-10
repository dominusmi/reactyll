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
    component: string
    url: string
    title: string
    language: string
}

export type BlogLanguageWrapper = {[Key: string]: BlogProperties}
export type RouteWrapper = {[Key: string]: BlogLanguageWrapper}

export function getBlogForLanguage(blog: BlogLanguageWrapper, language: string, defaultLanguage: string): BlogProperties {
    return blog[language] ?? blog[defaultLanguage];
}

export const getUrlForLanguage = (blog: BlogLanguageWrapper, language: string, defaultLanguage: string): string => {
    return blog[language]?.url ?? blog[defaultLanguage].url;
}


const importComponent = (path: string) => {
    return React.lazy(() => import(`${path}`));
};

export const getBlogRoutes = (blogs: RouteWrapper, importer: any): BlogMapper[] => {
    return Object.values(blogs).map((blog) => {
        return Object.values(blog).map((props) => {
            return { url: props.url, Component: importer(props.component) };
        })
    }).flat() as unknown as BlogMapper[];
}






