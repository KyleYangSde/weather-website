//在index.hbs里添加

// 选一些要style的元素 eventhandler
const weatherForm = document.querySelector("form");
//获取input的内容
const search = document.querySelector("input");
//选中第一个p 需要一个惟一的id #进行对应
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  //防止事件再次刷新
  e.preventDefault();
  //当form submitted的时候 再去取值
  const location = search.value;
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  //在得到用户输入之后再去fetch data
  //http://localhost:3000
  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        //console.log(data.error);
        //能够显示在DOM里
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
    });
  });
});
