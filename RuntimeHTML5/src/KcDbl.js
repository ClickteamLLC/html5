//----------------------------------------------------------------------------------
//
// CRunKcDbl: Double precision calculator object
//
//----------------------------------------------------------------------------------
this.KcDbl=CRunKcDbl;

CRunKcDbl.ACT_SETFORMAT_STD = 0;
CRunKcDbl.ACT_SETFORMAT_NDIGITS = 1;
CRunKcDbl.ACT_SETFORMAT_NDECIMALS = 2;
CRunKcDbl.EXP_ADD = 0;
CRunKcDbl.EXP_SUB = 1;
CRunKcDbl.EXP_MUL = 2;
CRunKcDbl.EXP_DIVIDE = 3;
CRunKcDbl.EXP_FMT_NDIGITS = 4;
CRunKcDbl.EXP_FMT_NDECIMALS = 5;

function CRunKcDbl()
{
	this.m_nDigits=0;
	this.m_nDecimals=0;
}
CRunKcDbl.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 0;
    },

    createRunObject:function(file, cob, version)
    {
        this.ho.hoX = cob.cobX;
        this.ho.hoY = cob.cobY;
        this.ho.hoImgWidth = 32;
        this.ho.hoImgHeight = 32;

        this.m_nDigits = 32;
        this.m_nDecimals = -1;

        return true;
    },

    action:function(num, act)
    {
        switch (num)
        {
            case CRunKcDbl.ACT_SETFORMAT_STD:
                this.Act_SetFormat_Std();
                break;
            case CRunKcDbl.ACT_SETFORMAT_NDIGITS:
               this.Act_SetFormat_NDigits(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcDbl.ACT_SETFORMAT_NDECIMALS:
                this.Act_SetFormat_NDecimals(act.getParamExpression(this.rh, 0));
                break;
        }
    },
    
    Act_SetFormat_Std:function()
    {
        this.m_nDigits = 32;
        this.m_nDecimals = -1;
    },

    Act_SetFormat_NDigits:function(n)
    {
        this.m_nDigits = n;
        if (this.m_nDigits <= 0)
        {
            this.m_nDigits = 1;
        }
        if (this.m_nDigits > 256)
        {
            this.m_nDigits = 256;
        }
        this.m_nDecimals = -1;
    },

    Act_SetFormat_NDecimals:function(n)
    {
        this.m_nDecimals = n;
        if (this.m_nDecimals < 0)
        {
            this.m_nDecimals = 0;
        }
        else if (this.m_nDecimals > 256)
        {
            this.m_nDecimals = 256;
        }
    },

    expression:function(num)
    {
        switch (num)
        {
            case CRunKcDbl.EXP_ADD:
                return this.Exp_Add(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunKcDbl.EXP_SUB:
                return this.Exp_Sub(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunKcDbl.EXP_MUL:
                return this.Exp_Mul(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunKcDbl.EXP_DIVIDE:
                return this.Exp_Div(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunKcDbl.EXP_FMT_NDIGITS:
                return this.Exp_Fmt_NDigits(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunKcDbl.EXP_FMT_NDECIMALS:
                return this.Exp_Fmt_NDecimals(this.ho.getExpParam(), this.ho.getExpParam());
        }
        return (0);//won't be used
    },

    StringToDouble:function(ps)
    {
    	return parseFloat(ps);
    },

    DoubleToString:function(v)
    {
        return param=v.toString();
    },

    Exp_Add:function(pValStr1, pValStr2)
    {
        var pDest = "";
        if (pValStr1 != null && pValStr2 != null)
        {
            var val1 = this.StringToDouble(pValStr1);
            var val2 = this.StringToDouble(pValStr2);
            val1 += val2;
            pDest = this.DoubleToString(val1);
        }
        return pDest;
    },

    Exp_Sub:function(pValStr1, pValStr2)
    {
        var pDest = "";
        if (pValStr1 != null && pValStr2 != null)
        {
            var val1 = this.StringToDouble(pValStr1);
            var val2 = this.StringToDouble(pValStr2);
            val1 -= val2;
            pDest = this.DoubleToString(val1);
        }
        return pDest;
    },

    Exp_Mul:function(pValStr1, pValStr2)
    {
        var pDest = "";
        if (pValStr1 != null && pValStr2 != null)
        {
            var val1 = this.StringToDouble(pValStr1);
            var val2 = this.StringToDouble(pValStr2);
            val1 *= val2;
            pDest = this.DoubleToString(val1);
        }
        return pDest;
    },

    Exp_Div:function(pValStr1, pValStr2)
    {
        var pDest = "";
        if (pValStr1 != null && pValStr2 != null)
        {
            var val1 = this.StringToDouble(pValStr1);
            var val2 = this.StringToDouble(pValStr2);
            if (val2 != 0.0)
            {
                val1 /= val2;
                pDest = this.DoubleToString(val1);
            }
        }
        return pDest;
    },

    Exp_Fmt_NDigits:function(param, n)
    {
    	return param;
    },

    Exp_Fmt_NDecimals:function(param, n)
    {
    	return param;
    }

});
