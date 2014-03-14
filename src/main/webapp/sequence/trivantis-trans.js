/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
{ // Extend prototypes
var p=ObjLayer.prototype
p.slideTo = ObjLayerSlideTo
p.slideBy = ObjLayerSlideBy
p.slideStart = ObjLayerSlideStart
p.slide = ObjLayerSlide
p.onSlide = new Function()
p.onSlideEnd = ObjLayerSlideEnd
p.doTrans = ObjLayerDoTrans
p.doTransIE = ObjLayerDoTransIE
p.doTransNS = ObjLayerDoTransNS
p.growTo = ObjLayerGrowTo
p.growBy = ObjLayerGrowBy
p.growStart = ObjLayerGrowStart
p.grow = ObjLayerGrow
p.tFunc = null
}

function ObjLayerSlideTo(ex,ey,amt,spd,fn) {
  this.unique++
  if (this.slideActive) { setTimeout(this.obj+".slideTo("+ex+","+ey+","+amt+","+spd+",\""+fn+"\")",20); return;}
  if (ex==null) ex = this.x
  if (ey==null) ey = this.y
  var dx = ex-this.x
  var dy = ey-this.y
  this.slideStart(ex,ey,dx,dy,amt,spd,fn)
}

function ObjLayerSlideBy(dx,dy,amt,spd,fn) {
  this.unique++
  if (this.slideActive) { setTimeout(this.obj+".slideBy("+dx+","+dy+","+amt+","+spd+",\""+fn+"\")",20); return;}
  var ex = this.x + dx
  var ey = this.y + dy
  this.slideStart(ex,ey,dx,dy,amt,spd,fn)
}

function ObjLayerSlideStart(ex,ey,dx,dy,amt,spd,fn) {
  if (this.slideActive) return
  if (!amt) amt = 10
  if (!spd) spd = 20
  var num = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))/amt
  if (num==0) { 
    if(this.tTrans==1) this.hide();
    if(fn) eval(fn) 
    return 
  }
  var delx = dx/num
  var dely = dy/num
  if (!fn) fn = null
  this.slideActive = true
  this.slide(delx,dely,ex,ey,num,1,spd,fn,this.unique)
}

function ObjLayerSlide(dx,dy,ex,ey,num,i,spd,fn,u) {
  if (!this.slideActive) return
  if ( (i++ < num) && (u==this.unique) ) {
    this.moveBy(dx,dy)
    this.onSlide()
    if (this.slideActive) setTimeout(this.obj+".slide("+dx+","+dy+","+ex+","+ey+","+num+","+i+","+spd+",\""+fn+"\","+u+")",spd)
    else this.onSlideEnd()
  }
  else {
    this.moveTo(ex,ey)
    this.onSlide()
    this.onSlideEnd()
    eval(fn)
    this.slideActive = false
  }
}

function ObjLayerDoTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il) {
  tNum = parseInt(tNum, 10);

  if( this.tTrans == tOut ) return;
  if (tOut != 2) // don't track last transition for move/slide animations
	this.tTrans = tOut;  
  
  if( this.hasMoved ) 
  { 
    ol = this.newX; 
    ot = this.newY; 
  }
  
  if( tNum == 31 || tNum == 32 )
  {
    if( il == -1 || tNum == 32 )
      tNum = getRandNums(0, 22) //non-flyins
    else if( il )
      tNum = getRandNums(23,31) //flyins
    else 
      tNum = getRandNums(0,31); //all
  }
  
  if(tNum>=23)
  { 
    X = ol;
    Y = ot;
    dur = (12 - dur) * 2
    switch( tNum )
    {
      case 23://top
        Y = ft;
        break;
      case 24://topright
        X = fr;
        Y = ft;
        break; 
      case 25://right
        X = fr;
        break;
      case 26://bottomright
        X = fr;
        Y = fb;
        break;
      case 27://bottom
        Y = fb;
        break;
      case 28://bottomleft
        X = fl;
        Y = fb;
        break;
      case 29://left
        X = fl;
        break;
      case 30://topleft
        X = fl;
        Y = ft;
        break;
    }
    if(tOut)
    {
	  if (tOut==1) this.orgPos = [ol,ot];
      this.moveTo( ol, ot )
      this.slideTo( X, Y, dur, null, fn )
    }
    else
    {
      this.moveTo( X, Y )
      this.show()
      this.slideTo( ol, ot, dur, null, fn )
    }
  }
  else 
  { 
    this.moveTo( ol, ot )

    if (is.ie&&is.v<9) 
      this.doTransIE(tOut,tNum,dur,fn);
    else 
      this.doTransNS(tOut,tNum,dur,fn);
  }
}

function ObjLayerDoTransIE(tOut,tNum,dur,fn) {
  this.styObj.filter = "revealTrans(duration=" + dur + ",transition=" + tNum + ")";
  this.ele.onfilterchange = clearFilt;
  this.ele.filters.revealTrans.apply();
  if(tOut)
    this.hide();
  else
    this.show();
  this.ele.filters.revealTrans.play();
  this.ele.transFn=fn
  this.tTrans = -1;
}

function clearFilt() {
  this.style.filter="";
  eval(this.transFn)
}

function gCV(clR){
  var cV;
  if( clR.split )
  {
    var cV = clR.split("rect(")[1].split(" ");
    for (var i=0;i<cV.length;i++)
      cV[i] = parseInt(cV[i], 10);
  }
  else
  {
    cV = new Array();
    cV[0] = clR.top;
    cV[1] = clR.right;
    cV[2] = clR.bottom;
    cV[3] = clR.left;
  }
  return cV;
}

function ObjLayerDoTransNS(tOut,tNum,dur,fn) {
  this.clipInit()
  var cV = gCV(this.styObj.clip)
  this.oT = cV[0];
  this.oR = cV[1];
  this.oB = cV[2];
  this.oL = cV[3];
  this.hideIt = hideIt;
  this.transFn = fn

  mSecs = dur * 1000;
  intval = 20;
  this.nV = (mSecs/intval);

  fW = this.oR;
  fH = this.oB;
  hW = fW/2;
  hH = fH/2;
  this.aW = this.aH = true;

  switch (tNum) 
  {
    case 0:
    case 1:
    case 12:
      if( tOut )
      {
        iW = hW/this.nV;
        this.incW = (iW >= 1) ? parseInt(iW, 10) : 0;
        this.xPW = Math.round((iW - this.incW) * this.nV);

        iH = hH/this.nV;
        this.incH = (iH >= 1) ? parseInt(iH, 10) : 0;
        this.xPH = Math.round((iH - this.incH) * this.nV);

        this.tFunc = tr0;
      }
      else
      {
        iW = hW/this.nV;
        this.incW = (iW >= 1) ? parseInt(iW, 10) : 0;
        this.xPW = Math.round((iW - this.incW) * this.nV);

        iH = hH/this.nV;
        this.incH = (iH >= 1) ? parseInt(iH, 10) : 0;
        this.xPH = Math.round((iH - this.incH) * this.nV);

        cV[3] += hW;
        cV[1] -= hW;

        cV[0] += hH;
        cV[2] -= hH;
        this.clipTo(cV[0],cV[1],cV[2],cV[3])
        this.show()
        this.tFunc = tr1;
      }
      break;

    case 2:
    case 3:
      if( tOut )
      {
        lg = Math.max(hW,hH);
        this.inc = Math.round(lg/this.nV);

        this.lW = (hW > hH);

        this.tFunc = tr2;
      }
      else
      {
        lg = Math.max(hW,hH);
        this.inc = Math.round(lg/this.nV);

        this.lW = (hW > hH);

        cV[3] += hW;
        cV[1] -= hW;

        cV[0] += hH;
        cV[2] -= hH;
        this.clipTo(cV[0],cV[1],cV[2],cV[3])
        this.show()
        this.tFunc = tr3;
      }
      this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
      break;

    case 4:
      if( tOut )
      {
        this.inc = fH/this.nV;
        this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
      }
      else
      {
        this.inc = -fH/this.nV;
        this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
        cV[0] = cV[2];
      }
      this.tFunc = tr4;			
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
      this.show()
      break;

    case 5:
      if( tOut )
      {
        this.inc = -fH/this.nV;
        this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
      }
      else
      {
        this.inc = fH/this.nV;
        this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
        cV[2] = cV[0];
      }
      
      this.tFunc = tr5;
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
      this.show()
      break;

    case 6:
      if( tOut )
      {
        this.inc = -fW/this.nV;
        this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
      }
      else
      {
        this.inc = fW/this.nV;
        this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
        cV[1] = cV[3];
      }
      this.tFunc = tr6;
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
      this.show()
      break;

    case 7:
      if( tOut )
      {
        this.inc = fW/this.nV;
        this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
      }
      else
      {
        this.inc = -fW/this.nV;
        this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
        cV[3] = cV[1];
      }
      this.tFunc = tr7;
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
      this.show()
      break;

    case 8:
    case 10:
    case 13:
    case 22:
    case 14:
      if( tOut )
      {
        this.inc = hW/this.nV;
        this.tFunc = tr13;
      }
      else
      {
        this.inc = hW/this.nV;

        cV[3] += hW;
        cV[1] -= hW;

        this.clipTo(cV[0],cV[1],cV[2],cV[3])
        this.tFunc = tr14;
      }
      this.show()
      this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
      break;

    case 9:
    case 11:
    case 15:
    case 21:
    case 16:		
      if( tOut )
      {
        this.inc = hH/this.nV;
        this.tFunc = tr15;
      }
      else
      {
        this.inc = hH/this.nV;

        cV[0] += hH;
        cV[2] -= hH;

        this.clipTo(cV[0],cV[1],cV[2],cV[3])
        this.tFunc = tr16;
      }
      this.show()
      this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
      break;

    case 17:
      iW = fW/this.nV;
      this.incW = (iW >= 1) ? parseInt(iW, 10) : 0;
      this.xPW = Math.round((iW - this.incW) * this.nV);
		
      iH = fH/this.nV;
      this.incH = (iH >= 1) ? parseInt(iH, 10) : 0;
      this.xPH = Math.round((iH - this.incH) * this.nV);
		
      this.tFunc = tr17;
      if( !tOut )
      {
        this.incW *= -1
        this.incH *= -1
        cV[3] = cV[1]
        cV[2] = cV[0]
        this.clipTo(cV[0],cV[1],cV[2],cV[3])
      }
      this.show()
      break;
		
    case 18:
      iW = fW/this.nV;
      this.incW = (iW >= 1) ? parseInt(iW, 10) : 0;
      this.xPW = Math.round((iW - this.incW) * this.nV);

      iH = fH/this.nV;
      this.incH = (iH >= 1) ? parseInt(iH, 10) : 0;
      this.xPH = Math.round((iH - this.incH) * this.nV);

      if( !tOut )
      {
        this.incW *= -1
        this.incH *= -1
        cV[3] = cV[1]
        cV[0] = cV[2]
        this.clipTo(cV[0],cV[1],cV[2],cV[3])
      }
      this.tFunc = tr18;
      this.show()
      break;

    case 19:
      iW = fW/this.nV;
      this.incW = (iW >= 1) ? parseInt(iW, 10) : 0;
      this.xPW = Math.round((iW - this.incW) * this.nV);

      iH = fH/this.nV;
      this.incH = (iH >= 1) ? parseInt(iH, 10) : 0;
      this.xPH = Math.round((iH - this.incH) * this.nV);

      if( !tOut )
      {
        this.incW *= -1
        this.incH *= -1
        cV[1] = cV[3]
        cV[2] = cV[0]
        this.clipTo(cV[0],cV[1],cV[2],cV[3])
      }
      this.tFunc = tr19;
      this.show()
      break;

    case 20:
      iW = fW/this.nV;
      this.incW = (iW >= 1) ? parseInt(iW, 10) : 0;
      this.xPW = Math.round((iW - this.incW) * this.nV);

      iH = fH/this.nV;
      this.incH = (iH >= 1) ? parseInt(iH, 10) : 0;
      this.xPH = Math.round((iH - this.incH) * this.nV);

      if( !tOut )
      {
        this.incW *= -1
        this.incH *= -1
        cV[1] = cV[3]
        cV[0] = cV[2]
        this.clipTo(cV[0],cV[1],cV[2],cV[3])
      }
      this.tFunc = tr20;
      this.show()
      break;
 }

  this.tT = setInterval( this.obj + ".tFunc()",intval)
}

function ObjLayerGrowTo(ew,eh,amt,spd,fn,po) {
  if(po)
    this.po = po
  this.unique++
  if (this.growActive) { setTimeout(this.obj+".growTo("+ew+","+eh+","+amt+","+spd+",\""+fn+"\")",20); return;}
  if (ew==null) ew = this.po.w
  if (eh==null) eh = this.po.h
  var dw = ew-this.po.w
  var dh = eh-this.po.h
  this.growStart(ew,eh,dw,dh,amt,spd,fn)
}

function ObjLayerGrowBy(dw,dh,amt,spd,fn) {
  this.unique++
  if (this.growActive) { setTimeout(this.obj+".growBy("+dw+","+dh+","+amt+","+spd+",\""+fn+"\")",20); return;}
  var ew = this.po.w + dw
  var eh = this.po.h + dh
  this.growStart(ew,eh,dw,dh,amt,spd,fn)
}

function ObjLayerGrowStart(ew,eh,dw,dh,amt,spd,fn) {
  if (this.growActive) return
  if (!amt) amt = 10
  if (!spd) spd = 20
  var num = Math.sqrt(Math.pow(dw,2) + Math.pow(dh,2))/amt
  if (num==0) { 
    if(fn) eval(fn) 
    return 
  }
  var delw = dw/num
  var delh = dh/num
  if (!fn) fn = null
  this.growActive = true
  this.grow(delw,delh,ew,eh,num,1,spd,fn,this.unique)
}

function ObjLayerGrow(dw,dh,ew,eh,num,i,spd,fn,u) {
  if (!this.growActive) return
  if ( (i++ < num) && (u==this.unique) ) {
    this.po.sizeTo(this.po.w+dw,this.po.h+dh)
    if (this.growActive) setTimeout(this.obj+".grow("+dw+","+dh+","+ew+","+eh+","+num+","+i+","+spd+",\""+fn+"\","+u+")",spd)
  }
  else {
    this.po.sizeTo(ew,eh)
    eval(fn)
    this.growActive = false
  }
}

/*
transitions 0 & 12:
 0 - BOX IN - behavior exactly as IE
12 - RANDOM DISSOLVE - not possible, transition 0 substituted
*/

function tr0() {
  var cV = gCV(this.styObj.clip)

  if (this.xPW > 0) 
  {
    if (this.xPW <= this.nV) 
    {
      if (this.aW) 
      {
        cV[3]++;
        cV[1]--;
        this.xPW--;
      }
      this.aW = !this.aW;
    }	
    else 
    {
      cV[3]++;
      cV[1]--;
      this.xPW--;
    }
  }
  cV[3] += this.incW;
  cV[1] -= this.incW;

  if (this.xPH > 0) 
  {
    if (this.xPH <= this.nV) 
    {
      if (this.aH) 
      {
        cV[0]++;
        cV[2]--;
        this.xPH--;
      }
      this.aH = !this.aH;
    }	
    else 
    {
      cV[0]++;
      cV[2]--;
      this.xPH--;
    }
  }
  cV[0] += this.incH;
  cV[2] -= this.incH;

  this.nV--;

  if (cV[2]<=cV[0] && cV[1]<=cV[3]) 
    this.hideIt();
  else 
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 1 - BOX OUT:
behavior exactly as IE;
*/
function tr1(){
  var cV = gCV(this.styObj.clip)

  if (cV[3] <= this.incW) 
  {
    cV[3] = this.oL;
    cV[1] = this.oR;
  }		
  else 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[3]--;
          cV[1]++;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[3]--;
        cV[1]++;
        this.xPW--;
      }
    }
    cV[3] -= this.incW;
    cV[1] += this.incW;
  }

  if (cV[0] <= this.incH) 
  {
    cV[0] = this.oT;
    cV[2] = this.oB;
  }
  else 
  {
    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[0]--;
          cV[2]++;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[0]--;
        cV[2]++;
        this.xPH--;
      }
    }

    cV[0] -= this.incH;
    cV[2] += this.incH;
  }

  this.nV--;
  if (cV[3] <= 0 && cV[0] <= 0) 
  {
    clearInterval(this.tT);
    this.tTrans = -1;
    eval(this.transFn)
  }
  this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 2 - CIRCLE IN:
circle shape not possible; square substituted;
*/
function tr2(){
  var cV = gCV(this.styObj.clip)

  if (this.lW) 
  {
    cV[3] += this.inc;
    cV[1] -= this.inc;
    if (cV[2]-cV[0] >= cV[1]-cV[3]) 
    {	
      cV[0] += this.inc;
      cV[2] -= this.inc;
    }
  }
  else 
  {
    cV[0] += this.inc;
    cV[2] -= this.inc;
    if (cV[1]-cV[3] >= cV[2]-cV[0])
    {
      cV[3] += this.inc;
      cV[1] -= this.inc;
    }
  }

  if (cV[2]<=cV[0] && cV[1]<=cV[3]) 
    this.hideIt();
  else 
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 3 - CIRCLE OUT:
circle shape not possible; square substituted;
*/

function tr3(){
  var cV = gCV(this.styObj.clip)

  if (this.lW) 
  {
    if (cV[3] <= this.inc) 
    {
      cV[3] = this.oL;
      cV[1] = this.oR;
    }
    else 
    {
      cV[3] -= this.inc;
      cV[1] += this.inc;
    }
    if (cV[2]-cV[0] <= cV[1]-cV[3]) 
    {
      if (cV[0] <= this.inc) 
      {
        cV[0] = this.oT;
        cV[2] = this.oB;		
      }
      else 
      {
        cV[0] -= this.inc;
        cV[2] += this.inc;
      }
    }
  }
  else 
  {
    if (cV[0] <= this.inc) 
    {
      cV[0] = this.oT;
      cV[2] = this.oB;		
    }
    else 
    {
      cV[0] -= this.inc;
      cV[2] += this.inc;
    }
    if (cV[1]-cV[3] <= cV[2]-cV[0]) 
    {
      if (cV[3] <= this.inc) 
      {
        cV[3] = this.oL;
        cV[1] = this.oR;
      }
      else 
      {
        cV[3] -= this.inc;
        cV[1] += this.inc;
      }
    }
  }

  if (cV[3] <= 0 && cV[0] <= 0) 
  {
    clearInterval(this.tT);
    this.tTrans = -1;
    eval(this.transFn)
  }
  this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 4 - WIPE UP:
behavior exactly as IE;
*/
function tr4(){
  var cV = gCV(this.styObj.clip)

  if( this.inc < 0 ) 
  {
    cV[0] += this.inc;
    if (cV[0] <= 0) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    cV[2] -= this.inc;
    if (cV[2] <= 0) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
}

/*
transition 5 - WIPE DOWN:
behavior exactly as IE;
*/

function tr5(){
  var cV = gCV(this.styObj.clip)

  if( this.inc < 0 ) 
  {	
    cV[0] -= this.inc;
    if (cV[0] >= cV[2] ) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    cV[2] += this.inc;
    if (cV[2] >= this.oB ) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

/*
transition 6 - WIPE RIGHT:
behavior exactly as IE;
*/

function tr6(){
  var cV = gCV(this.styObj.clip)

  if( this.inc < 0 ) 
  {	
    cV[3] -= this.inc;
    if (cV[3] >= cV[1]) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    cV[1] += this.inc;
    if (cV[1] >=  this.oR ) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

/*
transition 7 - WIPE LEFT:
behavior exactly as IE;
*/

function tr7(){
  var cV = gCV(this.styObj.clip)

  if( this.inc < 0 ) 
  {	
    cV[3] += this.inc;
    if (cV[3] <= 0 ) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    cV[1] -= this.inc;
    if (cV[1] <= cV[3]) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

/*
transitions 8, 10, 13 & 22: 
 8 - VERTICAL BLINDS - not possible, transition 13 substituted;
10 - CHECKERBOARD ACROSS - not possible, transition 13 substituted;
13 - SPLIT VERTICAL IN - behavior exactly as IE;
22 - RANDOM BARS VERTICAL - not possible, transition 13 substituted;
*/

function tr13(){
  var cV = gCV(this.styObj.clip)

  cV[3] += this.inc;
  cV[1] -= this.inc;
  if (cV[1]<=cV[3]) 
    this.hideIt();
  else 
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transitions 9, 11, 15 & 21: 
 9 - HORIZONTAL BLINDS - not possible, transition 15 substituted;
11 - CHECKERBOARD DOWN - not possible, transition 15 substituted;
15 - SPLIT HORIZONTAL IN - behavior exactly as IE;
21 - RANDOM BARS HORIZONTAL - not possible, transition 15 substituted;
*/

function tr15(){
  var cV = gCV(this.styObj.clip)

  cV[0] += this.inc;
  cV[2] -= this.inc;
  if (cV[2]<=cV[0]) 
    this.hideIt();
  else 
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 14 - SPLIT VERTICAL OUT:
behavior exactly as IE;
*/

function tr14(){
  var cV = gCV(this.styObj.clip)

  if (cV[3] <= this.inc) 
  {
    cV[3] = this.oL;
    cV[1] = this.oR;
    clearInterval(this.tT);
    this.tTrans = -1;
    eval(this.transFn)
  }
  else 
  {
    cV[3]  = cV[3] - this.inc;
    cV[1]  = cV[1] + this.inc;
  }
  this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 16 - SPLIT HORIZONTAL OUT:
behavior exactly as IE;
*/

function tr16(){
  var cV = gCV(this.styObj.clip)

  if (cV[0] <= this.inc) 
  {
    cV[0] = this.oT;
    cV[2] = this.oB;
    clearInterval(this.tT);
    this.tTrans = -1;
    eval(this.transFn)
  }
  else 
  {
    cV[0] -= this.inc;
    cV[2] += this.inc;
  }
  this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

/*
transition 17 - STRIPS LEFT DOWN: 
diagonal wipe not possible; box-in to bottom-left corner substituted;
*/

function tr17(){
  var cV = gCV(this.styObj.clip)

  if( this.incW < 0 || this.incH < 0 ) 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[3]--;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[3]--;
        this.xPW--;
      }
    }
    cV[3] += this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[2]++;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[2]++;
        this.xPH--;
      }
    }

    cV[2] -= this.incH;

    this.nV--;

    if (cV[2] >= this.oB && cV[3] <= 0) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[1]--;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[1]--;
        this.xPW--;
      }
    }
    cV[1] -= this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[0]++;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[0]++;
        this.xPH--;
      }
    }

    cV[0] += this.incH;

    this.nV--;

    if (cV[2]<=cV[0] && cV[1]<=cV[3]) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

/*
transition 18 - STRIPS LEFT UP: 
diagonal wipe not possible; box-in to top-left corner substituted;
*/

function tr18(){
  var cV = gCV(this.styObj.clip)

  if( this.incW < 0 || this.incH < 0 ) 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[3]--;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[3]--;
        this.xPW--;
      }
    }
    cV[3] += this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[0]--;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[0]--;
        this.xPH--;
      }
    }
    cV[0] += this.incH;

    this.nV--;

    if ( cV[0] <= 0 && cV[3] <= 0) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[1]--;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[1]--;
        this.xPW--;
      }
    }
    cV[1] -= this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[2]--;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[2]--;
        this.xPH--;
      }
    }
    cV[2] -= this.incH;

    this.nV--;

    if (cV[2]<=cV[0] && cV[1]<=cV[3]) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

/*
transition 19 - STRIPS RIGHT DOWN: 
diagonal wipe not possible; box-in to bottom-right corner substituted;
*/

function tr19(){
  var cV = gCV(this.styObj.clip)

  if( this.incW < 0 || this.incH < 0 ) 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[1]++;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[1]++;
        this.xPW--;
      }
    }
    cV[1] -= this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[2]++;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[2]++;
        this.xPH--;
      }
    }
    cV[2] -= this.incH;

    this.nV--;

    if (cV[2] >= this.oB && cV[1] >= this.oR ) 
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[3]++;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[3]++;
        this.xPW--;
      }
    }
    cV[3] += this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[0]++;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[0]++;
        this.xPH--;
      }
    }
    cV[0] += this.incH;

    this.nV--;

    if (cV[2]<=cV[0] && cV[1]<=cV[3]) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

/*
transition 20 - STRIPS RIGHT UP: 
diagonal wipe not possible; box-in to top-right corner substituted;
*/

function tr20(){
  var cV = gCV(this.styObj.clip)

  if( this.incW < 0 || this.incH < 0 ) 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[1]++;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[1]++;
        this.xPW--;
      }
    }
    cV[1] -= this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[0]--;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[0]--;
        this.xPH--;
      }
    }
    cV[0] += this.incH;

    this.nV--;

    if (cV[0] <= 0 && cV[1] >= this.oR )
    {
      clearInterval(this.tT);
      this.tTrans = -1;
      eval(this.transFn)
    }
    this.clipTo(cV[0],cV[1],cV[2],cV[3])
  } 
  else 
  {
    if (this.xPW > 0) 
    {
      if (this.xPW <= this.nV) 
      {
        if (this.aW) 
        {
          cV[3]++;
          this.xPW--;
        }
        this.aW = !this.aW;
      }	
      else 
      {
        cV[3]++;
        this.xPW--;
      }
    }
    cV[3] += this.incW;

    if (this.xPH > 0) 
    {
      if (this.xPH <= this.nV) 
      {
        if (this.aH) 
        {
          cV[2]--;
          this.xPH--;
        }
        this.aH = !this.aH;
      }	
      else 
      {
        cV[2]--;
        this.xPH--;
      }
    }
    cV[2] -= this.incH;

    this.nV--;
 
    if (cV[2]<=cV[0] && cV[1]<=cV[3]) 
      this.hideIt();
    else 
      this.clipTo(cV[0],cV[1],cV[2],cV[3])
  }
}

function getRandNums(from,to){
  temp = parseInt((Math.random() * (to-from)) + (from), 10);
  while (isNaN(temp)) 
    temp = parseInt((Math.random() * (to - from)) + (from), 10);

  return temp
}

function hideIt() {
  clearInterval(this.tT);
  this.clipTo(this.oT,this.oR,this.oB,this.oL)
  this.hide()
  this.tTrans = -1;
  eval(this.transFn)
}
