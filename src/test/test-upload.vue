<template>
   <div>
	    <h2>打包测试</h2>
    	<hupload :options=options v-on:receiveUploadMsg="receiveUploadMsg"> </hupload>
   </div>
</template>

<script>
import Vue from 'vue'
import upload from '../../dist/vueUpload.js'
Vue.use(upload)
export default {
	data () {
		return {
			options: {
				'showProgress': true,
				'imagePreview': true,
				'url': 'str',
				'fileUploadName': 'ajax-upload',
				'limitSize': 1
			}
		}
	},
	components: {
	},
	methods: {
		receiveUploadMsg (msg) {
			console.log(msg)
		}
	}
}
</script>

<style>
</style>
