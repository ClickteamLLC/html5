//----------------------------------------------------------------------------------
//
// CRUNOBJECTMOVER
//
//----------------------------------------------------------------------------------
this.ObjectMover=CRunObjectMover;

function CRunObjectMover()
{
    this.enabled=0;
    this.previousX=0;
    this.previousY=0;
}
CRunObjectMover.prototype=CServices.extend(new CRunExtension(),
{
    getNumberOfConditions:function()
    {
        return 1;
    },

    createRunObject:function(file, cob, version)
    {
        this.ho.hoImgWidth = file.readAInt();
        this.ho.hoImgHeight = file.readAInt();
        this.enabled = file.readAShort();
        this.previousX = this.ho.hoX;
        this.previousY = this.ho.hoY;

        return false;
    },

    handleRunObject:function()
    {
        if (this.ho.hoX != this.previousX || this.ho.hoY != this.previousY)
        {
            var deltaX = this.ho.hoX - this.previousX;
            var deltaY = this.ho.hoY - this.previousY;
            if (this.enabled != 0)
            {
                var n;
                var x1 = this.previousX;
                var y1 = this.previousY;
                var x2 = this.previousX + this.ho.hoImgWidth;
                var y2 = this.previousY + this.ho.hoImgHeight;
                var rhPtr= this.ho.hoAdRunHeader;
                var count = 0;
                for (n = 0; n < rhPtr.rhNObjects; n++)
                {
                    while (rhPtr.rhObjectList[count] == null)
                    {
                        count++;
                    }
                    var pHo= rhPtr.rhObjectList[count];
                    count++;
                    if (pHo != this.ho)
                    {
                        if (pHo.hoX >= x1 && pHo.hoX + pHo.hoImgWidth < x2)
                        {
                            if (pHo.hoY >= y1 && pHo.hoY + pHo.hoImgHeight < y2)
                            {
                                this.setPosition(pHo, pHo.hoX + deltaX, pHo.hoY + deltaY);
                            }
                        }
                    }
                }
            }
            this.previousX = this.ho.hoX;
            this.previousY = this.ho.hoY;
        }
        return 0;
    },

    setPosition:function(pHo, x, y)
    {
        if (pHo.rom != null)
        {
            pHo.rom.rmMovement.setXPosition(x);
            pHo.rom.rmMovement.setYPosition(y);
        }
        else
        {
            pHo.hoX = x;
            pHo.hoY = y;
            if (pHo.roc != null)
            {
                pHo.roc.rcChanged = true;
                pHo.roc.rcCheckCollides = true;
            }
        }
    },

    // Conditions
    // --------------------------------------------------
    condition:function(num, cnd)
    {
        switch (num)
        {
            case 0:
                return this.enabled != 0;
        }
        return false;
    },

    // Actions
    // -------------------------------------------------
    action:function(num, act)
    {
        switch (num)
        {
            case 0:
                this.actSetWidth(act);
                break;
            case 1:
                this.actSetHeight(act);
                break;
            case 2:
                this.actEnable(act);
                break;
            case 3:
                this.actDisable(act);
                break;
        }
    },

    actEnable:function(act)
    {
        this.enabled = 1;
    },

    actDisable:function(act)
    {
        this.enabled = 0;
    },

    actSetWidth:function(act)
    {
        var width = act.getParamExpression(this.rh, 0);
        if (width > 0)
        {
            this.ho.hoImgWidth = width;
        }
    },

    actSetHeight:function(act)
    {
        var height = act.getParamExpression(this.rh, 0);
        if (height > 0)
        {
            this.ho.hoImgHeight = height;
        }
    },

    // Expressions
    // --------------------------------------------
    expression:function(num)
    {
        switch (num)
        {
            case 0:
                return this.expGetWidth();
            case 1:
                return this.expGetHeight();
        }
        return null;
    },

    expGetWidth:function()
    {
        return (this.ho.hoImgWidth);
    },

    expGetHeight:function()
    {
        return (this.ho.hoImgHeight);
    }

});

