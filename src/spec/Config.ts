import { State } from './messages/State';

/**
 * The config file contains whatever parameters the Tap needs in order to pull
 * data from the source. Typically this will include the credentials for the API
 * or data source.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/CONFIG_AND_STATE.md#config-file
 */
export interface ConfigType {
  /**
   * `start_date` should be used on first sync to indicate how far back to grab
   * records. Start dates should conform to the RFC3339 specification.
   */
  start_date?: Date;

  /**
   * `user_agent` should be set to something that includes a contact email
   * address should the API provider need to contact you for any reason.
   *
   * @example Stitch (+support@stitchdata.com)
   */
  user_agent?: string;

  /**
   * A valid API key for the Tap.
   */
  api_key?: string;
}

/**
 * This object contains all input provided to the Tap. This includes all
 * available `CONFIG`/`STATE`/`CATALOG` records.
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#synopsis
 */
export interface TapInputType<S> {
  config: ConfigType;
  state?: State<S>;
  /** TODO: add state and catalog */
}
