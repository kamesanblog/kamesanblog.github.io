---
title: 複習石沈大海的筆記
description: 自動顯示obsidian內一個月沒編輯的筆記
date: 2025-10-14T18:53:00
published: 2025-10-14
categories:
  - 工具
tags:
  - Obsidian
  - AI
keywords:
  - 復盤
  - 筆記
  - 複習
showToc: true
TocOpen: true
draft: false
hidemeta: false
comments: false
canonicalURL: "https://canonical.url/to/page"
disableHLJS: true
disableShare: false
hideSummary: false
searchHidden: true
ShowReadingTime: false
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: false
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "20251014001.jpg"
    alt: ""
    caption: ""
    relative: true
    hidden: false
editPost:
    URL: ""
    Text: ""
    appendFilePath: false
---



### 困擾

Obsidian使用了半年多之後，發現我好像有很多筆記被遺忘在我的資料庫大海內...而且我算滿懶惰的，不喜歡去大海撈針...就算我真的想到有某則筆記，還是需使用查詢功能，其實是很方便沒錯，但我希望資料庫自己提醒我就好，因此又請AI 幫忙了，這個方式對於會寫code的朋友一定會覺得：這樣的基礎，你應該會知道吧？..很可惜我真的不知道....
所以我請AI協助我寫出：顯示我的資料庫內超過30天沒動過的筆記，

下面是我使用的dataview

```dataview
table file.mday as "最後編輯日" , title, description
from ""
WHERE file.mtime < date(today) - dur(30 day)
and contains(file.path, "Template") = false
and contains(file.path, "Attachment") = false
and !contains(file.path, "Diary")
and !contains(file.tags, "Archive")
sort file.mday asc
```

---


### GoogleGemin解釋
它的目的是在你的整個庫中，找出**超過 30 天沒有編輯**，且**不是**模板、附件或日記的檔案，並以表格形式列出它們，按照最後編輯日期升序排列。

#### 查詢結果格式

- `table file.mday as "最後編輯日" , title, description`
    
    - **`table`**: 表示查詢結果將以**表格**的形式呈現。
        
    - **`file.mday`**: 這是檔案的**最後修改日期**（Modified Day），它代表檔案內容**上次被更改的日期**。
        
        - `as "最後編輯日"`: 將這個欄位在表格中顯示的標題命名為「最後編輯日」。
            
    - **`title`**: 這是檔案的**標題**（如果檔案中有定義 `title` 欄位的話，否則通常是檔案名稱）。
        
    - **`description`**: 這是檔案的**描述**（如果檔案中有定義 `description` 欄位的話）。
        

#### 查詢範圍

- `from ""`
    
    - **`from ""`**: 表示從**整個資料庫**（Vault）中的所有檔案進行查詢。
        

#### 過濾條件 (`WHERE`)

這些條件用於篩選出符合要求的檔案：

- `WHERE file.mtime < date(today) - dur(30 day)`
    
    - 這是**最主要的篩選條件**。
        
    - `file.mtime`: 檔案的**最後修改時間**（Modified Time，包含時間資訊）。
        
    - `date(today)`: 今天的日期。
        
    - `dur(30 day)`: 一個 30 天的時間長度（Duration）。
        
    - `date(today) - dur(30 day)`: 計算出 **30 天前的日期和時間**。
        
    - `file.mtime < ...`: 判斷檔案的最後修改時間是否**早於** 30 天前的時間，即：這個檔案**已經超過 30 天沒有被編輯了**。
        
- `and contains(file.path, "Template") = false`
    
    - 排除**路徑**中包含 `"Template"` 這個詞的檔案（通常是排除模板檔案）。
        
- `and contains(file.path, "Attachment") = false`
    
    - 排除**路徑**中包含 `"Attachment"` 這個詞的檔案（通常是排除附件資料夾中的檔案，例如圖片、PDF 等）。
        
- `and !contains(file.path, "Diary")`
    
    - `!` 表示「非」或「不」。
        
    - 排除**路徑**中包含 `"Diary"` 這個詞的檔案（通常是排除日記檔案）。
        
- `and !contains(file.tags, "Archive")`
    
    - 排除**檔案標籤**（`file.tags`）中包含 `"Archive"` 這個標籤的檔案（通常是排除已歸檔的檔案）。
        

#### 排序

- `sort file.mday asc`
    
    - **`sort`**: 表示排序。
        
    - **`file.mday`**: 按照檔案的最後修改日期來排序。
        
    - **`asc`**: 升序（Ascending），表示從**最早**的日期排到**最近**的日期。
        


----

### 補充

我會設定archive 的tag,當作是我覺得這篇筆記不需要再重新覆盤了，就可將筆記標上這個tag. 未來該筆記就不會再度顯示在複習列表內。 
另外我也用一個template 做一個rechecked 的簡易表示，讓我知道這個檔案我已經在什麼時候已經複習過，只需要開一個新筆記，將下面的句子貼上後，就可以放在template 資料夾使用。

`recheck:{{date}} {{time}} `

複習範例如圖，如果期間又有新想法也可以加上心得。
或是您也有在複習筆記的好想法，非常歡迎跟我分享，感謝。
![](/20251014002.jpg)
