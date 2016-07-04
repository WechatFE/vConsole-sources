vConsole-source
==============================
[![npm version](https://badge.fury.io/js/vconsole-source.svg)](https://badge.fury.io/js/vconsole-source) 

[vConsole](https://github.com/WechatFE/vConsole "vConsole")的Sources插件，用于查看页面HTML/Javascript/CSS资源源码


## 预览图

![](./example/snapshot/qrcode.png)

[http://wechatfe.github.io/vconsole/demo.html](http://wechatfe.github.io/vconsole/demo.html)

![](./example/snapshot/log_panel.png)


## 使用

vConsole-sources 遵循vConsole插件接口规范开发，详细规范请点击 [vConsole插件文档](https://github.com/WechatFE/vConsole/blob/dev/doc/plugin_building_a_plugin_CN.md) 查看。

从 [vConsole-sources](https://github.com/WechatFE/vConsole-sources/) 项目下载zip包，或者使用npm安装:

```
npm install vconsole-sources
```

导出 `dist/vconsole.min.js` 和 `dist/vconsole-sources.min.js` 到你的项目:

```html
<script src="path/to/vconsole.min.js"></script>
<script src="path/to/vconsole-sources.min.js"></script>
<script>
console.log('Hello world');
// 点击右下角vConsole按你即可查看页面资源源码
</script>
```

## License

The MIT License (http://opensource.org/licenses/MIT)
