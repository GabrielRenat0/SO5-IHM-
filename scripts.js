function toggleMenu() {
    document.querySelector("#sidebar").classList.toggle("open");
}

document.addEventListener("click", (event) => {
    let sidebar = document.querySelector("#sidebar");
    let menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("open");
    }
});

function handleChangeTheme(theme) {
    const themes = {
        "TemaClaro": {
            "--color-primary": "#0284c7",
            "--color-secondary": "#64748b",
            "--color-accent": "#51DEE0",
            "--color-content": "#ffffff",

            "--color-base-1": "#ffffff",
            "--color-base-2": "#e5e7eb",
            "--color-base-3": "#202020",
            "--color-base-content-1": "#181a2a",
            "--color-base-content-2": "#181a2a",
        },
        "TemaEscuro": {
            "--color-primary": "#1c4e80",
            "--color-secondary": "#7c909a",
            "--color-accent": "#ea6947",
            "--color-content": "#ffffff",

            "--color-base-1": "#202020",
            "--color-base-2": "#23282e",
            "--color-base-3": "#e5e7eb",
            "--color-base-content-1": "#e5e7eb",
            "--color-base-content-2": "#23282e",
        },
        "TemaAlternativo": {
            "--color-primary": "#0d0d0d",
            "--color-secondary": "#1a1919",
            "--color-accent": "#1c4e80",
            "--color-content": "#e1e1e1",

            "--color-base-1": "#ffffff",
            "--color-base-2": "#f5f5f5",
            "--color-base-3": "#000000",
            "--color-base-content-1": "#000000",
            "--color-base-content-2": "#000000",
        }
    };

    const themeToChange = themes[theme];

    if (!themeToChange) return;

    for (const [proprerty, color] of Object.entries(themeToChange)) {
        document.documentElement.style.setProperty(proprerty, color);
    }

    localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "TemaClaro";
    handleChangeTheme(savedTheme);
});