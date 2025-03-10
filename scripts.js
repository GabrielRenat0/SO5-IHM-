document.getElementById('themeButton').addEventListener('click', function() {
    const themeMenu = document.getElementById('themeMenu');
    themeMenu.style.display = themeMenu.style.display === 'flex' ? 'none' : 'flex';
});

function changeTheme(theme) {
    const body = document.body;
    const container = document.querySelector('.container');
    const header = document.querySelector('.header');
    const content = document.querySelector('.content');
    const header2 = document.querySelector('.header2');
    const content2 = document.querySelector('.content2');
    const footer2 = document.querySelector('.footer2');
    const footer = document.querySelector('.footer');
    const svgLogo = document.querySelector('.svg_logo_inatel');

    if (theme === 'default') {
        body.style.backgroundColor = '#209DC0';
        container.style.background = '#328096';
        header.style.background = '#01B9EB';
        content.style.background = '#000000';
        header2.style.background = '#002746';
        content2.style.background = '#1c5560';
        footer2.style.background = '#79ae92';
        footer.style.background = '#fbffcd';
        svgLogo.style.fill = '#002746'; 
    } else if (theme === 'dark') {
        body.style.backgroundColor = '#1a1a1a';
        container.style.background = '#333333';
        header.style.background = '#444444';
        content.style.background = '#555555';
        header2.style.background = '#666666';
        content2.style.background = '#777777';
        footer2.style.background = '#888888';
        footer.style.background = '#999999';
        svgLogo.style.fill = '#ffffff';
    } else if (theme === 'light') {
        body.style.backgroundColor = '#f0f0f0';
        container.style.background = '#ffffff';
        header.style.background = '#e0e0e0';
        content.style.background = '#d0d0d0';
        header2.style.background = '#c0c0c0';
        content2.style.background = '#b0b0b0';
        footer2.style.background = '#a0a0a0';
        footer.style.background = '#909090';
        svgLogo.style.fill = '#002746';
    }
    localStorage.setItem('theme', theme);
}
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
};