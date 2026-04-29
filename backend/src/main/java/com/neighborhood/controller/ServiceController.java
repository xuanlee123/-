package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.ServiceInfo;
import com.neighborhood.service.ServiceService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/service")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping("/list")
    public Result getServiceList(@RequestParam Map<String, Object> params) {
        Page<ServiceInfo> page = serviceService.getServicePage(params);
        return Result.success(page);
    }

    @GetMapping("/detail/{id}")
    public Result getServiceDetail(@PathVariable Long id) {
        ServiceInfo service = serviceService.getServiceDetail(id);
        return Result.success(service);
    }

    @GetMapping("/category")
    public Result getCategories() {
        List<Map<String, Object>> categories = serviceService.getCategories();
        return Result.success(categories);
    }

    @PostMapping("/add")
    public Result addService(@RequestBody ServiceInfo service) {
        boolean success = serviceService.addService(service);
        return success ? Result.success() : Result.error("添加失败");
    }

    @PutMapping("/update")
    public Result updateService(@RequestBody ServiceInfo service) {
        boolean success = serviceService.updateService(service);
        return success ? Result.success() : Result.error("修改失败");
    }

    @DeleteMapping("/delete/{id}")
    public Result deleteService(@PathVariable Long id) {
        boolean success = serviceService.deleteService(id);
        return success ? Result.success() : Result.error("删除失败");
    }
}
