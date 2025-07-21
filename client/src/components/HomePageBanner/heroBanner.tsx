"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HeroBanner = () => {
  const { data } = useSWR("/api/contentFul", fetcher);
  if (!data) return null;
  const bannerImageData = data?.[0]?.fields;

  const { bannerImage, overlayImage } = bannerImageData;

  return (
    <div className="flex relative justify-center items-center">
      <img
        src={"https:" + bannerImage?.fields?.file?.url}
        alt="banner image"
        className="w-full h-auto"
      />
      <img
        src={"https:" + overlayImage?.fields?.file?.url}
        alt="overlay image"
        className="absolute top-2 right-4 w-full h-auto"
      />
    </div>
  );
};

export default HeroBanner;
