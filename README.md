# vue-ajax-upload

> A Vue.js project

## Build Setup

``` bash
# install 
 npm install vue-ajax-upload --save

# 使用组件必须传递的参数 options
options: {
    'showProgress': true, // 是否显示进度控制
    'imagePreview': true, // 是否显示图片预览
    'url': 'str', // 上传接口url
    'fileUploadName': 'ajax-upload', // 后台采用是什么名字就传递什么名字
    'limitSize': 1 // 限制文件上传的大小
}
# dom 组件使用
<hupload :options=options v-on:receiveUploadMsg="receiveUploadMsg"> </hupload>

#js 接受的信息判断
methods: {
    receiveUploadMsg (msg) {
      // msg ....
    }
}
```
