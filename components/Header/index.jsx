import React, { useEffect, useState } from "react";

import Link from "next/link";
import Logo from "../../assets/img/LOGO-PURA.png";
import { getCategories } from "../../services";
import Image from "next/image";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="inline-block w-full py-8 border-b border-blue-400">
        <div className="block md:float-left">
          {/* <Image
            src={Logo}
            unoptimized
            width="150"
            height="150"
            alt="Sons of Harllão Logo"
          /> */}
          <Link href="/">
            <span className="text-4xl font-bold text-white cursor-pointer text-title">
              Sons of Harllão
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 font-semibold text-white align-middle cursor-pointer md:float-right ">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
