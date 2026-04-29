package com.neighborhood.util;

import java.util.HashMap;
import java.util.Map;

public class PageQuery extends HashMap<String, Object> {
    
    private static final long serialVersionUID = 1L;
    
    private Integer pageNum = 1;
    private Integer pageSize = 10;
    
    public PageQuery() {
        this.put("offset", 0);
        this.put("limit", pageSize);
    }
    
    public PageQuery(Integer pageNum, Integer pageSize) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.put("offset", (pageNum - 1) * pageSize);
        this.put("limit", pageSize);
    }
    
    public void parseParams(Map<String, Object> params) {
        String pageNumStr = (String) params.get("pageNum");
        String pageSizeStr = (String) params.get("pageSize");
        
        if (pageNumStr != null && !"".equals(pageNumStr)) {
            this.pageNum = Integer.parseInt(pageNumStr);
        }
        if (pageSizeStr != null && !"".equals(pageSizeStr)) {
            this.pageSize = Integer.parseInt(pageSizeStr);
        }
        
        this.put("offset", (this.pageNum - 1) * this.pageSize);
        this.put("limit", this.pageSize);
        
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            this.put(entry.getKey(), entry.getValue());
        }
    }
    
    public Integer getPageNum() {
        return pageNum;
    }
    
    public Integer getPageSize() {
        return pageSize;
    }
}
