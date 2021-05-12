let ipData = getIPData();
let date = getTodayDate().trim();

function pdfLoader(imgSelector, embSelector) {
	//load resume img if the current device is a mobile
	var isMobile = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (isMobile) {
		document.getElementById(imgSelector).classList.remove("hidden");
	} else {
		document.getElementById(embSelector).classList.remove("hidden");
	}
}

function getIPData() {
	let ipLocation = {
		ipAddress: "",
		ipCity: "",
		ipRegion: "",
		ipCountry:""
	};
	$.ajax({
		async: false,
		url: "https://ipinfo.io/json",
		success: function(data) {
			ipLocation["ipAddress"] = data.ip.trim();
			ipLocation["ipCity"] = data.city.trim();
			ipLocation["ipRegion"] = data.region.trim();
			ipLocation["ipCountry"] = data.country.trim();
		}
	});
	return ipLocation;
}

function getTodayDate(){
	let today = new Date();
	return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}

function accessCount() {
	let count = 1;

	var countData = {
		count: count,
		last_location: ipData["ipAddress"]
	};

	parentEntry = "access_counting";
	childEntry = date;

	updateDatabase(parentEntry, childEntry, countData);
}

function locationCount(){
	let count = 1;

	let ipLocation = ipData["ipAddress"];

	var countData = {
		count: count,
		date_access: date,
		ipCity: ipData["ipCity"],
		ipRegion: ipData["ipRegion"],
		ipCountry:ipData["ipCountry"]
	};

	parentEntry = "location_counting";

	//Firebase does not allow entry name contain "."
	//replace ip with "-"
	childEntry = ipLocation.replace(/\./g, "-").trim();

	updateDatabase(parentEntry, childEntry, countData);
}

function updateDatabase(parentEntry,childEntry, dataArray) {
	const database_ref = firebase.database().ref();

	database_ref.child(parentEntry).child(childEntry).get().then((snapshot) => {
		if (snapshot.exists()) {
			let count = snapshot.val().count;
			count++;
			dataArray["count"] = count;

			database_ref.child(parentEntry).child(childEntry).update(dataArray, (error) => {
				if (error) {
					// The write failed...
				} else {
					// Data saved successfully!
				}
			});
		} else {
			//If the location is not found
			//Create new entry
			database_ref.child(parentEntry).child(childEntry).update(dataArray, (error) => {
				if (error) {
					// The write failed...
				} else {
					// Data saved successfully!
				}
			});

		}
	}).catch((error) => {
		console.error(error);
	});
}