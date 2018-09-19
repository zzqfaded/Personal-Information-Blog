function drag(id){
			this.odiv = id;
			this.disX = 0;
			this.disY = 0;
			//阻止鼠标移动时  会选中文字或者图片
			this.odiv.onselectstart = this.odiv.ondrag = function(){
				return false;
			}
			//移动的距离 = 移动后的位置 - 初始的位置
			this.odiv.onmousedown = (ev)=>{
				this.fnDown(ev);
			};
		}
		drag.prototype.fnDown = function (ev){
						this.disX = ev.clientX - this.odiv.offsetLeft;
						this.disY = ev.clientY - this.odiv.offsetTop;
						document.onmousemove = (ev)=>{
							this.fnMove(ev);
						};
						document.onmouseup = (ev)=>{
							this.fnUp(ev);
						};
					};
		drag.prototype.fnMove = function (ev){
							var l = ev.clientX - this.disX;
							var t = ev.clientY - this.disY;
							var ll = document.documentElement.clientWidth - this.odiv.offsetWidth;
							var tt = document.documentElement.clientHeight - this.odiv.offsetHeight;
							if (l<0) {
								l = 0;
							}
							if(l>ll){
								l = ll;
							}
							if(t<0){
								t = 0;
							}
							if(t>tt){
								t = tt;
							}
							this.odiv.style.left = l + 'px';
							this.odiv.style.top = t + 'px';
						};
		drag.prototype.fnUp = function fnUp(){
							document.onmousemove = null;
							document.onmouseup = null;
						}