/*=author:陈建 左右上下移动控制=*/
var SellerScroll = function (options) {
    this.SetOptions(options);
    this.container = this.options.container //外DIV
    this.con_nner = this.options.con_nner; //内DIV
    this.lButton = this.options.lButton; //左按钮
    this.rButton = this.options.rButton; //右按钮
    this.oList = this.options.oList;  //ul
    this.showSum = this.options.showSum;  //一次滑动数
    this.showmun = this.options.showmun;  //显示条数
    this.direction = this.options.direction;  //方向控制
	this.animateEffect= this.options.animateEffect;
	
    this.iList = $("#" + this.options.oList + " > li");
    this.iListSum = this.iList.length;
    this.iListWidth = this.iList.outerWidth(true); //一个LI的宽度
    this.iListHeight = this.iList.outerHeight(true); //一个LI的高度
	/*向上取整*/
    this.dividers = Math.ceil(this.iListSum / this.showSum); 
    this.moveWidth = this.iListWidth * this.showSum;
    this.moveHeight = this.iListHeight * this.showSum;
	this.containerW=Math.ceil($("#" + this.options.container).width());
	this.con_nnerW=Math.ceil($("#" + this.options.con_nner).width());
	this.containerH=Math.ceil($("#" + this.options.container).height());
	this.con_nnerH=Math.ceil($("#" + this.options.con_nner).height());
	
	
    if (this.direction == "left") {
        this.LeftScroll();
        this.RightScroll();
    }
    else {
        this.TopScroll();
        this.DownScroll();
    }
};


SellerScroll.prototype = {
    SetOptions: function (options) {
        this.options = {
            container: "",
            con_nner: "",
            lButton: "",
            rButton: "",
            oList: "",
            showSum: 1,//一次滑动数
            showmun: 1,//显示个数
            direction: "",
            animateEffect:0
        };
        $.extend(this.options, options || {});
    },
	//li总宽
	Getliwidth:function(){
		var liwidth=0;
		var iList = $("#" + this.options.oList + " > li");
		iList.each(function(i){
			liwidth=$(this).width()+liwidth;
		});
		return liwidth;
	},
	//li总高
	Getliheight:function(){
		var liheight=0;
		var iList = $("#" + this.options.oList + " > li");
		iList.each(function(i){
			liheight=$(this).height()+liheight;
		});
		return liheight;
	},
    //左右显示隐藏
    Arrowshow: function () {
        var divwidth = $("#" + this.container).width(); //OUTDIV宽度
        var con_nnerwidth = $("#" + this.con_nner).width(); //UL宽度
		var liwidth=this.Getliwidth(); //LI总宽度
        if (liwidth+50 > con_nnerwidth) {
            $("#" + this.lButton).show();
            $("#" + this.rButton).show();
			$("#" + this.con_nner).css('padding','0 25px');
			$("#" + this.oList).css("left", con_nnerwidth-(liwidth+50)+"px");
			
        } else {
            if (liwidth < con_nnerwidth) {
                $("#" + this.oList).css("left", "0px");
            }
            $("#" + this.lButton).hide();
            $("#" + this.rButton).hide();
        }
    },

    //左右控制滑动位置
    MoveMaxWidth_L: function () {
        var liwidth = this.Getliwidth(); //LI总宽度
        var moveOff = liwidth - this.con_nnerW;
        return moveOff+50;

    },

    //上下控制滑动位置
    MoveMaxWidth_H: function () {

        var MaxOffset = (this.iListSum+1) * this.moveHeight; //左右最大滑动位
        return MaxOffset - ((Math.floor($("#" + this.con_nner).height() / this.iListHeight)) * this.iListHeight);
    },

    //获取left宽度
    ReturnLeft: function () {
        return isNaN(parseInt($("#" + this.oList).css("left"))) ? 0 : parseInt($("#" + this.oList).css("left"));
    },

    ReturnDown: function () {
        return isNaN(parseInt($("#" + this.oList).css("top"))) ? 0 : parseInt($("#" + this.oList).css("top"));
    },


    //向左滑动事件
    LeftScroll: function () {
		//if (this.dividers == 1) return;
        var _this = this, currentOffset;
        $("#" + this.lButton).mousedown(function () {
            _this.moveEventHandler = window.setInterval(function () { _this.moveLeftEvent(_this) }, _this.animateEffect);
        });

        $("#" + this.lButton).mouseup(function () {
            _this.moveRemoveEventHandler(_this);
        }).mouseout(function () {
            _this.moveRemoveEventHandler(_this);
        });
    },
    //向右滑动事件
    RightScroll: function () {
        //if (this.dividers == 1) return;
        var _this = this, currentOffset;
        $("#" + this.rButton).mousedown(function () {
            _this.moveEventHandler = window.setInterval(function () { _this.moveRightEvent(_this) }, _this.animateEffect);
        });

        $("#" + this.rButton).mouseup(function () {
            _this.moveRemoveEventHandler(_this);
        }).mouseout(function () {
            _this.moveRemoveEventHandler(_this);
        });
    },

    //向上滑动事件
    TopScroll: function () {
        if (this.dividers == 1) return;
        var _this = this, currentOffset;
        $("#" + this.lButton).mousedown(function () {
            _this.moveEventHandler = window.setInterval(function () { _this.moveUpEvent(_this) }, _this.animateEffect);
        });

        $("#" + this.lButton).mouseup(function () {
            _this.moveRemoveEventHandler(_this);
        }).mouseout(function () {
            _this.moveRemoveEventHandler(_this);
        });

    },
    //向下滑动事件
    DownScroll: function () {
        if (this.dividers == 1) return;
        var _this = this, currentOffset;
        $("#" + this.rButton).mousedown(function () {
            _this.moveEventHandler = window.setInterval(function () { _this.moveDownEvent(_this) }, _this.animateEffect);
        });

        $("#" + this.rButton).mouseup(function () {
            _this.moveRemoveEventHandler(_this);
        }).mouseout(function () {
            _this.moveRemoveEventHandler(_this);
        });

    },

    //时间控制器
    moveEventHandler: null,
    moveRemoveEventHandler: function (_this) {
        if (_this.moveEventHandler != null)
            window.clearInterval(_this.moveEventHandler);
    },
		//左滑动事件
    moveLeftEvent: function (_this) {
        var currentOffset;
        currentOffset = _this.ReturnLeft();
		var movestep = 100;//_this.iListWidth; 设定每次滑动的距离
        if (currentOffset >= 0||Math.abs(currentOffset) <= movestep) {
			$("#" + _this.oList + ":not(:animated)").animate({ left: 0 }, _this.animateEffect);
        } else {
            $("#" + _this.oList + ":not(:animated)").animate({ left: "+=" + movestep }, _this.animateEffect);
        }
    },
		//右滑动事件
    moveRightEvent: function (_this) {
        var currentOffset;
		var movestep =  100;//_this.iListWidth; 设定每次滑动的距离
        currentOffset = _this.ReturnLeft();
        //currentOffset left的值
        //_this.MoveMaxWidth_L()
        if (Math.abs(currentOffset) < _this.MoveMaxWidth_L()) {
            $("#" + _this.oList + ":not(:animated)").animate({ left: "-=" + movestep }, _this.animateEffect);
        }
    },
		//上滑动事件
    moveUpEvent: function (_this) {
        var currentOffset;
        currentOffset = _this.ReturnDown();
        if (currentOffset == 0) {
        } else {
            $("#" + _this.oList + ":not(:animated)").animate({ top: "+=" + _this.moveHeight }, _this.animateEffect);
        }
    },
		//下滑动事件
    moveDownEvent: function (_this) {
        var currentOffset;
        currentOffset = _this.ReturnDown();
        if (Math.abs(currentOffset) < _this.MoveMaxWidth_H()) {
            $("#" + _this.oList + ":not(:animated)").animate({ top: "-=" + _this.moveHeight }, _this.animateEffect);
        }
    },
		
		tdscroll:function (event,delta){
			if (this.dividers == 1) return;
			var _this = this, currentOffset;
				if(delta>0){
					 _this.moveUpEvent(_this);
				}else{
					 _this.moveDownEvent(_this);
				}
		}

};
