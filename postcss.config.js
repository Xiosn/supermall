module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视图的宽度，对应的是我们设计稿的宽度（iphone750）
            viewportHeight: 667, //视图的高度，对应的是我们设计稿的高度，（也可以不配置)
            unitPrecision: 5,//指定‘px’转换成的视图单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw',//指定需要装换成的视图单位，建议使用vw
            selectorBlackList: ['ignore', 'tab-bar'],//指定不需要转换的类
            minPixelValue: 1,   //小于或等于‘1px’不转换为视窗单位，
            mediaQuery: false,//允许在媒体查询钟转换‘px’
            exclude: [/TabBar/]
        }
    }
}

// 1、在js中使用正则：/正则相关规则/
// 2、exclude中存放的元素必须是正则表达式
// 3、按照排除的文件写对应的正则：
// 正则的规则：
// 1> ^abc：表示匹配的内容，必须以书面内容开头（abc开头）
// 2> abc$: 表示匹配的内容，必须以什么内容结尾（以abc结尾）