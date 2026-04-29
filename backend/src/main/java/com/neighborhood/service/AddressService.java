package com.neighborhood.service;

import com.neighborhood.entity.Address;
import java.util.List;

public interface AddressService {
    List<Address> getUserAddresses(Long userId);
    Address getAddressById(Long id, Long userId);
    Address getDefaultAddress(Long userId);
    Address addAddress(Address address, Long userId);
    Address updateAddress(Address address, Long userId);
    boolean deleteAddress(Long id, Long userId);
    boolean setDefaultAddress(Long id, Long userId);
}
