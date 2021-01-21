module.exports = {
    title: 'TK\'s blog',
    description: '我的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}],
    ],
    themeConfig: {
        subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        mode: 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        modePicker: true, // 默认 true，false 不显示模式调节按钮，true 则显示
        type: 'blog',
        codeTheme: 'tomorrow', // default 'tomorrow'
        nav: [
            {text: '主页', link: '/', icon: 'reco-home'},
            {text: 'JS工具包', link: '/views/utils/vue/', icon: 'fab fa-js'},
            {text: '时间轴', link: '/timeline/', icon: 'reco-date'}
        ],
        // sidebar: {
        //     '/views/sidebar/': [
        //         '',
        //         'bar1',
        //         'bar2'
        //     ],
        //     '/views/sidebargroup/': [
        //         {
        //             title: '基础',
        //             collapsable: true,
        //             children: [
        //                 '',
        //                 'bar1'
        //             ]
        //         },
        //         {
        //             title: '进阶',
        //             collapsable: true,
        //             children: [
        //                 'bar2'
        //             ]
        //         },
        //     ]
        // },
        // 博客配置
        author: 'TK',
        authorAvatar: '/yasuo.jpg',
        logo: '/yasuo.jpg',
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                {icon: 'reco-github', link: 'https://github.com/recoluan'},
                {icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan'}
            ]
        }
    },
    plugins: [
        [
            'meting',
            {
                auto: "https://y.qq.com/n/m/detail/taoge/index.html", //你的歌单的链接，网页歌单链接
                meting: {
                    server: "tencent",  //歌单的平台、我这里是QQ音乐的平台
                    type: "playlist",
                    mid: "7794360378", //链接后面的id
                },          // 不配置该项的话不会出现全局播放器
                aplayer: {
                    fixed: true,
                    mini:true,
                    lrcType: 0, //（0：禁用 lrc 歌词，1：lrc 格式的字符串，3：lrc 文件 url）
                    autoplay: true,
                    listFolded: true,

                },
                mobile:{

                }
            }
        ],
        [
            '@vuepress-reco/vuepress-plugin-kan-ban-niang',
            {
                // ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
                theme:['shizuku'],
                messages: {
                    welcome: '欢迎光临',
                    home: '心里的花，我想要带你回家。',
                    theme: '好吧，希望你能喜欢我的其他小伙伴。',
                    close: '你知道我喜欢吃什么吗？痴痴地望着你。'
                },
                modelStyle:{
                    right: '90px',
                    bottom: '-20px',
                    opacity: '1'
                },
                messageStyle:{
                    right: '68px',
                    bottom: '300px'
                },
                btnStyle:{
                    right: '90px',
                    bottom: '190px'
                },
                width: 230,
                height: 400,
            },
        ],

    ]
};
