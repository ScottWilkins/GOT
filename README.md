# GOT
GOT database

The GOT Clickable Wiki is a portal into George RR Martin's epic work of fantasy. 
It gives users a launching point to discover the the intricacies and relationships between
characters and houses. This particular portal covers the great houses of Westoros. Hovering over a sigil
brings up a quick summary of the house that is pulled from the AWOFAI(a wiki of fire and ice) api.
Clicking a sigil will pull sworn members down into a searchable box. Hovering over the members will access
more info from the api, as well as make a call to the TMDB(the movie database api) to search for information
about the actors who play in the HBO series. Clicking on a character will retrieve an embedded GOT dedicated
wikipedia widget on to the screen with further details.

The app is single page with emphasis on visual access to information through symbols. I used jquery with ajax
to maintain a continuous flow of information without leaving the page. A plugin called hoverIntent made things a lot
easier by guessing whether users actually intend to hover over a button, or whether they're just passing through. The AWOFAI
api was a little tricky, because some information seems to be ssl (specifically house Stark and Baelish) while the rest is not.
The only way I've found to access these two houses is with a cors extension on chrome.

Portals are a great way to unearth a subject that may be too broad and daunting
to search on one's own. They mostly seem to exist in the form of social news sites, such as reddit and facebook,
but the application to commerce seems inevitable. As brick and mortar shops dissappear, the web needs to
make the act of shopping entertaining again. A vantage point in which to enter seems to be the next logical step.
