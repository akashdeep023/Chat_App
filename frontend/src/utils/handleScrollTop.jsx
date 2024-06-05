import React from "react";

const handleScrollTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export default handleScrollTop;
