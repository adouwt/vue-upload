<template>
  <div class="wt-upload">
    <div class="file-area">
      <div>
        <input type="file" name="file" id="file" class="file" @change="previewImage($event)" multiple/>
        <label for="file" class="file-label">选择文件</label>
      </div>
      <div v-show="options.imagePreview">
        <div class="img-preview" ref="imgPreview">
        </div>
      </div>
      <p class="mt-sm">
        <button id="upload" @click="uploadFile(file)" class="upload">上传</button>
      </p>
      <div class="progress-area" v-show="options.showProgress ? options.showProgress : false">
        <p class="mb-sm">进度显示：</p>
        <div class="progress">
          <div class="progress-bar" id="progress" ref="progress">0%</div>
        </div>
        <div>
          <p class="time" ref="time"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hupload',
  props: ['options'],
  data () {
    return {
      imgPreview: null,
      xhr: null,
      loaded: 0,
      ot: 0,
      total: 0,
      oloaded: 0,
      file: null
    }
  },
  components: {
  },
  mounted () {
    this.imgPreview = this.$refs.imgPreview
  },
  created () {
    this.xhr = new XMLHttpRequest()
  },
  methods: {
    uploadFile (file) {
      if (!file) {
        alert('请选择文件')
        return
      }
      if (this.options.limitSize) {
        if (file.files[0].size > (this.options.limitSize) * 1e6) {
          alert(`文件大小不得超过${this.options.limitSize}M`)
          return
        }
      } else {
        if (file.files[0].size > 10000000) {
          alert(`文件大小不得超过10M`)
          return
        }
      }
      if (!this.options.fileUploadName) {
        alert('请配置与后端约定上传的key值')
        return
      }
      if (!this.options.url) {
        alert('请配置与后端约定的上传接口地址')
        return
      }
      let formData = new FormData()
      formData.append(this.options.fileUploadName, file.files[0])
      this.xhr.onload = this.uploadSuccess
      this.xhr.upload.onprogress = this.setProgress
      this.xhr.onerror = this.uploadFailed
      this.xhr.open('post', this.options.url, true)
      this.xhr.send(formData)
    },
    previewImage (event) {
      this.file = event.target
      this.imgPreview.innerHTML = ''
      // 每次重新选择文件的时候，都会去除上次选择产生的img标签
      let isImg = (event.target.files[0].type).indexOf('image/') > -1
      if (isImg) {
        // 如果是图片 就解析图片预览
        let img = document.createElement('img')
        this.imgPreview.appendChild(img)
        let reader = new FileReader()
        reader.onload = function (event) {
          img.src = event.target.result
          img.width = '200'
        }
        reader.readAsDataURL(event.target.files[0])
      } else {
        console.log('为文件选择一个默认的logo')
      }
    },
    setProgress (event) {
      let progress = this.$refs.progress
      // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
      if (event.lengthComputable) {
        this.loaded = event.loaded
        this.total = event.total
        let complete = (event.loaded / event.total * 100).toFixed(1)
        progress.innerHTML = Math.round(complete) + '%'
        progress.style.width = complete + '%'
      }
      // let time = document.getElementById('time')
      let time = this.$refs.time
      let nt = new Date().getTime() // 获取当前时间
      let pertime = (nt - this.ot) / 1000
      // 计算出上次调用该方法时到现在的时间差，单位为s
      this.ot = new Date().getTime() // 重新赋值时间，用于下次计算
      let perload = event.loaded - this.oloaded
      // 计算该分段上传的文件大小，单位b
      this.oloaded = event.loaded // 重新赋值已上传文件大小，用以下次计算
      // 上传速度计算
      let speed = perload / pertime // 单位b/s
      let bspeed = speed
      let units = 'b/s' // 单位名称
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'k/s'
      }
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'M/s'
      }
      speed = speed.toFixed(1)
      // 剩余时间
      let resttime = ((event.total - event.loaded) / bspeed).toFixed(1)
      resttime = resttime > 0 ? resttime : '0'
      time.innerHTML = '传输速度：' + speed + units + '，剩余时间：' + resttime + 's'
    },
    uploadSuccess () {
      if (this.xhr.readyState === 4 && this.xhr.status === 200) {
        setTimeout(() => {
          // 回调给父组件
          this.sendMsgToParent('success')
        }, 1000)
      }
    },
    uploadFailed (err) {
      console.log(err)
      this.sendMsgToParent({'error': err})
    },
    sendMsgToParent (msg) {
      this.$emit('receiveUploadMsg', msg)
    }
  }
}
</script>

<!-- 公共的样式 -->
<style>
  .mb-sm {
    margin-bottom: 10px;
  }
  .mt-sm {
    margin-top: 10px;
  }
  .wt-upload {
    text-align: left;
  }
  .file-area {
    width: 80%;
    margin: 0 auto;
  }
  .file-area  .file {
    display: none;
  }
  .wt-upload  .file-label {
    display: block;
    width: 100px;
    padding: 8px;
    background: #39D2B4;
    color: #fff;
    font-size: 1em;
    transition: all .4s;
    cursor: pointer;
    text-align: center;
  }
  .wt-upload .file-label:hover {
    background: rgb(123, 219, 200);
  }
  .wt-upload .file-label:focus {
      background: rgb(32, 148, 125);
  }
  .wt-upload .img-preview {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .wt-upload  .upload,.wt-upload .abort {
    display: inline-block;
    width: 100px;
    padding: 8px;
    background: #39D2B4;
    color: #fff;
    font-size: 1em;
    transition: all .4s;
    cursor: pointer;
    outline: none;
    border: none;
  }
  .wt-upload  .upload:hover {
    background: rgb(123, 219, 200);
  }
  .wt-upload .upload:focus {
    background: rgb(32, 148, 125);
  }
  .wt-upload .progress-area {
    padding: 20px;
  }
  .wt-upload .progress {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 1rem;
    overflow: hidden;
    font-size: 0.75rem;
    background-color: #e9ecef;
    border-radius: 0.25rem;
  }
  .wt-upload  .progress-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff;
    text-align: center;
    background-color: #007bff;
    transition: width 0.6s ease;
  }
  .wt-upload .time {
    margin-top: 10px;
  }
</style>
