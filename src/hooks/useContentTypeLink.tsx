import {useSDK} from "@contentful/react-apps-toolkit";
import {FieldAppSDK} from "@contentful/app-sdk";

export function useContentTypeLink() {
  const sdk = useSDK<FieldAppSDK>();
  return `https://app.contentful.com/spaces/${sdk.ids.space}/environments/${sdk.ids.environmentAlias || sdk.ids.environment}/content_types/${sdk.ids.contentType}`
}