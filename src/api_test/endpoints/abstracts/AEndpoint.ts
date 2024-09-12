/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { Logger } from "tslog";

import ConfigHandler from "../../config/configHandler";
import  { RestClient }  from "../../restClient/RestClient";

export abstract class AEndpoint {
  protected constructor(serviceUrl: string, serviceName: string) {
    const baseUrl: string = this.config.environmnetConfig.api_base_url;
    this.url = baseUrl + serviceUrl;
    this.restClient = new RestClient(this.url);
    this.serviceName = serviceName;
    this.log.info(`The Service URL for ${this.serviceName} is ${this.url}`);
  }

  public createdItemIds: Set<string> = new Set();

  protected config = ConfigHandler.getInstance();

  protected log: Logger = new Logger({
    minLevel: this.config.environmnetConfig.log_level,
    dateTimeTimezone:
      this.config.environmnetConfig.time_zone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  protected url: string;

  public restClient: RestClient;

  protected serviceName: string;

  public getBaseUrl(): string {
    return this.url;
  }
}
