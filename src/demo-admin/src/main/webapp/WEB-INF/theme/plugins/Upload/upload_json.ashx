<%@ webhandler Language="C#" class="Upload" %>

/**
 * KindEditor ASP.NET
 *
 * 本ASP.NET程序是演示程序，建议不要直接在实际项目中使用。
 * 如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。
 *
 */

using System;
using System.Collections;
using System.Web;
using System.IO;
using SuiNing.Core.Util;

public class Upload : IHttpHandler
{
	private HttpContext context;
    //private readonly AttachmentConfig attachmentConfig = Hyt.BLL.Config.Config.Instance.GetAttachmentConfig();
	public void ProcessRequest(HttpContext context)
	{
		//定义允许上传的文件扩展名
		Hashtable extTable = new Hashtable();
		extTable.Add("image", "gif,jpg,jpeg,png,bmp");
		extTable.Add("flash", "swf,flv");
		extTable.Add("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
		extTable.Add("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

		//最大文件大小
		int maxSize = 2000000;
		this.context = context;

		HttpPostedFile imgFile = context.Request.Files["imgFile"];
		if (imgFile == null)
		{
            ShowError("请选择文件。");
		}

        var fileExt = Path.GetExtension(imgFile.FileName);

        //if (imgFile.InputStream == null || imgFile.InputStream.Length > maxSize)
        //{
        //    ShowError("上传文件大小超过限制。");
        //}

        //if (String.IsNullOrEmpty(fileExt) || Array.IndexOf(((String)extTable[dirName]).Split(','), fileExt.Substring(1).ToLower()) == -1)
        //{
        //    ShowError("上传文件扩展名是不允许的扩展名。\n只允许" + ((String)extTable[dirName]) + "格式。");
        //}
        
        //文件名称
        var fileName = string.Format("{0}{1}", DateTime.Now.ToString("yyyyMMddHHmmssffff"), fileExt);
        //路径
        string folderName = "/UploadFiles/Content/"+DateTime.Now.ToString("yyyy-MM-dd");
        //物理路径
        var saveFolder = context.Server.MapPath(folderName);
        //全路径
        var saveFileFullPath = Path.Combine(folderName, fileName);

        if (!saveFolder.EndsWith("\\")) saveFolder += "\\";
        if (!Directory.Exists(saveFolder))
        {
            Directory.CreateDirectory(saveFolder);
        }
        
        var baseImage = ImageUtil.StreamConvertToBytes(imgFile.InputStream);

        File.WriteAllBytes(saveFolder, baseImage);
        

		Hashtable hash = new Hashtable();
        hash["error"] = 0;
        hash["url"] = saveFileFullPath;
        context.Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
        context.Response.Write(JsonUtil.ToJson2(hash));
		context.Response.End();
	}
    
    /// <summary>
    /// 生成新文件名称
    /// </summary>
    /// <param name="fileExtension">文件类型（带点）</param>
    /// <returns>新的文件名称</returns>
    private string NewFileName(string fileExtension)
    {
        return Guid.NewGuid().ToString("N")+ fileExtension;
    }
    
    /// <summary>
    /// 提示
    /// </summary>
    /// <param name="message"></param>
	private void ShowError(string message)
	{
		Hashtable hash = new Hashtable();
        hash["error"] = 1;
        hash["message"] = message;
		context.Response.AddHeader("Content-Type", "text/html; charset=UTF-8");
        context.Response.Write(JsonUtil.ToJson(hash));
		context.Response.End();
	}

	public bool IsReusable
	{
		get
		{
			return true;
		}
	}
    
}
