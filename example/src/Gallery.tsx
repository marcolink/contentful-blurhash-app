import {TypeBlurhashImageWithoutUnresolvableLinksResponse} from "./types.ts";
import {Asset} from "contentful";
import {Blurhash} from "react-blurhash";

const BASE_SIZE = 350

type Props = {
  images: TypeBlurhashImageWithoutUnresolvableLinksResponse[]
};

export function Gallery({images}: Props) {

  return (
    <div className={'grid grid-cols-2 gap-4'}>
      {images.flatMap((entry, index) => {
        const aRatio = imageAspectRatio(entry.fields.image!)
        const size = {width: BASE_SIZE, height: Math.round(BASE_SIZE * aRatio)}
        const url = `${entry.fields.image?.fields.file?.url}?w=${size.width}&h=${size.height}&fm=jpg`
        return [
          <Blurhash
            hash={entry.fields.blurhash}
            width={size.width}
            height={size.height}
            className={'place-self-end'}
          />,
          <img
            key={index}
            src={url}
            width={size.width}
            height={size.height}
            className={'place-self-start'}/>
        ]
      })}
    </div>
  );
}

function imageAspectRatio(asset: Asset<'WITHOUT_UNRESOLVABLE_LINKS', ''>) {
  if (asset.fields.file?.details?.image) {
    return asset.fields.file.details.image.height / asset.fields.file.details.image.width
  }
  return 1
}