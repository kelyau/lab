const width =  window.innerWidth
const height = window.innerHeight
const app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container)



const data = {
  root: {
    name: 'root',
    child: [
      {
        name: 'a',
        child: [
          {
          name: 'aa',
          child: [
            {name: 'aaa'},
            {name: 'aab'}
          ]
          }
        ]
      },
      {
        name: 'b',
        child: [
          {
            name: 'ba'
          },
          {
            name: 'bb',
            child: [{name: 'bba'}]
          }
        ]
      },
      {
        name: 'c',
        child: [
          {name: 'ca'}
        ]
      }
    ]
  }
}

//入口方法
function draw(orgData){
  var h = 100
  var w = 80
  var m = 20
  var paddingLeft = 100
  var paddingTop = 100
  var dataLevel = dataTranslate(orgData)
  var maxLevel = dataLevel.length - 1
  var maxNode = dataLevel[maxLevel-1].length
  var stageWidth = maxNode * w + maxNode * m
  console.log('dataLevel =>', dataLevel) 

  var arrayNode = []
  for (var level = maxLevel; level > -1; level --){
   
    var pointY = paddingTop + level * h + level * m
    for (var step = 0; step < dataLevel[level].length; step++ ){
      var pointX = paddingLeft +  step * w + step * m
     
      //重新计算x位置
      var firstNode
      var lastNode
      var count = 0
      for (var d = 0, len = arrayNode.length; d < len; d ++ ){
  
        if (arrayNode[d].parentNode == dataLevel[level][step].node){
          //判断节点是否为父节点
         
          if (!count){
            firstNode = arrayNode[d]
          }
          lastNode = arrayNode[d]
          count ++
        }
      }
      
      if (firstNode){
         pointX = (firstNode.x + lastNode.x) / 2
      }
      

      //节点重新另存
      var node = Object.assign({
        x: pointX,
        y: pointY
      }, dataLevel[level][step])
      arrayNode.push(node)
      //画节点
      drawLine(node, w, h, m, firstNode, lastNode)   
      drawNode(node)

    }
  }

}

//数据转换
function dataTranslate(data){
  function recursion(node, level, pNode, arrayData){
    level = level || 0
    arrayData = arrayData || []
    
    var newNode = {
      name: node.name,
      level: level,
      parentNode: pNode || '',
      node: node.name,
      placeholder: !!node.placeholder
    }
    if (!arrayData[level]){
      arrayData[level] = []
    }
    arrayData[level].push(newNode)
    
    if(!node.child){
      if (level >= 3){
        return arrayData
      }
      
      for (var i = level; i < 3; i++){
        node = placeholderNode(node)
      }
    }

    level += 1

    node.child.forEach(item => {
      recursion(item, level, node.name, arrayData)
    })
    
    return arrayData 
   
  }
  
  return recursion(data)
  
}

//画线
function drawLine(node, w, h, m, firstNode, lastNode){
  if (node.placeholder){
    return false
  }
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0xFF3300)
  graphics.lineStyle(1, 0xFFD900)
  
  if (node.parentNode){
    graphics.moveTo(node.x, node.y - 30)
    graphics.lineTo(node.x, node.y  - h/2)
    
  }
  if(firstNode && !firstNode.placeholder){
  
      graphics.moveTo(node.x, node.y + 30)
      graphics.lineTo(node.x, node.y + h/2 + m) 
      
  }

  if (firstNode && firstNode != lastNode){
    graphics.moveTo(firstNode.x, lastNode.y - h/2)
    graphics.lineTo(lastNode.x, lastNode.y - h/2)
  }

 
  graphics.endFill()
  
  container.addChild(graphics)

}


//画节点
function drawNode(node){
  if (node.placeholder){
    return false
  }
  const nodeCtx = new PIXI.Container()
  const graphics = new PIXI.Graphics()
  
  graphics.lineStyle(0)
  graphics.beginFill(0xFFFF0B, 0.5)
  graphics.drawCircle(0, 0, 30)
  graphics.endFill()
  
  nodeCtx.addChild(graphics)
  
  const t = new PIXI.Text(node.name, {
    fontSize: 14,
    width: 30,
    align: 'center'
  })
  t.x = -t.width / 2
  t.y = -8

  nodeCtx.addChild(t)
  nodeCtx.x = node.x
  nodeCtx.y = node.y

  nodeCtx.interactive = true
  nodeCtx.on('click', e => {
    e.stoped = true
    e.stopPropagation()
    console.log(e)
  })

  nodeCtx.on('mouseover', e => {
    e.stoped = true
    e.stopPropagation()
    showTip(e, node)
  })

  nodeCtx.on('mouseout', e => {
    e.stoped = true
    e.stopPropagation()
    hideTip(e)
  })

  container.addChild(nodeCtx)
  
  
  return nodeCtx
  

}

var tip;
function showTip(event, node){
  var graphics = new PIXI.Graphics()
  graphics.lineStyle(1, 0xFF00FF,1)
  graphics.beginFill(0xFF00BB, 0.25)
  graphics.drawRoundedRect(0, 0, 60, 30, 5)
  graphics.endFill()

  var text = new PIXI.Text(node.name)
  text.x = 30 - text.width/2

  tip = new PIXI.Container()
  tip.addChild(graphics,text)
  tip.x = event.data.global.x
  tip.y = event.data.global.y
  container.addChild(tip)  

}

function hideTip(event){
  if (!tip){
    return
  }

  container.removeChild(tip)
}

function placeholderNode(node){
  if (!node.child){
    node.child = [];
    node.child[0] = {placeholder: true, name: Date.now()}
    return node
  }
  placeholderNode(node.child[0])
}

draw(data.root)

container.hitArea = new PIXI.Rectangle(0, 0, container.width, container.height)
container.interactive = true
container.on('click', e => console.log('container =>', e))

