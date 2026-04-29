package com.neighborhood;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.neighborhood.mapper")
public class NeighborhoodApplication {
    public static void main(String[] args) {
        SpringApplication.run(NeighborhoodApplication.class, args);
    }
}
