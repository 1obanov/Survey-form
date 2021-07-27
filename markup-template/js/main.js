// cusom select
document.addEventListener("DOMContentLoaded", function () {
	let customSelect = new BVSelect({
		selector: "#filter",
		searchbox: false,
		offset: true,
		placeholder: "Recommended",
	});
});


// global veriables
let form = document.getElementById('surveyForm');
let modal = document.querySelector('.modal');
let listTherapists = document.querySelector(".list-therapists");
let modalBlock = document.querySelectorAll('.modal-block');

function initAllFunctional() {
	let typeOfHelp = document.getElementById("type-of-help");
	let gender = document.getElementById("gender");
	let age = document.getElementById("age");
	let issues = document.getElementById("issues");
	let languages = document.getElementById("languages");

	document.getElementById('submit').addEventListener('click', function (e) {
		let arrRadio = [];
		let arrIssues = [];
		let arrLanguages = [];

		initInputs('input[type="radio"]', arrRadio);
		initInputs('._checkbox__issues input', arrIssues);
		initInputs('._checkbox__language input', arrLanguages);

		initRadioPreferences(arrRadio, typeOfHelp, 0);
		initRadioPreferences(arrRadio, gender, 1);
		initRadioPreferences(arrRadio, age, 2);

		initCheckboxPreferences(arrLanguages, languages);
		initCheckboxPreferences(arrIssues, issues);


		modalBlock.forEach(function (block) {
			if (block.getElementsByTagName('ul')[0].children.length > 3) {
				block.getElementsByTagName('ul')[0].classList.add("hidden");

				let restNumber = block.getElementsByTagName('ul')[0].children.length - 3;
				let a = document.createElement("a");
				a.innerText = 'and ' + restNumber + ' more';
				a.href = "#!";
				a.classList.add('more');
				block.appendChild(a);

				block.querySelectorAll('.more').forEach(function (link) {
					link.addEventListener('click', function () {
						link.previousElementSibling.previousElementSibling.classList.toggle("hidden");
						if (link.previousElementSibling.previousElementSibling.classList.contains('hidden')) {
							link.innerText = 'and ' + restNumber + ' more';
						} else {
							link.innerText = 'hide the last ' + restNumber;
						}
					});
				})
			}
		})

		showTheTherapists();
	})
}

initAllFunctional();


function initTabs() {
	let currentTab = 0;
	let currentBtn = 1;
	let tab = document.getElementsByClassName("tab");
	let prevBtn = document.getElementById("prevBtn");
	let nextBtn = document.getElementById("nextBtn");
	let submitBtn = document.getElementById("submit");

	showTab(currentTab);

	function showTab(num) {
		tab[num].style.display = "block";
		if (num == 0) {
			prevBtn.style.display = "none";
		} else {
			prevBtn.style.display = "inline";
		}
		if (num == (tab.length - 1)) {
			nextBtn.style.display = "none";
			submitBtn.style.display = "block";
		} else {
			nextBtn.style.display = "block";
			submitBtn.style.display = "none";
		}
	}

	function nextButton(num) {
		nextBtn.addEventListener('click', function (e) {
			// hide the current tab:
			tab[currentTab].style.display = "none";
			// increase the current tab by 1:
			currentTab = currentTab + num;
			// display the correct tab:
			if (currentTab >= tab.length) {
				currentTab = 0
				return false;
			}
			showTab(currentTab);
		})
	}
	nextButton(currentBtn);

	function prevButton(num) {
		prevBtn.addEventListener('click', function (e) {
			// hide the current tab:
			tab[currentTab].style.display = "none";
			// decrease the current tab by 1:
			currentTab = currentTab - num;
			// display the correct tab:
			showTab(currentTab);
		})
	}
	prevButton(currentBtn);
}

initTabs();


// show the list of therapists after compliting the form
function showTheTherapists() {
	document.querySelectorAll('.tab').forEach(function (tab) {
		tab.style.display = "none";
	})
	form.style.display = "none";
	listTherapists.style.display = "block";
}

// check the radio oк checkbox and push the values into the right Array
function initInputs(inp, array) {
	form.querySelectorAll(inp).forEach(function (input) {
		if (input.type === 'checkbox' && input.checked || input.type === 'radio' && input.checked) {
			array.push(input.parentElement.getElementsByTagName('label')[0].innerHTML);
		}
	})
}

// create a li tag and append the element into the HTML
function initCheckboxPreferences(array, list) {
	array.forEach((item) => {
		let li = document.createElement("li");
		li.innerText = '- ' + item;
		list.appendChild(li);
	})
}

// create a li tag and append the element into the HTML
function initRadioPreferences(array, list, index) {
	let li = document.createElement("li");
	li.innerText = '- ' + array[index];
	list.appendChild(li);
}

// modal window
function modalWindow() {
	// get the button that opens the modal
	let openModalBtn = document.getElementById("openModal");
	// open the modal 
	openModalBtn.onclick = function () {
		modal.style.display = "block";
	}

	document.querySelectorAll('.modal-close').forEach(function (close) {
		close.onclick = function () {
			modal.style.display = "none";
		}
	})

	// when the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

modalWindow();


// start from the beginning
function initStartAgain() {
	document.querySelectorAll('.start-again').forEach(function (link) {
		link.addEventListener('click', function () {
			listTherapists.style.display = "none";
			form.style.display = "flex";
			modal.style.display = "none";
			modalBlock.forEach(function (block) {
				block.getElementsByTagName('ul')[0].classList.remove("hidden");
				block.querySelectorAll('.more').forEach(function (link) {
					link.parentNode.removeChild(link);
				})
			})

			initRemoveList();
			uncheckAll();
			initTabs();
		});
	})
}

initStartAgain();


// remove all li elements from the HTML
function initRemoveList() {
	modalBlock.forEach(function (block) {
		block.querySelectorAll('ul')[0].innerHTML = '';
	})
}

// uncheck all inputs
function uncheckAll() {
	document.querySelectorAll('input[type="radio"], input[type="checkbox"]')
		.forEach(el => el.checked = false);
}


//= vendors/debounce.js
//= vendors/bvselect.js