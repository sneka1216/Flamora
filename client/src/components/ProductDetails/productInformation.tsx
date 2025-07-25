"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sampleProduct from "../../mockupData/sampleProduct.json";
import Link from "next/link";
import type { CustomArrowProps } from "react-slick";
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null; // null for main category, otherwise ObjectId as string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface Product {
  sku: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category?: Category;
  subCategory?: Category;
  colour?: string;
  colourCode?: string;
  shortDescription?: string;
}

interface Props {
  slug: string;
  subcategory?: string;
  product: Product | undefined;
}

const NextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute bottom-10 left-90 z-10 w-[30px] h-[30px] bg-white/50 rounded-full flex items-center justify-center cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="black"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    </div>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute bottom-10 left-80 z-10 w-[30px] h-[30px] bg-white/50 rounded-full flex items-center justify-center cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="black"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </svg>
    </div>
  );
};

const ProductInformation = ({ slug, product }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "55%",
          width: "40%",
          height: "45%",
          backgroundColor: "white",
          opacity: 0.9,
          zIndex: 20,
        }}
      >
        <div className="m-5">
          <p className="text-xs ">
            {`${product?.category?.name} > ${product?.subCategory?.name}`}
          </p>
          <div className="flex justify-between items-center">
            <p className=" mt-2 text-2xl">{product?.name}</p>
            <Link className="cursor-pointer" href={"/wishlist"}>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-6 h-6 mt-2"
              >
                <path
                  d="M43 17.0766c0-5.6539-4.5835-10.2373-10.2374-10.2373-3.7223 0-6.9708 1.9932-8.7626 4.964-1.7919-2.9708-5.0403-4.964-8.7626-4.964C9.5835 6.8393 5 11.4227 5 17.0766c0 1.2925.2496 2.524.6866 3.6627 3.3851 9.7368 18.3134 20.4215 18.3134 20.4215s14.9282-10.6847 18.3134-20.4215c.437-1.1386.6867-2.3702.6867-3.6627Z"
                  stroke="black"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="flex">
            <p className="mt-2 text-lg">${product?.price}</p>
          </div>
          <p className="text-sm">MRP incl. of all taxes</p>
          <hr className="border-t border-gray-300 my-4" />
          <div className="text-sm">
            {product?.colour} | {product?.colourCode?.replaceAll("/", "-")}
          </div>
          <Link href={"/cart"}>
            <div className="border cursor-pointer border-slate-800 p-2 text-center my-4">
              Add To Basket
            </div>
          </Link>
          <div className="truncate">{product?.shortDescription}</div>
        </div>
      </div>

      <Slider {...settings}>
        {product?.image?.map((img: string, index: number) => (
          <div key={index} className="pr-1">
            <img
              src={img}
              alt={`Product Image ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductInformation;
