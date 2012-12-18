
/* Edit object (James) */

CRunkcedit.EDIT_HSCROLLBAR = 0x0001;
CRunkcedit.EDIT_HSCROLLAUTOSCROLL = 0x0002;
CRunkcedit.EDIT_VSCROLLBAR = 0x0004;
CRunkcedit.EDIT_VSCROLLAUTOSCROLL = 0x0008;
CRunkcedit.EDIT_READONLY = 0x0010;
CRunkcedit.EDIT_MULTILINE = 0x0020;
CRunkcedit.EDIT_PASSWORD = 0x0040;
CRunkcedit.EDIT_BORDER = 0x0080;
CRunkcedit.EDIT_HIDEONSTART = 0x0100;
CRunkcedit.EDIT_UPPERCASE = 0x0200;
CRunkcedit.EDIT_LOWERCASE = 0x0400;
CRunkcedit.EDIT_TABSTOP = 0x0800;
CRunkcedit.EDIT_SYSCOLOR = 0x1000;
CRunkcedit.EDIT_3DLOOK = 0x2000;
CRunkcedit.EDIT_TRANSP = 0x4000;
CRunkcedit.EDIT_ALIGN_HCENTER = 0x00010000;
CRunkcedit.EDIT_ALIGN_RIGHT = 0x00020000;

this.kcedit = CRunkcedit;

function CRunkcedit()
{
    this.edit =
    {
        doubleClickEvent: -1,
        modifiedEvent: -1,
        background: null,
        foreground: null,
        flags: 0
    };
};

CRunkcedit.prototype = CServices.extend(new CRunControl(),
{
    updateColor: function(e)
    {
        if (e === undefined)
            e = this.element;

        if(this.edit.flags & CRunkcedit.EDIT_SYSCOLOR)
            return;

        if(this.edit.flags & CRunkcedit.EDIT_TRANSP)
            e.style.backgroundColor = 'transparent';
        else
            e.style.backgroundColor = CServices.getColorString(this.edit.background);

        e.style.color = CServices.getColorString(this.edit.foreground);
    },

    getNumberOfConditions: function()
    {
        return 7;
    },

    createRunObject: function(file, cob, version)
    {
        this.ho.hoImgWidth = file.readAShort();
        this.ho.hoImgHeight = file.readAShort();

        var edit = this.edit;

        var fontInfo = this.ho.hoAdRunHeader.rhApp.bUnicode ?
                        file.readLogFont() : file.readLogFont16();

        file.skipBytes(4 * 16);

        edit.foreground = file.readAColor();
        edit.background = file.readAColor();
        
        file.skipBytes(40); /* text style */

        edit.flags = file.readAInt();
        
        if(edit.flags & CRunkcedit.EDIT_MULTILINE)
        {
            var e = document.createElement('textarea');
        }
        else
        {
            var e = document.createElement('input');
            e.type = 'text';
        }

        if(edit.flags & CRunkcedit.EDIT_READONLY)
            e.readOnly = true;

        if(edit.flags & CRunkcedit.EDIT_HIDEONSTART)
            e.style.visibility = 'hidden';

        this.updateColor(e);

        if(edit.flags & CRunkcedit.EDIT_3DLOOK)
        {
            e.style.borderStyle = 'inset';
            e.style.borderWidth = '2px';
        }
        else
        {
            e.style.borderStyle = 'solid';

            if(edit.flags & CRunkcedit.EDIT_BORDER)
            {
                e.style.borderWidth = '1px';
                e.style.borderColor = '#000000';
            }
            else
            {  
                e.style.borderWidth = '0px';
            }
        }

        this.setFont(fontInfo);
        this.setElement(e);

        var that = this;

        e.ondblclick = function()
        {
            that.edit.doubleClickEvent = that.ho.getEventCount();
            that.ho.generateEvent(2, 0);
        };

        e.onchange = function()
        {
            that.edit.selectionChangedEvent = that.ho.getEventCount();
            that.ho.generateEvent(3, 0);
        };
    },

    condition: function(num, cnd)
    {
        switch(num)
        {
            case 0: /* Is visible? */
                return this.element.style.visibility != 'hidden';

            case 1: /* Is enabled? */
                return !this.element.disabled;

            case 2: /* Can undo? */
                return false;

            case 3: /* Just been modified? */

                return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
                            (this.ho.getEventCount() ==
                                this.edit.modifiedEvent);

            case 4: /* Has focus */
                return document.activeElement == this.element;

            case 5: /* Is number? */
                return !isNaN(parseInt(this.element.value, 10));

            case 6: /* Is selected? */
                return (this.element.selectionEnd
                            - this.element.selectionStart) > 0;
        };
    },

    action: function(num, act)
    {
        switch(num)
        {
        case 0: /* Load text */

            var filename = act.getParamExpString(this.rh, 0);

            this.element.value = '';;

            try
            {
                var file, efile = this.rh.rhApp.getEmbeddedFile(filename);

                if (efile)
                    file = efile.open();

                if (!file)
                {
                    file = new CFile();
                    file.openFile(filename);

                    if (file.ccfBytes.length == 0)
                        file = null;
                }

                if (!file)
                    break;

                this.element.value = file.ccfBytes;
            }
            catch(e)
            {
                if(document.debug)
                    throw e;
            }

            break;

        case 1: /* Load text with selector */
            break;

        case 2: /* Save text */
            break;

        case 3: /* Save text with selector */
            break;

        case 4: /* Set text */

            this.element.value = act.getParamExpString(this.rh, 0);
            break;

        case 5: /* Replace selection */

            this.element.value =
            [
              this.element.value.substring(0, this.element.selectionStart),
              act.getParamExpString(this.rh, 0),
              this.element.value.substring(this.element.selectionEnd)

            ].join ('');

            break;
            
        case 6: /* Cut */
            break;
            
        case 7: /* Copy */
            break;

        case 8: /* Paste */
            break;

        case 9: /* Clear */

            this.element.value = '';
            break;

        case 10: /* Undo */
            break;

        case 11: /* Clear undo buffer */
            break;

        case 12: /* Show */

            this.element.style.visibility = 'visible';
            break;

        case 13: /* Hide */

            this.element.style.visibility = 'hidden';
            break;

        case 14: /* Set font from selector */
            break;

        case 15: /* Set color from selector */
            break;

        case 16: /* Activate */

            this.element.focus();
            break;

        case 17: /* Enable */

            this.element.disabled = false;
            break;

        case 18: /* Disable */

            this.element.disabled = true;
            break;

        case 19: /* Read-only on */

            this.element.readOnly = true;
            break;

        case 20: /* Read-only off */

            this.element.readOnly = false;
            break;
            
        case 21: /* Text modified */
            break;

        case 22: /* Text not modified */
            break;

        case 23: /* Limit text length */

            this.element.setAttribute
                ('maxlength', act.getParamExpression(this.rh, 0));

             break;

        case 24: /* Set position */

            var position = act.getParamPosition(this.rh, 0);
            this.setPosition(position.x, position.y);

            break;

        case 25: /* Set X position */

            this.setX(act.getParamExpression(this.rh, 0));
            break;

        case 26: /* Set Y position */

            this.setY(act.getParamExpression(this.rh, 0));
            break;

        case 27: /* Set size */

            this.setSize(act.getParamExpression(this.rh, 0),
                                act.getParamExpression(this.rh, 1));

            break;

        case 28: /* Set width */

            this.setWidth(act.getParamExpression(this.rh, 0));
            break;

        case 29: /* Set height */

            this.setHeight(act.getParamExpression(this.rh, 0));
            break;

        case 30: /* Deactivate */

            this.element.blur();
            break;

        case 31: /* Scroll to top */

            this.element.scrollTop = 0;
            break;

        case 32: /* Scroll to line */
            break;

        case 33: /* Scroll to end */

            this.element.scrollTop = 99999;
            break;

        case 34: /* Set color */

            this.edit.foreground = act.getParamColor();
            this.updateColor();

            break;

        case 35: /* Set background color */

            this.edit.background = act.getParamColor();
            this.updateColor();

            break;
        };
    },

    expression: function(num)
    {
        switch(num)
        {
        case 0: /* Get text */
            return this.element.value;

        case 1: /* Get selection text */
            return this.element.value.substring
                    (this.element.selectionStart, this.element.selectionEnd);

        case 2: /* Get X */
            return this.ho.hoX;

        case 3: /* Get Y */
            return this.ho.hoY;

        case 4: /* Get width */
            return this.ho.hoImgWidth;

        case 5: /* Get height */
            return this.ho.hoImgHeight;

        case 6: /* Get value */
            
            var v = parseInt(this.element.value, 10);

            return isNaN(v) ? 0 : v;

        case 7: /* Get first line */

             var i = Math.min(this.element.value.indexOf('\r'),
                                this.element.value.indexOf('\n'));

             return i == -1 ? '' : this.element.substring(0, i);

        case 8: /* Get line count */
             return element.value.split('\n').length;

        case 9: /* Get color */
            return this.edit.foreground;

        case 10: /* Get background color */
            return this.edit.background;
        };
    },
	
	getRunObjectTextColor: function()
	{
		return this.edit.foreground;
	},
	
	setRunObjectTextColor: function(rgb)
	{		
        this.edit.foreground = rgb;
        this.updateColor();
	}		
});


