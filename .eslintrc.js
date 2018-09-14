// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    //允许使用tab 缩进　
    'indent':['off','tab'],
    // 允许箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // 允许 async-await
    'generator-star-spacing': 0,
    // 允许使用tab
    "no-tabs":"off",
 　　// 允许在development使用debugger
　　'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, 
   // 关闭语句强制分号结尾
   "semi": [0,';'], 
   //空行最多不能超过3行 
   "no-multiple-empty-lines": [0, {"max": 3}],
  //允许禁止混用tab和空格 
   "no-mixed-spaces-and-tabs": 'off'
  }
}
