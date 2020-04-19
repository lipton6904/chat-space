$(function(){
  function buildHtml(message){
    if (message.content && message.image) {
      let html = `<div class="chat-main__message-list__post">
                    <div class="chat-main__message-list__post__user-name">
                    ${message.user_name}
                    </div>
                    <div class="chat-main__message-list__post__date-time">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list__text">
                    <p class="chat-main__message-list__text__content">
                    ${message.content}
                    </p>
                    <img class="chat-main__message-list__text__content__image" src= ${message.image}>
                  </div>`
      return html;
    } else if (message.content) {
      let html = `<div class="chat-main__message-list__post">
                    <div class="chat-main__message-list__post__user-name">
                    ${message.user_name}
                    </div>
                    <div class="chat-main__message-list__post__date-time">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list__text">
                    <p class="chat-main__message-list__text__content">
                    ${message.content}
                    </p>
                  </div>`
      return html;
    } else if (message.image) {
      let html = `<div class="chat-main__message-list__post">
                    <div class="chat-main__message-list__post__user-name">
                    ${message.user_name}
                    </div>
                    <div class="chat-main__message-list__post__date-time">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list__text">
                    <img class="chat-main__message-list__text__content__image" src= ${message.image}>
                  </div>`
      return html;
    };
    }

  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHtml(data);
      $('.chat-main__message-list').append(html)
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__message-form__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});

