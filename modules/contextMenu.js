export default class ContextMenu {
    constructor(selector) {
        this.init(selector);
    }
    init(selector) {

        console.log('Initialising contextMenu...');

        if (!selector) {
            $('body').append(`
                <nav id="contextMenu">
                    <ul>
                        <li class="context-help">
                            <i class="material-icons-round">help</i> Help
                        </li>
                        <li>
                            <i class="material-icons-round">info</i> About AeonLabs
                        </li>
                    </ul>
                </nav>
            `);
            selector = '#contextMenu';
        }

        $('head').append(`
            <style>
                ${selector} {
                    
                    pointer-events: none;
                    position: fixed;
                    z-index: 999 !important;
                    transition: 0.1s opacity;
                    opacity: 0;
                }

                ${selector}.is-active {
                    
                    pointer-events: all;
                    opacity: 1;
                }
            </style>
        `);
        
        this.menu = $(selector);

        $(':root').on('contextmenu', (event) => {
            if ($(event.target).parents(selector).length) {
                this.close();
                return;
            }
            event.preventDefault();

            const windowHeight = $(window).height();
            const windowWidth = $(window).width();

            const menuHeight = $(selector).height();
            const menuWidth = $(selector).width();

            let targetX = event.pageX;
            let targetY = event.pageY;
            
            if (targetX + menuWidth > windowWidth) targetX -= menuWidth;
            if (targetY + menuHeight + 70 > windowHeight) targetY -= menuHeight;

            if (event.pageY > (windowHeight - 70)) targetY = windowHeight - 70 - menuHeight;

            this.open(targetX, targetY);
        });
        $(':root').on('click', (event) => {
            if (this.menu.hasClass('is-active')) this.close();
        });
    }
    open(posX, posY) {
        this.menu.css('left', posX + 'px');
        this.menu.css('top', posY + 'px');
        this.menu.addClass('is-active');
    }
    close() {
        this.menu.removeClass('is-active');
    }
    destroy() {
        $('body').off('contextmenu');
        $(selector).remove();
    }
}