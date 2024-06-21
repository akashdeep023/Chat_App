import React from "react";

const handleScrollTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export const handleScrollEnd = (box) => {
	box.scrollTo({
		left: box.scrollWidth,
		behavior: "smooth",
	});
};

export default handleScrollTop;
