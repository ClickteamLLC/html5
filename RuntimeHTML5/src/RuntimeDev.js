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
var scripts = document.getElementsByTagName("script");
var path=scripts[scripts.length-1].src;
document.srcPath = path.substring(0, path.lastIndexOf("/")+1);

document.write('<script src="'+document.srcPath+'Services.js"></script>');
document.write('<script src="'+document.srcPath+'Renderer.js"></script>');
document.write('<script src="'+document.srcPath+'StandardRenderer.js"></script>');
document.write('<script src="'+document.srcPath+'Events.js"></script>');
document.write('<script src="'+document.srcPath+'Animations.js"></script>');
document.write('<script src="'+document.srcPath+'Conditions.js"></script>');
document.write('<script src="'+document.srcPath+'Actions.js"></script>');
document.write('<script src="'+document.srcPath+'Params.js"></script>');
document.write('<script src="'+document.srcPath+'Expressions.js"></script>');
document.write('<script src="'+document.srcPath+'RunLoop.js"></script>');
document.write('<script src="'+document.srcPath+'Extensions.js"></script>');
document.write('<script src="'+document.srcPath+'Application.js"></script>');
document.write('<script src="'+document.srcPath+'Sprites.js"></script>');
document.write('<script src="'+document.srcPath+'Frame.js"></script>');
document.write('<script src="'+document.srcPath+'Objects.js"></script>');
document.write('<script src="'+document.srcPath+'OI.js"></script>');
document.write('<script src="'+document.srcPath+'Banks.js"></script>');
document.write('<script src="'+document.srcPath+'Movements.js"></script>');
document.write('<script src="'+document.srcPath+'Values.js"></script>');
document.write('<script src="'+document.srcPath+'ActiveBackdrop.js"></script>');
document.write('<script src="'+document.srcPath+'AdvDir.js"></script>');
document.write('<script src="'+document.srcPath+'AdvGameBoard.js"></script>');
document.write('<script src="'+document.srcPath+'AdvPathMov.js"></script>');
document.write('<script src="'+document.srcPath+'CalcRect.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_movement_controller.js"></script>');
document.write('<script src="'+document.srcPath+'Get.js"></script>');
document.write('<script src="'+document.srcPath+'IIF.js"></script>');
document.write('<script src="'+document.srcPath+'InAndOutController.js"></script>');
document.write('<script src="'+document.srcPath+'KcArray.js"></script>');
document.write('<script src="'+document.srcPath+'KcBoxA.js"></script>');
document.write('<script src="'+document.srcPath+'KcBoxB.js"></script>');
document.write('<script src="'+document.srcPath+'KcButton.js"></script>');
document.write('<script src="'+document.srcPath+'kcclock.js"></script>');
document.write('<script src="'+document.srcPath+'kccombo.js"></script>');
document.write('<script src="'+document.srcPath+'KcDbl.js"></script>');
document.write('<script src="'+document.srcPath+'kcdirect.js"></script>');
document.write('<script src="'+document.srcPath+'kcedit.js"></script>');
document.write('<script src="'+document.srcPath+'kchisc.js"></script>');
document.write('<script src="'+document.srcPath+'kcini.js"></script>');
document.write('<script src="'+document.srcPath+'kclist.js"></script>');
document.write('<script src="'+document.srcPath+'kcrandom.js"></script>');
document.write('<script src="'+document.srcPath+'kcwctrl.js"></script>');
document.write('<script src="'+document.srcPath+'Layer.js"></script>');
document.write('<script src="'+document.srcPath+'MoveSafely2.js"></script>');
document.write('<script src="'+document.srcPath+'ObjectMover.js"></script>');
document.write('<script src="'+document.srcPath+'parser.js"></script>');
document.write('<script src="'+document.srcPath+'Platform.js"></script>');
document.write('<script src="'+document.srcPath+'StringTokenizer.js"></script>');
document.write('<script src="'+document.srcPath+'WargameMap.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_circular.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_dragdrop.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_invaders.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_presentation.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_regpolygon.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_simple_ellipse.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_sinewave.js"></script>');
document.write('<script src="'+document.srcPath+'clickteam_vector.js"></script>');
document.write('<script src="'+document.srcPath+'inandout.js"></script>');
document.write('<script src="'+document.srcPath+'spaceship.js"></script>');
document.write('<script src="'+document.srcPath+'pinball.js"></script>');
document.write('<script src="'+document.srcPath+'HTML5.js"></script>');
document.write('<script src="'+document.srcPath+'HTML5Video.js"></script>');
document.write('<script src="'+document.srcPath+'Transitions.js"></script>');
document.write('<script src="'+document.srcPath+'TransitionCCTrans.js"></script>');
document.write('<script src="'+document.srcPath+'MultipleTouch.js"></script>');
document.write('<script src="'+document.srcPath+'Location.js"></script>');
document.write('<script src="'+document.srcPath+'Accelerometer.js"></script>');
document.write('<script src="'+document.srcPath+'ForEach.js"></script>');

function Runtime(canvasName, appName)
{		
	var file=new CFile();
	if (file.openFile(appName))
	{
		window.application=new CRunApp(canvasName, file);
		window.application.load();	
		window.application.startApplication();
	}
}
function updateApplication()
{
	window.application.stepApplication();
}


