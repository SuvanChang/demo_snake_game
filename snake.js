'use strict'
var act = function(snake){
	//二维数组复制，制作一个副本
	var snake_copy = new Array()
	for(var i=0;i<snake.length;i++){
		snake_copy.push([])
		for(var p in snake[i]){
			snake_copy[i][p] = snake[i][p]
		}		
	}
	var body = snake.slice(0,snake.length-1)
	var head = snake_copy[0]
	snake=[]
	body.forEach(function(i){snake.push(i)})
	this.move=move
	this.move(head)
	snake.unshift(head)
	this.body = snake
	//console.log('蛇在动: '+this.body)
	snake_copy = null //清除副本
}
var move = function(head){
	switch(this.direct){
		case 0: return head[0]++;
		case 1: return head[1]++;
		case 2: return head[0]--;
		case 3: return head[1]--;
		default:console.log('error DIRECT') 
	}
}

var eat = function(callback){
	var x,y
	if(snake.body[0][0]>50){
		x=snake.body[0][0]%50
	}else if(snake.body[0][0]<=0){
		x=snake.body[0][0]%50+50
	}else {
			x=snake.body[0][0]
		}
	if(snake.body[0][1]>50){
		y=snake.body[0][1]%50
	}else if(snake.body[0][1]<=0){
		y=snake.body[0][1]%50+50
		}else {
			y=snake.body[0][1]
		}
	var foodx = 50*food[0]
	var foody = 50*food[1]
	if((10*x-foodx)<=30&&(10*x-foodx)>=-30){
		if((10*y-foody)<=30&&(10*y-foody)>=-30){
			callback()
		}
	}
}

var score = [0]
var scoredom = document.getElementById('score')
var afterEat = function(){
	snake.body.push(food)
	food[0] = 10*Math.random()
	food[1] = 10*Math.random()
	score[0]++
	scoredom. innerHTML = score[0]
}

var eatself = function(){
	var x,y
	if(snake.body[0][0]>50){
		x=snake.body[0][0]%50
	}else if(snake.body[0][0]<=0){
		x=snake.body[0][0]%50+50
	}else {
			x=snake.body[0][0]
		}
	if(snake.body[0][1]>50){
		y=snake.body[0][1]%50
	}else if(snake.body[0][1]<=0){
		y=snake.body[0][1]%50+50
		}else {
			y=snake.body[0][1]
		}
	for(var i = 2;i<=snake.body.length-2;i++){
		var selfy,selfx
		if(snake.body[i][0]>50){
			selfx=snake.body[i][0]%50
		}else if(snake.body[i][0]<=0){
			selfx=snake.body[i][0]%50+50
			}else {
				selfx=snake.body[i][0]
			}
		
		if(snake.body[i][1]>50){
			selfy=snake.body[i][1]%50
		}else if(snake.body[i][1]<=0){
			selfy=snake.body[i][1]%50+50
			}else {
				selfy=snake.body[i][1]
		}
		if((10*x-10*selfx)<=0.1&&(10*x-10*selfx)>=-0.1){
			if((10*y-10*selfy)<=0.1&&(10*y-10*selfy)>=-0.1){
				if(i!=2){alert('gameover!');removeEventListener('keydown',function(){});if(timer)clearInterval(timer)}
			}
		}
	}
}

var snake = {
	body:[[1,1],[2,1],[3,1],[4,1]],
	direct:1,
	act:act,
	eat:eat,
	eatself:eatself
}

var food = [10*Math.random(),10*Math.random()]

var cav = document.getElementById('cav')
var cxt = cav.getContext('2d')
var render = function(){
	cxt.clearRect(0,0,500,500)
	cxt.beginPath()
	cxt.arc(50*food[0],50*food[1],4,0,2*Math.PI)
	cxt.fillStyle='yellow'
	cxt.fill()
	for(var i=0;i<snake.body.length;i++){
		var r = 5
		if(i==0){cxt.fillStyle='red';r=8}else{cxt.fillStyle='white'}
		cxt.beginPath()
		var x,y
		if(snake.body[i][0]>50){
			x=snake.body[i][0]%50
		}else if(snake.body[i][0]<=0){
			x=snake.body[i][0]%50+50
			}else {
				x=snake.body[i][0]
			}
		if(snake.body[i][1]>50){
			y=snake.body[i][1]%50
		}else if(snake.body[i][1]<=0){
			y=snake.body[i][1]%50+50
			}else {
				y=snake.body[i][1]
			}
		cxt.arc(10*x,10*y,r,0,2*Math.PI)
		cxt.fill()
	}	
}

var timer
var ti = 50
addEventListener('keydown',function(e){
		if(e.code=='KeyD'&&snake.direct!=2){
			if(timer){clearInterval(timer)}
			snake.direct=0;
			timer = setInterval(function(){snake.act(snake.body);render();snake.eat(afterEat);snake.eatself()},ti)
		}
		if(e.code=='KeyS'&&snake.direct!=3){
			if(timer){clearInterval(timer)}
			snake.direct=1;
			timer = setInterval(function(){snake.act(snake.body);render();snake.eat(afterEat);snake.eatself()},ti)
		}
		if(e.code=='KeyA'&&snake.direct!=0){
			if(timer){clearInterval(timer)}
			snake.direct=2;
			timer = setInterval(function(){snake.act(snake.body);render();snake.eat(afterEat);snake.eatself()},ti)
		}
		if(e.code=='KeyW'&&snake.direct!=1){
			if(timer){clearInterval(timer)}
			snake.direct=3;
			timer = setInterval(function(){snake.act(snake.body);render();snake.eat(afterEat);snake.eatself()},ti)
		}
},false)

