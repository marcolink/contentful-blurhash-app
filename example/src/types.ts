import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlurhashImageFields {
  title: EntryFieldTypes.Symbol;
  image: EntryFieldTypes.AssetLink;
  blurhash: EntryFieldTypes.Symbol;
}

export type TypeBlurhashImageSkeleton = EntrySkeletonType<TypeBlurhashImageFields, "blurhashImage">;
export type TypeBlurhashImage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBlurhashImageSkeleton, Modifiers, Locales>;
export type TypeBlurhashImageWithoutLinkResolutionResponse = TypeBlurhashImage<"WITHOUT_LINK_RESOLUTION">;
export type TypeBlurhashImageWithoutUnresolvableLinksResponse = TypeBlurhashImage<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeBlurhashImageWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeBlurhashImage<"WITH_ALL_LOCALES", Locales>;
export type TypeBlurhashImageWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeBlurhashImage<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeBlurhashImageWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeBlurhashImage<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
