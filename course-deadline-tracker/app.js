const storageKey = "course-deadline-tracker:v1";

const defaultState = {
  courses: [
    { code: "Course 1", mainUrl: "", taskLinks: [] },
    { code: "Course 2", mainUrl: "", taskLinks: [] },
    { code: "Course 3", mainUrl: "", taskLinks: [] },
  ],
  termYear: "2026",
  termNumber: "2",
  weekOneMonday: "2026-06-01",
  breakLinks: [],
  tasks: [],
};

let state = loadState();
let pendingExtractedTasks = [];
let sharedStateReady = false;

const courseList = document.querySelector("#courseList");
const courseInput = document.querySelector("#courseInput");
const sourceCourseInput = document.querySelector("#sourceCourseInput");
const termYearInput = document.querySelector("#termYearInput");
const termNumberInput = document.querySelector("#termNumberInput");
const weekOneInput = document.querySelector("#weekOneInput");
const termStatus = document.querySelector("#termStatus");
const taskForm = document.querySelector("#taskForm");
const nameInput = document.querySelector("#nameInput");
const typeInput = document.querySelector("#typeInput");
const deadlineInput = document.querySelector("#deadlineInput");
const statusInput = document.querySelector("#statusInput");
const sourceText = document.querySelector("#sourceText");
const extractButton = document.querySelector("#extractButton");
const extractPreview = document.querySelector("#extractPreview");
const todoList = document.querySelector("#todoList");
const filterInput = document.querySelector("#filterInput");
const summaryRow = document.querySelector("#summaryRow");
const importFile = document.querySelector("#importFile");
const autoModeButton = document.querySelector("#autoModeButton");
const manualModeButton = document.querySelector("#manualModeButton");
const autoAddPanel = document.querySelector("#autoAddPanel");
const manualAddPanel = document.querySelector("#manualAddPanel");
const toggleBreakFormButton = document.querySelector("#toggleBreakFormButton");
const breakLinkList = document.querySelector("#breakLinkList");
const breakLinkForm = document.querySelector("#breakLinkForm");
const breakLinkNameInput = document.querySelector("#breakLinkNameInput");
const breakLinkUrlInput = document.querySelector("#breakLinkUrlInput");
const addBreakLinkButton = document.querySelector("#addBreakLinkButton");

document.querySelector("#exportButton").addEventListener("click", exportData);
document.querySelector("#resetButton").addEventListener("click", resetData);
extractButton.addEventListener("click", extractDeadlines);
filterInput.addEventListener("change", render);
importFile.addEventListener("change", importData);
taskForm.addEventListener("submit", addManualTask);
termYearInput.addEventListener("change", updateTerm);
termNumberInput.addEventListener("change", updateTerm);
weekOneInput.addEventListener("change", updateWeekOneMonday);
autoModeButton.addEventListener("click", () => setAddMode("auto"));
manualModeButton.addEventListener("click", () => setAddMode("manual"));
toggleBreakFormButton.addEventListener("click", toggleBreakForm);
addBreakLinkButton.addEventListener("click", addBreakLink);

render();
loadSharedState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.courses?.length) return migrateState({ ...structuredClone(defaultState), ...saved });
  } catch {
    localStorage.removeItem(storageKey);
  }
  return structuredClone(defaultState);
}

function migrateState(saved) {
  if (!saved.termYear || !saved.termNumber) {
    const parsed = parseLegacyTerm(saved.term || "26T2");
    saved.termYear = parsed.year;
    saved.termNumber = parsed.number;
  }

  if (saved.termYear === "2025" && saved.termNumber === "2" && saved.weekOneMonday === "2025-06-02" && calculateWeek(saved.weekOneMonday).week > 15) {
    saved.termYear = "2026";
    saved.termNumber = "2";
    saved.weekOneMonday = getPresetWeekOneMonday(saved.termYear, saved.termNumber);
  }

  saved.tasks = saved.tasks.map((task) => ({
    ...task,
    type: ["Weekly Test", "Lab"].includes(task.type) ? "Weekly Task" : task.type,
    progress: Number.isFinite(Number(task.progress)) ? Number(task.progress) : 0,
  }));
  saved.courses = saved.courses.map((course) => ({
    code: course.code,
    mainUrl: course.mainUrl ?? course.url ?? "",
    taskLinks: Array.isArray(course.taskLinks) ? course.taskLinks : [],
  }));
  saved.breakLinks = Array.isArray(saved.breakLinks) ? saved.breakLinks : [];
  return saved;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  if (sharedStateReady) saveSharedState();
}

async function loadSharedState() {
  try {
    const response = await fetch("api/state", { cache: "no-store" });
    if (!response.ok) return;
    const shared = await response.json();
    sharedStateReady = true;
    if (shared?.courses?.length) {
      state = migrateState({ ...structuredClone(defaultState), ...shared });
      localStorage.setItem(storageKey, JSON.stringify(state));
      render();
      return;
    }
    await saveSharedState();
  } catch {
    // Keep localStorage as fallback; the next save can still retry the shared API.
  }
}

async function saveSharedState() {
  try {
    await fetch("api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
  } catch {
    sharedStateReady = false;
  }
}

function render() {
  renderCourses();
  renderBreakLinks();
  renderCourseOptions();
  renderTerm();
  renderSummary();
  renderTasks();
}

function renderBreakLinks() {
  if (!state.breakLinks.length) {
    breakLinkList.innerHTML = `<div class="mini-empty">No break links yet</div>`;
    return;
  }

  breakLinkList.innerHTML = state.breakLinks
    .map(
      (link) => `
        <div class="task-link-item">
          <button class="link-button break-link-button" type="button" data-open-break="${link.id}">${escapeHtml(link.name)}</button>
          <button class="small-danger" type="button" data-delete-break="${link.id}" aria-label="Delete break link">×</button>
        </div>
      `,
    )
    .join("");

  breakLinkList.querySelectorAll("[data-open-break]").forEach((button) => {
    button.addEventListener("click", () => {
      const link = state.breakLinks.find((item) => item.id === button.dataset.openBreak);
      if (link) window.open(link.url, "_blank", "noopener,noreferrer");
    });
  });
  breakLinkList.querySelectorAll("[data-delete-break]").forEach((button) => {
    button.addEventListener("click", () => {
      state.breakLinks = state.breakLinks.filter((item) => item.id !== button.dataset.deleteBreak);
      saveState();
      renderBreakLinks();
    });
  });
}

function toggleBreakForm() {
  breakLinkForm.classList.toggle("active");
  if (breakLinkForm.classList.contains("active")) breakLinkNameInput.focus();
}

function addBreakLink() {
  const name = breakLinkNameInput.value.trim();
  const url = breakLinkUrlInput.value.trim();
  if (!name || !url) return;
  state.breakLinks.push({ id: crypto.randomUUID(), name, url });
  breakLinkNameInput.value = "";
  breakLinkUrlInput.value = "";
  breakLinkForm.classList.remove("active");
  saveState();
  renderBreakLinks();
}

function renderCourses() {
  courseList.innerHTML = "";

  state.courses.forEach((course, index) => {
    const node = document.querySelector("#courseTemplate").content.cloneNode(true);
    const codeInput = node.querySelector(".course-code");
    const urlInput = node.querySelector(".course-main-url");
    const openButton = node.querySelector("[data-open-main]");
    const editMainButton = node.querySelector("[data-edit-main]");
    const mainSiteForm = node.querySelector(".main-site-form");
    const linkList = node.querySelector(".task-link-list");
    const linkForm = node.querySelector(".task-link-form");
    const toggleLinkFormButton = node.querySelector("[data-toggle-link-form]");
    const linkNameInput = node.querySelector(".task-link-name");
    const linkUrlInput = node.querySelector(".task-link-url");
    const addLinkButton = node.querySelector("[data-add-link]");

    codeInput.value = course.code;
    urlInput.value = course.mainUrl;
    openButton.textContent = course.mainUrl ? "Official site" : "Add official site";

    codeInput.addEventListener("input", () => {
      const oldCode = state.courses[index].code;
      const newCode = codeInput.value.trim() || `Course ${index + 1}`;
      state.courses[index].code = newCode;
      updateTasksForCourse(oldCode, newCode);
      saveState();
      renderCourseOptions();
      renderTasks();
    });

    urlInput.addEventListener("input", () => {
      state.courses[index].mainUrl = urlInput.value.trim();
      saveState();
    });

    openButton.addEventListener("click", () => {
      if (!state.courses[index].mainUrl) {
        mainSiteForm.classList.add("active");
        return urlInput.focus();
      }
      window.open(state.courses[index].mainUrl, "_blank", "noopener,noreferrer");
    });

    editMainButton.addEventListener("click", () => {
      mainSiteForm.classList.toggle("active");
      if (mainSiteForm.classList.contains("active")) urlInput.focus();
    });

    toggleLinkFormButton.addEventListener("click", () => {
      linkForm.classList.toggle("active");
      if (linkForm.classList.contains("active")) linkNameInput.focus();
    });

    addLinkButton.addEventListener("click", () => {
      const name = linkNameInput.value.trim();
      const url = linkUrlInput.value.trim();
      if (!name || !url) return;
      state.courses[index].taskLinks.push({ id: crypto.randomUUID(), name, url });
      saveState();
      linkNameInput.value = "";
      linkUrlInput.value = "";
      renderCourses();
    });

    renderTaskLinks(linkList, index);
    courseList.append(node);
  });
}

function renderTaskLinks(container, courseIndex) {
  const links = state.courses[courseIndex].taskLinks;
  if (!links.length) {
    container.innerHTML = `<div class="mini-empty">No task links yet</div>`;
    return;
  }

  container.innerHTML = links
    .map(
      (link) => `
        <div class="task-link-item">
          <button class="link-button" type="button" data-open-link="${link.id}">${escapeHtml(link.name)}</button>
          <button class="small-danger" type="button" data-delete-link="${link.id}" aria-label="Delete task link">×</button>
        </div>
      `,
    )
    .join("");

  container.querySelectorAll("[data-open-link]").forEach((button) => {
    button.addEventListener("click", () => {
      const link = links.find((item) => item.id === button.dataset.openLink);
      if (link) window.open(link.url, "_blank", "noopener,noreferrer");
    });
  });
  container.querySelectorAll("[data-delete-link]").forEach((button) => {
    button.addEventListener("click", () => {
      state.courses[courseIndex].taskLinks = links.filter((item) => item.id !== button.dataset.deleteLink);
      saveState();
      renderCourses();
    });
  });
}

function renderCourseOptions() {
  const options = state.courses
    .map((course, index) => `<option value="${index}">${escapeHtml(course.code)}</option>`)
    .join("");
  courseInput.innerHTML = options;
  sourceCourseInput.innerHTML = options;
}

function renderTerm() {
  termYearInput.value = state.termYear;
  termNumberInput.value = state.termNumber;
  weekOneInput.value = state.weekOneMonday;

  const current = getCurrentTermPosition();
  termStatus.textContent = `Current: ${getTermLabel()} Week ${current.week} ${current.weekday}`;
}

function getCurrentTermPosition() {
  const now = new Date();
  const { week } = calculateWeek(state.weekOneMonday);
  const weekday = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now);
  return { week, weekday };
}

function calculateWeek(weekOneMonday) {
  const now = new Date();
  const weekOne = parseDateInput(weekOneMonday);
  const diffDays = Math.floor((startOfDay(now) - startOfDay(weekOne)) / (24 * 60 * 60 * 1000));
  return { week: Math.max(1, Math.floor(diffDays / 7) + 1), diffDays };
}

function renderSummary() {
  const now = new Date();
  const current = getCurrentTermPosition();
  const todoTasks = state.tasks.filter((task) => task.status !== "done");
  const activeTasks = state.tasks.filter((task) => task.status === "todo");
  const plannedTasks = state.tasks.filter((task) => task.status === "planned");
  const overdue = activeTasks.filter((task) => new Date(task.deadline) < now).length;
  const sevenDays = activeTasks.filter((task) => {
    const diff = new Date(task.deadline) - now;
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  summaryRow.innerHTML = [
    summaryPill(current.week, "current week"),
    summaryPill(activeTasks.length, "to do"),
    summaryPill(plannedTasks.length, "planned"),
    summaryPill(overdue, "overdue"),
    summaryPill(sevenDays, "next 7 days"),
  ].join("");
}

function summaryPill(value, label) {
  return `<div class="summary-pill"><strong>${value}</strong><span>${label}</span></div>`;
}

function setAddMode(mode) {
  const isAuto = mode === "auto";
  autoModeButton.classList.toggle("active", isAuto);
  manualModeButton.classList.toggle("active", !isAuto);
  autoAddPanel.classList.toggle("active", isAuto);
  manualAddPanel.classList.toggle("active", !isAuto);
}

function renderTasks() {
  const filter = filterInput.value;
  const tasks = state.tasks
    .filter((task) => filter === "all" || task.status === filter)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (!tasks.length) {
    todoList.innerHTML = `<div class="empty-state">No tasks in this view.</div>`;
    return;
  }

  todoList.innerHTML = tasks.map(renderTask).join("");
  todoList.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleTask(button.dataset.toggle));
  });
  todoList.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteTask(button.dataset.delete));
  });
  todoList.querySelectorAll("[data-progress]").forEach((slider) => {
    slider.addEventListener("input", () => updateTaskProgress(slider.dataset.progress, slider.value));
  });
  todoList.querySelectorAll("[data-status]").forEach((button) => {
    button.addEventListener("click", () => updateTaskStatus(button.dataset.status, button.dataset.nextStatus));
  });
}

function renderTask(task) {
  const deadline = new Date(task.deadline);
  const now = new Date();
  const diffDays = Math.ceil((deadline - now) / (24 * 60 * 60 * 1000));
  const urgency = task.status === "done" ? "done" : deadline < now ? "overdue" : diffDays <= 7 ? "soon" : "";
  const dateText = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(deadline);
  const relative = task.status === "done" ? "done" : deadline < now ? "overdue" : `${diffDays} day${diffDays === 1 ? "" : "s"} left`;
  const progress = Number(task.progress ?? 0);

  return `
    <article class="task-item ${urgency} ${task.status === "planned" ? "planned" : ""}">
      ${task.status === "planned" ? `<span class="planned-dot" aria-hidden="true"></span>` : `<input type="checkbox" ${task.status === "done" ? "checked" : ""} data-toggle="${task.id}" aria-label="Mark done" />`}
      <div>
        <div class="task-title">
          <span>${escapeHtml(task.name)}</span>
          <span class="tag">${escapeHtml(task.course)}</span>
          <span class="tag">${escapeHtml(task.type)}</span>
          ${task.status === "planned" ? `<span class="tag planned-tag">Planned</span>` : ""}
        </div>
        <div class="deadline">${dateText} · ${relative}</div>
        <label class="progress-control">
          <span>Progress <strong>${progress}%</strong></span>
          <input type="range" min="0" max="100" step="5" value="${progress}" data-progress="${task.id}" style="--progress: ${progress}%;" />
        </label>
      </div>
      <div class="task-actions">
        ${task.status === "planned" ? `<button class="ghost-button" type="button" data-status="${task.id}" data-next-status="todo">To Do</button>` : ""}
        ${task.status === "todo" ? `<button class="ghost-button" type="button" data-status="${task.id}" data-next-status="planned">Park</button>` : ""}
        <button class="ghost-button" type="button" data-delete="${task.id}" aria-label="Delete task">Delete</button>
      </div>
    </article>
  `;
}

function addManualTask(event) {
  event.preventDefault();
  const course = state.courses[Number(courseInput.value)];
  addTask({
    course: course.code,
    type: typeInput.value,
    name: nameInput.value.trim(),
    deadline: new Date(deadlineInput.value).toISOString(),
    status: statusInput.value,
  });
  taskForm.reset();
  render();
}

function extractDeadlines() {
  const course = state.courses[Number(sourceCourseInput.value)];
  const extracted = parseTasks(sourceText.value, course.code);
  pendingExtractedTasks = extracted;

  if (!extracted.length) {
    extractPreview.innerHTML = `<div class="empty-state">No deadlines found. Try text like: Due Date / Week 5 Friday 12:00 pm</div>`;
    return;
  }

  extractPreview.innerHTML = `
    ${extracted.map(renderPreviewTask).join("")}
    <div class="preview-actions">
      <button id="cancelExtractButton" class="ghost-button" type="button">Cancel</button>
      <button id="planExtractButton" class="ghost-button" type="button">Save as Planned</button>
      <button id="confirmExtractButton" class="primary-button" type="button">Add to To Do</button>
    </div>
  `;
  extractPreview.querySelectorAll("[data-preview-name]").forEach((input) => {
    input.addEventListener("input", () => {
      pendingExtractedTasks[Number(input.dataset.previewName)].name = input.value.trim();
    });
  });
  extractPreview.querySelectorAll("[data-preview-type]").forEach((select) => {
    select.addEventListener("change", () => {
      pendingExtractedTasks[Number(select.dataset.previewType)].type = select.value;
    });
  });
  extractPreview.querySelectorAll("[data-preview-deadline]").forEach((input) => {
    input.addEventListener("input", () => {
      pendingExtractedTasks[Number(input.dataset.previewDeadline)].deadline = new Date(input.value).toISOString();
    });
  });
  document.querySelector("#confirmExtractButton").addEventListener("click", () => confirmExtractedTasks("todo"));
  document.querySelector("#planExtractButton").addEventListener("click", () => confirmExtractedTasks("planned"));
  document.querySelector("#cancelExtractButton").addEventListener("click", clearExtractPreview);
}

function renderPreviewTask(task, index) {
  return `
    <article class="task-item preview-task">
      <div>
        <div class="task-title">
          <span>${escapeHtml(task.course)}</span>
          <span class="tag">check before adding</span>
        </div>
        <input data-preview-name="${index}" value="${escapeHtml(task.name)}" aria-label="Extracted task name" />
        <select data-preview-type="${index}" aria-label="Extracted task type">
          ${taskTypes().map((type) => `<option ${type === task.type ? "selected" : ""}>${type}</option>`).join("")}
        </select>
        <input data-preview-deadline="${index}" type="datetime-local" value="${toDateTimeLocalValue(task.deadline)}" aria-label="Extracted deadline" />
      </div>
    </article>
  `;
}

function confirmExtractedTasks(status = "todo") {
  pendingExtractedTasks.forEach((task) => {
    if (task.name && task.deadline) addTask({ ...task, status });
  });
  sourceText.value = "";
  clearExtractPreview();
  render();
}

function clearExtractPreview() {
  pendingExtractedTasks = [];
  extractPreview.innerHTML = "";
}

function updateTerm() {
  state.termYear = termYearInput.value;
  state.termNumber = termNumberInput.value;
  state.weekOneMonday = getPresetWeekOneMonday(state.termYear, state.termNumber);
  saveState();
  render();
}

function updateWeekOneMonday() {
  state.weekOneMonday = weekOneInput.value;
  saveState();
  render();
}

function getTermLabel() {
  return `${String(state.termYear).slice(-2)}T${state.termNumber}`;
}

function parseLegacyTerm(term) {
  const match = String(term).match(/^(\d{2})T([123])$/i);
  if (!match) return { year: "2026", number: "2" };
  return { year: `20${match[1]}`, number: match[2] };
}

function getPresetWeekOneMonday(year, termNumber) {
  const presets = {
    "2025-1": "2025-02-17",
    "2025-2": "2025-06-02",
    "2025-3": "2025-09-15",
    "2026-1": "2026-02-16",
    "2026-2": "2026-06-01",
    "2026-3": "2026-09-14",
    "2027-1": "2027-02-15",
    "2027-2": "2027-05-31",
    "2027-3": "2027-09-13",
    "2028-1": "2028-02-14",
    "2028-2": "2028-05-29",
    "2028-3": "2028-09-11",
    "2029-1": "2029-02-12",
    "2029-2": "2029-05-28",
    "2029-3": "2029-09-10",
    "2030-1": "2030-02-18",
    "2030-2": "2030-06-03",
    "2030-3": "2030-09-16",
    "2031-1": "2031-02-17",
    "2031-2": "2031-06-02",
    "2031-3": "2031-09-15",
    "2032-1": "2032-02-16",
    "2032-2": "2032-05-31",
    "2032-3": "2032-09-13",
  };
  return presets[`${year}-${termNumber}`] || estimateWeekOneMonday(Number(year), Number(termNumber));
}

function estimateWeekOneMonday(year, termNumber) {
  const targetMonths = { 1: 1, 2: 5, 3: 8 };
  const date = new Date(year, targetMonths[termNumber], 15);
  while (date.getDay() !== 1) date.setDate(date.getDate() - 1);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function parseTasks(text, course) {
  const lines = normalizeLines(text);
  const tasks = [];
  const fallbackName = inferTaskName(lines);

  lines.forEach((line, index) => {
    const isDeadlineLabel = isDeadlinePhrase(line);
    const sameLineDeadline = (findDeadline(line) || findWeekDeadline(line)) && detectType(line);
    if (!isDeadlineLabel && !sameLineDeadline) return;

    const context = lines.slice(Math.max(0, index - 2), index + 6).join(" ");
    const deadline = findDeadline(context) || findWeekDeadline(context);
    if (!deadline) return;

    const name = inferNearbyName(lines, index) || fallbackName || cleanName(line, "Task");
    const type = detectType(name) || detectType(context) || "Assignment";
    tasks.push({
      course,
      type,
      name,
      deadline: deadline.toISOString(),
      status: "todo",
    });
  });

  return dedupeTasks(tasks);
}

function detectType(line) {
  if (/lab\s*exam/i.test(line)) return "Lab Exam";
  if (/final\s*exam/i.test(line)) return "Final Exam";
  if (/lab\s*\d+|lab\d+[_-]?[\w-]*|laboratory/i.test(line)) return "Weekly Task";
  if (/assignment|ass\s*\d+|作业/i.test(line)) return "Assignment";
  if (/weekly\s*(task|test|questions?)|quiz\d*|quiz[_-]?\d*|周测|测试/i.test(line)) return "Weekly Task";
  if (/\bWeek\s*\d+.+\b(Lesson|Lessons)\b/i.test(line)) return "Weekly Task";
  if (/project|proj|项目/i.test(line)) return "Project";
  return "";
}

function isDeadlinePhrase(line) {
  return /\b(due\s*date|deadline|due|closes?|before|until|up\s+to|anytime\s+up\s+to|截止|到期)\b/i.test(line);
}

function findDeadline(line) {
  const patterns = [
    /(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T,]+(\d{1,2}):(\d{2}))?/,
    /(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[ T,]+(\d{1,2}):(\d{2}))?/,
    /\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})(?:[ T,]+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?/i,
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})(?:[ T,]+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?)?/i,
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (!match) continue;
    const date = buildDate(match);
    if (!Number.isNaN(date.valueOf())) return date;
  }
  return null;
}

function buildDate(match) {
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  let year;
  let month;
  let day;
  let hour = 23;
  let minute = 59;

  if (match[1].length === 4) {
    year = Number(match[1]);
    month = Number(match[2]) - 1;
    day = Number(match[3]);
    hour = Number(match[4] ?? 23);
    minute = Number(match[5] ?? 59);
  } else if (monthNames.includes(String(match[2]).toLowerCase().slice(0, 3))) {
    day = Number(match[1]);
    month = monthNames.indexOf(match[2].toLowerCase().slice(0, 3));
    year = Number(match[3]);
    hour = toHour(match[4], match[6]);
    minute = Number(match[5] ?? 59);
  } else if (monthNames.includes(String(match[1]).toLowerCase().slice(0, 3))) {
    month = monthNames.indexOf(match[1].toLowerCase().slice(0, 3));
    day = Number(match[2]);
    year = Number(match[3]);
    hour = toHour(match[4], match[6]);
    minute = Number(match[5] ?? 59);
  } else {
    day = Number(match[1]);
    month = Number(match[2]) - 1;
    year = Number(match[3]);
    hour = Number(match[4] ?? 23);
    minute = Number(match[5] ?? 59);
  }

  return new Date(year, month, day, hour, minute);
}

function normalizeLines(text) {
  return text
    .replace(/\r/g, "\n")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function parseDateInput(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDateTimeLocalValue(value) {
  const date = new Date(value);
  const parts = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ];
  const time = [String(date.getHours()).padStart(2, "0"), String(date.getMinutes()).padStart(2, "0")];
  return `${parts.join("-")}T${time.join(":")}`;
}

function taskTypes() {
  return ["Assignment", "Weekly Task", "Project", "Final Exam", "Lab Exam"];
}

function findWeekDeadline(context) {
  let match = context.match(
    /\bWeek\s*(\d{1,2})\s*(?:[-–—]\s*)?(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i,
  );
  if (match) return buildWeekDate(match[1], match[2], match[3], match[4], match[5]);

  match = context.match(
    /\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+Week\s*(\d{1,2})\b/i,
  );
  if (match) return buildWeekDate(match[5], match[4], match[1], match[2], match[3]);

  return null;
}

function buildWeekDate(rawWeek, rawWeekday, rawHour, rawMinute, rawMeridiem) {
  const week = Number(rawWeek);
  const weekday = rawWeekday.toLowerCase();
  const hour = toHour(rawHour, rawMeridiem);
  const minute = Number(rawMinute ?? 0);
  const weekOneMonday = parseDateInput(state.weekOneMonday);
  const weekdayOffset = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].indexOf(weekday);
  const date = new Date(weekOneMonday);
  date.setDate(weekOneMonday.getDate() + (week - 1) * 7 + weekdayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function toHour(rawHour, meridiem) {
  let hour = Number(rawHour ?? 23);
  if (!meridiem) return hour;
  const lower = meridiem.toLowerCase();
  if (lower === "pm" && hour < 12) hour += 12;
  if (lower === "am" && hour === 12) hour = 0;
  return hour;
}

function inferTaskName(lines) {
  const candidates = lines.filter((line) => {
    if (isNavigationOrNoise(line)) return false;
    return /\b(lab\s*\d+|assignment\s*\d+|ass\s*\d+|project|quiz\d*|quiz[_-]?\d*|weekly\s*(task|test|questions?)|final\s*exam|lab\s*exam)\b|lab\d+[_-]?[\w-]*|\bWeek\s*\d+.+\b(Lesson|Lessons)\b/i.test(line);
  });
  return simplifyTitle(candidates.find((line) => /\w+_\w+/.test(line)) || candidates[0] || "");
}

function inferNearbyName(lines, index) {
  const windowLines = lines.slice(Math.max(0, index - 18), index + 1).reverse();
  const candidate = windowLines.find((line) => {
    if (isNavigationOrNoise(line)) return false;
    return /\w+_\w+/.test(line) || /\b(lab\s*\d+|assignment\s*\d+|ass\s*\d+|project|quiz\d*|quiz[_-]?\d*|weekly\s*(task|test|questions?)|final\s*exam|lab\s*exam)\b|lab\d+[_-]?[\w-]*|\bWeek\s*\d+.+\b(Lesson|Lessons)\b/i.test(line);
  });
  return simplifyTitle(candidate || "");
}

function simplifyTitle(value) {
  return value
    .replace(/^.*?(lab\d+[_-][\w-]+).*$/i, "$1")
    .replace(/\s*\((?:due\s*date|deadline|due).*\)\s*$/i, "")
    .replace(/\b(due|deadline|closes?|before|until|up\s+to)\b.*$/i, "")
    .replace(/\b(Project ID|README\.md|README)\b.*$/i, "")
    .trim()
    .replace(/^[-*: ]+|[-*: ]+$/g, "");
}

function dedupeTasks(tasks) {
  const seen = new Set();
  return tasks.filter((task) => {
    const key = `${task.course}|${task.name}|${task.deadline}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isNavigationOrNoise(line) {
  return /^(project information|readme|readme\.md|created on|name last commit|last update|due date|background|rationale|getting started|typescript installation|interface: functions|tips|interface: data types|task|testing|using vitest|type-checking with tsc|executing typescript|implementation|continuous integration|submission|additional information|sample package\.json|miscellaneous)$/i.test(line);
}

function cleanName(line, type) {
  return line
    .replace(/\b(due|deadline|available|opens|closes|截止|到期)\b.*$/i, "")
    .trim()
    .replace(/^[-*: ]+|[-*: ]+$/g, "") || type;
}

function addTask(task) {
  state.tasks.push({
    id: crypto.randomUUID(),
    progress: 0,
    ...task,
  });
  saveState();
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.status = task.status === "done" ? "todo" : "done";
  saveState();
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveState();
  render();
}

function updateTaskStatus(id, nextStatus) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.status = nextStatus;
  saveState();
  render();
}

function updateTaskProgress(id, value) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.progress = Number(value);
  saveState();
  const slider = todoList.querySelector(`[data-progress="${CSS.escape(id)}"]`);
  if (!slider) return;
  slider.style.setProperty("--progress", `${task.progress}%`);
  slider.closest(".progress-control").querySelector("strong").textContent = `${task.progress}%`;
}

function updateTasksForCourse(oldCode, newCode) {
  state.tasks.forEach((task) => {
    if (task.course === oldCode) {
      task.course = newCode;
    }
  });
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "course-deadlines.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();

  if (file.name.endsWith(".json")) {
    const imported = JSON.parse(text);
    if (imported.courses && imported.tasks) state = imported;
    saveState();
    render();
  } else {
    sourceText.value = text;
    extractDeadlines();
  }

  importFile.value = "";
}

function resetData() {
  const confirmed = window.confirm("Reset all courses, term settings, and to-do tasks? This cannot be undone.");
  if (!confirmed) return;
  state = structuredClone(defaultState);
  saveState();
  render();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // LAN HTTP may not allow service workers; the app still works normally.
    });
  });
}
