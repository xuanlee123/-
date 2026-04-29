package com.neighborhood.controller;

import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
@CrossOrigin
public class UploadController {

    private static final String[] ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"};

    @Value("${upload.path:uploads}")
    private String uploadPath;

    @Value("${upload.base-url:http://localhost:8080}")
    private String uploadBaseUrl;

    @PostMapping
    public Result upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        if (file == null || file.isEmpty()) {
            return Result.error("上传文件不能为空");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            return Result.error("文件名无效");
        }

        String ext = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            ext = originalFilename.substring(dotIndex).toLowerCase();
        }

        boolean allowed = false;
        for (String allowedExt : ALLOWED_EXTENSIONS) {
            if (allowedExt.equals(ext)) {
                allowed = true;
                break;
            }
        }
        if (!allowed) {
            return Result.error("不支持的图片格式");
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            return Result.error("图片大小不能超过10MB");
        }

        String baseDir = System.getProperty("user.dir");
        String datePath = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String saveDir = baseDir + File.separator + uploadPath + File.separator + datePath;

        try {
            Path dirPath = Paths.get(saveDir);
            Files.createDirectories(dirPath);

            String newFileName = UUID.randomUUID().toString().replace("-", "") + ext;
            File dest = new File(dirPath.toFile(), newFileName);
            file.transferTo(dest);

            String fileUrl = uploadPath + "/" + datePath + "/" + newFileName;
            return Result.success(fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return Result.error("上传失败: " + e.getMessage());
        }
    }

    private String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String host = request.getServerName();
        int port = request.getServerPort();
        String ctx = request.getContextPath();
        if (port == 80 || port == 443) {
            return scheme + "://" + host + ctx;
        }
        return scheme + "://" + host + ":" + port + ctx;
    }
}
