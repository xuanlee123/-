package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Neighborhood;
import com.neighborhood.entity.NeighborhoodComment;
import com.neighborhood.entity.NeighborhoodLike;
import com.neighborhood.mapper.NeighborhoodMapper;
import com.neighborhood.mapper.NeighborhoodCommentMapper;
import com.neighborhood.mapper.NeighborhoodLikeMapper;
import com.neighborhood.service.NeighborhoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class NeighborhoodServiceImpl implements NeighborhoodService {

    @Autowired
    private NeighborhoodMapper neighborhoodMapper;

    @Autowired
    private NeighborhoodCommentMapper commentMapper;

    @Autowired
    private NeighborhoodLikeMapper likeMapper;

    private void enrichUserInfo(List<Neighborhood> posts, Long currentUserId) {
        for (Neighborhood post : posts) {
            enrichUserInfo(post, currentUserId);
        }
    }

    private void enrichUserInfo(Neighborhood post, Long currentUserId) {
        if (post == null) return;
        Map<String, Object> user = neighborhoodMapper.findUserById(post.getUserId());
        if (user != null) {
            post.setUsername((String) user.get("username"));
            post.setUserAvatar((String) user.get("avatar"));
        }
        if (currentUserId != null) {
            post.setIsLiked(neighborhoodMapper.existsLike(post.getId(), currentUserId));
        }
    }

    private void enrichCommentUserInfo(List<NeighborhoodComment> comments) {
        for (NeighborhoodComment c : comments) {
            if (c == null) continue;
            Map<String, Object> user = neighborhoodMapper.findUserById(c.getUserId());
            if (user != null) {
                c.setUsername((String) user.get("username"));
                c.setUserAvatar((String) user.get("avatar"));
            }
            if (c.getReplyUserId() != null) {
                Map<String, Object> replyUser = neighborhoodMapper.findUserById(c.getReplyUserId());
                if (replyUser != null) {
                    c.setReplyUsername((String) replyUser.get("username"));
                }
            }
        }
    }

    @Override
    public Page<Neighborhood> getPostPage(Map<String, Object> params) {
        Long currentUserId = null;
        if (params.get("userId") != null) {
            try { currentUserId = Long.parseLong(params.get("userId").toString()); } catch (Exception ignored) {}
        }

        Integer pageNum = params.get("pageNum") != null ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        Integer pageSize = params.get("pageSize") != null ? Integer.parseInt(params.get("pageSize").toString()) : 10;

        Page<Neighborhood> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Neighborhood> wrapper = new QueryWrapper<>();
        wrapper.eq("status", 1);

        if (params.get("type") != null) {
            wrapper.eq("type", params.get("type"));
        }

        wrapper.orderByDesc("create_time");
        Page<Neighborhood> result = neighborhoodMapper.selectPage(page, wrapper);
        enrichUserInfo(result.getRecords(), currentUserId);
        return result;
    }

    @Override
    public Neighborhood getPostDetail(Long id) {
        return neighborhoodMapper.selectById(id);
    }

    @Override
    public Neighborhood getPostDetail(Long id, Long currentUserId) {
        Neighborhood post = neighborhoodMapper.selectById(id);
        if (post != null) {
            enrichUserInfo(post, currentUserId);
        }
        return post;
    }

    @Override
    @Transactional
    public boolean addPost(Neighborhood post) {
        post.setStatus(1);
        post.setLikeCount(0);
        post.setCommentCount(0);
        post.setCreateTime(LocalDateTime.now());
        post.setUpdateTime(LocalDateTime.now());
        return neighborhoodMapper.insert(post) > 0;
    }

    @Override
    @Transactional
    public boolean deletePost(Long id) {
        commentMapper.delete(new QueryWrapper<NeighborhoodComment>().eq("post_id", id));
        likeMapper.delete(new QueryWrapper<NeighborhoodLike>().eq("post_id", id));
        return neighborhoodMapper.deleteById(id) > 0;
    }

    @Override
    @Transactional
    public boolean likePost(Long postId, Long userId) {
        if (neighborhoodMapper.existsLike(postId, userId)) {
            return false;
        }
        Neighborhood post = neighborhoodMapper.selectById(postId);
        if (post != null) {
            NeighborhoodLike like = new NeighborhoodLike();
            like.setPostId(postId);
            like.setUserId(userId);
            like.setCreateTime(LocalDateTime.now());
            likeMapper.insert(like);
            post.setLikeCount(post.getLikeCount() + 1);
            neighborhoodMapper.updateById(post);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean unlikePost(Long postId, Long userId) {
        QueryWrapper<NeighborhoodLike> wrapper = new QueryWrapper<>();
        wrapper.eq("post_id", postId).eq("user_id", userId);
        List<NeighborhoodLike> likes = likeMapper.selectList(wrapper);
        if (likes.isEmpty()) {
            return false;
        }
        Neighborhood post = neighborhoodMapper.selectById(postId);
        if (post != null && post.getLikeCount() > 0) {
            likeMapper.delete(wrapper);
            post.setLikeCount(post.getLikeCount() - 1);
            neighborhoodMapper.updateById(post);
            return true;
        }
        return false;
    }

    @Override
    public Page<NeighborhoodComment> getCommentList(Long postId) {
        Page<NeighborhoodComment> page = new Page<>(1, 100);
        QueryWrapper<NeighborhoodComment> wrapper = new QueryWrapper<>();
        wrapper.eq("post_id", postId);
        wrapper.orderByAsc("create_time");
        Page<NeighborhoodComment> result = commentMapper.selectPage(page, wrapper);
        enrichCommentUserInfo(result.getRecords());
        return result;
    }

    @Override
    @Transactional
    public boolean addComment(NeighborhoodComment comment) {
        comment.setCreateTime(LocalDateTime.now());
        commentMapper.insert(comment);

        Neighborhood post = neighborhoodMapper.selectById(comment.getPostId());
        if (post != null) {
            post.setCommentCount(post.getCommentCount() + 1);
            neighborhoodMapper.updateById(post);
        }
        return true;
    }

    @Override
    @Transactional
    public boolean deleteComment(Long id) {
        NeighborhoodComment comment = commentMapper.selectById(id);
        if (comment != null) {
            commentMapper.deleteById(id);

            Neighborhood post = neighborhoodMapper.selectById(comment.getPostId());
            if (post != null && post.getCommentCount() > 0) {
                post.setCommentCount(post.getCommentCount() - 1);
                neighborhoodMapper.updateById(post);
            }
            return true;
        }
        return false;
    }
}
