const issueList = document.querySelector("#issue-list");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const filterButtons = document.querySelectorAll(".filter-button");
let issues = [];
let activeFilter = "all";

const formatDate = (value) => new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
	year: "numeric",
}).format(new Date(value));

const renderMetrics = () => {
	const openIssues = issues.filter((issue) => issue.state === "open").length;
	const closedIssues = issues.length - openIssues;
	document.querySelector("#total-count").textContent = issues.length;
	document.querySelector("#open-count").textContent = openIssues;
	document.querySelector("#closed-count").textContent = closedIssues;
	document.querySelector("#open-rate").textContent = issues.length ? `${Math.round((openIssues / issues.length) * 100)}%` : "0%";
};

const renderIssues = () => {
	const query = searchInput.value.trim().toLowerCase();
	const visibleIssues = issues.filter((issue) => {
		const matchesFilter = activeFilter === "all" || issue.state === activeFilter;
		const matchesSearch = !query || `${issue.title} ${issue.number}`.toLowerCase().includes(query);
		return matchesFilter && matchesSearch;
	});

	issueList.innerHTML = visibleIssues.map((issue) => `
		<article class="issue">
			<span class="issue-number">#${issue.number}</span>
			<h3 class="issue-title"><a class="issue-link" href="${issue.html_url}" target="_blank" rel="noreferrer">${issue.title}</a></h3>
			<div class="issue-meta"><span class="state ${issue.state}">${issue.state}</span><time datetime="${issue.created_at}">${formatDate(issue.created_at)}</time></div>
		</article>
	`).join("");
	emptyState.hidden = visibleIssues.length > 0;
};

const loadIssues = async () => {
	try {
		const response = await fetch("issues.json");
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		issues = await response.json();
		renderMetrics();
		renderIssues();
		document.querySelector("#sync-label").textContent = "MCP snapshot loaded";
		document.querySelector("#updated-label").textContent = `${issues.length} issues · fetched via MCP`;
	} catch (error) {
		document.querySelector("#sync-label").textContent = "Snapshot unavailable";
		issueList.innerHTML = `<p class="empty-state">Unable to load issue snapshot: ${error.message}</p>`;
	}
};

filterButtons.forEach((button) => button.addEventListener("click", () => {
	activeFilter = button.dataset.filter;
	filterButtons.forEach((item) => item.classList.toggle("active", item === button));
	renderIssues();
}));
searchInput.addEventListener("input", renderIssues);
loadIssues();
