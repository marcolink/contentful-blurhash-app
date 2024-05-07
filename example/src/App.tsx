import './App.css'
import {useEffect, useState} from "react";
import {getBlurHashImages} from "./client.ts";
import {TypeBlurhashImageWithoutUnresolvableLinksResponse} from "./types.ts";
import {BlurhashImage} from "./BlurhashImage.tsx";
import {Asset} from "contentful";

const BASE_SIZE = 200

function App() {
  const [data, setData] = useState<TypeBlurhashImageWithoutUnresolvableLinksResponse[]>([]);

  useEffect(() => {
    getBlurHashImages().then((response) => {
      setData(response.items);
    })
  }, []);

  return (
    <>
      <div>
      </div>
      <h1>Blurhash Image</h1>
      <div className={'container'}>
        {data
          .filter((entry) => entry.fields.image?.fields.file?.url)
          .map((entry, index) => {
            const aRatio = imageAspectRatio(entry.fields.image!)
            const size = {width: BASE_SIZE, height:  BASE_SIZE * aRatio}
            const url = `${entry.fields.image?.fields.file?.url}?w=${BASE_SIZE}`
            return (
              <div key={entry.sys.id} style={{...size}}>
                <BlurhashImage blurhash={entry.fields.blurhash} src={url} delay={index * 0.2} />
               </div>
            )
          })}
      </div>
      <p className="footer">
        <a
          href="https://github.com/marcolink/contentful-blurhash-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Source
        </a>
      </p>
    </>
  )
}

function imageAspectRatio(asset:Asset<'WITHOUT_UNRESOLVABLE_LINKS', ''>) {
  if (asset.fields.file?.details?.image) {
    return aspectRatio(asset.fields.file.details.image.width, asset.fields.file.details.image.height)
  }
  return 1
}

function aspectRatio(width: number, height: number) {
  return height / width
}

export default App
