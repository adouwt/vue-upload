import Vue from 'vue'
import Router from 'vue-router'
import uploadUse from '@/test/test-upload'
import devUploadUse from '@/dev/dev-upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test-upload-use',
      name: 'uploadUse',
      component: uploadUse
    },
    {
      path: '/dev-upload-use',
      name: 'devUploadUse',
      component: devUploadUse
    }
  ]
})
