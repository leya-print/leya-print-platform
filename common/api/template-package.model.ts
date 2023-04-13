import { TemplateInfo } from './template-info.model';

export interface TemplatePackage {
    /**
     * unique template package id
     *
     * reassigned by the server after every upload
     */
    id?: string;

    /**
     * name to identify the template package
     *
     * there might be more than one version with the same name uploaded on the same server
     */
    ident: string;

    /**
     * version hint
     *
     * helps to distinguish multiple versions of the same template package on the same server
     */
    version?: string;

    templates: TemplateInfo[];
}
