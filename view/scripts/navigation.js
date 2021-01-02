const switchNavMenuItem = (menuItems) => {

    const current = location.pathname

    menuItems.forEach(menuItem => {
        const href = menuItem.getAttribute('href')
        if ((current.includes(href) && href !== "/") || ( href === "/" && current === "/")) {
            menuItem.className = "active";
        }else {
            menuItem.className = "inactive";
        }
    })
}

document.addEventListener("DOMContentLoaded", function() {
    switchNavMenuItem(document.querySelectorAll('.navigation a'));
});