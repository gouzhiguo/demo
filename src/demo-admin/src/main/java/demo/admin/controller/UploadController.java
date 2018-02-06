package demo.admin.controller;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 *
 * @author 苟治国
 */
@Controller
@RequestMapping("upload")
public class UploadController {

    // 在控制器参数使用@RequestParam("file") MultipartFile file接受单个文件上传;
    // 在控制器参数使用@RequestParam("file") MultipartFile[] files接受多个文件上传;
    // 通过配置MultipartResolver来配置文件上传的一些属性;

    /**
     * 上传
     * @param file
     * @return
     */
    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public @ResponseBody
    String upload(@RequestParam("file") MultipartFile file) {

        try {
            FileUtils.writeByteArrayToFile(new File("e:/"+file.getOriginalFilename()),file.getBytes());
            return "ok";
        } catch (IOException e) {
            e.printStackTrace();
            return "wrong";
        }
    }

    @RequestMapping(method=RequestMethod.POST)
    public void processUpload(@RequestParam MultipartFile file, Model model) throws IOException {
        model.addAttribute("message", "File '" + file.getOriginalFilename() + "' uploaded successfully");
    }
}
