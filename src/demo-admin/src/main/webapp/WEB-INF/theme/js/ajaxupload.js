jQuery.extend({
    createUploadIframe: function (id, uri) { //idΪ��ǰϵͳʱ���ַ�����uri���ⲿ�����json�����һ������?
        //create frame
        var frameId = 'jUploadFrame' + id; //��iframe���һ����һ�޶���id
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"'; //����iframeԪ��
        if (window.ActiveXObject) { //�ж�������Ƿ�֧��ActiveX�ؼ�
            if (typeof uri == 'boolean') {
                iframeHtml += ' src="' + 'javascript:false' + '"';
            } else if (typeof uri == 'string') {
                iframeHtml += ' src="' + uri + '"';
            }
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body); //����̬iframe׷�ӵ�body��
        return jQuery('#' + frameId).get(0); //����iframe����
    },
    createUploadForm: function (id, fileElementId, fileElementObj, data) { //idΪ��ǰϵͳʱ���ַ�����fileElementIdΪҳ��<input type='file' />��id��data��ֵ��Ҫ���ݴ���json�ļ�������
        //create form    
        var formId = 'jUploadForm' + id; //��form���һ����һ�޶���id
        var fileId = 'jUploadFile' + id; //��<input type='file' />���һ����һ�޶���id
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" ></form>'); //����formԪ��
        if (data) { //ͨ��Ϊfalse
            for (var i in data) {
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form); //����data�����ݣ������������ⲿ���һ���֪����ʲôʱ���õ��������Ǵ���json��ʱ�����Ĭ�ϴ�һЩ�����Ļ�Ҫ�õ���?
            }
        }
        var oldElement = fileElementObj;
        if (fileElementId != null && fileElementId != "" && fileElementId != undefined) {
            oldElement = jQuery('#' + fileElementId); //�õ�ҳ���е�<input type='file' />����
        }
        var newElement = jQuery(oldElement).clone(); //��¡ҳ���е�<input type='file' />����
        jQuery(oldElement).attr('id', fileId); //�޸�ԭ�����id
        jQuery(oldElement).before(newElement); //��ԭ����ǰ�����¡����?
        jQuery(oldElement).appendTo(form); //��ԭ������뵽��̬form�Ľ�β��
        //set attributes
        jQuery(form).css('position', 'absolute'); //����̬form�����ʽ��ʹ�両��������?
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body'); //�Ѷ�̬form���뵽body��
        return form;
    },
    ajaxFileUpload: function (s) { //����s�Ǹ�json���󣬴���һЩajax�Ĳ���
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout        
        s = jQuery.extend({}, jQuery.ajaxSettings, s); //��ʱ��s��������jQuery.ajaxSettings��ԭs������չ��Ķ���?
        var id = new Date().getTime(); //ȡ��ǰϵͳʱ�䣬Ŀ���ǵõ�һ����һ�޶�������
        var form = jQuery.createUploadForm(id, s.fileElementId, s.fileElementObj, (typeof (s.data) == 'undefined' ? false : s.data)); //������̬form
        var io = jQuery.createUploadIframe(id, s.secureuri); //������̬iframe
        var frameId = 'jUploadFrame' + id; //��̬iframe��id
        var formId = 'jUploadForm' + id; //��̬form��id
        // Watch for a new set of requests
        if (s.global && !jQuery.active++) { //��jQuery��ʼһ��ajax����ʱ����
            jQuery.event.trigger("ajaxStart"); //����ajaxStart����
        }
        var requestDone = false; //������ɱ��?
        // Create the request object
        var xml = {};
        if (s.global)
            jQuery.event.trigger("ajaxSend", [xml, s]); //����ajaxSend����
        // Wait for a response to come back
        var uploadCallback = function (isTimeout) { //�ص�����
            var io = document.getElementById(frameId); //�õ�iframe����
            try {
                if (io.contentWindow) { //��̬iframe���ڴ��ڶ����Ƿ����?
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
                } else if (io.contentDocument) { //��̬iframe���ĵ������Ƿ����?
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {
                jQuery.handleError(s, xml, null, e);
            }
            if (xml || isTimeout == "timeout") { //xml��������ֵ����isTimeout == "timeout"����ʾ���󷢳�����������Ӧ
                requestDone = true; //�������?
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error"; //������ǡ���ʱ������ʾ����ɹ�
                    // Make sure that the request was successful or notmodified
                    if (status != "error") { // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData(xml, s.dataType); //���ݴ��͵�type���ͣ�����json���󣬴�ʱ���ص�data���Ǻ�̨������ķ��ؽ��
                        // If a local callback was specified, fire it and pass it the data
                        if (s.success)
                            s.success(data, status); //ִ���ϴ��ɹ��Ĳ���
                        // Fire the global callback
                        if (s.global)
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                    } else
                        jQuery.handleError(s, xml, status);
                } catch (e) {
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                } // The request was completed
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]); // Handle the global AJAX counter
                if (s.global && ! --jQuery.active)
                    jQuery.event.trigger("ajaxStop"); // Process result
                if (s.complete)
                    s.complete(xml, status);
                jQuery(io).unbind(); //�Ƴ�iframe���¼��������?
                setTimeout(function () { //���ó�ʱʱ��
                    try {
                        jQuery(io).remove(); //�Ƴ���̬iframe
                        jQuery(form).remove(); //�Ƴ���̬form
                    } catch (e) {
                        jQuery.handleError(s, xml, null, e);
                    }
                }, 100);
                xml = null;
            }
        } // Timeout checker
        if (s.timeout > 0) { //��ʱ���?
            setTimeout(function () { // Check to see if the request is still happening
                if (!requestDone) uploadCallback("timeout"); //���������δ��ɣ��ͷ��ͳ�ʱ�ź�
            }, s.timeout);
        }
        try {
            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url); //�����ajaxҳ�浼��url
            jQuery(form).attr('method', 'POST'); //�����ύ����ʽ
            jQuery(form).attr('target', frameId); //���ص�Ŀ��iframe�����Ǵ����Ķ�̬iframe
            if (form.encoding) { //ѡ����뷽�?
                jQuery(form).attr('encoding', 'multipart/form-data');
            } else {
                jQuery(form).attr('enctype', 'multipart/form-data');
            }
            jQuery(form).submit(); //�ύform��
        } catch (e) {
            jQuery.handleError(s, xml, null, e);
        }
        jQuery('#' + frameId).on("load", uploadCallback); //ajax ����ӷ������������ݣ�ͬʱ����ص�����
        return { abort: function () { } };
    },
    uploadHttpData: function (r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText; // If the type is "script", eval it in global context
        if (type == "script")
            jQuery.globalEval(data); // Get the JavaScript object, if JSON is used.
        if (type == "json")
            eval("data = " + data); // evaluate scripts within html
        if (type == "html")
            jQuery("<div>").html(data).evalScripts();
        return data;
    },
    handleError: function (s, xhr, status, e) {
        if (s.error) {
            s.error.call(s.context || s, xhr, status, e);
        }
        if (s.global) {
            (s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
        }
    }
});