var DragAndDropDemo = DragAndDropDemo || {};

window.addEventListener('DOMContentLoaded', (event) => {
	DragAndDropDemo.Events.OnLoad(event);
});

DragAndDropDemo.Events = {
    OnLoad: function(event) {
		document.querySelectorAll('.sidebar .field').forEach((el) => {
            el.addEventListener('dndGrab', (event) => {
				console.info('dndGrab', event.detail);
                let DOMElement = false;
                console.log(event.detail.prevTargetElement);
                if (event.detail.prevTargetElement) {
                    DOMElement = event.detail.PrevTargetElement.DOMElement;
                    DOMElement.classList.remove('top', 'right', 'bottom', 'left');
                    DOMElement.querySelector('.debug').innerHTML = '';
                }
			});
            
            el.addEventListener('dndDrag', (event) => {
//                console.info('drag', event.detail);
            });

            el.addEventListener('dndChange', (event) => {
                console.info('dndChange', event.detail);
                let DOMElement = false;
                let DragPositionHorizontal = '';
                let DragPositionVertical = '';
                let DragPositionX = 0;
                let DragPositionY = 0;
                
                if (event.detail.TargetElement) {
                    DOMElement = event.detail.TargetElement.DOMElement;
                    DOMElement.querySelector('.debug').innerHTML = event.detail.TargetElement.DragPositionX + '%, ' + event.detail.TargetElement.DragPositionY + '%';
                    DOMElement.classList.remove('top', 'right', 'bottom', 'left');
                    DOMElement.classList.add(event.detail.TargetElement.DragPositionHorizontal);
                    DOMElement.classList.add(event.detail.TargetElement.DragPositionVertical);
                }
                
                else if (event.detail.PrevTargetElement) {
                    DOMElement = event.detail.PrevTargetElement.DOMElement;
                    DOMElement.classList.remove('top', 'right', 'bottom', 'left');
                    DOMElement.querySelector('.debug').innerHTML = '';
                }
    



            });

            el.addEventListener('dndDrop', (event) => {
                console.info('dndDrop', event.detail);
            });
		});
    }
}