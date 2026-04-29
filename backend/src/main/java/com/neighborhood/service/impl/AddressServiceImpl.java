package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.neighborhood.entity.Address;
import com.neighborhood.mapper.AddressMapper;
import com.neighborhood.service.AddressService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AddressServiceImpl extends ServiceImpl<AddressMapper, Address> implements AddressService {

    @Override
    public List<Address> getUserAddresses(Long userId) {
        QueryWrapper<Address> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).orderByDesc("is_default").orderByDesc("create_time");
        return list(wrapper);
    }

    @Override
    public Address getAddressById(Long id, Long userId) {
        QueryWrapper<Address> wrapper = new QueryWrapper<>();
        wrapper.eq("id", id).eq("user_id", userId);
        return getOne(wrapper);
    }

    @Override
    public Address getDefaultAddress(Long userId) {
        QueryWrapper<Address> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("is_default", 1);
        return getOne(wrapper);
    }

    @Override
    public Address addAddress(Address address, Long userId) {
        address.setUserId(userId);
        address.setCreateTime(LocalDateTime.now());
        address.setUpdateTime(LocalDateTime.now());
        if (address.getIsDefault() == null) {
            address.setIsDefault(0);
        }
        if (address.getIsDefault() == 1) {
            clearDefault(userId);
        }
        address.setId(null);
        baseMapper.insertAddress(userId, address.getName(), address.getPhone(),
                address.getRegion(), address.getDetail(),
                address.getIsDefault(), address.getCreateTime(), address.getUpdateTime());
        return address;
    }

    @Override
    public Address updateAddress(Address address, Long userId) {
        Address existing = getAddressById(address.getId(), userId);
        if (existing == null) {
            throw new RuntimeException("地址不存在");
        }
        address.setUserId(userId);
        address.setUpdateTime(LocalDateTime.now());
        if (address.getIsDefault() != null && address.getIsDefault() == 1) {
            clearDefault(userId);
        }
        updateById(address);
        return address;
    }

    @Override
    @Transactional
    public boolean deleteAddress(Long id, Long userId) {
        QueryWrapper<Address> wrapper = new QueryWrapper<>();
        wrapper.eq("id", id).eq("user_id", userId);
        return remove(wrapper);
    }

    @Override
    @Transactional
    public boolean setDefaultAddress(Long id, Long userId) {
        clearDefault(userId);
        Address address = getAddressById(id, userId);
        if (address == null) {
            throw new RuntimeException("地址不存在");
        }
        address.setIsDefault(1);
        address.setUpdateTime(LocalDateTime.now());
        return updateById(address);
    }

    private void clearDefault(Long userId) {
        QueryWrapper<Address> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("is_default", 1);
        Address old = new Address();
        old.setIsDefault(0);
        old.setUpdateTime(LocalDateTime.now());
        update(old, wrapper);
    }
}
