;(function(){
	//一、二级菜单参数配置

	var RAF = (function () {
    	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||  function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
	})();

	var c = document.getElementById('listBg');
    var ctx = c.getContext('2d');
    var e = null;
    var dots = [];
    var i , j = 0;
    window.onresize = cResize;
    cResize();

    var mPosxy = {"x": null, "y": null, "max": 8000};
    c.onmousemove = function(ev){
        e = ev || event;
        mPosxy.x = e.clientX;
        mPosxy.y = e.clientY;
    }
    c.onmouseout = function(ev){
        e = ev || event;
        mPosxy.x = null;
        mPosxy.y = null;
    }

    for(i = 200; i--;){
        dots.push({
            "x": Math.random() * c.width,
            "y": Math.random() * c.height,
            "xa": Math.random() * 0.6,
            "ya": Math.random() * 0.6,
            "max": 6000
        });
    }

    setTimeout(function(){
        dotsMove();
    }, 100);

    function dotsMove(){
        ctx.clearRect(0, 0, c.width, c.height);

        var ndots  = [mPosxy].concat(dots);

        for(i = dots.length; i--;){
            var dot = dots[i];
            dot.x += dot.xa;
            dot.y += dot.ya;
            dot.xa = (dot.x > c.width || dot.x < 0)? -dot.xa : dot.xa;
            dot.ya = (dot.y > c.height || dot.y < 0)? -dot.ya : dot.ya;
            ctx.fillStyle = '#000';
            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

            for (j = ndots.length; j--;) {
                var d2 = ndots[j];
                if (dot === d2 || d2.x === null || d2.y === null) continue;
                var xc = dot.x - d2.x;
                var yc = dot.y - d2.y;
                var dis = xc * xc + yc * yc;
                var ratio;
                if(dis < d2.max){
                    if (d2 === mPosxy && dis > (d2.max / 2)) {
                        dot.x -= xc * 0.01;
                        dot.y -= yc * 0.01;
                    }
                    ratio = (d2.max - dis) / d2.max;
                    ctx.beginPath();
                    ctx.lineWidth = ratio / 2;
                    ctx.strokeStyle = 'rgba(0, 0, 0, ' + (ratio + 0.2) + ')';
                    ctx.moveTo(dot.x , dot.y);
                    ctx.lineTo(d2.x , d2.y);
                    ctx.stroke();
                }
            }
            ndots.splice(ndots.indexOf(dot), 1);
        }
        RAF(dotsMove);
    }

    function cResize(){
        c.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        c.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
})();