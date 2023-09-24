/**
 * Represents an individual PDF template within a leya-print package.
 * Each template has an identifier, title, and description, along with the definitions for the web components
 * that form its content and optional header and footer.
 * It also contains sample data sets that help in testing and demonstrating the template.
 */
export interface TemplateInfo {
  /** Unique, URL-compatible identifier for the template within the scope of its package. */
  ident: string;

  /** A short, readable title for the template. Maximum of 80 characters. */
  title: string;

  /** Detailed description outlining the template and its intended use. */
  description: string;

  /** Definitions for web components that make up various parts of the template. */
  components: {
      /** Web component tag-name for a repeating page header (optional). */
      header?: string;
      /** Web component tag-name for the main content. */
      content: string;
      /** Web component tag-name for a repeating page footer (optional). */
      footer?: string;
  }

  /**
   * Sample data for the template in the format expected by the web components.
   * Multiple samples can be provided for a single template, allowing you to test under different data conditions.
   */
  sampleData: {
      /** Unique identifier for the sample data set. Helps to differentiate between different types of samples like 'minimal', 'typical', 'extensive', etc. */
      [ident: string]: {
          /** Short descriptor of the sample. */
          title: string;
          /** Optional elaboration of what the sample represents. */
          description?: string;
          /** The actual sample data; format depends on what the template expects. */
          data: any;
      }
  };
}
