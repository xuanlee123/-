package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Neighborhood;
import com.neighborhood.entity.NeighborhoodComment;

import java.util.Map;

public interface NeighborhoodService {
    Page<Neighborhood> getPostPage(Map<String, Object> params);
    Neighborhood getPostDetail(Long id);
    Neighborhood getPostDetail(Long id, Long currentUserId);
    boolean addPost(Neighborhood post);
    boolean deletePost(Long id);
    boolean likePost(Long postId, Long userId);
    boolean unlikePost(Long postId, Long userId);
    Page<NeighborhoodComment> getCommentList(Long postId);
    boolean addComment(NeighborhoodComment comment);
    boolean deleteComment(Long id);
}
