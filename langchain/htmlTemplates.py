css = '''
<style>
.chat-message {
    width: 70%; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; display: flex
}
.chat-message.user {
    background-color: #2b313e;
    margin-left: 30%;
}
.chat-message.bot {
    background-color: #0474ea
}
.chat-message .avatar {
  width: 20%;
}
.chat-message .avatar img {
  max-width: 78px;
  max-height: 78px;
  border-radius: 50%;
  object-fit: cover;
}
.chat-message .message {
  width: 80%;
  padding: 0 1.5rem;
  color: #fff;
}
'''

bot_template = '''
<div class="chat-message bot">
  <div class="avatar">
      <img src="https://www.boostability.com/content/wp-content/uploads/sites/2/2021/02/Feb.-17-Bots-e1614642771145.jpg" style="max-height: 78px; max-width: 78px; border-radius: 50%; object-fit: cover;">
  </div>
    <div class="message">{{MSG}}</div>
</div>
'''

user_template = '''
<div class="chat-message user">
  <div class="avatar">
      <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png">
  </div>
    <div class="message">{{MSG}}</div>
</div>
'''
