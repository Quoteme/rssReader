const rssReader = {
	// enter the URL to an RSS xml file and return the contents in plain text
	// url -> text
	readFeed : async (
		url,
		corsproxy = "https://cors-anywhere.herokuapp.com/"
	) => await fetch( corsproxy + url, {mode : 'cors'})
			.then( r => r.text())

	// enter the text received from the rss parser and return an
	// object with the important information of the rss
	// alternatively supply your own function to receive a title and a list of entries
	// text -> (json -> html) -> (json -> [html]) -> [title, [text]]
	,parseFeed : (
		t,
		title = json => json.feed.subtitle,
		entry = json => json.feed.entry.map( e => `<a href="${e.id}">${e.summary}</a>` )
	) => {
		const p = parser.parse(t)
		return {
			title: title(p),
			entry: entry(p)
		}
	},

	// [title, [text]] -> HTML
	createFeed : (o) => {
		let container = document.createElement("div");
		let title = document.createElement("span");
		let list = document.createElement("ul");

		title.innerText = o.title;

		o.entry.forEach( r => {
			let li = document.createElement("li");
			li.innerHTML = decodeHtml(r);
			list.append(li);
		})

		container.append(title);
		container.append(list);
		return container;

		// replaces html escape sequences with their acutal counterparts
		function decodeHtml(html) {
			var txt = document.createElement("textarea");
			txt.innerHTML = html;
			return txt.value;
		}
	},

	// automate the entire process
	// just enter the url to a an RSS feed and get an html element
	// returned that contains the relevant information
	// in case of error, provide your own function to select a title and a list
	// information under the section "parseFeed"
	// URL -> [title, [HTML]]
	load : (url) => rssReader.readFeed(url)
		.then( r => rssReader.parseFeed(r) )
		.then( r => rssReader.createFeed(r) )
}
