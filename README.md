# vue-upload

> A Vue.js project,文件上传，支持图片预览的效果，展示上传进度

## Build Setup

``` bash
# install dependencies
npm install 

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### 使用
#### 使用组件必须传递的参数 options
```
  options: {
    'showProgress': true, // 是否显示进度控制
    'imagePreview': true, // 是否显示图片预览
    'url': 'str', // 上传接口url
    'fileUploadName': 'ajax-upload' // 后台采用是什么名字就传递什么名字
  }

```
#### dom 组件使用
```
  <hupload :options=options v-on:receiveUploadMsg="receiveUploadMsg"> </hupload>
```
### js 控制接受的信息判断
```
  methods: {
    receiveUploadMsg (msg) {
      // msg ....
    }
  }
```