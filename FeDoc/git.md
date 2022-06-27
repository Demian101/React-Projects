[TOC]

### 本地新建

```bash
$ go a Directory
$ git init
    本步会生成 .git 
```



### Git 基础命令

#### git status

git status 让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，`readme.txt`被修改过了，但还没有准备提交的修改。

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```



#### git diff

虽然  `git status` 告诉我们 `readme.txt`被修改了，但如果能看看具体修改了什么内容，自然是很好的。比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的`readme.txt`，所以，需要用`git diff`这个命令看看：

```bash
git diff readme.txt
```



#### git commit

好比玩RPG游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。有些时候，在打Boss之前，你会手动存盘，以便万一打Boss失败了，可以从最近的地方重新开始。Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为`commit`。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

```bash
$ git log
commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:06:15 2018 +0800

    commit description : append GPL

commit e475afc93c209a690c39c13a46716e8fa000c366
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    commit description : add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    commit description : wrote a readme file
```

`git log`命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是`append GPL`，上一次是`add distributed`，最早的一次是`wrote a readme file`。

如果嫌输出信息太多，看得眼花缭乱的，可以试试加上 `--pretty=oneline` 参数：



### 版本回退

```bash
$ git commit  保存版本
$ git log  查看版本情况
```

首先，Git 必须知道当前版本是哪个版本，用`HEAD`表示当前版本，也就是最新的提交 `1094adb...`，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

现在，我们要把当前版本 `append GPL` 回退到上一个版本 `add distributed` ，就可以使用 `git reset` 命令：

```bash
$ git reset --hard e475afc93c209a690c39c13a46716e8fa000c366
$ git log 
commit e475afc93c209a690c39c13a46716e8fa000c366 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    commit description : add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    commit description : wrote a readme file
```

最新的那个版本`append GPL`已经看不到了！好比你从21世纪坐时光穿梭机来到了19世纪



如果想再回来 : 

```bash
$ git reset --hard 1094adb7b9b3807259d8cb349e7df1d4d6477073 
```



Git 的版本回退速度非常快，因为 Git 在内部有个指向当前版本的 `HEAD` 指针，当你回退版本的时候，Git 仅仅是把HEAD从指向`append GPL`：

```bash
┌────┐
│HEAD│
└────┘
   └──> ○ append GPL
        ○ add distributed
        ○ wrote a readme file

改为指向add distributed：

┌────┐
│HEAD│
└────┘
   │    ○ append GPL
   └──> ○ add distributed
        ○ wrote a readme file
```

吃后悔药 : 用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。





### 工作区和暂存区

电脑里能看到的目录就是**工作区（Working Directory）**

- 工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。
- Git 的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向 `master` 的一个指针叫 `HEAD` 。



把文件往Git版本库里添加的时候，是分两步执行的：

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。



操作 : 

1. 工作区新建一个文件 license
2. 修改之前 commit 过的文件 Readme.md :

```bash
soda@Z learngit % git status   
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   Readme.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	license

no changes added to commit (use "git add" and/or "git commit -a")
```

Git非常清楚地告诉我们，`readme.txt`被修改了，而`LICENSE`还从来没有被添加过，所以它的状态是`Untracked`。

现在，使用两次命令`git add`，把`readme.txt`和`LICENSE`都添加后，用`git status`再查看一下：

```bash
soda@Z learngit % git add .
soda@Z learngit % git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   Readme.md
	new file:   license
```

现在，暂存区的状态就变成这样了：

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-27-071758.jpg)

所以，`git add`命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行`git commit`就可以一次性把暂存区的所有修改提交到分支。

```bash
soda@Z learngit % git commit -m "understand how stage works"
[master 413793d] understand how stage works
 2 files changed, 1 insertion(+)
 create mode 100644 license
```



一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的：

```bash
$ git status
On branch master
nothing to commit, working tree clean

$  git log
commit 413793d66e2d3bf0bcdcd7cab3b5a8dee51bc6c7 (HEAD -> master)
Author: Demian <sodaoo@qq.com>
Date:   Mon Jun 27 15:18:33 2022 +0800

    understand how stage works
```

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-06-27-071904.jpg)



### Remote

```
在 User/Soda  下面生成 .shh 文件夹
$ ssh-keygen -t rsa -C "Sodaoo@qq.com"
```



将一个本地文件夹 和 github 上创建的 repo 建立联系 : 

```
(git remote rm origin)
git remote add origin https://github.com/Sodaoo/ReactProjects.git
git branch -M main
git push -u origin main
```

初次提交使用 -u , 以后提交就

```bash
git add .
git status
git commit -m '..'
git push origin main
```







## 分支管理

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点：

![git-br-initial](https://www.liaoxuefeng.com/files/attachments/919022325462368/0)

每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长。



当我们创建新的分支，例如 `dev` 时，Git新建了一个指针叫 `dev`，指向 `master` 相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

![git-br-create](https://www.liaoxuefeng.com/files/attachments/919022363210080/l)

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

![git-br-dev-fd](https://www.liaoxuefeng.com/files/attachments/919022387118368/l)

假如我们在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？

最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并：

![git-br-ff-merge](https://www.liaoxuefeng.com/files/attachments/919022412005504/0)

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支：

![git-br-rm](https://www.liaoxuefeng.com/files/attachments/919022479428512/0)







创建`dev`分支，然后切换到`dev`分支：

> `git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：
>
> ```bash
> $ git branch dev
> $ git checkout dev
> Switched to branch 'dev'
> ```

```bash
$ git checkout -b dev
Switched to a new branch 'dev'
```

用 `git branch` 命令查看当前分支：

```
$ git branch
* dev
  master
```



### master & main

技术界早该进行这种变化了，但至少终于有了实际行动。从2020年10月1日开始，所有“master分支”一律改名为“main分支”。

对于接触 Git 和 GitHub 已有多年的开发者来说，这个变化将需要一段时间来适应。即使您知道变化是正确的做法，多年来手指还是习惯输入git checkout master。现在，您要改为git checkout main。









### 本地克隆远端

安装 git

```
https://git-scm.com/download/mac
```

终端生成 SSH key :

```
ssh-keygen -t rsa -C Sodaoo@qq.com
```


将 SSH key 添加到 coding 上 :
```
cat ~/.ssh/id_rsa.pub
```


查看 id_rsa.pub 这个文件并打开拷贝 key 值 , 拷贝如下的所有内容 :
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCwZxQVCRsiAgLQNkCPMz0L8ciateDDHx5H1L4ro4EilmkZzaXl3ghmQKB9xM3jvZc/bGe6quCSL6Xnf/g2BA2OgOt3aYrQtd+if+SHCHhBrHiyFPQ1ecox2E7yeeqOe/XUikEiH4P5d+rxdfzoOQBp4um9m0z2zeZbp7+/9BLCPXk4seJN9uD9ww5+2R/zprpgqUDp7nelPlCxnMpPejJgkZGJUQ9vmyjXKY7LgER8mM/Z/TZpuJNcBlk5Grv/k7/FYTm9QvEf5IIjXxDiPQVNtI7uaMyd+ohjqJqk1ovhL1yILk7jvbisM1LJPx7XS+m1CRdFLuhC6sAeNU7Y8T81
```


点击 new ssh key

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2020-08-06-image.png)

建立本地仓库并初始化
```
ssh -T git@github.com
```

将项目克隆到本地仓库
```
git clone https://github.com/Sodaoo/sodaoo.github.io
```

安装 npm  , 安装 hexo
```
brew install npm
npm install -g hexo-cli
```



### Pull request方法简介

协作更新需要使用Pull request方式。
Pull request的目的：和原仓库的开发者交互，commit自己的一些改动。
Pull request的操作说明：
1. 登录自己的 github 账号 ,
2. fork 项目 ,
3. 将 fork 的项目克隆（clone）到本地，（可以使用一些 git 工具，比如 Github Desktop、SourceTree 等） ,
4. 在 clone 的项目中修改内容，并 commit，然后推送到远端 ,
5. 在 fork 的原仓库打开 Pull Request 栏，提交修改信息，等待原作者同意就可以了 .


### 自己的本地项目 推 github

1 . 新建 Repository
![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2020-08-06-093852.png)

2 . git clone 到本地 (建立联系)

```
git clone https://github.com/Sodaoo/CorpWebsite
```

3 . 把自己的项目文件复制到这个 clone 下来的文件夹

```shell
cp -r vueshop/* CorpWeb/CorpWebsite/
```


```
git add *   // 把文件夹下面的文件都添加进来

git commit  -m  "提交信息"  

git push -u origin master    // 把本地仓库push到github上面
```
> git add . 和 git add * 区别
>
> git add . 会把本地所有 `untrack` 的文件都加入暂存区，并且会根据 `.gitignore` 做过滤，但是git add * 会忽略 `.gitignore` 把任何文件都加入


### Git 分支开发

```shell
// 创建分支, 但是此时 HEAD 指针依然指向主分支 master
$ git  branch  分支名 , 
$ git  branch  changemodel805

// 切换分支
$ git checkout changemodel805
$ git checkout master  // 到主分支

// 2、一次性合并分支的多次提交
$ git merge --squash devbranch 

// 3、一次性合并分支的多次提交，整合到主分支  
$ git commit -master

// 4、查看当前分支所属
$ git branch

// 5、从当前分支拉 copy 开发分支，创建并切换 feature 分支
$ git checkout -b preview-dev

// 6、把新建的分支 push 到远端
$ git push origin 

// 7、拉取远端分支
$ git pull

// 8、取消新功能时，使用 git branch -d <name> 删除分支，但是会提示销毁失败，这时需要强行删除分支，使用命令 git branch -D <name>。
$ git branch -d preview-dev 
```

一般开发流程(亲自测试!!) :

```
git  branch markdown_modify
git checkout markdown_modify // 切换到分支开发

xxx 修改 README.md

git add README.md    // 或者 . 或者 *
git add .            // 要加!
git add *            // 要加!
git commit -m "修改 readme" // 必加!
git commit -mastar    // 必加!

git checkout master   // 切换到主分支
git merge markdown_modify  // 提交分支合并!
git push -u origin master  
```

### 当 master 代码改动了，需要更新开发分支（dev）上的代码

切换到主分支 -> 从 remote 拉代码 -> 切换到开发分支 
```
git checkout master
git pull https://github.com/Sodaoo/CorpWebsite
git checkout dev
git merge master
git push -u origin dev
```