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
  }
  const esandVerifyLink = `https://edis.esandcloud.com/livingdetection/rpverifyh5/public/livingdetect/getLDTURL?strategy=1&bizId=${esandVerifyConfig.bizId}&livingType=${esandVerifyConfig.livingType}&returnUrl=${esandVerifyConfig.returnUrl}`

  const handleSubmit1 = () => {
    EsLivingDetection.verifyInit(workerUrl, "1", config).then(result => {
      //把初始化信息给业务服务器，获取认证token
      console.log('', result)
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
    <div>
      <button onClick={handleSubmit1}>sdk方案</button>
      <button onClick={() => window.location.assign(esandVerifyLink)}>跳轉方案</button>
    </div>
  );
}
export default App;
