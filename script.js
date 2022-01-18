/* $('.acrylic').draggable(); */

class App {
    constructor() {
        this.init();
    }

    async init() {
        const ContextMenu = (await import(`./modules/contextMenu.js`)).default;
        
        const finishBoot = () => {
            $('#bootscreen').removeClass('is-active');
            this.mainCxtMenu = new ContextMenu('#contextMenu');
            $('#taskbar').addClass('is-active');
        }

        // After 1.5s, remove bootscreen
        setTimeout(finishBoot, 1500);
    }

    toggleStart() {
        $('#startmenu').toggleClass('is-active');
        /* $('#startmenu .menusearch input').trigger('click'); */
    }
}

let app = {};
$(document).ready(function() {
    app = new App();
});