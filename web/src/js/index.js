// 导入css
import '../scss/page-index.scss';

// 登录逻辑
$(() => {
  $('#login').on('submit', e => {
    e.preventDefault();
    console.log(e);
  });
});

// 上传文件逻辑
$(() => {
  let ul = $('.file-list-ul');

  // 显示选择文件
  $('.upload-form input').on('change', e => {
    let t = e.target;
    let files = $(t)
      .eq(0)
      .prop('files');
    let html = '';
    if (!files.length) return;
    ul.empty();
    ul.hide();
    for (let i = 0; i < files.length; i++) {
      let name = $('<div></div>')
        .text(files[i].name)
        .html();
      html += `<li>${name}</li>`;
    }
    ul.html(html);
    ul.slideDown('fast');
    e.preventDefault();
  });

  上传文件;
  $('.upload-form').on('submit', async e => {});
});
