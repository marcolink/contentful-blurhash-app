import {createClient} from "contentful";
import {TypeBlurhashImageSkeleton} from "./types.ts";

const client = createClient({
  space: "02antqq6yz4y",
  accessToken: "tCAITMYW1nv43wNN19yEa6tLAYxtJCRlN3TjzXhtVLM",
})

export function getBlurHashImages() {
  return client.withoutUnresolvableLinks.getEntries<TypeBlurhashImageSkeleton>({content_type: 'blurhashImage'})
}

