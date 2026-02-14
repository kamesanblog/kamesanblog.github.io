---
title: 在Obsidian實現Dayone的OnThisDay功能
description: 透過AI的手把手教學，讓一個程式小白也可以瞭解程式的好處，並實際運用在生活上。
date: 2025-09-27T10:58:00
categories:
  - 工具
tags:
  - Obsidian
  - AI
keywords:
  - Dayone
  - OnThisDay
  - 綁架
draft: false 
cover:
    image: "20250927001.jpg"
    alt: ""
    caption: ""
    relative: true
    hidden: false
editPost:
    URL: ""
    Text: ""
    appendFilePath: false
---

## 起因

卡美桑個性其實蠻念舊的...所以有了智慧型手機後就有記錄一些日常的活動，當時購買了Dayone app以爲可以用到天荒地老......但好景不常後來Dayone遇到[**你的日記不是你的日記**](https://wiwi.blog/blog/notebooklm-enshittification)之app轉月費制問題，當初一次性購買的我滿腔怒火…但畢竟原來功能都一樣，只是不能有月費制的功能,活像一個閹割版....不過畢竟也還是可用，所以也就將就用了...但從那時候開始我心裡就種下"**總有一天會被軟體綁架不安的種子**"

去年因為購買了[電子書閱讀器]，讀到了卡片筆記盒的做筆記方式而接觸到Obsidian，超喜歡Obsidian的簡易Markdown格式，所有的資料都是簡單的md文字檔，真的很便利於管理。

學習使用Obsidian的過程中，有一天發現，要脫離DayOne軟體綁架的控制，只要把日記搬到Obsidian就可以啦～！超開心！！！
但是卻對於DayOne的一個on this day 功能很懷念...因為它可以顯示所有你日記裡面跟今天相同日期的所有日記～這樣的功能很適合做一種類似復盤的回憶感～～

因此開始爬文，可是這樣的資料好像很偏門...感覺不太多...苦惱之際突然想到使用AI～～～
老天～～～！整個豁然開朗！AI寫了一堆我看不懂的程式～但是我照著做就可以在我的每個日記md檔內加入 one this day的功能～！！謝謝ＡＩ～

## 使用方法

以下我會貼出我目前使用的程式碼，你也可以把程式碼丟給ＡＩ請他解釋作用，這邊下方我會請Google Gemini解釋程式碼，給你做參考看看。

我使用在日記裡面的程式碼是dataviewjs：

```
// 1. 取得當前檔案的 Diary_time
let current = dv.current().Diary_time;

// 2. 篩選所有檔案，抓出月與日相同的
let results = dv.pages()
  .where(p => p.Diary_time && 
              p.Diary_time.month == current.month && 
              p.Diary_time.day == current.day);

// 3. 輸出表格 (檔案改成連結)
dv.table(["檔案", "日期"], 
  results.map(p => [dv.fileLink(p.file.path), p.Diary_time]));
```

---

## Gemini程式碼逐步解釋

這段程式碼是用於 **DataviewJS** (一種在 Obsidian 筆記軟體中用於查詢和顯示資料的 JavaScript 語言) 的腳本。

它的核心功能是找出所有筆記中，其 **`Diary_time`** 欄位 (可能是日期或時間) 的 **月份和日期** 與當前正在瀏覽的筆記的 **`Diary_time`** 欄位的月份和日期完全相同的筆記。簡單來說，它在尋找所有「**歷史上的今天**」的筆記。


### 1. 取得當前檔案的 `Diary_time`

程式碼片段

```
// 1. 取得當前檔案的 Diary_time
let current = dv.current().Diary_time;
```

- `dv.current()`: 取得當前正在開啟和瀏覽的 Obsidian 檔案的資料。
    
- `.Diary_time`: 從當前檔案的 **Frontmatter** (檔案開頭的 YAML 區塊) 或 **內聯欄位** 中，取出名為 `Diary_time` 的欄位的值。
    
- `let current = ...`: 將這個 `Diary_time` 的值存入一個名為 `current` 的變數中。這個變數代表了我們用來比較的**目標日期**。
    

### 2. 篩選所有檔案，抓出月與日相同的資料

程式碼片段

```
// 2. 篩選所有檔案，抓出月與日相同的
let results = dv.pages()
  .where(p => p.Diary_time &&
              p.Diary_time.month == current.month &&
              p.Diary_time.day == current.day);
```

- `dv.pages()`: 取得 **Obsidian 保管庫中所有筆記** (檔案) 的集合。
    
- `.where(...)`: 對這個集合進行篩選。括號中的是一個篩選條件，只有符合條件的筆記會被保留。
    
- `p`: 代表集合中的每一個筆記。
    
- `p.Diary_time &&`: 確保該筆記**有**一個 `Diary_time` 欄位的值 (避免錯誤)。
    
- `p.Diary_time.month == current.month`: 檢查該筆記的 `Diary_time` 的**月份**是否與當前筆記的 `Diary_time` (即 `current`) 的**月份**相同。
    
- `p.Diary_time.day == current.day`: 檢查該筆記的 `Diary_time` 的**日期**是否與當前筆記的 `Diary_time` (即 `current`) 的**日期**相同。
    
- `let results = ...`: 將所有符合「月份和日期都相同」條件的筆記存入 `results` 變數中。
    

### 3. 輸出表格 (檔案改成連結)

程式碼片段

```
// 3. 輸出表格 (檔案改成連結)
dv.table(["檔案", "日期"],
  results.map(p => [dv.fileLink(p.file.path), p.Diary_time]));
```

- `dv.table([...], [...])`: 建立並輸出一個 Dataview 表格。
    
    - 第一個陣列 `["檔案", "日期"]`: 定義表格的**欄位標題**。
        
    - 第二個陣列: 定義表格的**內容** (每一列的資料)。
        
- `results.map(...)`: 將 `results` 集合中的每一個筆記 (`p`) 轉換成表格中的**一行資料**。
    
- `[dv.fileLink(p.file.path), p.Diary_time]`: 這是每一行資料的兩個欄位的值：
    
    - `dv.fileLink(p.file.path)`: 將筆記的完整路徑轉換成一個可以在 Obsidian 中點擊的**連結**。
        
    - `p.Diary_time`: 顯示該筆記的 `Diary_time` 的原始值。
        
---

**接著我還把這樣的功能運用到我的筆記與閱讀復盤....整個就是撒花，也讓我離開被DayOne 綁架的日子。（完）**

