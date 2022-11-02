import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../../services";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((newCategories) => {
      setCategories(newCategories);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">Categories</h3>
      {isLoading ? (
        <SkeletonTheme
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={20}
          inline
        >
          <Skeleton height={36} width="100%" />
          <Skeleton height={36} width="100%" />
          <Skeleton height={36} width="100%" />
        </SkeletonTheme>
      ) : (
        <>
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="block pb-3 mb-3 cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </>
      )}
      
    </div>
  );
};

export default Categories;
