window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const search = urlParams.get("search");

function init() {
	if (search) {
		getsearchData();
	} else if (id) {
		getSingleTattoo();
	} else {
		getFrontpageData();
	}
}

function getsearchData() {
	fetch("https://cosmicstryder.dk/wordpress/wp-json/wp/v2/sticker?_embed&search=" + search)
		.then(res => res.json())
		.then(handleData)

}

function getSingleTattoo() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	console.log(id)

	fetch("https://cosmicstryder.dk/wordpress/wp-json/wp/v2/design/" + id)
		.then(res => res.json())
		.then(showTattoo)

	function showTattoo(tattoo) {
		console.log(tattoo)
		document.querySelector(".tattootitle").innerHTML = tattoo.tattoo_title;
		document.querySelector(".tattooprice").innerHTML = tattoo.tattoo_price;
		document.querySelector(".tattoodescription").innerHTML = tattoo.tattoo_description;


		const img = document.querySelector("img.cover");
		const imgPath = tattoo.tattoo_image.guid;
		img.setAttribute("src", imgPath)
		img.setAttribute("alt", "Image of Temporary Tattoo" + tattoo.title.rendered)

		const image = document.querySelector("img.secondcover");
		const imagePath = tattoo.tattoo_image.guid;
		image.setAttribute("src", imagePath)
		image.setAttribute("alt", "Image of Temporary Tattoo" + tattoo.title.rendered)
	}
}


function getFrontpageData() {
	fetch("https://cosmicstryder.dk/wordpress/wp-json/wp/v2/design?_embed&per_page=100")
		.then(res => res.json())
		.then(handleData)
}

function handleData(myData) {
	myData.forEach(showPost)
}

function showPost(post) {
	console.log(post)

	const template = document.querySelector(".postTemplate").content;
	const postCopy = template.cloneNode(true);

	const img = postCopy.querySelector("img.cover");
	const imgPath = post.gallery_image.guid;
	img.setAttribute("src", imgPath)
	img.setAttribute("alt", "Image of Temporary Tattoo" + post.title.rendered)


	document.querySelector(".threecolumns2").appendChild(postCopy)
}
