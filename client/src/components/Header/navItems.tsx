"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import mapCategories from "@/utils/categoryMapper";

type Level2 = {
  name: string;
  link: string;
};

type Level1 = {
  name: string;
  link: string;
  level2: Level2[];
};

const NavItems = () => {
  const [hoveredCategory, setHoveredCategory] = useState<Level1 | undefined>();
  const [categoryData, setCategoryData] = useState<Level1[]>();

  const handleMouseEnter = (level1: Level1 | undefined) => {
    setHoveredCategory(level1);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(undefined);
  };

  useEffect(() => {
    fetch("/api/mongoDB/category")
      .then((res) => res.json())
      .then((data) => {
        const mapped = mapCategories(data);

        const transformed = mapped?.map((mainCat) => ({
          name: mainCat.name,
          link: `/category/${mainCat?.slug}`,
          level2:
            mainCat.childCategory?.map((sub) => ({
              name: sub.name,
              link: `/category/${mainCat.slug}/${sub.slug}`,
            })) || [],
        }));

        setCategoryData(transformed);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
      });
  }, []);

  return (
    <div className="mt-3">
      <div className="relative">
        <ul className={`flex justify-center items-center gap-10`}>
          {categoryData?.map((i: Level1, index: number) => (
            <li
              key={index}
              className={`px-4 text-center cursor-pointer ${
                index !== 0 ? "border-l border-gray-300" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(i)}
            >
              <Link href={i.link} className="hover:text-gray-600">
                {i?.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="border-t border-gray-300 mt-4" />
        {hoveredCategory && (
          <div
            className="absolute left-0 right-0 z-50 bg-white pb-5"
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-4 mt-20 ml-5">
              {hoveredCategory?.level2?.map((i: Level2, index: number) => (
                <div key={index} className="ml-10">
                  <Link
                    href={i.link}
                    className="hover:text-gray-600 text-[#032213]"
                  >
                    {i?.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavItems;
