import * as OASIS from "oasis-engine/dist/miniprogram";
import { OrbitControl } from "@oasis-engine-toolkit/controls/dist/miniprogram";
import { registerCanvas } from "@oasis-engine/miniprogram-adapter";
import { Vector3 } from '@oasis-engine/math';
import { Camera, GLTFResource, WebGLEngine,DirectLight,Texture2D,
  AnimationClip,Animator,
  TextureFormat,BackgroundMode,BackgroundTextureFillMode } from "oasis-engine";




Page({
  data:{
   
   
  },
  onLoad(option) {
    // 页面加载
    console.info("加载完成");
    if(option.model){
      this.data.modelUrl=option.model;
    }
    
  },

  onCanvasReady() {
    my._createCanvas({
    id: 'canvasNative',
    vedioRecord: true,
    success: (canvas) => {
    
   
      this.initWebgl(canvas);




    },
    });
   },

   async initWebgl(canvas){
    registerCanvas(canvas);
    // 适配 canvas 大小
    const info = my.getSystemInfoSync();
    const { windowWidth, windowHeight, pixelRatio, titleBarHeight } = info;
    canvas.width = windowWidth * pixelRatio;
    canvas.height = (windowHeight - titleBarHeight) * pixelRatio;
    this.canvas = canvas;
    console.log("结果",canvas);
    // 创建引擎
    this.engine = new OASIS.WebGLEngine(canvas);
    console.log("引擎",this.engine.resourceManager);
    this.scene = this.engine.sceneManager.activeScene;
    //this.scene.background.mode = BackgroundMode.SolidColor; // 默认纯色背景
    //this.scene.background.solidColor.set(1, 1, 1, 1); // 纯白色
    this.rootEntity = this.scene.createRootEntity('root');

    let cameraEntity = this.rootEntity.createChild('camera_entity');

cameraEntity.transform.position = new Vector3(0, 5, 10);
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

cameraEntity.addComponent(Camera);

cameraEntity.addComponent(OrbitControl);

this.engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

this.loadModel();





this.engine.run();



   },
   async loadModel(){
    this.setData({
      loadingText:"模型正在加载中..."
    })
    this.gltf = await this.engine.resourceManager.load("https://wifi.pro.youzewang.com/model/robot.glb");
    console.log("模型");
    this.gltf.defaultSceneRoot.transform.scale=new Vector3(0.5, 0.5, 0.5);
    this.gltf.defaultSceneRoot.transform.position=new Vector3(0, 0, 0);
    this.gltf.defaultSceneRoot.transform.rotation=new Vector3(0, 0, 0);
    
    this.rootEntity.addChild(this.gltf.defaultSceneRoot);
    console.log(this.gltf.defaultSceneRoot);

    const animator = this.gltf.defaultSceneRoot.getComponent(Animator);
    console.log("动画",animator,this.gltf.animations[0].name);
    //animator.play(gltf.animations[0].name);

//     this.engine.resourceManager
//   .load(this.data.modelUrl)
//   .then((asset) => {
//     const { defaultSceneRoot } = asset;
//     this.rootEntity.addChild(defaultSceneRoot);
//     const animator = defaultSceneRoot.getComponent(Animator);
//     console.log("结果",defaultSceneRoot,animator);
//     animator.play("run");
// });

   

   },
   
  

  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'ar',
      desc: 'ar效果',
      path: '/pages/index/index',
    };
  },
});
