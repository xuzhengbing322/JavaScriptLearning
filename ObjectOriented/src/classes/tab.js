class Tab {
    constructor(mode) {
        this.mode = mode == 'fade' || mode =='slide' ? mode : 'fade';
        this.oPage = $('.J_page');
        this.oTab = $('.J_tab');
        this.oPageWrap = this.oPage.children('.page-wrap');
        this.oPageItems = this.oPage.find('.item');

        this.init()
    }

    // 初始化函数
    init () {
        this.setMode();
        this.bindEvent();
    }

    // 给节点添加切换模式样式
    setMode () {
        this.oPageWrap.addClass(this.mode)
    }

    // 绑定点击事件
    bindEvent () {
        this.oTab.on('click', '.item', $.proxy(this.tabClick, this));
    }

    // 点击事件函数
    tabClick () {
        // 用let和const就报错
        var e = e || window.event,
              tar = e.target || e.srcElement,
              curIdx = $(tar).index();

        if (tar.className === 'item') {
            $(tar).addClass('current').siblings('.item').removeClass('current')
            this._pageChange(curIdx);
        }
    }

    // 设置页面切换的样式
    _pageChange (index) {
        switch (this.mode) {
            case 'fade':
                this._fadePage(index);
                break;
            case 'slide':
                this._slidePage(index);
                break;
            default:
                this._fadePage(index);
                break;
        }
    }

    _fadePage (index) {
        this.oPageItems.eq(index).fadeIn(100).siblings('.item').fadeOut(100);
    }

    _slidePage (index) {
        this.oPageWrap.animate({
            left: (-index * 500) + 'px'
        })
    }
};

export {Tab}