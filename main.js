const { app, BrowserWindow } = require("electron");

const ffi = require("ffi-napi");

const path = require("path");

console.log(__dirname + "------Dll1.dll"); //确认dll库的路径是否正确

const libm = ffi.Library(path.resolve(__dirname, "Dll1.dll"), {
  function_name: ["int", ["int", "int"]],
});

function getDllRes() {
  const result = libm.function_name(4, 4);

  console.log(result); //这里会打印出正确的的计算结果
}

function createWindow() {
  getDllRes();
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // getDllRes();

  // 加载index.html文件
  win.loadFile("index.html");
  // getDllRes();
}

app.on("ready", createWindow);
