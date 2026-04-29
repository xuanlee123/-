package com.neighborhood.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.neighborhood.entity.Neighborhood;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import java.util.Map;

@Mapper
public interface NeighborhoodMapper extends BaseMapper<Neighborhood> {

    @Select("SELECT username, avatar FROM users WHERE id = #{userId} LIMIT 1")
    Map<String, Object> findUserById(@Param("userId") Long userId);

    @Select("SELECT COUNT(1) > 0 FROM neighborhood_like WHERE post_id = #{postId} AND user_id = #{userId}")
    boolean existsLike(@Param("postId") Long postId, @Param("userId") Long userId);
}
