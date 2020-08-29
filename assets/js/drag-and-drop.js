var DragAndDrop = DragAndDrop || {};

window.addEventListener('DOMContentLoaded', (event) => {
	DragAndDrop.Events.OnLoad(event);
});

DragAndDrop.DraggingElement = false;
DragAndDrop.TargetElement = false;

DragAndDrop.Events = {
    OnLoad: function(event) {
			document.querySelectorAll('.main .col').forEach((el) => {
				el.addEventListener('dragenter', (event) => {
					DragAndDrop.Events.ColDragStart(event);
				});

				el.addEventListener('dragleave', (event) => {
					DragAndDrop.Events.ColDragEnd(event);
				});
			});

			document.querySelectorAll('.sidebar .field').forEach((el) => {
				el.addEventListener('dragstart', (event) => {
					DragAndDrop.Events.DragStart(event);
				});
				el.addEventListener('drag', (event) => {
					DragAndDrop.Events.Drag(event);
				});
				el.addEventListener('dragend', (event) => {
					DragAndDrop.Events.DragEnd(event);
				});
			});
    },

    DragStart: function(event) {
    	console.log('dragStart', event);
    	this.DraggingElement = {
    		Id: event.target.getAttribute('data-dropFieldID')
    	}
    },

    Drag: function(event) {
    	if (this.DraggingElement) console.log({...this.DraggingElement});
    	if (this.TargetElement) console.log({...this.TargetElement});
    },

    DragEnd: function(event) {
    	console.log('dragEnd', event);
/*
    	event.stopPropagation();
    	event.preventDefault();
*/
    	this.DraggingElement = false;
    },

    DragOver: function(event) {
    	console.log('dragOver', event);
    },

    ColDragStart: function(event) {
    	let targetEL = event.target;
    	let targetProperties = {
    		Id: targetEL.getAttribute('data-fieldID'),
    		Row: 0,
    		Col: 0,
    		startX: targetEL.offsetLeft,
    		startY: targetEL.offsetTop,
    		endX: targetEL.offsetLeft + targetEL.offsetWidth,
    		endY: targetEL.offsetTop + targetEL.offsetHeight,
    		dragPositionX: ((event.x - targetEL.offsetLeft) / (targetEL.offsetLeft + targetEL.offsetWidth))  * 100,
    		dragPositionY: ((event.y - targetEL.offsetTop) / (targetEL.offsetTop + targetEL.offsetHeight)) * 100,
    		dragPositionHorizontal: '',
    		dragPositionVertical: '',
    	}

    	if (targetProperties.dragPositionX < 50) targetProperties.dragPositionHorizontal = 'left';
    	else targetProperties.dragPositionHorizontal = 'right';

    	if (targetProperties.dragPositionY < 50) targetProperties.dragPositionVertical = 'top';
    	else targetProperties.dragPositionVertical = 'bottom';
    	this.TargetElement = targetProperties;
    },
    
    ColDragEnd: function(event) {
    	this.TargetElement = false;
    }
}