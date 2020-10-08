var DragAndDrop = DragAndDrop || {};

window.addEventListener('DOMContentLoaded', (event) => {
	DragAndDrop.Events.OnLoad(event);
});

DragAndDrop.DraggingElement = false;
DragAndDrop.TargetElement = false;
DragAndDrop.PrevTargetElement = false;

DragAndDrop.Events = {
    OnLoad: function(event) {
		document.querySelectorAll('.main .col').forEach((el) => {
    		el.addEventListener('dragenter', (event) => {
                DragAndDrop.Events.ColDragStart(event);
    		});

            el.addEventListener('dragover', (event) => {
                event.preventDefault();
                this.DetectAndDispatchChanges(event);
            });

    		el.addEventListener('dragleave', (event) => {
    			DragAndDrop.Events.ColDragLeave(event);
    		});
		});

		document.querySelectorAll('.sidebar .field').forEach((el) => {
			el.addEventListener('dragstart', (event) => {
				DragAndDrop.Events.DragStart(event);
			});

/*
			el.addEventListener('drag', (event) => {
				DragAndDrop.Events.Drag(event);
			});
*/

			el.addEventListener('dragend', (event) => {
                DragAndDrop.Events.DragEnd(event);
			});
        });
    },

    DragStart: function(event) {
        this.DraggingElement = {
            DOMElement: event.target,
    		Id: event.target.getAttribute('data-dropFieldID')
    	}

        event.target.dispatchEvent(new CustomEvent('dndGrab', {
            bubbles: true,
            cancelable: true,
            detail: {
                Event: event,
                DraggingElement: {
                    Element: event.target,
                    Id: event.target.getAttribute('data-dropFieldID')
                },
                TargetElement: false,
                PrevTargetElement: this.PrevTargetElement,
            }
        }));
    },

    Drag: function(event) {
        if (this.DraggingElement) {
            this.DraggingElement.DOMElement.dispatchEvent(new CustomEvent('dndDrag', {
                bubbles: true,
                cancelable: true,
                detail: {
                    Event: event,
                    DraggingElement: this.DraggingElement,
                    TargetElement: this.TargetElement,
                    PrevTargetElement: this.PrevTargetElement,
                }
            }));
        }
        else console.log(event);
    },

    DragEnd: function(event) {
        this.DraggingElement.DOMElement.dispatchEvent(new CustomEvent('dndDrop', {
            bubbles: true,
            cancelable: true,
            detail: {
                Event: event,
                DraggingElement: this.DraggingElement,
                TargetElement: this.TargetElement,
                PrevTargetElement: this.PrevTargetElement,
            }
        }));

        this.DraggingElement = false;
        this.PrevTargetElement = { ...this.TargetElement };
        this.TargetElement = false;
    },

    DragOver: function(event) {
    },

    ColDragStart: function(event) {
    	let targetEL = event.target;
    	let targetProperties = {
    		Id: targetEL.getAttribute('data-fieldID'),
    		DOMElement: targetEL,
            Row: 0,
    		Col: 0,
    		startX: targetEL.offsetLeft,
    		startY: targetEL.offsetTop,
    		endX: targetEL.offsetLeft + targetEL.offsetWidth,
    		endY: targetEL.offsetTop + targetEL.offsetHeight,
    		dragPositionX: ((event.x - targetEL.offsetLeft) / (targetEL.offsetLeft + targetEL.offsetWidth))  * 100,
    		dragPositionY: ((event.y - targetEL.offsetTop) / (targetEL.offsetTop + targetEL.offsetHeight)) * 100,
    		dragPositionHorizontal: '',
    		dragPositionVertical: ''
    	}

    	if (targetProperties.dragPositionX < 50) targetProperties.dragPositionHorizontal = 'left';
    	else targetProperties.dragPositionHorizontal = 'right';

    	if (targetProperties.dragPositionY < 50) targetProperties.dragPositionVertical = 'top';
    	else targetProperties.dragPositionVertical = 'bottom';
        this.PrevTargetElement = { ...this.TargetElement };
    	this.TargetElement = targetProperties;
        this.DetectAndDispatchChanges(event);
    },

    ColMousemove: function(event) {
        console.log('ColMousemove');
        this.DetectAndDispatchChanges(event);
    },
    
    ColDragLeave: function(event) {
        this.PrevTargetElement = { ...this.TargetElement };
        this.TargetElement = false;
        this.DetectAndDispatchChanges();
    },

/*
    ColDragEnd: function(event) {
        console.log('ColDragEnd');
        this.DetectAndDispatchChanges(event);
    },
*/

    DetectAndDispatchChanges(event) {
        let targetProperties = {
            Id: null,
            DOMElement: null,
            Row: null,
            Col: null,
            StartX: null,
            StartY: null,
            EndX: null,
            EndY: null,
            DragPositionX: null,
            DragPositionY: null,
            DragPositionHorizontal: null,
            DragPositionVertical: null
        }

        let changedProperties = {};

        if (!event) {
            changedProperties = {
                DragPositionHorizontal: null,
                DragPositionVertical: null
            }

            this.DraggingElement.DOMElement.dispatchEvent(new CustomEvent('dndChange', {
                bubbles: true,
                cancelable: true,
                detail: {
                    Event: event,
                    DraggingElement: this.DraggingElement,
                    TargetElement: this.TargetElement,
                    PrevTargetElement: this.PrevTargetElement,
                    Changes: changedProperties
                }
            }));

            return true;
        }

        let targetEL = event.target;
        targetProperties = {
            Id: targetEL.getAttribute('data-fieldID'),
            DOMElement: targetEL,
            Row: 0,
            Col: 0,
            StartX: targetEL.offsetLeft,
            StartY: targetEL.offsetTop,
            EndX: targetEL.offsetLeft + targetEL.offsetWidth,
            EndY: targetEL.offsetTop + targetEL.offsetHeight,
            DragPositionX: ((event.x - targetEL.offsetLeft) / (targetEL.offsetLeft + targetEL.offsetWidth))  * 100,
            DragPositionY: ((event.y - targetEL.offsetTop) / (targetEL.offsetTop + targetEL.offsetHeight)) * 100,
            DragPositionHorizontal: '',
            DragPositionVertical: ''
        }


        if (targetProperties.DragPositionX < 50) targetProperties.DragPositionHorizontal = 'left';
        else targetProperties.DragPositionHorizontal = 'right';

        if (targetProperties.DragPositionY < 50) targetProperties.DragPositionVertical = 'top';
        else targetProperties.DragPositionVertical = 'bottom';
       
        if (targetProperties.DragPositionX < 0 || targetProperties.DragPositionX > 100 || targetProperties.DragPositionY < 0 || targetProperties.DragPositionY > 100) {
            changedProperties = {
                DragPositionHorizontal: null,
                DragPositionVertical: null
            }
            this.PrevTargetElement = { ...this.TargetElement };
            this.TargetElement = false;
        }

        else {
            if (targetProperties.DragPositionHorizontal != this.TargetElement.DragPositionHorizontal) 
                changedProperties.DragPositionHorizontal = { oldValue: this.TargetElement.DragPositionHorizontal, newValue: targetProperties.DragPositionHorizontal };

            if (targetProperties.DragPositionVertical != this.TargetElement.DragPositionVertical) 
                changedProperties.DragPositionVertical = { oldValue: this.TargetElement.DragPositionVertical, newValue: targetProperties.DragPositionVertical };

            this.PrevTargetElement = { ...this.TargetElement };
            this.TargetElement = targetProperties;
        }

        if (Object.keys(changedProperties).length > 0) {
            this.DraggingElement.DOMElement.dispatchEvent(new CustomEvent('dndChange', {
                bubbles: true,
                cancelable: true,
                detail: {
                    Event: event,
                    DraggingElement: this.DraggingElement,
                    TargetElement: this.TargetElement,
                    PrevTargetElement: this.PrevTargetElement,
                    Changes: changedProperties
                }
            }));
        }
    }
}