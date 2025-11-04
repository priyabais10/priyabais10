"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ContactBar = () => {
  const [contactBarData, setContactBarData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactBarData(data?.contactBar);
      } catch (error) {
        console.error("Error fetching contact bar data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="border-t border-softGray">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 md:py-7">
            
            {/* ✅ Contact Items */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 lg:gap-10">
              {contactBarData?.contactItems?.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 lg:gap-4 text-sm md:text-base group"
                >
                  <Image
                    src={getImgPath(item.icon)}
                    alt={item.type}
                    width={24}
                    height={24}
                    className="min-w-[24px] min-h-[24px] group-hover:scale-110 transition-transform duration-200"
                  />
                  <h6 className="text-sm md:text-base xl:text-xl group-hover:text-orange-500 transition-colors duration-200">
                    {item.label}
                  </h6>
                </Link>
              ))}
            </div>

            {/* ✅ Social Icons */}
            <div className="flex items-center justify-center md:justify-end gap-4 md:gap-2.5">
              {contactBarData?.socialItems?.map((social: any, index: number) => (
                <Link
                  key={index}
                  href={social.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={getImgPath(social.icon)}
                    alt={social.platform}
                    width={30}
                    height={30}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBar;
