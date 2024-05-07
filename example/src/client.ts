import {createClient} from "contentful";
import {TypeBlurhashImageWithoutUnresolvableLinksResponse, TypeGallerySkeleton} from "./types.ts";

const client = createClient({
  space: "02antqq6yz4y",
  accessToken: "tCAITMYW1nv43wNN19yEa6tLAYxtJCRlN3TjzXhtVLM",
})

export async function getBlurHashImages() {
  const gallery = await client.withoutUnresolvableLinks.getEntry<TypeGallerySkeleton>('1GQojsLNbXAK5GrQ1gX0Zk')
  return gallery.fields.images.filter((entry) => entry && entry.fields.image && entry.fields.blurhash) as TypeBlurhashImageWithoutUnresolvableLinksResponse[]
}

