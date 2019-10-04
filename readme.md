parse RSS streams into a HTML-element


written in a functional and minimal way.

use like this
```

<script src="parser.min.js" charset="utf-8"></script>
<script src="rssReaderjs" charset="utf-8"></script>

[...]

rssReader.load("https://de.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom")
	.then( r => console.log(r))
```
