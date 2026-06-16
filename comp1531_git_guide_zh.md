# COMP1531 Git 中文详细速查

这份笔记总结的是 COMP1531 lab 里 Git/GitLab 的常用流程，以及你刚刚遇到过的特殊情况。重点是知道每个命令在干什么，而不是机械复制。

## 1. Git 是什么

Git 是版本控制工具。它帮你记录代码每次修改的历史。

你要理解两个地方：

- 本地仓库：你在学校 SSH 或自己电脑上的项目文件夹。
- 远程仓库：GitLab 上的项目。

常见方向：

```text
git clone: GitLab -> 本地
git pull:  GitLab -> 本地
git push:  本地 -> GitLab
```

## 2. 第一次配置 Git

检查 Git 是否安装：

```bash
git --version
```

配置提交作者信息：

```bash
git config --global user.name "Zhengjiayu Zhang"
git config --global user.email "z5695542@unsw.edu.au"
git config --global push.default simple
git config --global pull.rebase false
```

查看当前配置：

```bash
git config --global user.name
git config --global user.email
```

注意：`user.email` 主要影响 commit 记录里的作者邮箱，不决定你能不能 push。能不能 push 主要看 SSH key 有没有配好。

## 3. SSH Key 和 GitLab

GitLab 需要 SSH key 来确认“这台机器是你本人”。

检查有没有公钥：

```bash
cat ~/.ssh/id_ed25519.pub
```

如果没有，生成一个：

```bash
ssh-keygen -t ed25519 -C "z5695542@unsw.edu.au"
```

一路按 Enter 就行。

然后复制公钥：

```bash
cat ~/.ssh/id_ed25519.pub
```

只复制 `.pub` 文件输出的那一整行，比如：

```text
ssh-ed25519 AAAA... z5695542@vx10
```

不要复制或发给别人这个私钥文件：

```bash
~/.ssh/id_ed25519
```

测试 GitLab SSH：

```bash
ssh -T git@gitlab.cse.unsw.edu.au
```

成功时会看到类似：

```text
Welcome to GitLab, @z5695542!
```

如果你跑：

```bash
ssh git@gitlab.cse.unsw.edu.au
```

看到：

```text
PTY allocation request failed on channel 0
Welcome to GitLab, @z5695542!
Connection to gitlab.cse.unsw.edu.au closed.
```

这也是成功。GitLab 不给你开普通 SSH shell，只允许 Git 操作。

如果看到：

```text
Permission denied (publickey).
```

说明当前机器/终端的 SSH key 没加到 GitLab。

注意：你自己的电脑 terminal 和学校 SSH 里的 `vx10` 是两个不同环境，各自有自己的 `~/.ssh`。所以一边成功不代表另一边也成功。

## 4. 克隆仓库

在 GitLab 页面点 `Code`，复制 `Clone with SSH` 的链接。

进入你想放课程代码的文件夹：

```bash
cd ~/cs1531
```

克隆：

```bash
git clone git@gitlab.cse.unsw.edu.au:coursework/...
```

进入仓库：

```bash
cd lab01_git
```

确认文件：

```bash
ls
```

查看远程地址：

```bash
git remote -v
```

如果地址长这样，说明走 SSH：

```text
git@gitlab.cse.unsw.edu.au:...
```

## 5. 日常提交流程

最常用流程：

```bash
git status
git add 文件名
git commit -m "提交说明"
git push
```

每个命令的意思：

```bash
git status
```

查看当前仓库状态：哪些文件改了、哪些文件已经 add、哪些文件还没被 Git 跟踪。

```bash
git add 文件名
```

把文件放进暂存区。暂存区可以理解成“下一次 commit 准备提交的内容”。

```bash
git commit -m "提交说明"
```

把暂存区内容保存成一次本地 commit，也就是一次代码快照。

```bash
git push
```

把本地 commit 上传到 GitLab。

## 6. 老师说“每个 function 分开提交”是什么意思

对应的是：

```bash
git add ...
git commit -m "..."
```

意思是：完成一个小功能或一个函数后，就单独 commit 一次。

例如你在写 `leap.js`：

```bash
# 写完 isLeap
git add leap.js
git commit -m "Implement isLeap"

# 写完 countLeaps
git add leap.js
git commit -m "Implement countLeaps"

# 写完 getNextLeap
git add leap.js
git commit -m "Implement getNextLeap"

# 最后上传
git push
```

这样做的好处是：老师或队友能清楚看到你每一步做了什么。如果后面出错，也更容易找问题。

## 7. git add 和 git commit 的关系

修改文件后，Git 只知道文件变了，但不会自动提交。

流程是：

```text
工作区 modified -> git add -> 暂存区 staged -> git commit -> 本地提交
```

如果你改了 5 个文件，但只想提交其中 2 个，就只 add 那 2 个：

```bash
git add file1.js file2.js
git commit -m "Implement selected changes"
```

查看哪些文件已经 staged：

```bash
git status
```

绿色通常表示已经 add，会进入下一次 commit。

## 8. git pull：保持本地最新

如果 GitLab 上有新 commit，但你本地还没有，就用：

```bash
git pull
```

`git pull` 的方向是：

```text
GitLab -> 本地
```

常见场景：

- 队友 push 了代码。
- 你在 GitLab 网页上编辑了文件并点了 `Commit Changes`。
- 老师要求练习 Keeping Your Repo Up To Date。

建议在开始写代码前先：

```bash
git pull
```

这样避免你在旧代码上继续写。

## 9. `your branch is ahead of origin/master by 1 commit`

意思是：

```text
你的本地分支比 GitLab 上的对应分支多了 1 个 commit
```

通常是你已经：

```bash
git commit
```

但还没：

```bash
git push
```

解决：

```bash
git push
```

## 10. 分支 branch

分支让你在不影响主分支的情况下写新功能。

查看分支：

```bash
git branch
```

输出里带 `*` 的是当前分支：

```text
  master
* new_branch
```

创建并切换到新分支：

```bash
git checkout -b new_branch
```

切换到已有分支：

```bash
git checkout master
```

或者：

```bash
git checkout new_branch
```

## 11. 合并分支 merge

如果你在 `new_branch` 上写了东西，现在要合并回 `master`：

```bash
git checkout master
git merge new_branch
git push
```

意思是：

```text
把 new_branch 的改动合并到当前所在的 master
```

注意：你在哪个分支上执行 `git merge`，改动就会合并到哪个分支。

例如：

```bash
git checkout new_branch
git merge master
```

意思是：

```text
把 master 的改动合并到 new_branch
```

## 12. Fast-forward 是什么

你可能会看到：

```text
Fast-forward
second.txt | 1 +
```

这表示 Git 可以直接把分支指针往前移动，不需要创建额外 merge commit。

这通常是最简单、最干净的合并情况。

## 13. Merge conflict 是什么

Merge conflict 是合并冲突。

当两个分支都改了同一个文件的同一块地方，Git 不知道该保留哪一个版本，就会冲突。

例如：

- `master` 上 `third.txt` 内容是：

```text
I am third
```

- `new_branch` 上 `third.txt` 内容是：

```text
3rd time's the charm
```

当你在 `new_branch` 上执行：

```bash
git merge master
```

可能看到：

```text
Auto-merging third.txt
CONFLICT (add/add): Merge conflict in third.txt
Automatic merge failed; fix conflicts and then commit the result.
```

意思是：Git 合并失败，需要你手动改 `third.txt`。

## 14. 解决 merge conflict

冲突文件里会出现这种标记：

```text
<<<<<<< HEAD
3rd time's the charm
=======
I am third
>>>>>>> master
```

含义：

- `<<<<<<< HEAD` 到 `=======`：当前分支的内容。
- `=======` 到 `>>>>>>> master`：被合并进来的分支内容。
- 这些符号本身不是你要保留的代码，解决冲突时要删掉。

你可以选择只保留当前分支：

```text
3rd time's the charm
```

也可以只保留 master：

```text
I am third
```

也可以两个都保留：

```text
3rd time's the charm
I am third
```

改完后：

```bash
git add third.txt
git commit -m "Resolve merge conflict in third.txt"
```

这个 commit 就是 merge commit。

## 15. Merge commit 有两个 parent 是什么意思

普通 commit 通常只有一个 parent：它前面的那个 commit。

merge commit 有两个 parent，因为它表示：

```text
我把两个分支的历史合到一起了
```

如果你是在 `new_branch` 上执行：

```bash
git merge master
```

那么这个 merge commit 会先出现在 `new_branch` 上，不会自动出现在 `master` 上。

## 16. 拼错 commit 后怎么办

你遇到过这个：

```bash
git commmit -m "edit third again"
```

报错：

```text
git: 'commmit' is not a git command
```

原因是 `commit` 拼错了。正确的是：

```bash
git commit -m "edit third again"
```

如果你拼错后直接 `git push`，可能会看到：

```text
Everything up-to-date
```

因为你其实还没 commit，所以没有任何东西可以 push。

这时应该：

```bash
git status
git commit -m "edit third again"
```

## 17. `Your local changes would be overwritten by merge`

你遇到过：

```text
error: Your local changes to the following files would be overwritten by merge:
        third.txt
Please commit your changes or stash them before you merge.
Aborting
```

意思是：你本地 `third.txt` 有未提交修改。如果现在 merge，Git 担心覆盖你的修改，所以停止。

最常见解决方式：先 commit 当前修改。

```bash
git status
git add third.txt
git commit -m "Edit third again"
git merge master
```

如果这是你不要的修改，才考虑丢弃。但丢弃修改有风险，初学时不要乱用。

## 18. GitLab Merge Request 是什么

以后做大项目时，通常不能直接 push 到 `master`。

流程会变成：

```bash
git checkout -b feature_branch
# 写代码
git add ...
git commit -m "..."
git push
```

然后去 GitLab 创建 Merge Request。

Merge Request 的意思是：

```text
请求把我的 feature_branch 合并进 master
```

别人可以 review，你也可以在网页上点 Merge。

lab 里可能要求：

- push `new_branch`
- 打开终端给出的 merge request 链接
- 填描述
- 创建 merge request
- 取消勾选 `Delete source branch when merge request is accepted`
- 点 Merge
- 回本地：

```bash
git checkout master
git pull
```

## 19. 常用检查命令

查看当前状态：

```bash
git status
```

查看最近 commit：

```bash
git log --oneline -5
```

查看最近 commit 的作者：

```bash
git log --oneline --format='%h %an <%ae> %s' -5
```

查看分支：

```bash
git branch
```

查看远程仓库：

```bash
git remote -v
```

查看当前所在目录：

```bash
pwd
```

查看文件：

```bash
ls
```

查看文件内容：

```bash
cat first.txt
```

## 20. 常见问题速查

### `Everything up-to-date`

意思是没有新的 commit 需要 push。

如果你明明改了文件，先检查：

```bash
git status
```

可能是你还没：

```bash
git add ...
git commit ...
```

### `nothing to commit, working tree clean`

意思是当前没有未提交修改，很干净。

### `Permission denied (publickey)`

当前环境的 SSH key 没有被 GitLab 认可。

检查：

```bash
cat ~/.ssh/id_ed25519.pub
ssh -T git@gitlab.cse.unsw.edu.au
```

### `N/A: version "v24.16.0" is not yet installed`

这是 nvm/Node 问题，不是 Git 问题。

如果后面：

```bash
node -v
npm -v
```

能显示正确版本，说明 Node 本身能用，只是登录脚本里可能有旧配置。

### 测试脚本说 commit 数不对

可能是 commit 作者名字大小写不一致。

查看：

```bash
git log --oneline --format='%h %an <%ae> %s' -5
```

设置：

```bash
git config --global user.name "Zhengjiayu Zhang"
git config --global user.email "z5695542@unsw.edu.au"
```

## 21. 做 lab 时推荐流程

每次开始：

```bash
cd ~/cs1531/某个lab
git pull
git status
```

写完一个小函数：

```bash
git status
git add 文件名
git commit -m "Implement xxx function"
```

跑测试：

```bash
node 文件名.js
```

或者讲义要求的：

```bash
bash test_git_basics.sh
bash test_git_team.sh
```

最后上传：

```bash
git push
```

确认：

```bash
git status
```

理想输出：

```text
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
```

## 22. 最重要的 Git 思维

记住这条线：

```text
改文件 -> git add -> git commit -> git push
```

再记住另一条：

```text
GitLab 有新东西 -> git pull
```

分支合并时记住：

```text
我在哪个分支上 git merge，改动就合并到哪个分支
```

遇到冲突时不要慌：

```text
打开冲突文件 -> 删除 <<<< ==== >>>> 标记 -> 保留你想要的内容 -> git add -> git commit
```
