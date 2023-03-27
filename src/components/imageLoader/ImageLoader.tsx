import { useEffect, useState } from "react";
import Loading from "../loading/Loading";


const ImageLoader = (props: {
  url: string,
}) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadedUrl, setLoadedUrl] = useState<string>();

  useEffect(() => {
    setLoading(true);
    var img = new Image();
    img.onload = function () {
      setLoading(false);
      setLoadedUrl(img.src);
      img.remove();
    };
    img.src = props.url;
  }, []);

  return (
    <div>
      {loading &&
        <Loading/>
      }
      {loadedUrl != null &&
        <img
        src={loadedUrl}
        alt=''
        className='w-full h-[250px] object-cover rounded-lg mb-5'
        />
      }
    </div>
  );
}

export default ImageLoader;