import { getImgPath } from "@/utils/image";
import Image from "next/image";

const Index = () => {
  return (
    <section className="relative hero-section overflow-hidden pt-12 md:pt-12 pb-12 lg:pb-30 xl:pt-52">
      <div className="container">
        <div className="lg:flex grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-4 items-center">
          <div className="flex flex-col gap-4 md:gap-7 max-w-2xl">
            <div>
              <div className="flex items-center gap-8">
                <h1>I'm Priya</h1>
              </div>
            </div>

            {/* ✅ Responsive paragraph */}
            <p
              className="
                text-secondary 
                font-normal 
                text-justify 
                max-w-md xl:max-w-xl
                pr-0 sm:pr-4 md:pr-8 lg:pr-9 xl:pr-12
              "
            >
              I have been a fashion designer from as long as I can remember,
              from doodling outfits to perfecting them into croquie and sewing
              my ideas into garments, I have evolved as a designer. Fashion
              Designer with 4+ years of experience across resortwear, couture,
              Indianwear and Westernwear. Skilled in end to end collection
              design, creative direction and campaign execution. Seeking to
              expand my skills in line with state of the art technology and the
              ever changing demands of the industry, I remain committed to
              innovation and adaptability.
            </p>
          </div>

          {/* ✅ Image responsive for all devices */}
          <Image
            src={getImgPath("/images/home/banner/banner-img.png")}
            alt="banner-img"
            width={685}
            height={650}
            className="block lg:hidden mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>

      {/* ✅ Desktop banner positioning */}
      <div className="absolute right-0 top-0 hidden h-auto w-1/2 lg:block 2xl:h-171.5 2xl:w-187.5">
        <Image
          src={getImgPath("/images/home/banner/banner-img.png")}
          alt="banner-img"
          width={685}
          height={650}
          className="absolute right-0 top-0 z-1"
        />
      </div>
    </section>
  );
};

export default Index;
