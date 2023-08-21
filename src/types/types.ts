import { EndpointApi } from "./enum"

export type BaseApiOptions = {
  method: string,
  body?: BodyInit | null
}

export type BaseApiType = {
  url: EndpointApi | string,
  options?: BaseApiOptions
}