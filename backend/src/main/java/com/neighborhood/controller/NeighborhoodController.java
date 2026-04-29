package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Neighborhood;
import com.neighborhood.entity.NeighborhoodComment;
import com.neighborhood.service.NeighborhoodService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/neighborhood")
@CrossOrigin
public class NeighborhoodController {

    @Autowired
    private NeighborhoodService neighborhoodService;

    @GetMapping("/list")
    public Result getPostList(@RequestParam Map<String, Object> params) {
        Page<Neighborhood> page = neighborhoodService.getPostPage(params);
        return Result.success(page);
    }

    @GetMapping("/detail/{id}")
    public Result getPostDetail(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Neighborhood post = neighborhoodService.getPostDetail(id, userId);
        return Result.success(post);
    }

    @PostMapping("/add")
    public Result addPost(@RequestBody Neighborhood post, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        post.setUserId(userId);
        try {
            boolean success = neighborhoodService.addPost(post);
            return success ? Result.success() : Result.error("发布失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public Result deletePost(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = neighborhoodService.deletePost(id);
            return success ? Result.success() : Result.error("删除失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/like/{id}")
    public Result likePost(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = neighborhoodService.likePost(id, userId);
            return success ? Result.success() : Result.error("点赞失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/unlike/{id}")
    public Result unlikePost(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = neighborhoodService.unlikePost(id, userId);
            return success ? Result.success() : Result.error("取消点赞失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/comment/{postId}")
    public Result getCommentList(@PathVariable Long postId) {
        Page<NeighborhoodComment> page = neighborhoodService.getCommentList(postId);
        return Result.success(page.getRecords());
    }

    @PostMapping("/comment/add")
    public Result addComment(@RequestBody NeighborhoodComment comment, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        comment.setUserId(userId);
        try {
            boolean success = neighborhoodService.addComment(comment);
            return success ? Result.success() : Result.error("评论失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/comment/{id}")
    public Result deleteComment(@PathVariable Long id) {
        try {
            boolean success = neighborhoodService.deleteComment(id);
            return success ? Result.success() : Result.error("删除失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
