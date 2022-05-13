Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                {
                    text: "<font style='font-weight: bold;'>功能列表</font>",
                    iconCls: 'MyExt-menu-sub',
                    expanded: true,
                    children: [
                        {
                            text: "grid",
                            leaf: true,
                            href: 'demo/grid.html',
                            hrefTarget: 'mainFrame'
                        }, {
                            text: "component",
                            leaf: true,
                            href: 'demo/component.html',
                            hrefTarget: 'mainFrame'
                        }, {
                            text: "message",
                            leaf: true,
                            href: 'demo/message.html',
                            hrefTarget: 'mainFrame'
                        }, {
                            text: "layout",
                            leaf: true,
                            href: 'layout/layout.html',
                            hrefTarget: 'mainFrame'
                        }
                    ]
                }
            ]
        }
    });

    var tree_panel = Ext.create('Ext.tree.Panel', {
        frame: false,
        border: false,
        region: "center",
        store: store,
        rootVisible: false
    });

    var header_panel = Ext
        .create(
            'Ext.panel.Panel',
            {
                region: "north",
                height: 68,
                frame: false,
                border: false,
                bodyStyle: 'background:rgb(223,233,246)',
                html: 'loading...'
            });

    var main_panel = Ext.create('Ext.panel.Panel', {
        // title : 'Hello',
        frame: false,
        border: false,
        region: "center",
        html: '<iframe name="mainFrame" frameborder="0" width="100%" height="100%" src="welcome/welcome.html"/>'
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            layout: 'border',
            region: 'west',
            // frame : false,
            // border : false,
            split: true,
            width: 160,
            margins: '0 0 0 0',
            items: [header_panel, tree_panel]
        }, main_panel]
    });

    MyExt.util.Ajax("system/getIndexLogoPage.do", null, function (data) {
        header_panel.body.update(data.data);
    });

});