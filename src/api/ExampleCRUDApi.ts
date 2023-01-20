import { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApi } from "./BaseApi";
import { apiConfig } from "../config/apiConfig";

class ExampleCRUDApi extends BaseApi {
  public constructor(apiConfig: AxiosRequestConfig) {
    super(apiConfig);

    // This is from prior dev team...
    // Tbh Not sure what this is doing or if its necessary
    this.update10402Form = this.update10402Form.bind(this);
    this.delete1040Form = this.delete1040Form.bind(this);
    this.fetch1040FormDetails = this.fetch1040FormDetails.bind(this);
  }

  public update1040Form = async ({ id, payload }: any) =>
    await this.put(`/tax_1040_forms/${id}`, payload)
      .then((response: AxiosResponse) => response)
      .catch((error) => ({ error: JSON.stringify(error.message) }));

  public delete1040Form = async (id: string) =>
    await this.delete(`/tax_1040_forms/${id}`)
      .then((response: AxiosResponse) => response)
      .catch((error) => ({ error: JSON.stringify(error.message) }));

  public fetch1040FormDetails = async () =>
    await this.get("/tax_1040_forms")
      .then((response: AxiosResponse) => response)
      .catch((error) => ({ error: JSON.stringify(error.message) }));

export const exampleApi = new ExampleCRUDApi(apiConfig);
