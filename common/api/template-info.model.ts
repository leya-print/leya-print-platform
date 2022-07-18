export interface TemplateInfo {
    /**
     * unique template ident in the scope of a template package
     */
    ident: string;

    /**
     * readable short (max 80 characters) title of the template
     */
    title: string;

    /**
     * longer description of the template and its usage
     */
    description: string;

    components: {
        header?: string;
        content: string;
        footer?: string;
    }

    /**
     * set of sample data
     */
    sampleData: { [ident: string]: {
        title: string;
        description?: string;
        data: any;
    } };
}