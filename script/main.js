function pdfLoader(imgSelector,embSelector) {
	//load resume img if the current device is a mobile
	var isMobile = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (isMobile) {
		document.getElementById(imgSelector).classList.remove("hidden");
	} else {
		document.getElementById(embSelector).classList.remove("hidden");
	}
}

