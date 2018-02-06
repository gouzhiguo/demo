using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;


namespace SuiNing.Admin.Theme.plugins.Upload
{
    /// <summary>
    /// upload 的摘要说明
    /// </summary>
    public class upload : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            //var response = new JResult<string>()
            //{
            //    Status = false,
            //    Message = "上传凭证失败！"
            //};
            //context.Response.ContentType = "text/plain";

            //try
            //{
            //    System.Threading.Thread.Sleep(2000);
            //    //接收上传后的文件
            //    HttpPostedFile file = context.Request.Files[0];
            //    //文件夹
            //    var folder = context.Request["configName"];
            //    //年月
            //    string yearMonth = DateTime.Now.ToString("yyyyMM");
            //    //转换图片格式
            //    var baseImage = ImageUtil.StreamConvertToBytes(file.InputStream);
            //    //新文件名称
            //    var fileName = NewFileName(Path.GetExtension(file.FileName));
            //    string[] allowExtension = { ".gif", ".png", ".jepg", ".jpg", ".bmp" };
            //    //定义允许上传的文件扩展名
            //    var fileExt = Path.GetExtension(file.FileName).ToLower();
            //    if (!allowExtension.Contains(fileExt))
            //    {
            //        response.Message = "文件格式错误.";
            //        context.Response.Write(JsonUtil.ToJson2(response));
            //        context.Response.End();
            //    }
            //    //生成Big
            //    var imageBig = ImageUtil.CreateThumbnail(file.InputStream,500,400,ImageUtil.ThumbnailMode.Cut);

            //    if (file.ContentLength > 2048 * 1024)
            //    {
            //        response.Message = "文件太大.";
            //        context.Response.Write(JsonUtil.ToJson2(response));
            //        context.Response.End();
            //    }

            //    response.Status = true;
            //    response.Message = "上传凭证成功！";
            //    response.Data = UploadFile(context, baseImage, folder, fileName);
            //}
            //catch (Exception ex)
            //{
            //    response.Status = false;
            //    response.Message = ex.Message;
            //}

            //context.Response.Write(JsonUtil.ToJson2(response));
            //context.Response.End();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context">上下文</param>
        /// <param name="fileData"></param>
        /// <param name="folder"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public string UploadFile(HttpContext context, byte[] fileData, string folder, string fileName)
        {
            string saveFileFullPath = "";
            try
            {
                var path = string.Format("/UploadFiles/{0}/", folder);
                var saveFolder = context.Server.MapPath(path);

                if (!saveFolder.EndsWith("\\")) saveFolder += "\\";
                if (!Directory.Exists(saveFolder))
                {
                    Directory.CreateDirectory(saveFolder);
                }
                saveFileFullPath = Path.Combine(saveFolder, fileName);
                File.WriteAllBytes(saveFileFullPath, fileData);

                return Path.Combine(path, fileName);
            }
            catch (Exception ex)
            {
                return saveFileFullPath;
            }

        }

        /// <summary>
        /// 生成新文件名称
        /// </summary>
        /// <param name="fileExtension">文件类型（带点）</param>
        private string NewFileName(string fileExtension)
        {
            return Guid.NewGuid().ToString("N") + fileExtension;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}