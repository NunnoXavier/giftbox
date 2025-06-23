import Image from "next/image"

const Banner = ({src}: {src?: string}) => {
  return (
    <div className="w-full h-40 md:h-60 lg:h-96 relative">
        <div className="w-full h-full bg-white">
            <Image 
            className="object-cover"
                src={src || "/banners/banner.png"}
                alt="Banner"
                fill={true}
            />
        </div>

    </div>
  )
}

export default Banner;