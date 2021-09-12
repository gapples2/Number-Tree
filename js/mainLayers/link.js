addLayer("Link", {
	startData() { return {unlocked: true}},
	color: "#ff8888",
	symbol: "L",
	row: "side",
	position: -1,
	layerShown() { return true },
	tooltip: "Link",
    tabFormat: [
		"blank", "blank", "blank",
        ["raw-html", "<h1><a href=https://docs.google.com/document/d/1oT5siVj4lT8nnmHjPmAiSQL1NVSmNXQT8bpgUUqjBkM/edit target=_blank>Hardcap table</a></h1><br><h1><a href=https://docs.google.com/document/d/1Re0J_14Ivl_ON4CyqXWk-6nwZnxFfzoG3rxbQqe4Tgg/edit target=_blank>Save bank</a></h1><br><h1><a href=https://docs.google.com/document/d/1IR_xE_WCKgdGjd0J7FDXwhbaxMg79OyvEkslYGkCK74/edit target=_blank>Guide</a></h1>"],
	],
})