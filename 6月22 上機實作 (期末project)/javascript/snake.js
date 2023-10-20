//獲取繪製工具
	/*
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");//獲取上下文
	ctx.moveTo(0,0);
	ctx.lineTo(450,450);*/
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	
	var a = document.getElementById("canvas");
	var ctx1 = a.getContext("2d");
	
	var b = document.getElementById("canvas");
	var ctx2 = a.getContext("2d");
	
	var snake = [];//定義一條蛇，畫蛇的身體
	var snakeCount = 5;//初始化蛇的長度
	var foodx = 0;
	var foody = 0;
	var poisonx = 0;
	var poisony = 0;
	var bombx = 0;
	var bomby = 0;
	var togo = 3;
	var grade1 = 0;
	var tem = 3;
	
	start();//一剛開始載入的時候進入function
	function start1()//按下開始的按鈕後進入的function
	{
		clearInterval();
		document.getElementById("grade").innerHTML = grade1;//把分數讀出去，從0開始
		setInterval(move, 150);//過0.1秒後進移動的function，會一直重複進行
		drawtable();//畫地圖
	}
	function drawtable()//畫地圖的函式
	{
		for (var i = 0; i < 60; i++)//畫豎線
		{
			ctx.strokeStyle = "black";
			ctx.beginPath();//產生一個新路徑，產生後再使用繪圖指令來設定路徑。
			ctx.moveTo(15 * i, 0);//移動畫筆到指定的(x, y)座標點
			ctx.lineTo(15 * i, 600);//從目前繪圖點畫一條直線到指定的(x, y)座標點。
			ctx.closePath();//閉合路徑好讓新的繪圖指令來設定路徑。
			ctx.stroke();//畫出圖形的邊框。
		}
		for (var j = 0; j < 90; j++)//畫橫線
		{
			ctx.strokeStyle = "black";
			ctx.beginPath();//產生一個新路徑，產生後再使用繪圖指令來設定路徑。
			ctx.moveTo(0, 15 * j);//移動畫筆到指定的(x, y)座標點
			ctx.lineTo(900, 15 * j);//從目前繪圖點畫一條直線到指定的(x, y)座標點。
			ctx.closePath();//閉合路徑好讓新的繪圖指令來設定路徑。
			ctx.stroke();//畫出圖形的邊框。
		}

		
		for (var k = 0; k < snakeCount; k++)//畫蛇的身體
		{
			ctx.fillStyle = "#000";
			if (k == snakeCount - 1)//蛇頭的位置
			{
				ctx.fillStyle = "red";//蛇頭的顏色與身體區分開
			}
			ctx.fillRect(snake[k].x, snake[k].y, 15, 15);//前兩個數是矩形的起始座標，後兩個數是矩形的長寬。
		}
		
		/*放上食物的位置*/	
		ctx.fillStyle = "red";
		ctx.fillRect(foodx, foody, 15, 15);
		ctx.fill();
	
		/* 放上毒藥的位置 */
		ctx1.fillStyle = "green";
		ctx1.fillRect(poisonx, poisony, 15, 15);
		ctx1.fill();
	
		/* 放上炸彈的位置 */
		ctx2.fillStyle = "black";
		ctx2.fillRect(bombx, bomby, 15, 15);
		ctx2.fill();
	}
	
	function start()//定義蛇的座標
	{
		//var snake =[];//定義一條蛇，畫蛇的身體
		//var snakeCount = 6;//初始化蛇的長度
	
		for (var k = 0; k < snakeCount; k++)//定義蛇的位置，要往哪去
		{
			snake[k] = { x:k * 15,y : 0 };
		}
		drawtable();//畫格子的function
		addfood();//在start中呼叫新增食物函式
	}
	
	function addfood()
	{
		foodx = Math.floor(Math.random() * 60) * 15; //Math.floor()是回傳小於等於所給數字的最大整數，隨機產生一個0-1之間的數(random出食物的位置)
		foody = Math.floor(Math.random() * 40) * 15;
	
		poisonx = Math.floor(Math.random() * 60) * 15; //Math.floor()是回傳小於等於所給數字的最大整數，隨機產生一個0-1之間的數(random出毒藥的位置)
		poisony = Math.floor(Math.random() * 40) * 15;
		while (poisonx == foodx || poisony == foody || poisonx == bombx || poisony == bomby)//防止三個東西出現在同一個點
		{
			poisonx = Math.floor(Math.random() * 60) * 15; 
			poisony = Math.floor(Math.random() * 40) * 15;
		}
	
		bombx = Math.floor(Math.random() * 60) * 15; //Math.floor()是回傳小於等於所給數字的最大整數，隨機產生一個0-1之間的數(random出炸彈的位置)
		bomby = Math.floor(Math.random() * 40) * 15;
		while (bombx == poisonx || bombx == foodx || bomby == poisony || bomby == foody)//防止三個東西出現在同一個點
		{
			bombx = Math.floor(Math.random() * 60) * 15; 
			bomby = Math.floor(Math.random() * 40) * 15;
		}
		for (var k = 0; k < snake; k++)//防止產生的隨機食物，毒藥，炸彈落在蛇身上
		{
			if ((foodx == snake[k].x && foody == sanke[k].y) || (poisonx == snake[k].x && poisony == snake[k].y) || (bombx == snake[k].x && bomby == snake[k].y))
			{
				addfood();//重新random一次
			}
		}
	
	
	}
	
	function move()//移動的function
	{
		switch (togo)
		{
		case 1:
			snake.push({ x:snake[snakeCount - 1].x - 15,y : snake[snakeCount - 1].y });
			break;//向左走
		case 2:
			snake.push({ x:snake[snakeCount - 1].x,y : snake[snakeCount - 1].y - 15 });
			break;//向上走
		case 3:
			snake.push({ x:snake[snakeCount - 1].x + 15 ,y : snake[snakeCount - 1].y });
			break;//向右走
		case 4:
			snake.push({ x:snake[snakeCount - 1].x,y : snake[snakeCount - 1].y + 15 });
			break;//向下走
		case 5: 
			snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y-15}); 
			break;//向左下走
		case 6: 
			snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y+15});
			break;//向右上走
		default: 
			snake.push({ x:snake[snakeCount - 1].x + 15 ,y : snake[snakeCount - 1].y });
			break;
		}
		snake.shift();//刪除陣列第一個元素
		ctx.clearRect(0, 0, 900, 600);//清除畫布重新繪製
		ctx1.clearRect(0,0,900,600);
		ctx2.clearRect(0,0,900,600);
		isEat();//判斷吃到哪一個點點
		isDead();//判斷是否碰到邊框
		tough();
		drawtable();//繪製畫布跟蛇身
	}

	function keydown(e)//按下哪個鍵，決定方向
	{
		//最前面的if是用來防止蛇回頭
		if (tem != 3)
		{
			if (e.keyCode == 37)//按下左鍵
			{
				togo = 1;
				tem = 1;
			}
		}
		if (tem != 4)
		{
			if (e.keyCode == 38)//按下上鍵
			{
				togo = 2;
				tem = 2
			}
		}
		if (tem != 1)
		{
			if (e.keyCode == 39)//按下右鍵
			{
				togo = 3;
				tem = 3;
			}
		}
		if (tem != 2)
		{
			if (e.keyCode == 40)//按下下鍵
			{
				togo = 4;
				tem = 4;
			}
		}
		if(tem != 6)
		{
			if(e.keyCode == 65)//按下A鍵，往右上移動
			{
				togo = 5;
				tem = 5;
			}
		}
		if(tem != 5)
		{
			if(e.keyCode == 68)//按下D鍵，往左下移動
			{
				togo = 6;
				tem = 6;
			}
		}
	}
	
	function isEat()//吃到食物後長度加1
	{
		if (snake[snakeCount - 1].x == foodx && snake[snakeCount - 1].y == foody)//蛇碰到食物
		{
			grade1++;//分數+1
			document.getElementById("grade").innerHTML = grade1;//上傳分數
			addfood();//產生食物，毒藥，炸彈的位置
			snakeCount++;//增加蛇的身體長度
			snake.unshift({ x:-15,y : -15 });//把陣列最尾端元素消除掉
			setfun();//加速的function
		}
		else if (snake[snakeCount - 1].x == poisonx && snake[snakeCount - 1].y == poisony)//蛇碰到毒藥
		{
			grade1--;//分數-1
			if (grade1 < 0)//分數是負的時候，遊戲結束
			{
				clearInterval();//時間停止
				alert("分數是負，你到底在幹嘛!!!都不注意分數齁~~~你輸了");
				resetF();//歸0
			}
			document.getElementById("grade").innerHTML = grade1;//上傳分數
			addfood();//重新random食物，毒藥，炸彈的位置
		}
		else if (snake[snakeCount - 1].x == bombx && snake[snakeCount - 1].y == bomby)//蛇碰到炸彈，遊戲結束
		{
			clearInterval();//時間停止
			alert("Bomb!!!!!!");
			alert("你吃到炸彈了!!!你輸了");
			resetF();//歸0
		}
	}
	function isDead()//蛇碰到邊框，遊戲結束
	{
		if (snake[snakeCount - 1].x > 885 || snake[snakeCount - 1].y > 585 || snake[snakeCount - 1].x < 0 || snake[snakeCount - 1].y < 0)
		{
			clearInterval();//時間停止
			alert("蛇碰到邊框了!!!你輸了");
			resetF();//歸0
		}
	}

	function tough()//判斷蛇頭有沒有碰到身體
	{
		for(var i = 0; i < snakeCount-1; i++)
		{
			if(snake[i].x == snake[snakeCount - 1].x && snake[i].y == snake[snakeCount - 1].y)//若蛇頭碰到身體任一地方
			{
				clearInterval();//時間停止
				alert("蛇碰到自己了!!!你輸了");
				resetF();//歸0
			}
		}
	}
	
	document.onkeydown = function(e)//判斷你按下的那個方向鍵是哪個方向
	{
		keydown(e);//傳遞方向鍵的位置
	}

	function setfun()//加速的function
	{
		setTimeout(subbody, 5000);//每五秒呼叫一次縮身體的function
		setInterval(move, 150);//過0.2秒後進移動的function，會一直重複進行
		drawtable();//畫地圖
	}

	function subbody()//每3~5秒身體減一格
	{
		if(snakeCount >= 2)//如果身體長度大於等於2
		{
			snake.shift();//殺掉蛇身體的最後一節
			snakeCount--;//蛇的長度-1
			drawtable();//畫圖
		}
	}

	function resetF()//重新歸0的function
	{
		window.location.reload();//刷新網頁
		snake = null;//一定要把蛇歸0，不然會一直跑
		tem = 3;//把判斷方向也歸成3
		togo = 3;//把判斷方向也歸成3
		grade1 = 0;//分數也歸0
		document.getElementById("grade").innerHTML = grade1;//重新上傳分數
		setInterval(move, 150);//隔一段時間，往動作去
		drawtable();//畫畫布
	}


	
	/*參考網站https://iter01.com/32324.html*/
	