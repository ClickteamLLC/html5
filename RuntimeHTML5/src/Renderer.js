
function Renderer()
{
    this.clips = [];
};

Renderer.prototype =
{
    renderSolidColor: function(x, y, w, h, color, inkEffect, inkEffectParam)
    {
    },

    renderSolidColorEllipse: function(x, y, w, h, color, inkEffect, inkEffectParam)
    {
    },

    renderGradient: function(x, y, w, h, color1, color2, vertical, inkEffect, inkEffectParam)
    { 
    },

    renderGradientEllipse: function(x, y, w, h, color1, color2, vertical, inkEffect, inkEffectParam)
    {
    },

    renderImage: function(image, x, y, angle, scaleX, scaleY, inkEffect, inkEffectParam)
    {
    },

	renderSimpleImage:function(image, x, y, w, h, inkEffect, inkEffectParam)
    {
    },

    renderPattern: function(image, x, y, w, h, inkEffect, inkEffectParam)
    {
    },

    renderPatternEllipse: function(image, x, y, w, h, inkEffect, inkEffectParam)
    {
    },

    renderLine: function(xA, yA, xB, yB, color, thickness, inkEffect, inkEffectParam)
    {
    },

    renderRect: function(x, y, w, h, color, thickness, inkEffect, inkEffectParam)
    {
    },

    renderEllipse: function(x, y, w, h, color, inkEffect, inkEffectParam)
    {
    },

    pushClip: function(x, y, w, h)
    {
        var curClip = this.clips[this.clips.length - 1];

        if(curClip)
        {
            if(x < curClip.x)
                x = curClip.x;

            if(y < curClip.y)
                y = curClip.y;

            if((x + w) > (curClip.x + curClip.w))
                w = (curClip.x + curClip.w) - x;

            if((y + h) > (curClip.y + curClip.h))
                h = (curClip.y + curClip.h) - y;
        }

        var clip = { x: x, y: y, w: w, h: h };

        this.clips.push(clip);

        return clip;
    },

    popClip: function()
    {
        this.clips.pop();
    }
};

