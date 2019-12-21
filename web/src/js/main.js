// 导入bootstrap
import 'bootstrap';
import '../scss/index.scss';

//  babel-polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// 运行代码，按需导入模块
$(() => {
  var page = $('meta[data-page]').attr('data-page');
  if ($(`meta[data-page=${page}]`).length) {
    console.log(`当前所在的页面为：${page}`);
    import(`./${page}`);
  }
});
