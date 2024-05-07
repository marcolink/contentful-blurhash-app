import {useEffect, useState} from "react";
import {getBlurHashImages} from "./client.ts";
import {TypeBlurhashImageWithoutUnresolvableLinksResponse} from "./types.ts";
import {Gallery} from "./Gallery.tsx";

function App() {
  const [data, setData] = useState<TypeBlurhashImageWithoutUnresolvableLinksResponse[]>([]);

  useEffect(() => {
    getBlurHashImages().then((response) => {
      setData(response);
    })
  }, []);

  return (
    <div className={'container mx-auto p-4'}>
      <h1 className={'text-center font-mono text-2xl font-semibold pb-4'}>Blurhash Image</h1>
      <Gallery images={data}/>
      <p className={'text-center p-3 font-bold text-blue-800'}>
        <a
          href="https://github.com/marcolink/contentful-blurhash-app"
          target="_blank"
        >
          Github Source
        </a>
      </p>
    </div>
  )
}

export default App
