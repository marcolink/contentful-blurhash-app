import {useSDK} from "@contentful/react-apps-toolkit";
import {encode, isBlurhashValid} from "blurhash";
import {PlainClientAPI} from "contentful-management";
import {useMemo, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {useInstanceParameters} from "./useInstanceParameters";
import {BLURHASH_DEFAULTS} from "../constants";

type InputProps = {
  assetId?: string
  initialBlurHash?: string,
  width?: number
  height?: number
  componentX?: number,
  componentY?: number,
  language?: string
}

type Props = InputProps & Required<Pick<InputProps, 'width' | 'height' | 'componentX' | 'componentY'>>

const defaultProps: Props = {
  width: 320,
  height: 320,
  componentX: BLURHASH_DEFAULTS.componentX,
  componentY: BLURHASH_DEFAULTS.componentY,
  language: 'en-US'
}

export const useCreateBlurhash = (props: InputProps) => {
  const sdk = useSDK()
  const {
    assetId,
    initialBlurHash,
    width,
    height,
    componentX,
    componentY,
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
      const asset = await sdk.cma.asset.get({assetId})
      if(!asset) {
        throw 'Asset not found';
      }

      if(!asset.fields.file[language].contentType.startsWith('image')) {
        throw 'Asset is not of type image';
      }

      const assetUrl = asset.fields["file"][language].url
      const image = await loadImage(`${assetUrl}?h=${height}`)
      const imageData = getImageData(image, canvasRef.current!);
      const hash = encode(imageData.data, imageData.width, imageData.height, componentX, componentY)
      const validation = isBlurhashValid(hash);
      if (!validation.result) {
        throw validation.errorReason
      }
      return {
        hash,
        width: imageData.width,
        height: imageData.height,
        aspectRatio: imageData.height / imageData.width
      };
    },
    enabled: !!assetId
  })

  return {
    width: data?.width || width,
    height: data?.height || height,
    aspectRatio: data?.aspectRatio || (height / width),
    blurhash: data?.hash || initialBlurHash,
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

const getImageData = (image: any, canvas: HTMLCanvasElement) => {
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context!.drawImage(image, 0, 0);
  return context!.getImageData(0, 0, image.width, image.height);
};
