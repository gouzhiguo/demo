$(function(){

var Script = function () {
	// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)

    /* 初始化外部事件(可拖动事件)
     -----------------------------------------------------------------*/
    $('#external-events div.external-event').each(function() {

        var eventObject = {
            title: $.trim($(this).text()) // 使用元素的文本事件标题
        };

        // 将事件对象存储在DOM元素
        $(this).data('eventObject', eventObject);

        // 使用jquery ui事件拖拽
        $(this).draggable({
            zIndex: 999,
            revert: true,      // 将导致事件回到它的
            revertDuration: 0  //  原始位置后的阻力
        });

    });
	
	


    /*初始化日历
     -----------------------------------------------------------------*/

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
	

    $('#calendar').fullCalendar({
		lang:'zh-cn',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
		//defaultDate: '2014-06-12',
		selectable: true,
		selectHelper: true,
        editable: true,
        droppable: true, // 这允许将东西滴落在日历上!
        drop: function(date, allDay) { // 这个函数被调用时被删除

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            //分配它报告的日期
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }

        },
		/*
		//更新
		eventClick: function(event, element) {
			event.title = "CLICKED!";
			$('#calendar').fullCalendar('updateEvent', event);
		},
		dayClick: function(date, jsEvent, view) {
	
			alert('Clicked on: ' + date.format());
	
			alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
	
			alert('Current view: ' + view.name);
	
			// change the day's background color just for fun
			$(this).css('background-color', 'red');
	
		},
		*/
		eventClick: function(event, element) {
			var title = prompt('Event Title:');
			if (title) {
				event.title = title;
			}
			$('#calendar').fullCalendar('updateEvent', event);
		},

		select: function(start, end) {
			var title = prompt('Event Title:');
			var eventData;
			if (title) {
				eventData = {
					title: title,
					start: start,
					end: end
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			}
			$('#calendar').fullCalendar('unselect');
		},



        events: [
            {
                title: '全天事件',
                start: new Date(y, m, 1)
            },
            {
                title: '长事件',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2)
            },
            {
                id: 999,
                title: '重复事件',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false
            },
            {
                id: 999,
                title: '重复事件',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false
            },
            {
                title: '会议',
                start: new Date(y, m, d, 10, 30),
                allDay: false
            },
            {
                title: '和M午餐',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                title: 'M的生日',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
            },
            {
                title: '点击链接谷歌',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
            }
        ]
    });


}();
	
});