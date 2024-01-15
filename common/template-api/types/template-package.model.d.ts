import { TemplateInfo } from './template-info.model';

/**
 * Represents a package of PDF templates as part of the leya-print system.
 * Each package can contain multiple templates and is identified by a unique ID and a user-defined identifier (ident).
 * The package might also have a version string.
 */
export interface TemplatePackage {
    /** Unique identifier for the template package, generated as a UUID by the server during deployment. */
    id?: string;

    /**
     * URL-compatible identifier for the template package.
     * Multiple versions of the same package could share the same 'ident'.
     */
    ident: string;

    /** Version string for the template package. Semantic versioning is recommended. */
    version?: string;

    /** Path to where the templates can be found from the linked application. The path is the file path where the template info can be found*/
    templatesFilePath?: string;

    /** Array of templates included in this package. */
    templates: TemplateInfo[];
}
