//npm init -y

const express = require("express");
//express是个function

const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//find the root url
//限制根目录 define the path for express config 之后的操作都是基于public这个根目录
const rootpath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partial = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location  set(name,value)
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partial);
//setup static directory to serve
app.use(express.static(rootpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kyle Yang"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Kyle Yang"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Kyle Yang"
  });
});

//?key=value
app.get("/products", (req, res) => {
  //为了某个属性是必须的
  if (!req.query.search) {
    //return 结束运行
    return res.send({
      error: "Must provide a search term"
    });
  }
  //存储key value值
  console.log(req.query.search);
  //这里导致了错误 server进行返回
  res.send({
    products: []
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    //return 结束运行
    return res.send({
      error: "Must provide a search term"
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data.latitude, data.longtitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      //返回给命令行
      //console.log(res);
      res.send({
        forcast: forecastData,
        location: data.location,
        address: req.query.address
      });
    });
  });
});
//下层域名
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Page not found",
    title: "404 Page",
    name: "Kyle Yang"
  });
});

//除了以外的所有
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    title: "404 Page",
    name: "Kyle Yang"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});

/***
 * 怎样把地址从网页上（用户输入）发给url
 *
 */

/**
 * heroku login
 */

/***
 * version control
 * 控制应用的改变
 * 回溯到上一版本
 * untracked file 未追踪文件
 * unstaged changes未改变的改变->staged changes
 * add 命令 -> staged changes状态改变->
 * commit命令 -> 把所有改变的文件commit并给与一个惟一的identify
 * ->commit里多加一个状态码
 *
 *
 * git init 新建一个git依赖文件夹 初始化文件
 * 仓库是一个存储文件的地方
 * 变成绿色表示还没有被commited
 *
 * git status看现在的状态 红色表示untracked file
 * 不用上传node module
 * npm install就直接下载依赖了
 * .gitignore里加入不上传的文件
 *
 */
