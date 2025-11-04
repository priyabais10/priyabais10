"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

const EducationSkills = () => {
  const [educationData, setEductionData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEductionData(data?.educationData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="border-t border-softGray overflow-hidden">
        <div className="container relative z-10">
          {/* <Image
            src={getImgPath(
              "/images/home/education-skill/edu-skill-vector.svg"
            )}
            alt="vector"
            width={260}
            height={170}
            className="no-print absolute top-0 left-0 transform -translate-y-1/2"
          /> */}
          <div className="relative z-10 py-16 md:py-32">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 xl:mb-16">
              <h2>Skills & Experience</h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
              <div className="w-full lg:max-w-md flex flex-col gap-0 xl:gap-8">
                {educationData?.education?.map((value: any, index: any) => {
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="no-print mt-2.5 w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center border-black">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <h5>{value?.title}</h5>
                        <p className="font-normal">{value?.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-5 xl:gap-7 w-full">
                {educationData?.skills?.map((value: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="p-4 xl:p-6 border border-gray-200 rounded-2xl bg-white flex flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Image wrapper with fixed size and centering */}
                      <div className="w-full h-32 flex items-center justify-center overflow-hidden">
                        <Image
                          src={getImgPath(value?.icon)}
                          alt={value?.name}
                          width={150}
                          height={150}
                          className="object-contain max-h-28 w-auto"
                        />
                      </div>

                      {/* Brand name */}
                      <p className="text-center text-black font-medium mt-3">
                        {value?.name}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSkills;
