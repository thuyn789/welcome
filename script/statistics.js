
function showAccessCount() {
	//create table header
	createTableHeader("access_count", "H2", "Access Counting");

	//initialize table element and table header
	let table = document.createElement("table");
	let counter = 0;

	let row = document.createElement("tr");

	let access_description = [
		"No.", "Location", "Access Date", "Count"
	];

	for (let i = 0; i < 4; i++) {
		createCell(row, "th", access_description[i]);
	}

	table.appendChild(row);

	firebase.database().ref('access_counting').on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			counter++;
			let snap = childSnapshot.val();

			let access_data = [
				counter, snap["last_location"], childSnapshot.key, snap["count"]
			];

			row = document.createElement("tr");

			for (let i = 0; i < 4; i++) {
				createCell(row, "td", access_data[i]);
			}

			table.appendChild(row);
		});

	});

	document.getElementById("access_count").appendChild(table);
}

function showLocationCount() {
	//create table header
	createTableHeader("location_count", "H2", "Location Counting");

	//initialize table element and table header
	let table = document.createElement("table");
	let counter = 0;

	let row = document.createElement("tr");

	let location_description = [
		"No.", "Location", "Last Access", "City", "Region", "Country", "Count"
	];

	for (let i = 0; i < 7; i++) {
		createCell(row, "th", location_description[i]);
	}

	table.appendChild(row);

	firebase.database().ref('location_counting').on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			counter++;
			let snap = childSnapshot.val();

			let location = childSnapshot.key;
			location = location.replace(/-/g, ".").trim();

			let location_data = [
				counter,
				location,
				snap["date_access"],
				snap["ipCity"],
				snap["ipRegion"],
				snap["ipCountry"],
				snap["count"]
			];

			row = document.createElement("tr");

			for (let i = 0; i < 7; i++) {
				createCell(row, "td", location_data[i]);
			}

			table.appendChild(row);
		});

	});

	document.getElementById("location_count").appendChild(table);
}

function createCell(rowSelector, cellType, description) {
	let tableCell = document.createElement(cellType);
	tableCell.innerHTML = description;
	rowSelector.appendChild(tableCell);
}

function createTableHeader(divSelector, eleType, description) {
	let header = document.createElement(eleType);
	let text = document.createTextNode(description);
	header.appendChild(text);
	document.getElementById(divSelector).appendChild(header);
}
