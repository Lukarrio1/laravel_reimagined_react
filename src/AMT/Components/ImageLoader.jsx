import React, { memo, useEffect, useMemo, useState } from "react";
import LoadingImage from "../../images/loading-placeholder.png";
import ImageNotFound from "../../images/image_not_found.jpg";
import useAnimation from "../Custom Hooks/useAnimation";

export const ImageLoader = memo(({ src = null, alt, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ImgSrc, setImgSrc] = useState(null);
  const error = useMemo(() => src == null, [src]);
  const Animation = useAnimation();
  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading == true) {
      setImgSrc((prev) => LoadingImage);
      return;
    }
    if (error == true) {
      setImgSrc((prev) => ImageNotFound);
      return;
    }
    setImgSrc(src);
  }, [isLoading, error, src]);

  return (
    <img
      src={ImgSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${Animation}`}
      style={style}
    />
  );
});

export default ImageLoader;
