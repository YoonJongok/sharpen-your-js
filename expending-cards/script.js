const cardPanels = document.querySelectorAll(".panel");
const firstCardPanel = cardPanels[0];
firstCardPanel.setAttribute("id", 0);
let prevPanelId = firstCardPanel.id;

function togglePanelSize(panel) {
	if (prevPanelId && prevPanelId !== panel.id) {
		const prevPanelElement = document.getElementById(prevPanelId);
		prevPanelElement.classList.remove("active");
	}
	if (!panel.classList.contains("active")) {
		panel.classList.add("active");
		prevPanelId = panel.id;
		console.log(panel);
	} else {
		if (panel.id === prevPanelId) {
			return;
		}
		panel.classList.remove("active");
	}
	console.log(panel);
}

cardPanels.forEach((panel, index) => {
	if (index !== 0) {
		panel.setAttribute("id", index);
	}

	panel.addEventListener("click", () => {
		togglePanelSize(panel);
	});
});
