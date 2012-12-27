/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
* 
* Permission is hereby granted to any person obtaining a legal copy 
* of Clickteam Multimedia Fusion 2 to use or modify this source code for 
* debugging, optimizing, or customizing applications created with 
* Clickteam Multimedia Fusion 2. 
* Any other use of this source code in prohibited.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/
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

