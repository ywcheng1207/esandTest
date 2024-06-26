const config = {
  needVideo: false,
  useCloudStorage: false,
  language: "CN",
  deviceId: 0,
  takeImageNumber: 2
}

const workerUrl = 'https://edis.esandcloud.com/efaceid/1.10.0/worker.min.1.10.0.js'

function App() {
  const esandVerifyConfig = {
    bizId: '2024052318151GF15',
    livingType: '1',
    returnUrl: `get:${encodeURI(window.location.href)}`
    // returnUrl: 'https://www.baidu.com/'
    // returnUrl: 'https://www.google.com/'
    // returnUrl: `get:https://www.google.com/`
    // returnUrl: 'https://www.goubao08.com/'
  }
  const esandVerifyLink = `https://edis.esandcloud.com/livingdetection/rpverifyh5/public/livingdetect/getLDTURL?strategy=1&bizId=${esandVerifyConfig.bizId}&livingType=${esandVerifyConfig.livingType}&returnUrl=${esandVerifyConfig.returnUrl}`

  const handleSubmit1 = () => {
    EsLivingDetection.verifyInit(workerUrl, "1", config).then(result => {
      //把初始化信息给业务服务器，获取认证token
      console.log('活體檢測初始化訊息', result)
      return sendToServer(initMsg);
    }).then(res => {
      //传入token以及挂载活体检测element的容器id 执行活体检测
      return EsLivingDetection.startLivingDetect(token, containerID);
    }).then(result => {
      //获取认证结果
      return sendToServer(result.data.token, result.data.verifyMsg);
    }).then(res => {
      //服务端认证结果
    }).catch(ex => {
      //发生异常
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <button onClick={handleSubmit1}>sdk方案：這個方案點了會初始化(見console)，如果這個方案可行，初始化取得的data就會是我們後端api(/init)的initMsg。<span style={{ color: 'tomato' }}>(不過RN沒地方引入cdn)</span></button>
      <button onClick={() => window.location.href = esandVerifyLink}>跳轉方案：這個方案要用手機，可以過去掃臉，成功掃臉完之後要回到指定的連結會失敗<span style={{ color: 'tomato' }}>(會顯示'發生錯誤，無法開啟應用程式')</span></button>
    </div>
  );
}
export default App;
