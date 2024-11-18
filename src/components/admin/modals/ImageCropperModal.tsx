import { SyntheticEvent, useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, PercentCrop } from "react-image-crop";
import Backdrop from "../../user/core/Backdrop";
import { useModal } from "../../../contexts/ModalContext";
import { setCanvasPreview } from "../core/SetCanvasPreview";

const MIN_DIMENSION = 100;

type ImageCropperModalProps = {
  aspectRatio: "6/9" | "1/1" | "5/6";
  onClose: (ratio: "6/9" | "1/1" | "5/6", imageUrl: string) => void;
}

const aspectRatios = {
  "6/9": 6 / 9,
  "1/1": 1,
  "5/6": 5 / 6,
}

export default function ImageCropperModal({ aspectRatio, onClose }: ImageCropperModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const { setShowImageCropperModal } = useModal();
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<PercentCrop>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || ""
      imageElement.src = imageUrl;

      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  }

  const onImageLoad = (image: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = image.currentTarget;
    const crop = makeAspectCrop({
      unit: "%",
      height: MIN_DIMENSION,
    }, aspectRatios[aspectRatio], naturalWidth, naturalHeight);

    const centered = centerCrop(crop, naturalWidth, naturalHeight);
    setCrop(centered);
  }

  return (
    <>
      <Backdrop onClose={() => { setShowImageCropperModal(false) }}>
        <div className="px-6 py-12">
          <input className="block file:rounded-full file:border-0" type="file" accept="image" onChange={onSelectFile} />
          {imgSrc &&
            <div className="flex flex-col items-center p-2">
              <div className="bg-black w-full flex flex-col items-center">
                <ReactCrop
                  crop={crop}
                  keepSelection
                  aspect={aspectRatios[aspectRatio]}
                  minWidth={MIN_DIMENSION}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}>
                  <img src={imgSrc} alt="Crop" style={{ maxHeight: "28rem" }} onLoad={onImageLoad} ref={imgRef} />

                </ReactCrop>
              </div>
              <button className="p-2 px-4 bg-secondary-300 border-2 border-secondary-100 rounded-lg mt-4"
                onClick={() => {
                  setShowImageCropperModal(false);
                  if (imgRef.current && previewCanvasRef.current && crop) {
                    setCanvasPreview(imgRef.current, previewCanvasRef.current, convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height));
                  }

                  const dataUrl = previewCanvasRef.current?.toDataURL();
                  onClose(aspectRatio, dataUrl || "");
                }}
              >Crop Image</button>
            </div>
          }
          {crop && <canvas ref={previewCanvasRef} className="mt-4 border-4 absolute hidden -z-10" style={{ aspectRatio: aspectRatios[aspectRatio], height: 0 }} />}
        </div>
      </Backdrop>
    </>
  )
}