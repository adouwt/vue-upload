# vue-ajax-upload

> A Vue.js project
### 注意：
#####   下载后 npm run dev 执行前，先执行 npm run dist , 因为项目中的test 文件夹就是引用dist 文件夹下的js
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
