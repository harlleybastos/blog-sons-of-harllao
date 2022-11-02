import { useEffect, useState } from "react";

const StarRating = ({ setNumberOfStars, numberOfStars }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (setNumberOfStars) {
      setNumberOfStars(rating);
    }
  }, [rating, setNumberOfStars]);
  return (
    <div className="ml-2 bg-transparent border-0 outline-none flex">
      {numberOfStars && numberOfStars > 1
        ? [...Array(numberOfStars)].map((star, index) => {
            index += 1;
            return (
              <span
                key={index}
                className="text-yellow-300 text-3xl cursor-default"
              >
                &#9733;
              </span>
            );
          })
        : [...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className="text-3xl"
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setRating(0);
                  setHover(0);
                }}
              >
                <span
                  className={`${
                    index <= (hover || rating)
                      ? "text-yellow-300"
                      : "text-gray-400"
                  }`}
                >
                  &#9733;
                </span>
              </button>
            );
          })}
    </div>
  );
};

export { StarRating };
