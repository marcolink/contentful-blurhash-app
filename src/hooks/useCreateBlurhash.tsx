import {useSDK} from "@contentful/react-apps-toolkit";
import {encode, isBlurhashValid} from "blurhash";
import {PlainClientAPI} from "contentful-management";
import {useMemo, useRef} from "react";
import {useQuery} from "@tanstack/react-query";

type InputProps = {
  assetId?: string
  initialBlurHash?: string,
  width?: number
  height?: number
  componentX?: number,
  componentY?: number,
  language?: string
}

type Props = InputProps & Required<Pick<InputProps, 'width' | 'componentX' | 'componentY'>>

const defaultProps: Props = {
  width: 320,
  height: 320,
  componentX: 3,
  componentY: 3,
  language: 'en-US'
}

export const useCreateBlurhash = (props: InputProps) => {
  const assetAPI = useSDK().cma.asset
  const {
    assetId,
    initialBlurHash,
    width,
    height,
    componentX, componentY,
    language
  } = Object.assign({}, defaultProps, props) as Props & Required<Pick<Props, 'language'>>;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = useMemo(() => <canvas ref={canvasRef} height={height} width={width} style={{display: 'none'}}/>, [])

  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['cma', 'asset', assetId],
    queryFn: async () => {
      if (!assetId) {
        throw 'No assetId defined';
      }
      const assetUrl = await loadAssetUrl(assetAPI, assetId, language)
      const image = await loadImage(`${assetUrl}?w=${width}`)
      const imageData = getImageData(image, canvasRef.current!);
      const hash = encode(imageData.data, imageData.width, imageData.height, componentX, componentY)
      const validation = isBlurhashValid(hash);
      if (!validation.result) {
        throw validation.errorReason
      }
      return hash;
    },
    enabled: !!assetId
  })

  return {
    blurhash: data || initialBlurHash,
    blurhashCanvas: canvas,
    blurhashError: error,
    blurhashIsLoading: isLoading,
    reFetch: refetch
  }
}

const loadImage = async (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });
}

const loadAssetUrl = async (assetAPI: PlainClientAPI['asset'], assetId: string, language: string): Promise<string | undefined> => {
  const asset = await assetAPI.get({assetId})

  return asset.fields["file"][language].url;
}

const getImageData = (image: any, canvas: HTMLCanvasElement) => {
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context!.drawImage(image, 0, 0);
  return context!.getImageData(0, 0, image.width, image.height);
};
