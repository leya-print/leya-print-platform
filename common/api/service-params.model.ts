  /**
   * @interface for pdf service parameters
   */
  export interface ServiceParams {
    reason?: string;
    /** shown in the signature as name of the signer */
    name?: string;
    location?: string;
    contactInfo?: string;
  }