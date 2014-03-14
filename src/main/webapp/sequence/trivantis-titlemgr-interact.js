/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

TTPr.StartInteractions = function( pg )
{
  var intPage = this.findTestPage( pg );
  if( intPage >= 0 && this.arRTPages[intPage].startInteractions() )
    return intPage;

  return -1;
}

TTPr.SetInteraction = function( vn, qidx )
{
  if( qidx >= 0 )
    this.arRTPages[qidx].setInteraction( vn );
}

TTPr.HandleInteractions = function( res, cid, sid, lid, sv, incqt, tmstmp ) 
{ 
  var i;

  for( i = 0; i < this.arRTPages.length; i++ )
    this.arRTPages[i].handleInteractions( res, cid, sid, lid, sv, incqt, tmstmp );

  return;
}

TPPr.startInteractions = function()
{
  if( this.arQues.length == 1 )
  {
    this.dateInt = new Date();
    this.lIntST = this.dateInt.getTime();
    this.lIntET = 0;
    return true;
  }
  else
  {
    this.dateInt = null;
    this.lIntST = 0;
    this.lIntET = 0;
    return false;
  }
}

TPPr.setInteraction = function( vn )
{
  if( this.lIntST > 0 )
  {
    if( this.arQues.length == 1 &&
        this.arQues[0].varName == vn )
    {
      var lEnd = new Date().getTime();

      this.lIntET += (lEnd - this.lIntST);
      this.lIntST = lEnd;
    }
  }
}

TPPr.handleInteractions = function( res, cid, sid, lid, sv, incqt, tmstmp )
{
  var i;

  for( i = 0; i < this.arQues.length; i++ )
  {
    this.arQues[i].handleInteractions( res, cid, sid, lid, this.lIntET, this.dateInt, sv, incqt, tmstmp );
    this.lIntET = 0;
  }
  
  return;
}

function intDateForm( dt, sv, bUTC )
{
  var res = "";
  if( bUTC )
    res += dt.getUTCFullYear();
  else
    res += dt.getFullYear();
  var sep = sv ? "-" : "/";

  res += sep;
  var tmp;
  
  if( bUTC )
    tmp = dt.getUTCMonth() + 1;
  else
    tmp = dt.getMonth() + 1;
  if( tmp < 10 )
    res += "0";
  res += tmp + sep;

  if( bUTC )
    tmp = dt.getUTCDate();
  else
    tmp = dt.getDate();
  if( tmp < 10 )
    res += "0";
  res += tmp;
  return res;
}

function intTimeForm( dt, bDt, bUTC )
{
  var res = "";
  var sep = ":";
  var tmp;

  if( bDt )
  {
    if( bUTC )
      tmp = dt.getUTCHours();
    else
      tmp = dt.getHours();
  }
  else
  {
    tmp = parseInt(dt/3600000, 10);
    dt -= tmp * 3600000;
  }
  if( tmp < 10 )
    res += "0";
  res += tmp + sep;
  if( bDt )
  {
    if( bUTC )
      tmp = dt.getUTCMinutes();
    else
      tmp = dt.getMinutes();
  }
  else
  {
    tmp = parseInt(dt/60000, 10);
    dt -= tmp * 60000;
  }
  if( tmp < 10 )
    res += "0";
  res += tmp + sep;
  if( bDt )
  {
    if( bUTC )
      tmp = dt.getUTCSeconds();
    else
      tmp = dt.getSeconds();
  }
  else
    tmp = parseInt(dt/1000, 10);
  if( tmp < 10 )
    res += "0";
  res += tmp;
    
  if( bUTC )
    res += "Z";
  return res;
}

var letArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function limitEscape( str )
{
  var tmp;
  while( 1 )
  {
    tmp = unescape(HtmlEscape(str));
    if( tmp.length > 255 )
      str = str.substring( 0, str.length-1 );
    else
      break;
  }
  return str;
}

TQPr.handleInteractions = function( res, cid, sid, lid, el, di, sv, incqt, tmstmp )
{
  if( this.type == UNK ) return res.str;
  
  var strID = null;
  var strIDSave = null;
  var strTimeID	= null;
  var strType = null;
  var strCorrect = null;
  var strAnswer = null;
  var strResult = null;
  var strLatency = null;
  var dateString = null;
  var timeString = null;
  var strTempAnswer = null;
  var strTempCorrect = null;
  var strTemp = null;
  var strTempCurr = null;
  var strTempChoice = null;
  var posStart = 0;
  var posEnd = 0;
  var bGradeable;
  var maxNum = 1;
  var numChoices = 0;
  var loc = 0;
  var loc2 = 0;
  var i;
  var i2;
  var numC;
  var numA;
  var bGradeInd = false;
  var iResult;
  var now = new Date();
  var lTime = now.getTime();
  var subIdx;
  var bChSel = false;
  var bChCor = false;

  if( (this.type == MT || this.type == DD || this.type == MC || this.type == HS) && this.bGradeInd )
  {
    if(this.arChoices.length>0)
      maxNum = this.arChoices.length;
    else
    {
      for( loc = this.corrAns.indexOf( ',' ); loc != -1; loc = this.corrAns.indexOf( ',', loc+1) )
        maxNum++;
    }

    bGradeInd = true;

    el /= maxNum;
  }

  strID     = this.name + "_";
  strIDSave = strID.replace(/ /g, '_');
  strID     = strIDSave.replace(/'/g, '_' );
  strIDSave = strID.replace(/"/g, '_');

  strTimeID = lTime;

  for( subIdx = 0; subIdx < maxNum; subIdx++ )
  {
    strID = strIDSave;
    bGradeable = true;

    switch( this.type )
    {
      case TF:
        strType     = "true-false";
        if( sv == TINCAN )
        {
          if( this.choices.indexOf( this.corrAns ) == 0 )
            strCorrect = "true";
          else
            strCorrect = "false";

          if( this.choices.indexOf( this.strOurAns ) == 0 )
            strAnswer = "true";
          else
            strAnswer = "false";
        }
        else if( sv == 2004 )
        {
          strCorrect = this.corrAns.toLowerCase();
          strAnswer  = this.strOurAns.toLowerCase();
        }
        else
        {
          strCorrect  = this.corrAns;
          strAnswer   = this.strOurAns;
        }
        strID += this.id;
        break;

      case LK:
      case LT:
        strType     = "likert";
        strCorrect  = "n/a";
        strAnswer   = this.strOurAns;
        strID      += this.id;
        bGradeable  = false;
        break;
        
      case OR:
        strType     = "sequencing";
        strCorrect  = this.corrAns;
        strAnswer   = this.strOurAns;
        strID      += this.id;
        break;
        
      case MC:
      case HS:
      case MR:
        strType = "choice";
        strCorrect  = "";
        strAnswer   = "";

        numChoices = this.arChoices.length;

        strTempAnswer  = addDelimeter( this.arChoices, this.strOurAns, "|||");
        strTempCorrect = addDelimeter( this.arChoices, this.corrAns, "|||");
   

        if( this.type == OR )
        {
          for( j = 0; j < numChoices; j++ )
          {
            posEnd = strTempAnswer.indexOf( ',', posStart+1 );
            if( posEnd != -1 )
              strTempCurr = strTempAnswer.substring( posStart, posEnd+1 );
            else
              strTempCurr = "";
            
            loc = 0;
            for( i = 0; i < numChoices; i++ )
            {
              strTempChoice = this.arChoices[i];
              strTemp = "|||" + strTempChoice + "|||";

              if( strTemp == strTempCurr )
              {
                if( strAnswer.length > 0 )
                {
                  if( sv >= 2004 )
                    strAnswer += "[,]";
                  else
                    strAnswer += ",";
                }

                if( sv == TINCAN )
                  strAnswer += strTempChoice;
                else
                  strAnswer += letArr.charAt(i);
                break;
              }
              loc = loc2 + 1;
            }
            
            posStart = posEnd;
          }
        }
        else
        {
          if( bGradeInd && (this.type == MC || this.type == HS) )
          {
            bChSel = IsChoiceSelected( this.arChoices[subIdx], this.strOurAns );
            bChCor = this.isCorrectSub( this.arChoices[subIdx] );
            if( bChSel )
            {
              if( sv == TINCAN )
                strAnswer += this.arChoices[subIdx];
              else
                strAnswer += letArr.charAt(subIdx);
            }
            else
              strAnswer += "";
            if( bChCor )
            {
              if( sv == TINCAN )
                strCorrect += this.arChoices[subIdx];
              else
                strCorrect += letArr.charAt(subIdx);
            }
          }
          else
          {
            loc = 0;
            for( i = 0; i < numChoices; i++ )
            {
              strTempChoice = this.arChoices[i];
              strTemp = "|||" + strTempChoice + "|||";
  
              if( strTempCorrect.indexOf( strTemp ) >= 0 )
              {
                if( strCorrect.length > 0 )
                {
                  if( this.bAllowMult && sv >= 2004 )
                    strCorrect += "[,]";
                  else
                    strCorrect += ",";
                }
                
                if( sv == TINCAN )
                  strCorrect += strTempChoice;
                else
                  strCorrect += letArr.charAt(i);
              }
  
              if( strTempAnswer.indexOf( strTemp ) >= 0 )
              {
                if( strAnswer.length > 0 )
                {
                  if( ( this.bAllowMult || this.type == OR ) && sv >= 2004 )
                    strAnswer += "[,]";
                  else
                    strAnswer += ",";
                }
  
                if( sv == TINCAN )
                  strAnswer += strTempChoice;
                else
                  strAnswer += letArr.charAt(i);
              }
              loc = loc2 + 1;
            }
          }
        }

        if( ( this.bAllowMult || this.type == OR ) && sv == 0)
        {
          strCorrect = "{" + strCorrect + "}";
          strAnswer  = "{" + strAnswer + "}";
        }

        if( bGradeInd && (this.type == MC || this.type == HS) )
          strID += this.id + "-" + ( subIdx + 1 );
        else
          strID += this.id;
        break;

      case FB:
      {
        strType = "fill-in";
        
		var sepRep;
		if( this.bAnyAnswer )
			sepRep = " " + trivstrOr + " ";
		else
			sepRep = " " + trivstrAnd + " ";
		strCorrect = this.corrAns.replace(/\|/g, sepRep );

        strAnswer = this.strOurAns;
        strID += this.id;
        break;
	  }
      case NE:
        if( this.arRel.length == 1 && parseInt(this.arRel[0]) == EQU )
        {
          strType = "numeric";
          strCorrect = this.arCorrAns[0];
        }
        else
        {
          strType = "fill-in";
          strCorrect = "";
          
		  var sepRep;
		  if( this.bAnyAnswer )
		  	sepRep = " " + trivstrOr + " ";
		  else
			sepRep = " " + trivstrAnd + " ";

          for (var i = 0; i < this.arRel.length; i++) 
          {
            if( i > 0 )
              strCorrect += sepRep;
            
            strCorrect += "(";
            switch (parseInt(this.arRel[i])) 
            {
              case EQU:    strCorrect += "n == " + this.arCorrAns[i]; break;
              case BT_INC: strCorrect += "n >= " + this.arCorrAns[i] + " && n <= " + this.arCorrAns[i + 1]; break;
              case BT_EXC: strCorrect += "n > "  + this.arCorrAns[i] + " && n < "  + this.arCorrAns[i + 1]; break;
              case GRT:    strCorrect += "n > "  + this.arCorrAns[i]; break;
              case GTE:    strCorrect += "n >= " + this.arCorrAns[i]; break;
              case LST:    strCorrect += "n < "  + this.arCorrAns[i]; break;
              case LSTE:   strCorrect += "n <= " + this.arCorrAns[i]; break;
              case NEQU:   strCorrect += "n != " + this.arCorrAns[i]; break;
            }
            strCorrect += ")";
          }
          if( strCorrect.length > 255 )
            strCorrect = strCorrect.replace(/ /g, '');
        }
        
        strAnswer = this.strOurAns;
        strID += this.id;
        break;

      case SA:
      case ES:
        strType = "fill-in";
        strCorrect = "n/a";
        strAnswer = this.strOurAns;
        strID += this.id;
        bGradeable = false;
        break;

      case MT:
      case DD:
        strType   = "matching";
        strAnswer = "";
        var oArr  = this.strOurAns.split(",");
              
        if( bGradeInd )
        {
          if( this.arCorrAns.length <= subIdx && 
              oArr.length <= subIdx )
              continue;
              
          if( sv == TINCAN )
          {
            strTemp = "0-0";
            if( this.arCorrAns.length > subIdx )
              strTemp = this.arCorrAns[subIdx];
            strCorrect += strTemp.replace( /-/, "[.]" );
              
            strTemp = "0-0";
            if( oArr.length > subIdx )
              strTemp = oArr[subIdx];
            strAnswer += strTemp.replace( /-/, "[.]" );
          } 
          else
          {
            if( subIdx < this.arCorrAns.length )
              strCorrect = ( subIdx + 1 );
            else
              strCorrect = "0";
              
            if( sv >= 2004 )
              strCorrect += "[.]";
            else
              strCorrect += ".";

            if( subIdx < this.arCorrAns.length )
              strCorrect += letArr.charAt(subIdx);
            else
              strCorrect += "0";

            strTemp = "";
            if( oArr.length > subIdx )
            {
              strTemp = oArr[subIdx];
              
              strAnswer = ( subIdx + 1 );
              if( sv >= 2004 )
                strAnswer += "[.]";
              else
                strAnswer += ".";
            
              loc = strTemp.indexOf('-');
              if( loc >= 0 )
              {
                strTemp = strTemp.substring( loc+1 );
              
                for( i = 0; i < this.arAddedInfo.length; i++ )
                {
                  if( this.arAddedInfo[i] == strTemp )
                  {
                    strAnswer += letArr.charAt(i);
                    break;
                  }
                }
              
                if( i >= this.arAddedInfo.length )
                  strAnswer += "0";
              }
            }
          }
          strID += this.id + "-" + ( subIdx + 1 );
        }
        else
        {
          if( sv > 0 )
          {
            strCorrect = "";
            strAnswer = "";
          }
          else
          {
            strCorrect = "{";
            strAnswer = "{";
          }

          for( i = 0; i < this.arCorrAns.length; i++ )
          {
            if( i > 0 )
            {
              if( sv >= 2004 )
                strCorrect += "[,]";
              else
                strCorrect += ",";
            }
         
            if( sv == TINCAN )
            {
              strTemp = this.arCorrAns[i];
              strCorrect += strTemp.replace( /-/, "[.]" );
            } 
            else
            {
              strTemp = ( i + 1 );
              if( sv >= 2004 )
                strTemp += "[.]";
              else
                strTemp += ".";
              
              strTemp += letArr.charAt(i);
              strCorrect += strTemp;
            }
          }

          
          for( i = 0; i < oArr.length; i++ )
          {
            if( i > 0 )
            {
              if( sv >= 2004 )
                strAnswer  += "[,]";
              else
                strAnswer += ",";
            }
         
            if( sv == TINCAN )
            {
              strTemp = oArr[i];
              strAnswer += strTemp.replace( /-/, "[.]" );
            } 
            else
            {
              loc = oArr[i].indexOf('-');
              if( loc >= 0 )
              {
                strTempChoice = oArr[i].substring( loc+1 );
                strTemp       = oArr[i].substring( 0, loc );
              
                for( i2 = 0; i2 < this.arChoices.length; i2++ )
                {
                  if( this.arChoices[i2] == strTemp )
                  {
                    strAnswer += (i2 + 1);
                    break;
                  }
                }
                if( i2 >= this.arChoices.length )
                  strAnswer += "0";

                if( sv >= 2004 )
                  strAnswer += "[.]";
                else
                  strAnswer += ".";
                  
                for( i2 = 0; i2 < this.arAddedInfo.length; i2++ )
                {
                  if( this.arAddedInfo[i2] == strTempChoice )
                  {
                    strAnswer += letArr.charAt(i2);
                    break;
                  }
                }
                if( i2 >= this.arAddedInfo.length )
                  strAnswer += "0";
              }
            }
          }

          if( sv == 0 )
          {
            strCorrect += "}";
            strAnswer += "}";
          }
 
          strID += this.id;
        }
        break;

      default:
        strType     = "";
        strCorrect  = "";
        strAnswer   = "";
        break;
    }
    
    if( this.bSurvey )
    {
      if( this.type == TF )
      {
        if( sv >= 2004 )
          strCorrect = "true";
        else
          strCorrect = "t";
      }
      else if( this.type == MC || this.type == HS || this.type == MR )
        strCorrect = "a";
      else
        strCorrect = "n/a";
      bGradeable = false;
    }

    if ( tmstmp )
    {	
        strID += "_";
        strID += strTimeID;
    }
	
    if( bGradeable )
    {
      if( bGradeInd ) 
      {
        if( this.type == MC || this.type == HS )
        {
          if( (bChSel && bChCor) || (!bChSel && !bChCor) )
            iResult = 1;
          else
            iResult = 0;
        }
        else
        {
          var strQNum = '0-0';
          
          if( this.arCorrAns.length > subIdx )
            strQNum = this.arCorrAns[subIdx].substring( 0, this.arCorrAns[subIdx].indexOf( '-' ) );
          strTemp = GetMatchingPairStr( strQNum, this.strOurAns );
          iResult = this.isCorrectSub( strTemp );
        }
      }
      else
        iResult = this.isCorrect();

      if( iResult != 0 )
        strResult = "correct";
      else
      {
        if( sv >= 2004 )
          strResult = "incorrect";
        else
          strResult = "wrong";
      }
    }
    else
      strResult = "neutral";

    if( di != null )
    { 
      if( sv >= 2004 )
      {
        timeString = intDateForm( di, 1, (sv == TINCAN) );
        timeString += "T";
        timeString += intTimeForm( di, 1, (sv == TINCAN) );
      }
      else
        timeString = intTimeForm( di, 1, (sv == TINCAN) );
      dateString = intDateForm( di, 0, (sv == TINCAN) );
    }
    else
    {
      var nowDateString = intDateForm( now, 0, (sv == TINCAN) );
      var nowTimeString;

      if( sv >= 2004 )
      {
        nowTimeString = intDateForm( now, 1, (sv == TINCAN) );
        nowTimeString += "T";
        nowTimeString += intTimeForm( now, 1, (sv == TINCAN) );
      }
      else
        nowTimeString = intTimeForm( now, 1, (sv == TINCAN) );
      timeString = nowTimeString;
      dateString = nowDateString;
    }

    if( di == null )
      strLatency = "";
    else
      strLatency = intTimeForm( el, 0, (sv == TINCAN) );
    
	if(bGradeInd && strCorrect.length == 0)
	  strCorrect = "";
    else if( strCorrect == null || strCorrect.length == 0 )
	  strCorrect = "n/a";
	    
    if( sv >= 2004 &&
       (this.type == MT || this.type == DD))
      ;
    else
      strCorrect = limitEscape( strCorrect );
      
    strCorrect = unescape( HtmlEscape( strCorrect ) );
    strCorrect = convJS( strCorrect );
    
    if( strAnswer != null && strAnswer.length > 0)
    {
      if( sv >= 2004 &&
         (this.type == MT || this.type == DD))
        ;
      else
        strAnswer = limitEscape( strAnswer );
        
      strAnswer = unescape( HtmlEscape( strAnswer ) );
      strAnswer = convJS( strAnswer );
    }
    
    strTemp = null;
    if( incqt )
    {
      strTemp = this.text;
      if( strTemp != null && strTemp.length > 0)
      {
        strTemp = unescape( HtmlEscape( strTemp ) );
        strTemp = convJS( strTemp );
      }
    }
    
    strResult = unescape( HtmlEscape( strResult ) );

    if( sv > 0 )
      putSCORMInteractions( strID, null, timeString, strType, strCorrect, this.weight, strAnswer, strResult, strLatency, strTemp );
    else
    {
      if( res.str.length == 0 )
      {
        res.add( "\"course_id\",\"student_id\",\"lesson_id\",\"date\",\"time\",\"interaction_id\",\"objective_id\",\"type_interaction\",\"correct_response\",\"student_response\",\"result\",\"weighting\",\"latency\"" );
        if( incqt )
          res.add( ",\"text\"" );
        res.add( "\n" );
      }
      res.add( "\"" + cid + "\"," );
      res.add( "\"" + sid + "\"," );
      res.add( "\"" + lid + "\"," );
      res.add( "\"" + dateString + "\"," );
      res.add( "\"" + timeString + "\"," );
      res.add( "\"" + strID + "\"," );
      res.add( "\"" + "\"," );
      res.add( "\"" + strType + "\"," );
      res.add( "\"" + strCorrect + "\"," );
      res.add( "\"" + strAnswer + "\"," );
      res.add( "\"" + strResult + "\"," );
      res.add( "\"" + this.weight + "\"," );
      res.add( "\"" + strLatency + "\""  );
      if( incqt )
        res.add( ",\"" + strTemp + "\"" );
      res.add( "\n" );
    }
  }

  return res.str;
}
