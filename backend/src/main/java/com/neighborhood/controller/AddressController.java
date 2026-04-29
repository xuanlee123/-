package com.neighborhood.controller;

import com.neighborhood.entity.Address;
import com.neighborhood.service.AddressService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/address")
@CrossOrigin
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/list")
    public Result getAddressList(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        List<Address> list = addressService.getUserAddresses(userId);
        return Result.success(list);
    }

    @GetMapping("/default")
    public Result getDefaultAddress(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Address address = addressService.getDefaultAddress(userId);
        return Result.success(address);
    }

    @GetMapping("/detail/{id}")
    public Result getAddressDetail(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Address address = addressService.getAddressById(id, userId);
        return address != null ? Result.success(address) : Result.error("地址不存在");
    }

    @PostMapping("/add")
    public Result addAddress(@RequestBody Address address, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Address added = addressService.addAddress(address, userId);
        return Result.success(added);
    }

    @PutMapping("/update")
    public Result updateAddress(@RequestBody Address address, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Address updated = addressService.updateAddress(address, userId);
        return Result.success(updated);
    }

    @DeleteMapping("/delete/{id}")
    public Result deleteAddress(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        boolean success = addressService.deleteAddress(id, userId);
        return success ? Result.success() : Result.error("删除失败");
    }

    @PutMapping("/default/{id}")
    public Result setDefaultAddress(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = addressService.setDefaultAddress(id, userId);
            return success ? Result.success() : Result.error("设置失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
