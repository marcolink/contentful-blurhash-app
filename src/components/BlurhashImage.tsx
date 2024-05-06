import {decode} from "blurhash";
import {FC, useEffect, useMemo, useRef} from "react";

type Props = {
    blurhash: string,
    width: number,
    height: number
};

const BlurhashImage: FC<Props> = ({blurhash, width, height}) => {
    const pixels = useMemo(() => decode(blurhash, width, height), [blurhash]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            const imageData = context.createImageData(width, height);
            imageData.data.set(pixels);
            context.putImageData(imageData, 0, 0);
        }
    }, [pixels, canvasRef]);

    return (
        <canvas ref={canvasRef} height={height} width={width}/>
    );
};

export {BlurhashImage};
